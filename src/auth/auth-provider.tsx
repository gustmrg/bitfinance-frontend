import { api, privateAPI } from "@/lib/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  organizations?: Organization[] | null;
};

type Organization = {
  id: string;
  name: string;
};

interface AuthContextValues {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  getAccessToken: () => string | null;
  refreshToken: () => Promise<boolean>;
  login: (credentials: LoginCredentialsBody) => Promise<boolean>;
  logout: () => void;
  getMe: () => void;
  selectedOrganization: Organization | null;
  setSelectedOrganization: (organization: Organization | null) => void;
}

const initialContext = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  getAccessToken: () => null,
  refreshToken: async () => false,
  login: async () => false,
  logout: () => {},
  getMe: async () => null,
  isLoading: true,
  selectedOrganization: null,
  setSelectedOrganization: () => {},
};

const AuthContext = createContext<AuthContextValues>(initialContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

interface LoginCredentialsBody {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const isAuthenticated = useMemo(() => !!token, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("_authAccessToken");
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchUserData = async () => {
      await getMe();
    };

    fetchUserData();

    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginCredentialsBody) => {
    try {
      const response = await api.post("/identity/login", { email, password });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const expiresIn = response.data.expiresIn;
      const tokenType = response.data.tokenType;
      localStorage.setItem("_authAccessToken", accessToken);
      localStorage.setItem("_authTokenType", tokenType);
      localStorage.setItem("_authExpiresIn", expiresIn);
      localStorage.setItem("_authRefreshToken", refreshToken);
      setToken(accessToken);
      return true;
    } catch (error) {
      console.log("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("_authAccessToken");
    localStorage.removeItem("_authTokenType");
    localStorage.removeItem("_authExpiresIn");
    localStorage.removeItem("_authRefreshToken");
    setToken(null);
  };

  const getMe = async () => {
    try {
      const response = await privateAPI().get("/identity/me");

      if (response) {
        let user: User = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          organizations: response.data.organizations ?? null,
        };

        setUser(user);

        if (selectedOrganization === null && user.organizations !== null) {
          let organization: Organization = {
            id: user.organizations![0].id,
            name: user.organizations![0].name,
          };
          setSelectedOrganization(organization);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = (): string | null => {
    return token;
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("_authRefreshToken");

    try {
      const response = await api.post("/identity/refresh", { refreshToken });

      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        const expiresIn = response.data.expiresIn;
        const tokenType = response.data.tokenType;
        localStorage.setItem("_authAccessToken", accessToken);
        localStorage.setItem("_authTokenType", tokenType);
        localStorage.setItem("_authExpiresIn", expiresIn);
        localStorage.setItem("_authRefreshToken", newRefreshToken);
        setToken(accessToken);
        return true;
      } else {
        throw new Error(
          "An unexpected error occurred when trying to refresh token"
        );
      }
    } catch (error) {
      console.log("Could not refresh token", error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    setUser,
    token,
    setToken,
    login,
    logout,
    getAccessToken,
    refreshToken,
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

export const getTokenSilently = () => {
  return localStorage.getItem("_authAccessToken");
};

export const refreshTokenSilently = async () => {
  const storedRefreshToken = localStorage.getItem("_authRefreshToken");

  if (!storedRefreshToken) return null;

  try {
    const response = await api.post("/identity/refresh", {
      refreshToken: storedRefreshToken,
    });

    if (response.status === 200) {
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      const expiresIn = response.data.expiresIn;
      const tokenType = response.data.tokenType;

      localStorage.setItem("_authAccessToken", newAccessToken);
      localStorage.setItem("_authTokenType", tokenType);
      localStorage.setItem("_authExpiresIn", expiresIn);
      localStorage.setItem("_authRefreshToken", newRefreshToken);

      return newAccessToken;
    } else {
      console.log("Unexpected error during token refresh");
      return null;
    }
  } catch (error) {
    console.log("Token refresh failed", error);
    return null;
  }
};
