export type Bill = {
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
