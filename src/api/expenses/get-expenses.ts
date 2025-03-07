import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface GetExpensesQuery {
  organizationId: string;
  from?: Date;
  to?: Date;
}

export interface GetExpensesResponse {
  data: Expense[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

type Expense = {
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
    | "miscellaneous"
    | "travel"
    | "pets"
    | "gifts"
    | "subscriptions"
    | "taxes";
  amount: number;
  status: "pending" | "paid" | "cancelled";
  occurredAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
};

export async function getExpenses({
  organizationId,
  from,
  to,
}: GetExpensesQuery): Promise<GetExpensesResponse | null> {
  try {
    const response = await api.get<GetExpensesResponse>(
      `/organizations/${organizationId}/expenses`,
      {
        params: {
          from,
          to,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
    return null;
  }
}
