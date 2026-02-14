import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import { authService } from "@/api/auth";
import type { Organization, User } from "@/auth/types";
import { setOnRefreshFailure } from "@/lib/axios";
import { clearAccessToken, setAccessToken } from "@/lib/auth-token";
import { fetchMeAsync, useMeQuery } from "@/hooks/queries/use-me-query";
import { logger } from "@/lib/logger";
import { queryKeys } from "@/lib/query-keys";

export type { Organization, User } from "@/auth/types";

interface AuthContextValues {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  register: (body: RegisterBody) => Promise<boolean>;
  login: (credentials: LoginCredentialsBody) => Promise<boolean>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  selectedOrganization: Organization | null;
  setSelectedOrganization: (organization: Organization | null) => void;
}

const initialContext: AuthContextValues = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  token: null,
  register: async () => false,
  login: async () => false,
  logout: async () => {},
  getMe: async () => {},
  isLoading: true,
  selectedOrganization: null,
  setSelectedOrganization: () => {},
};

const AuthContext = createContext<AuthContextValues>(initialContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginCredentialsBody {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const isAuthenticated = useMemo(() => !!token, [token]);
  const initializationRef = useRef(false);
  const meQuery = useMeQuery(isInitialized && isAuthenticated);
  const user = meQuery.data ?? null;
  const isLoading = !isInitialized || (isAuthenticated && meQuery.isPending);

  const updateToken = useCallback(
    (newToken: string | null, expiresAt?: string | null) => {
      setToken(newToken);
      if (newToken) {
        setAccessToken(newToken, expiresAt);
      } else {
        clearAccessToken();
      }
    },
    []
  );

  const setUser = useCallback(
    (nextUser: User | null) => {
      if (nextUser) {
        queryClient.setQueryData(queryKeys.auth.me(), nextUser);
        return;
      }

      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
    },
    [queryClient]
  );

  const clearAuthState = useCallback(() => {
    updateToken(null);
    queryClient.clear();
    setSelectedOrganization(null);
  }, [queryClient, updateToken]);

  useEffect(() => {
    setOnRefreshFailure(() => {
      clearAuthState();
      window.location.href = "/auth/sign-in";
    });
  }, [clearAuthState]);

  const getMe = useCallback(async () => {
    if (!token) {
      return;
    }

    await queryClient.fetchQuery({
      queryKey: queryKeys.auth.me(),
      queryFn: fetchMeAsync,
    });
  }, [queryClient, token]);

  useEffect(() => {
    if (!user) {
      setSelectedOrganization(null);
      return;
    }

    setSelectedOrganization((currentOrganization) => {
      if (user.organizations.length === 0) {
        return null;
      }

      if (
        currentOrganization &&
        user.organizations.some((org) => org.id === currentOrganization.id)
      ) {
        return currentOrganization;
      }

      return user.organizations[0];
    });
  }, [user]);

  // Session restoration on mount
  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const initializeAuth = async () => {
      // One-time cleanup of old localStorage tokens
      localStorage.removeItem("_authAccessToken");
      localStorage.removeItem("_authTokenType");
      localStorage.removeItem("_authExpiresIn");
      localStorage.removeItem("_authRefreshToken");

      try {
        const response = await authService.refreshAsync();
        const { accessToken, accessTokenExpiresAt } = response;
        updateToken(accessToken, accessTokenExpiresAt);
      } catch {
        logger.debug("No existing session to restore");
        clearAuthState();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [clearAuthState, updateToken]);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: RegisterBody): Promise<boolean> => {
    try {
      const response = await authService.signUpAsync({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const { accessToken, accessTokenExpiresAt } = response;
      updateToken(accessToken, accessTokenExpiresAt);
      await queryClient.fetchQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: fetchMeAsync,
      });
      return true;
    } catch (error) {
      logger.error("Registration failed", error);
      return false;
    }
  };

  const login = async ({
    email,
    password,
  }: LoginCredentialsBody): Promise<boolean> => {
    try {
      const response = await authService.signInAsync({
        email,
        password,
      });

      const { accessToken, accessTokenExpiresAt } = response;
      updateToken(accessToken, accessTokenExpiresAt);
      await queryClient.fetchQuery({
        queryKey: queryKeys.auth.me(),
        queryFn: fetchMeAsync,
      });
      return true;
    } catch (error) {
      logger.error("Login failed", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logoutAsync();
    } catch (error) {
      logger.error("Logout API call failed", error);
    } finally {
      clearAuthState();
    }
  };

  const value: AuthContextValues = {
    isAuthenticated,
    user,
    setUser,
    token,
    register,
    login,
    logout,
    getMe,
    isLoading,
    selectedOrganization,
    setSelectedOrganization,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  const {
    user,
    register,
    login,
    logout,
    isAuthenticated,
    token,
    getMe,
    isLoading,
    selectedOrganization,
    setSelectedOrganization,
  } = context;

  return {
    user,
    register,
    login,
    logout,
    isAuthenticated,
    token,
    getMe,
    isLoading,
    selectedOrganization,
    setSelectedOrganization,
  };
}
