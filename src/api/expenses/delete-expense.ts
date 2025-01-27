import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export async function DeleteExpense(id: string, organizationId: string) {
  try {
    const response = await api.delete(
      `organizations/${organizationId}/expenses/${id}`
    );

    return response;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
