import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/lib/auth-token";
import { env } from "@/env";
import { logger } from "@/lib/logger";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

// --- Public API instance (no auth) ---
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.code === "NETWORK_ERROR" || !error.response) {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

// --- Authenticated API instance (single, shared) ---
export const authApi = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Refresh queue mechanism ---
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
let refreshFailSubscribers: Array<(error: AxiosError) => void> = [];

let _onRefreshFailure: (() => void) | null = null;

export function setOnRefreshFailure(callback: () => void): void {
  _onRefreshFailure = callback;
}

function subscribeToRefresh(
  onSuccess: (token: string) => void,
  onFailure: (error: AxiosError) => void
): void {
  refreshSubscribers.push(onSuccess);
  refreshFailSubscribers.push(onFailure);
}

function notifyRefreshSuccess(newToken: string): void {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
  refreshFailSubscribers = [];
}

function notifyRefreshFailure(error: AxiosError): void {
  refreshFailSubscribers.forEach((cb) => cb(error));
  refreshSubscribers = [];
  refreshFailSubscribers = [];
}

async function performTokenRefresh(): Promise<string | null> {
  try {
    const response = await api.post("/identity/refresh");

    if (response.status === 200) {
      const { accessToken, accessTokenExpiresAt } = response.data;
      setAccessToken(accessToken, accessTokenExpiresAt);
      return accessToken;
    }
    return null;
  } catch (error) {
    logger.error("Token refresh failed", error);
    return null;
  }
}

// --- Request interceptor: attach Bearer token ---
authApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor: handle 401 with refresh queue ---
authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeToRefresh(
            (newToken: string) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(authApi(originalRequest));
            },
            (refreshError: AxiosError) => {
              reject(refreshError);
            }
          );
        });
      }

      isRefreshing = true;

      try {
        const newToken = await performTokenRefresh();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          notifyRefreshSuccess(newToken);
          return authApi(originalRequest);
        } else {
          clearAccessToken();
          const refreshError = new AxiosError("Token refresh failed");
          notifyRefreshFailure(refreshError);
          if (_onRefreshFailure) {
            _onRefreshFailure();
          }
          return Promise.reject(error);
        }
      } catch (refreshError) {
        clearAccessToken();
        notifyRefreshFailure(refreshError as AxiosError);
        if (_onRefreshFailure) {
          _onRefreshFailure();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status && error.response.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.code === "NETWORK_ERROR" || !error.response) {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Backward-compatible alias — all 14 API modules import this
export const privateAPI = (): typeof authApi => authApi;
