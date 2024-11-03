import { api } from "@/lib/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthContextValues {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  getAccessToken: () => string | null;
  refreshToken: () => Promise<boolean>;
  login: (credentials: LoginCredentialsBody) => Promise<boolean>;
  logout: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = useMemo(() => !!token, [token]);

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

  useEffect(() => {
    const token = localStorage.getItem("_authAccessToken");
    if (token) {
      setToken(token);
    }
  }, []);

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
    getAccessToken,
    refreshToken,
  } = context;

  return {
    user,
    login,
    logout,
    isAuthenticated,
    token,
    getAccessToken,
    refreshToken,
  };
}
