import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AddExpenseDialog } from "./components/add-expense-dialog";
import { useAuth } from "@/auth/auth-provider";
import { useNavigate } from "react-router-dom";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Expense } from "./types";
import { getExpenses } from "@/api/expenses/get-expenses";
import { AddExpense } from "@/api/expenses/add-expense";
import { dateFormatter } from "@/utils/formatter";
import { DeleteExpense } from "@/api/expenses/delete-expense";
import { useTranslation } from "react-i18next";

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const { user, isAuthenticated, isLoading, selectedOrganization } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDateFilterChange = (newDate: DateRange) => {
    setDateRange(newDate);
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/auth/sign-in");
      return;
    }

    let organizationId = selectedOrganization ? selectedOrganization.id : null;

    const fetchExpenses = async () => {
      if (!organizationId) return;

      try {
        const response = await getExpenses({
          organizationId: organizationId,
          from: dateRange?.from,
          to: dateRange?.to,
        });

        if (!response) {
          console.error("Failed to fetch expenses.");
          setExpenses([]);
          return;
        }

        const expenses: Expense[] = response?.data.map((expense: Expense) => ({
          ...expense,
          status: expense.status.toLowerCase() as
            | "pending"
            | "paid"
            | "cancelled",
        }));

        setExpenses(expenses);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, [
    isAuthenticated,
    navigate,
    isLoading,
    user,
    selectedOrganization,
    dateRange,
  ]);

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

  const handleAddExpense = async (data: any) => {
    try {
      const response = await AddExpense({
        description: data.description,
        category: data.category,
        status: data.status,
        amount: data.amount,
        occurredAt: data.occurredAt.toISOString(),
        createdBy: user!.id,
        organizationId: selectedOrganization!.id,
      });

      if (response) {
        const newExpense: Expense = {
          id: response.id,
          description: response.description,
          category: response.category,
          amount: response.amount,
          status: response.status.toLowerCase() as
            | "pending"
            | "paid"
            | "cancelled",
          occurredAt: response.occurredAt,
          createdBy: response.createdBy,
          createdAt: response.createdAt,
        };

        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      }
    } catch (error) {
      console.error("Failed to add the expense:", error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await DeleteExpense(id, selectedOrganization!.id);

      if (response?.status == 204) {
        const updatedExpenses = expenses.filter((item) => item.id !== id);
        setExpenses(updatedExpenses);
      }
    } catch (error) {
      console.error("Failed to delete the expense:", error);
    }
  };

  return (
    <div className="grow m-6 p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm dark:lg:bg-zinc-900">
      <div className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
            {t("expenses.title")}
          </h1>
          <p className="text-sm font-regular text-zinc-500">
            {t("expenses.subtitle")}
          </p>
          <div className="mt-2">
            <CalendarDateRangePicker
              startDate={dateRange?.from}
              endDate={dateRange?.to}
              onDateChange={handleDateFilterChange}
            />
          </div>
        </div>
        <AddExpenseDialog onAddExpense={handleAddExpense} />
      </div>
      <div className="flow-root">
        <div className="mt-8 overflow-x-auto whitespace-nowrap">
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
                  {t("labels.amount")}
                </TableHead>
                <TableHead className="font-semibold">
                  {t("labels.createdBy")}
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
                    <TableCell>$ {expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{expense.createdBy}</TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(expense.status)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="h-8 w-8 p-0"
                        onClick={() => {}}
                      >
                        <span className="sr-only">{t("labels.edit")}</span>
                        <Pencil className="h-4 w-4 text-gray-950" />
                      </Button>
                      <Button
                        variant="link"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <span className="sr-only">{t("labels.delete")}</span>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
