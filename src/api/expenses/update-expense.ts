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

export async function UpdateExpense({
  id,
  description,
  category,
  amount,
  status,
  occurredAt,
  createdBy,
  organizationId,
}: UpdateExpenseRequest) {
  try {
    const response = await api.patch(
      `organizations/${organizationId}/expenses/${id}`,
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
