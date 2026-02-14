import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface UpdateExpenseRequest {
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
  organizationId: string;
}

export interface UpdateExpenseResponse {
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
}

export async function UpdateExpense({
  id,
  description,
  category,
  amount,
  status,
  occurredAt,
  createdBy,
  organizationId,
}: UpdateExpenseRequest): Promise<UpdateExpenseResponse> {
  const response = await api.patch<UpdateExpenseResponse>(
    `/organizations/${organizationId}/expenses/${id}`,
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
}
