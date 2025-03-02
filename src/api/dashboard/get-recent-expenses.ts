import { privateAPI } from "@/lib/axios";

const api = privateAPI();

interface GetRecentExpensesResponse {
  data: ExpenseResponseModel[];
}

export type ExpenseResponseModel = {
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
  date: string;
};

export async function getRecentExpenses(
  organizationId: string
): Promise<GetRecentExpensesResponse | null> {
  try {
    const response = await api.get<GetRecentExpensesResponse>(
      `/organizations/${organizationId}/dashboard/recent-expenses`
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
    return null;
  }
}
