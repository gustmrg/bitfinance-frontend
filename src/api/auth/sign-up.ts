import { api } from "@/lib/axios";

export interface SignUpBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
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

export async function signUp({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: SignUpBody) {
  const response = await api.post<SignUpResponse>("/identity/register", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  return response.data;
}
