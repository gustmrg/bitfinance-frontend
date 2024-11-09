import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface CreateBillRequest {
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

export interface CreateBillResponse {
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
  amountPaid: number;
  createdDate: string;
  dueDate: string;
  paidDate?: string | null;
}

export async function AddBill({
  description,
  category,
  status,
  dueDate,
  amountDue,
  paymentDate,
  amountPaid,
  organizationId,
}: CreateBillRequest) {
  try {
    const response = await api.post<CreateBillResponse>("/bills", {
      description,
      category,
      status,
      dueDate,
      amountDue,
      paymentDate,
      amountPaid,
      organizationId,
    });

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
