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

  return instance;
};
