import type { BillCategory, BillStatus } from "@/api/bills";

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
  category: BillCategory;
  status: BillStatus;
  amountDue: number;
  amountPaid?: number | null;
  createdDate: string;
  dueDate: string;
  paymentDate?: string | null;
  deletedDate?: string | null;
  notes?: string;
  documents?: BillDocument[];
};
