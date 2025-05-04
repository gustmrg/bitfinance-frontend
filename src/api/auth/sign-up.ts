import { api } from "@/lib/axios";

export interface SignUpBody {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function signUp({ email, password, confirmPassword }: SignUpBody) {
  const response = await api.post("/identity/register", {
    email,
    password,
    confirmPassword,
  });

  return response.data;
}
