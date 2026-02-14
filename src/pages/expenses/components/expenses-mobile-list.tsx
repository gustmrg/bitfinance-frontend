import { type ReactNode } from "react";

import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { dateFormatter } from "@/utils/formatter";

import { DeleteExpenseDialog } from "./delete-expense-dialog";
import type { Expense } from "../types";

export interface ExpensesMobileListProps {
  expenses: Expense[];
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteExpense: (id: string) => Promise<void>;
}

export function ExpensesMobileList({
  expenses,
  renderStatusBadge,
  onDeleteExpense,
}: ExpensesMobileListProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Card key={expense.id}>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold leading-5">{expense.description}</p>
                <p className="mt-1 text-sm capitalize text-muted-foreground">{expense.category}</p>
              </div>
              {renderStatusBadge(expense.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("labels.date")}
                </p>
                <p className="font-medium">
                  {dateFormatter.format(new Date(expense.occurredAt))}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("labels.amount")}
                </p>
                <p className="font-medium">$ {expense.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("labels.createdBy")}
                </p>
                <p className="truncate text-sm font-medium">{expense.createdBy}</p>
              </div>
              <DeleteExpenseDialog
                id={expense.id}
                onDelete={onDeleteExpense}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
