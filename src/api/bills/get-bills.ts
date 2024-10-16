import { privateAPI } from "@/lib/axios";

export interface GetBillsResponse {
  bills: {
    id: string;
    description: string;
    category:
      | "housing"
      | "transportation"
      | "food"
      | "utilities"
      | "clothing"
      | "healthcare"
      | "insurance"
      | "personal"
      | "debt"
      | "savings"
      | "education"
      | "entertainment"
      | "miscellaneous";
    status: "created" | "due" | "paid" | "overdue" | "cancelled" | "upcoming";
    amountDue: number;
    amountPaid?: number;
    createdDate: string;
    dueDate: string;
    paymentDate?: string;
    deletedDate?: string;
    notes?: string;
  }[];
}

export async function getBills(token: string) {
  const response = await privateAPI(token).get("/bills");

  return response.data;
}
