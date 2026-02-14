import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReceiptText } from "lucide-react";
import { useState } from "react";
import { AddExpenseDialog } from "./components/add-expense-dialog";
import { useAuth } from "@/auth/auth-provider";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { dateFormatter } from "@/utils/formatter";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteExpenseDialog } from "./components/delete-expense-dialog";
import { useExpenseMutations } from "@/hooks/mutations/use-expense-mutations";
import { useExpensesQuery } from "@/hooks/queries/use-expenses-query";
import { Expense } from "./types";

export function Expenses() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const { user, selectedOrganization } = useAuth();
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <StatusBadge variant="yellow">{t("labels.pending")}</StatusBadge>
        );
      case "paid":
        return <StatusBadge variant="green">{t("labels.paid")}</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="red">{t("labels.cancelled")}</StatusBadge>;
      default:
        return (
          <StatusBadge variant="indigo">{t("labels.created")}</StatusBadge>
        );
    }
  };

  const getTotalAmount = () => {
    return expenses
      .reduce((total, expense) => total + expense.amount, 0)
      .toFixed(2);
  };

  const handleAddExpense = async (data: any) => {
    if (!user) {
      return;
    }

    try {
      await addExpenseAsync({
        description: data.description,
        category: data.category,
        status: data.status,
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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <AddExpenseDialog onAddExpense={handleAddExpense} />
          <CalendarDateRangePicker
            startDate={dateRange?.from}
            endDate={dateRange?.to}
            onDateChange={handleDateFilterChange}
          />
        </div>
      </div>

      <Card className="w-full col-span-8">
        <CardContent className="p-0">
          <Table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
            <TableHeader className="font-sans text-zinc-500 dark:text-zinc-400">
              <TableRow>
                <TableHead className="font-semibold">
                  {t("labels.description")}
                </TableHead>
                <TableHead className="font-semibold">
                  {t("labels.category")}
                </TableHead>
                <TableHead className="font-semibold">
                  {t("labels.date")}
                </TableHead>
                <TableHead className="font-semibold">
                  {t("labels.createdBy")}
                </TableHead>
                <TableHead className="font-semibold">
                  {t("labels.amount")}
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-sans">
              {expenses &&
                expenses.map((expense: Expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-semibold">
                      {expense.description}
                    </TableCell>
                    <TableCell className="capitalize dark:text-zinc-500">
                      {expense.category}
                    </TableCell>
                    <TableCell className="dark:text-zinc-500">
                      {dateFormatter.format(new Date(expense.occurredAt))}
                    </TableCell>
                    <TableCell>{expense.createdBy}</TableCell>
                    <TableCell>$ {expense.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(expense.status)}
                    </TableCell>
                    <TableCell>
                      <DeleteExpenseDialog
                        id={expense.id}
                        onDelete={handleDeleteExpense}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            {expenses.length > 0 && (
              <TableFooter className="hidden md:table-footer-group">
                <TableRow className="font-semibold">
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell colSpan={1}>${getTotalAmount()}</TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
          {expensesQuery.isPending ? (
            <div className="text-center py-6">
              <h3 className="mt-2 text-lg font-semibold">Loading expenses...</h3>
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-6">
              <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">No Expenses</h3>
              <p className="text-sm text-muted-foreground">
                You haven&apos;t added any expenses. Start tracking your
                expenses by adding one now!
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
