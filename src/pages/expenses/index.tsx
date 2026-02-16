import { useState } from "react";

import { ReceiptText } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

import type { ExpenseCategory, ExpenseStatus } from "@/api/expenses";
import {
  useCurrentUser,
  useSelectedOrganization,
} from "@/auth/auth-provider";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { StatusBadge } from "@/components/ui/status-badge";
import { useExpenseMutations } from "@/hooks/mutations/use-expense-mutations";
import { useExpensesQuery } from "@/hooks/queries/use-expenses-query";

import { AddExpenseDialog } from "./components/add-expense-dialog";
import { ExpensesMobileList } from "./components/expenses-mobile-list";
import { ExpensesTable } from "./components/expenses-table";

interface AddExpenseFormValues {
  description: string;
  category: string;
  amount: number;
  status: string;
  occurredAt: Date;
}

export function Expenses() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const selectedOrganization = useSelectedOrganization();
  const currentUserQuery = useCurrentUser();
  const user = currentUserQuery.data ?? null;
  const { t } = useTranslation();

  const expensesQuery = useExpensesQuery(selectedOrganization?.id ?? null, {
    from: dateRange?.from,
    to: dateRange?.to,
  });
  const { addExpenseAsync, deleteExpenseAsync } = useExpenseMutations({
    organizationId: selectedOrganization?.id ?? null,
  });

  const expenses = expensesQuery.data ?? [];

  const handleDateFilterChange = (newDate: DateRange) => {
    setDateRange(newDate);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <StatusBadge variant="yellow">{t("labels.pending")}</StatusBadge>;
      case "paid":
        return <StatusBadge variant="green">{t("labels.paid")}</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="red">{t("labels.cancelled")}</StatusBadge>;
      default:
        return <StatusBadge variant="indigo">{t("labels.created")}</StatusBadge>;
    }
  };

  const getTotalAmount = () => {
    return expenses
      .reduce((total, expense) => total + expense.amount, 0)
      .toFixed(2);
  };

  const handleAddExpense = async (data: AddExpenseFormValues) => {
    if (!user) {
      return;
    }

    try {
      await addExpenseAsync({
        description: data.description,
        category: data.category as ExpenseCategory,
        status: data.status as ExpenseStatus,
        amount: data.amount,
        occurredAt: data.occurredAt.toISOString(),
        createdBy: user.id,
      });
    } catch (error) {
      console.error("Failed to add the expense:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await deleteExpenseAsync(id);
    } catch (error) {
      console.error("Failed to delete the expense:", error);
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={t("expenses.title")}
        description={t("expenses.subtitle")}
        actions={
          <>
            <AddExpenseDialog onAddExpense={handleAddExpense} />
            <CalendarDateRangePicker
              startDate={dateRange?.from}
              endDate={dateRange?.to}
              onDateChange={handleDateFilterChange}
            />
          </>
        }
      />

      {expensesQuery.isPending ? (
        <div className="rounded-lg border p-10 text-center">
          <h3 className="text-lg font-semibold">{t("expenses.loading")}</h3>
        </div>
      ) : expenses.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-2 text-lg font-semibold">{t("expenses.emptyTitle")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("expenses.emptyDescription")}
          </p>
        </div>
      ) : (
        <>
          <div className="md:hidden">
            <ExpensesMobileList
              expenses={expenses}
              renderStatusBadge={renderStatusBadge}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-0">
                <ExpensesTable
                  expenses={expenses}
                  totalAmount={getTotalAmount()}
                  renderStatusBadge={renderStatusBadge}
                  onDeleteExpense={handleDeleteExpense}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </PageContainer>
  );
}
