import { useState } from "react";
import {
  CalendarClock,
  ChevronRight,
  CreditCard,
  DollarSign,
  MoreHorizontal,
} from "lucide-react";
import { format, isBefore, addDays } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { NavLink } from "react-router-dom";

// Sample data for upcoming bills
const initialBills = [
  {
    id: "1",
    name: "Electricity Bill",
    amount: 89.99,
    dueDate: addDays(new Date(), 2),
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "2",
    name: "Internet Service",
    amount: 59.99,
    dueDate: addDays(new Date(), 5),
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "3",
    name: "Rent Payment",
    amount: 1200.0,
    dueDate: addDays(new Date(), 7),
    category: "Housing",
    isPaid: false,
  },
  {
    id: "4",
    name: "Phone Bill",
    amount: 45.0,
    dueDate: addDays(new Date(), 10),
    category: "Utilities",
    isPaid: false,
  },
  {
    id: "5",
    name: "Streaming Services",
    amount: 19.99,
    dueDate: addDays(new Date(), 14),
    category: "Entertainment",
    isPaid: false,
  },
];

export function UpcomingBills() {
  const [bills, setBills] = useState(initialBills);

  // Calculate total amount due
  const totalDue = bills
    .filter((bill) => !bill.isPaid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Mark a bill as paid
  const markAsPaid = (id: string) => {
    setBills(
      bills.map((bill) => (bill.id === id ? { ...bill, isPaid: true } : bill))
    );
  };

  // Get status based on due date
  const getStatus = (dueDate: Date) => {
    const today = new Date();
    if (isBefore(dueDate, today)) {
      return "overdue";
    } else if (isBefore(dueDate, addDays(today, 3))) {
      return "due-soon";
    } else {
      return "upcoming";
    }
  };

  // Filter out paid bills
  const unpaidBills = bills.filter((bill) => !bill.isPaid);

  return (
    <Card className="w-full col-span-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Manage your upcoming payments</CardDescription>
          </div>
          <NavLink to="/dashboard/bills">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unpaidBills.length > 0 ? (
            unpaidBills.map((bill) => {
              const status = getStatus(bill.dueDate);

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
                      <CreditCard
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
                      <p className="font-medium">{bill.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarClock className="mr-1 h-3 w-3" />
                        <span>Due {format(bill.dueDate, "MMM d")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-medium">${bill.amount.toFixed(2)}</p>
                      <Badge
                        variant={
                          status === "overdue"
                            ? "destructive"
                            : status === "due-soon"
                            ? "outline"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {status === "overdue"
                          ? "Overdue"
                          : status === "due-soon"
                          ? "Due Soon"
                          : "Upcoming"}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">No Upcoming Bills</h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up on payments!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
