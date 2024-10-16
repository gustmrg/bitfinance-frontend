import { api } from "@/lib/axios";

export interface SignUpBody {
  email: string;
  password: string;
}

export async function signUp({ email, password }: SignUpBody) {
  await api.post("/identity/register", { email, password });
}
