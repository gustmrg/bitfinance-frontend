import { privateAPI } from "@/lib/axios";

const api = privateAPI();

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

export async function getBills(organizationId: string): Promise<Bill[] | null> {
  try {
    const response = await api.get(`/bills/organizations/${organizationId}`);
    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
    return null;
  }
}
