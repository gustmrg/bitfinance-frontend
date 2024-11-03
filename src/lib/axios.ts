import axios from "axios";
import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

export const privateAPI = (token: string) => {
  const instance = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // instance.interceptors.request.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;

  //     if (error.response?.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const refreshSuccessful = await refreshToken();

  //       if (refreshSuccessful) {
  //         const newToken = getAccessToken();
  //         originalRequest.headers.Authorization = `Bearer ${newToken}`;

  //         return instance;
  //       } else {
  //         console.log("Token refresh failed");
  //         return Promise.reject(error);
  //       }
  //     }
  //   }
  // );

  return instance;
};
