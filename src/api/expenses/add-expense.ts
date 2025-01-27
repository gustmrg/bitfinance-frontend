import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface CreateExpenseRequest {
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
  amount: number;
  status: "pending" | "paid" | "cancelled";
  occurredAt: string;
  createdBy: string;
  organizationId: string;
}

export interface CreateExpenseResponse {
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
  amount: number;
  status: "pending" | "paid" | "cancelled";
  occurredAt: string;
  createdBy: string;
  createdAt: string;
}

export async function AddExpense({
  description,
  category,
  status,
  amount,
  occurredAt,
  createdBy,
  organizationId,
}: CreateExpenseRequest) {
  try {
    const response = await api.post<CreateExpenseResponse>(
      `/organizations/${organizationId}/expenses`,
      {
        description,
        category,
        status,
        amount,
        occurredAt,
        createdBy,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
