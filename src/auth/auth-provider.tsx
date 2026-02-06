import { api, authApi, setOnRefreshFailure } from "@/lib/axios";
import {
  setAccessToken,
  clearAccessToken,
} from "@/lib/auth-token";
import { logger } from "@/lib/logger";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  organizations: Organization[];
};

export type Organization = {
  id: string;
  name: string;
};

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

interface AuthenticationResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  user: {
    id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const isAuthenticated = useMemo(() => !!token, [token]);
  const isInitialized = useRef(false);

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

  const clearAuthState = useCallback(() => {
    updateToken(null);
    setUser(null);
    setSelectedOrganization(null);
  }, [updateToken]);

  useEffect(() => {
    setOnRefreshFailure(() => {
      clearAuthState();
      window.location.href = "/auth/sign-in";
    });
  }, [clearAuthState]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authApi.get("/identity/me");

      if (response) {
        const userData: User = {
          id: response.data.id,
          username: response.data.username,
          fullName: response.data.fullName,
          email: response.data.email,
          organizations: response.data.organizations ?? [],
        };

        setUser(userData);

        if (userData.organizations && userData.organizations.length > 0) {
          setSelectedOrganization({
            id: userData.organizations[0].id,
            name: userData.organizations[0].name,
          });
        }
      }
    } catch (error) {
      logger.error("Failed to fetch user data", error);
    }
  }, []);

  // Session restoration on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeAuth = async () => {
      // One-time cleanup of old localStorage tokens
      localStorage.removeItem("_authAccessToken");
      localStorage.removeItem("_authTokenType");
      localStorage.removeItem("_authExpiresIn");
      localStorage.removeItem("_authRefreshToken");

      try {
        const response = await api.post<AuthenticationResponse>(
          "/identity/refresh"
        );

        if (response.status === 200) {
          const { accessToken, accessTokenExpiresAt } = response.data;
          updateToken(accessToken, accessTokenExpiresAt);
          await fetchUserProfile();
        }
      } catch {
        logger.debug("No existing session to restore");
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [updateToken, fetchUserProfile, clearAuthState]);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }: RegisterBody): Promise<boolean> => {
    try {
      const response = await api.post<AuthenticationResponse>(
        "/identity/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status !== 200) {
        throw new Error("Registration failed");
      }

      const { accessToken, accessTokenExpiresAt } = response.data;
      updateToken(accessToken, accessTokenExpiresAt);
      await fetchUserProfile();
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
      const response = await api.post<AuthenticationResponse>(
        "/identity/login",
        {
          email,
          password,
        }
      );

      const { accessToken, accessTokenExpiresAt } = response.data;
      updateToken(accessToken, accessTokenExpiresAt);
      return true;
    } catch (error) {
      logger.error("Login failed", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.post("/identity/logout");
    } catch (error) {
      logger.error("Logout API call failed", error);
    } finally {
      clearAuthState();
    }
  };

  const getMe = async () => {
    await fetchUserProfile();
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
