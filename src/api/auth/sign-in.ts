import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

interface SignInResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export async function signInAsync({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>("/identity/login", {
    email,
    password,
  });

  return response.data;
}
