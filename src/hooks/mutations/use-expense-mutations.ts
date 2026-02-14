import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddExpense } from "@/api/expenses/add-expense";
import { DeleteExpense } from "@/api/expenses/delete-expense";
import type { CreateExpenseRequest } from "@/api/expenses/add-expense";
import { queryKeys } from "@/lib/query-keys";

interface UseExpenseMutationsOptions {
  organizationId: string | null;
}

function requireOrganizationId(organizationId: string | null): string {
  if (!organizationId) {
    throw new Error("No organization selected.");
  }

  return organizationId;
}

export function useExpenseMutations({
  organizationId,
}: UseExpenseMutationsOptions) {
  const queryClient = useQueryClient();

  const invalidateExpenseQueries = async (orgId: string) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.listByOrganization(orgId),
      }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.recentExpenses(orgId),
      }),
    ]);
  };

  const addExpenseMutation = useMutation({
    mutationFn: async (
      request: Omit<CreateExpenseRequest, "organizationId">
    ) => {
      const orgId = requireOrganizationId(organizationId);

      return AddExpense({
        ...request,
        organizationId: orgId,
      });
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateExpenseQueries(organizationId);
      }
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: async (expenseId: string) => {
      const orgId = requireOrganizationId(organizationId);
      return DeleteExpense(expenseId, orgId);
    },
    onSuccess: async () => {
      if (organizationId) {
        await invalidateExpenseQueries(organizationId);
      }
    },
  });

  return {
    addExpenseAsync: addExpenseMutation.mutateAsync,
    deleteExpenseAsync: deleteExpenseMutation.mutateAsync,
    isAddingExpense: addExpenseMutation.isPending,
    isDeletingExpense: deleteExpenseMutation.isPending,
  };
}
