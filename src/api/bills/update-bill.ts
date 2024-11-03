import { privateAPI } from "@/lib/axios";

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
}: UpdateBillRequest) {
  const token = localStorage.getItem("_authAccessToken");

  if (token !== null) {
    const response = await privateAPI(token).patch(`/bills/${id}`, {
      description,
      category,
      status,
      dueDate,
      amountDue,
      paymentDate,
      amountPaid,
    });

    return response.data;
  } else {
    console.error("Could not find a valid access token");
  }
}
