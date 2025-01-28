import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export async function DeleteBill(id: string, organizationId: string) {
  try {
    const response = await api.delete(
      `/organizations/${organizationId}/bills/${id}`
    );

    return response;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
