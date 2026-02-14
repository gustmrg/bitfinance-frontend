import { useQuery } from "@tanstack/react-query";

import type { ExpenseResponseModel } from "@/api/expenses/get-expenses";
import { getExpenses } from "@/api/expenses/get-expenses";
import { queryKeys } from "@/lib/query-keys";
import type { Expense } from "@/pages/expenses/types";

export interface ExpensesQueryFilters {
  from?: Date;
  to?: Date;
}

function normalizeExpenseStatus(status: string): Expense["status"] {
  return status.toLowerCase() as Expense["status"];
}

function mapExpenseResponse(expense: ExpenseResponseModel): Expense {
  return {
    ...expense,
    status: normalizeExpenseStatus(expense.status),
  };
}

export function useExpensesQuery(
  organizationId: string | null,
  filters: ExpensesQueryFilters
) {
  return useQuery({
    queryKey: queryKeys.expenses.list(
      organizationId ?? "",
      filters.from,
      filters.to
    ),
    enabled: Boolean(organizationId),
    queryFn: async (): Promise<Expense[]> => {
      if (!organizationId) {
        return [];
      }

      const response = await getExpenses({
        organizationId,
        from: filters.from,
        to: filters.to,
      });

      return response.data.map(mapExpenseResponse);
    },
  });
}
