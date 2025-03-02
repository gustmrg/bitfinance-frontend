import { privateAPI } from "@/lib/axios";

const api = privateAPI();

interface GetUpcomingBillsResponse {
  data: Bill[];
}

type Bill = {
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
  createdDate: string;
  dueDate: string;
};

export async function getUpcomingBills(
  organizationId: string
): Promise<GetUpcomingBillsResponse | null> {
  try {
    const response = await api.get<GetUpcomingBillsResponse>(
      `/organizations/${organizationId}/dashboard/upcoming-bills`
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
    return null;
  }
}
