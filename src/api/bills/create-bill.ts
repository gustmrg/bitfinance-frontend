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
    | "pets"
    | "subscriptions"
    | "taxes"
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
    | "pets"
    | "subscriptions"
    | "taxes"
    | "miscellaneous";
  status: "created" | "due" | "paid" | "overdue" | "cancelled" | "upcoming";
  amountDue: number;
  amountPaid: number;
  createdDate: string;
  dueDate: string;
  paidDate?: string | null;
}

export async function CreateBill({
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
    const response = await api.post<CreateBillResponse>(
      `/organizations/${organizationId}/bills`,
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
