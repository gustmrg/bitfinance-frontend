import { privateAPI } from "@/lib/axios";
import type { AxiosResponse } from "axios";

const api = privateAPI();

export async function DeleteBill(
  id: string,
  organizationId: string
): Promise<AxiosResponse<void>> {
  return api.delete(`/organizations/${organizationId}/bills/${id}`);
}
