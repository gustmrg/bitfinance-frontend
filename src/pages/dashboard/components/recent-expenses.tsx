import type React from "react";

import {
  Briefcase,
  Car,
  CreditCard,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Home,
  PieChart,
  PiggyBank,
  ShieldPlus,
  ShoppingBag,
  Smartphone,
  Ticket,
  Utensils,
} from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { ExpenseResponseModel } from "@/api/dashboard/get-recent-expenses";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

const categoryIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="h-4 w-4" />,
  clothing: <ShoppingBag className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
  transportation: <Car className="h-4 w-4" />,
  entertainment: <Ticket className="h-4 w-4" />,
  utilities: <Smartphone className="h-4 w-4" />,
  income: <Briefcase className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  personal: <CreditCard className="h-4 w-4" />,
  insurance: <ShieldPlus className="h-4 w-4" />,
  healthcare: <HeartPulse className="h-4 w-4" />,
  savings: <PiggyBank className="h-4 w-4" />,
  debt: <HandCoins className="h-4 w-4" />,
  miscellaneous: <CreditCard className="h-4 w-4" />,
};

const categoryColors: Record<string, string> = {
  food: "bg-orange-100 text-orange-600",
  education: "bg-orange-100 text-orange-600",
  personal: "bg-blue-100 text-blue-600",
  clothing: "bg-blue-100 text-blue-600",
  insurance: "bg-blue-100 text-blue-600",
  housing: "bg-green-100 text-green-600",
  healthcare: "bg-green-100 text-green-600",
  savings: "bg-green-100 text-green-600",
  transportation: "bg-purple-100 text-purple-600",
  entertainment: "bg-pink-100 text-pink-600",
  debt: "bg-pink-100 text-pink-600",
  utilities: "bg-yellow-100 text-yellow-600",
  income: "bg-emerald-100 text-emerald-600",
  miscellaneous: "bg-gray-100 text-gray-600",
};

const categoryBadgeVariant: Record<
  string,
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "orange"
> = {
  food: "orange",
  clothing: "blue",
  housing: "green",
  transportation: "purple",
  entertainment: "pink",
  utilities: "yellow",
  income: "green",
  insurance: "indigo",
  healthcare: "green",
  savings: "green",
  education: "yellow",
};

interface RecentExpensesProps {
  expenses: ExpenseResponseModel[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const { t } = useTranslation();

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Card className="w-full xl:col-span-3">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t("dashboard.recentExpenses.title")}</CardTitle>
            <CardDescription>{t("dashboard.recentExpenses.description")}</CardDescription>
          </div>
          <NavLink to="/dashboard/expenses">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              {t("labels.viewAll")}
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-medium">{t("dashboard.recentExpenses.subtitle")}</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {topCategories.map(([category, amount]) => (
              <div
                key={category}
                className="flex flex-col items-center rounded-lg border p-2"
              >
                <div
                  className={`rounded-full p-2 ${
                    categoryColors[category]?.split(" ")[0] || "bg-gray-100"
                  }`}
                >
                  {categoryIcons[category] || <CreditCard className="h-4 w-4" />}
                </div>
                <p className="mt-1 text-xs font-medium capitalize">{category}</p>
                <p className="text-sm font-bold">${amount.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-h-[350px] space-y-3 overflow-auto pr-1">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      categoryColors[expense.category]?.split(" ")[0] || "bg-gray-100"
                    }`}
                  >
                    {categoryIcons[expense.category] || <CreditCard className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{expense.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{format(new Date(expense.date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 sm:block sm:text-right">
                  <p className="font-medium">-${expense.amount.toFixed(2)}</p>
                  <StatusBadge variant={categoryBadgeVariant[expense.category] || "gray"}>
                    {expense.category}
                  </StatusBadge>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center">
              <PieChart className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">
                {t("dashboard.recentExpenses.emptyHeader")}
              </h3>
              <p className="text-sm text-muted-foreground">{t("dashboard.recentExpenses.empty")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
