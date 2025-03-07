export type Expense = {
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
