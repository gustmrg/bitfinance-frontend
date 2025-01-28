import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface UpdateBillRequest {
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
  dueDate: string;
  paymentDate?: string | null;
  amountDue: number;
  amountPaid?: number | null;
  organizationId: string;
}

export async function UpdateBill({
  id,
  description,
  category,
  status,
  dueDate,
  amountDue,
  paymentDate,
  amountPaid,
  organizationId,
}: UpdateBillRequest) {
  try {
    const response = await api.patch(
      `/organizations/${organizationId}/bills/${id}`,
      {
        description,
        category,
        status,
        dueDate,
        amountDue,
        paymentDate,
        amountPaid,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
