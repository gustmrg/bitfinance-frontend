import { type ReactNode } from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { dateFormatter } from "@/utils/formatter";

import type { Bill } from "../types";

export interface BillsMobileListProps {
  bills: Bill[];
  renderStatusBadge: (status: string) => ReactNode;
}

export function BillsMobileList({ bills, renderStatusBadge }: BillsMobileListProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {bills.map((bill) => (
        <Link
          key={bill.id}
          to={`/dashboard/bills/${bill.id}`}
          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Card className="cursor-pointer transition-colors hover:bg-muted/20">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold leading-5">{bill.description}</p>
                  <p className="mt-1 text-sm capitalize text-muted-foreground">
                    {bill.category}
                  </p>
                </div>
                {renderStatusBadge(bill.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t("labels.dueDate")}
                  </p>
                  <p className="font-medium">{dateFormatter.format(new Date(bill.dueDate))}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t("labels.amount")}
                  </p>
                  <p className="font-medium">${bill.amountDue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
