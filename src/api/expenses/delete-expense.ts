import { privateAPI } from "@/lib/axios";
import type { AxiosResponse } from "axios";

const api = privateAPI();

export async function DeleteExpense(
  id: string,
  organizationId: string
): Promise<AxiosResponse<void>> {
  return api.delete(`/organizations/${organizationId}/expenses/${id}`);
}
