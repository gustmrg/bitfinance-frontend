import { privateAPI } from "@/lib/axios";

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
}: CreateBillRequest) {
  const token = localStorage.getItem("_authAccessToken");

  if (token !== null) {
    const response = await privateAPI(token).post<CreateBillResponse>(
      "/bills",
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
  } else {
    console.error("Could not find a valid access token");
  }
}
