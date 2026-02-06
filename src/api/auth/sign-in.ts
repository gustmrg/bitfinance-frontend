import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignInResponse {
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

export async function signInAsync({ email, password }: SignInBody) {
  const response = await api.post<SignInResponse>("/identity/login", {
    email,
    password,
  });

  return response.data;
}
