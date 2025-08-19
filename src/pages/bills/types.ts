export type BillDocument = {
  id: string;
  billId: string;
  fileName: string;
  contentType: string;
  documentType: number;
};

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
  documents?: BillDocument[];
};
