import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { CalendarClock, DollarSign, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Bill } from "@/pages/bills/types";

interface UpcomingBillsProps {
  bills: Bill[];
}

export function UpcomingBills({ bills }: UpcomingBillsProps) {
  const { t } = useTranslation();

  return (
    <Card className="w-full col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("dashboard.upcomingBills.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.upcomingBills.description")}
            </CardDescription>
          </div>
          <NavLink to="/dashboard/bills">
            <Button variant="outline" size="sm">
              {t("labels.viewAll")}
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-auto">
          {bills.length > 0 ? (
            bills.map((bill) => {
              return (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        status === "overdue"
                          ? "bg-destructive/10"
                          : status === "due-soon"
                          ? "bg-warning/10"
                          : "bg-muted"
                      }`}
                    >
                      <Receipt
                        className={`h-5 w-5 ${
                          status === "overdue"
                            ? "text-destructive"
                            : status === "due-soon"
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{bill.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarClock className="mr-1 h-3 w-3" />
                        <span>
                          {t("labels.dueIn")} {format(bill.dueDate, "MMM d")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-semibold">
                        ${bill.amountDue.toFixed(2)}
                      </p>
                      <StatusBadge variant="yellow">{bill.status}</StatusBadge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">
                {t("dashboard.upcomingBills.emptyHeader")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.upcomingBills.empty")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
