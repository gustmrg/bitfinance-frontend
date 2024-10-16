import { api } from "@/lib/axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
};

interface AuthContextValues {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  getAccessToken: () => void;
  login: (credentials: LoginCredentialsBody) => Promise<boolean>;
  logout: () => void;
}

const initialContext = {
  isAuthenticated: false,
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  getAccessToken: () => {},
  login: async (credentials: LoginCredentialsBody) => false,
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

  const getAccessToken = () => {
    return token;
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  const { user, login, logout, isAuthenticated, token } = context;

  return { user, login, logout, isAuthenticated, token };
}
