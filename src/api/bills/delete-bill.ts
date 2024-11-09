import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export async function DeleteBill(id: string) {
  try {
    const response = await api.delete(`/bills/${id}`);

    return response;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
