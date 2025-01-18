import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface GetBillsQuery {
  organizationId: string;
  page: number;
  pageSize: number;
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
    | "miscellaneous";
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
  page = 1,
  pageSize = 10,
}: GetBillsQuery): Promise<GetBillsResponse | null> {
  try {
    const response = await api.get<GetBillsResponse>(
      `/organizations/${organizationId}/bills`,
      {
        params: {
          page,
          pageSize,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
    return null;
  }
}
