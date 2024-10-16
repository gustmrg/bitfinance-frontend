import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_AUTH0_DOMAIN: z.string(),
  VITE_AUTH0_CLIENT_ID: z.string(),
  VITE_AUTH0_AUDIENCE: z.string(),
});

export const env = envSchema.parse(import.meta.env);
