import type { ExpenseCategory, ExpenseStatus } from "@/api/expenses";

export type Expense = {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
};
