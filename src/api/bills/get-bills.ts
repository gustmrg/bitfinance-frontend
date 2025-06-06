import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface GetBillsQuery {
  organizationId: string;
  from?: Date;
  to?: Date;
}

export interface GetBillsResponse {
  data: Bill[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
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
    | "miscellaneous"
    | "subscriptions"
    | "taxes"
    | "pets";
  status: "created" | "due" | "paid" | "overdue" | "cancelled" | "upcoming";
  amountDue: number;
  amountPaid?: number | null;
  createdDate: string;
  dueDate: string;
  paymentDate?: string | null;
  deletedDate?: string | null;
  notes?: string;
};

export async function getBills({
  organizationId,
  from,
  to,
}: GetBillsQuery): Promise<GetBillsResponse | null> {
  try {
    const response = await api.get<GetBillsResponse>(
      `/organizations/${organizationId}/bills`,
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
