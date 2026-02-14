import { type ReactNode } from "react";

import { useTranslation } from "react-i18next";

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

export interface ExpensesTableProps {
  expenses: Expense[];
  totalAmount: string;
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteExpense: (id: string) => Promise<void>;
}

export function ExpensesTable({
  expenses,
  totalAmount,
  renderStatusBadge,
  onDeleteExpense,
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
              <DeleteExpenseDialog
                id={expense.id}
                onDelete={onDeleteExpense}
              />
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
