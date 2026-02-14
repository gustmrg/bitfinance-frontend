import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface GetUpcomingBillsResponse {
  data: UpcomingBillResponseModel[];
}

export type UpcomingBillResponseModel = {
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
    | "subscriptions"
    | "taxes"
    | "pets";
  status: "created" | "due" | "paid" | "overdue" | "cancelled" | "upcoming";
  amountDue: number;
  createdDate?: string;
  createdAt?: string;
  dueDate: string;
};

export async function getUpcomingBills(
  organizationId: string
): Promise<GetUpcomingBillsResponse> {
  const response = await api.get<GetUpcomingBillsResponse>(
    `/organizations/${organizationId}/dashboard/upcoming-bills`
  );

  return response.data;
}
