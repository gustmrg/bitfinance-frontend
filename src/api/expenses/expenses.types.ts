export type ExpenseCategory =
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

export type ExpenseStatus = "pending" | "paid" | "cancelled";

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ExpensesListQuery {
  organizationId: string;
  from?: Date;
  to?: Date;
}

export interface ExpensesListResponse {
  data: Expense[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export interface CreateExpenseRequest {
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
  organizationId: string;
}

export interface CreateExpenseResponse {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
  createdAt: string;
}

export interface UpdateExpenseRequest {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
  organizationId: string;
}

export interface UpdateExpenseResponse {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  status: ExpenseStatus;
  occurredAt: string;
  createdBy: string;
}
