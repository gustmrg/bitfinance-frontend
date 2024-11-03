import { privateAPI } from "@/lib/axios";

export async function DeleteBill(id: string) {
  const token = localStorage.getItem("_authAccessToken");

  if (!token) {
    console.error("Could not find a valid access token");
    throw new Error("Authorization token is missing.");
  }

  const response = await privateAPI(token).delete(`/bills/${id}`);

  return response;
}
