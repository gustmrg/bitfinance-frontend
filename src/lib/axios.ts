import axios from "axios";
import { env } from "@/env";
import { getTokenSilently, refreshTokenSilently } from "@/auth/auth-provider";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

export const privateAPI = () => {
  const instance = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getTokenSilently();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log(originalRequest._retry);
        console.log("Error returned 401 code");

        originalRequest._retry = true;
        const newToken = await refreshTokenSilently();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalRequest);
        } else {
          console.log("Token refresh failed");
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
