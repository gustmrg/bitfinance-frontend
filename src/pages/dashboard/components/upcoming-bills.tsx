import { format } from "date-fns";
import { CalendarClock, DollarSign, Receipt } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { Bill } from "@/pages/bills/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

interface UpcomingBillsProps {
  bills: Bill[];
}

export function UpcomingBills({ bills }: UpcomingBillsProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full xl:col-span-4">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("dashboard.upcomingBills.title")}</CardTitle>
            <CardDescription>{t("dashboard.upcomingBills.description")}</CardDescription>
          </div>
          <NavLink to="/dashboard/bills">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              {t("labels.viewAll")}
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-[500px] space-y-3 overflow-auto">
          {bills.length > 0 ? (
            bills.map((bill) => {
              const isOverdue = bill.status === "overdue";
              const isDueSoon = bill.status === "due";

              return (
                <div
                  key={bill.id}
                  className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        isOverdue
                          ? "bg-destructive/10"
                          : isDueSoon
                            ? "bg-warning/10"
                            : "bg-muted"
                      }`}
                    >
                      <Receipt
                        className={`h-5 w-5 ${
                          isOverdue
                            ? "text-destructive"
                            : isDueSoon
                              ? "text-warning"
                              : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{bill.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarClock className="mr-1 h-3 w-3" />
                        <span>
                          {t("labels.dueIn")} {format(new Date(bill.dueDate), "MMM d")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 sm:block sm:text-right">
                    <p className="font-semibold">${bill.amountDue.toFixed(2)}</p>
                    <StatusBadge variant="yellow">{bill.status}</StatusBadge>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-6 text-center">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">
                {t("dashboard.upcomingBills.emptyHeader")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("dashboard.upcomingBills.empty")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
