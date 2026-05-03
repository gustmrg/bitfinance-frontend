import { Suspense, lazy, type ReactNode, useState } from "react";

import { Eye, PencilLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/formatter";

import { DeleteExpenseDialog } from "./delete-expense-dialog";
import type { Expense } from "../types";

const EditExpenseDialog = lazy(() => import("./edit-expense-dialog"));

interface EditExpenseFormValue {
  id: string;
  description: string;
  category: string;
  amount: number;
  occurredAt: Date;
  status: string;
}

function LazyEditExpenseAction({
  expense,
  onEditExpense,
}: {
  expense: Expense;
  onEditExpense: (data: EditExpenseFormValue) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);

  if (!enabled) {
    return (
      <Button variant="outline" onClick={() => setEnabled(true)}>
        <PencilLine className="h-4 w-4" />
        {t("labels.edit")}
      </Button>
    );
  }

  return (
    <Suspense
      fallback={
        <Button disabled variant="outline">
          <PencilLine className="h-4 w-4" />
          {t("labels.edit")}
        </Button>
      }
    >
      <EditExpenseDialog
        defaultOpen
        expense={expense}
        onEdit={onEditExpense}
        trigger={<Button variant="outline">{t("labels.edit")}</Button>}
      />
    </Suspense>
  );
}

export interface ExpensesTableProps {
  expenses: Expense[];
  totalAmount: string;
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteExpense: (id: string) => Promise<void>;
  onEditExpense: (data: EditExpenseFormValue) => Promise<void>;
}

export function ExpensesTable({
  expenses,
  totalAmount,
  renderStatusBadge,
  onDeleteExpense,
  onEditExpense,
}: ExpensesTableProps) {
  const { t } = useTranslation();

  return (
    <Table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
      <TableHeader className="font-sans text-zinc-500 dark:text-zinc-400">
        <TableRow>
          <TableHead className="font-semibold">{t("labels.description")}</TableHead>
          <TableHead className="font-semibold">{t("labels.category")}</TableHead>
          <TableHead className="font-semibold">{t("labels.date")}</TableHead>
          <TableHead className="font-semibold">{t("labels.createdBy")}</TableHead>
          <TableHead className="font-semibold">{t("labels.amount")}</TableHead>
          <TableHead className="font-semibold text-center">{t("labels.status")}</TableHead>
          <TableHead className="font-semibold text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-sans">
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell className="font-semibold">{expense.description}</TableCell>
            <TableCell className="capitalize dark:text-zinc-500">{expense.category}</TableCell>
            <TableCell className="dark:text-zinc-500">
              {dateFormatter.format(new Date(expense.occurredAt))}
            </TableCell>
            <TableCell className="max-w-48 truncate">{expense.createdBy}</TableCell>
            <TableCell>$ {expense.amount.toFixed(2)}</TableCell>
            <TableCell className="text-center">{renderStatusBadge(expense.status)}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <Button asChild size="icon" variant="outline">
                  <Link to={`/dashboard/expenses/${expense.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{t("labels.details")}</span>
                  </Link>
                </Button>
                <LazyEditExpenseAction expense={expense} onEditExpense={onEditExpense} />
                <DeleteExpenseDialog
                  id={expense.id}
                  onDelete={onDeleteExpense}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-semibold">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell colSpan={1}>${totalAmount}</TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
