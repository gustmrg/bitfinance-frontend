"use client";

import type React from "react";

import { useState } from "react";
import {
  Coffee,
  CreditCard,
  Home,
  MoreHorizontal,
  ShoppingBag,
  Utensils,
  Car,
  Smartphone,
  Briefcase,
  PieChart,
} from "lucide-react";
import { format, subDays } from "date-fns";

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
import { NavLink } from "react-router-dom";

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Food & Dining": <Utensils className="h-4 w-4" />,
  Shopping: <ShoppingBag className="h-4 w-4" />,
  Housing: <Home className="h-4 w-4" />,
  Transportation: <Car className="h-4 w-4" />,
  Entertainment: <Coffee className="h-4 w-4" />,
  Utilities: <Smartphone className="h-4 w-4" />,
  Income: <Briefcase className="h-4 w-4" />,
  Other: <CreditCard className="h-4 w-4" />,
};

// Category colors mapping
const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-orange-100 text-orange-600",
  Shopping: "bg-blue-100 text-blue-600",
  Housing: "bg-green-100 text-green-600",
  Transportation: "bg-purple-100 text-purple-600",
  Entertainment: "bg-pink-100 text-pink-600",
  Utilities: "bg-yellow-100 text-yellow-600",
  Income: "bg-emerald-100 text-emerald-600",
  Other: "bg-gray-100 text-gray-600",
};

// Sample data for recent expenses
const initialExpenses = [
  {
    id: "1",
    name: "Grocery Store",
    amount: 78.52,
    date: subDays(new Date(), 1),
    category: "Food & Dining",
    type: "expense",
  },
  {
    id: "2",
    name: "Monthly Salary",
    amount: 3200.0,
    date: subDays(new Date(), 2),
    category: "Income",
    type: "income",
  },
  {
    id: "3",
    name: "Coffee Shop",
    amount: 4.75,
    date: subDays(new Date(), 2),
    category: "Food & Dining",
    type: "expense",
  },
  {
    id: "4",
    name: "Gas Station",
    amount: 45.8,
    date: subDays(new Date(), 3),
    category: "Transportation",
    type: "expense",
  },
  {
    id: "5",
    name: "Online Shopping",
    amount: 125.3,
    date: subDays(new Date(), 4),
    category: "Shopping",
    type: "expense",
  },
  {
    id: "6",
    name: "Movie Tickets",
    amount: 24.0,
    date: subDays(new Date(), 5),
    category: "Entertainment",
    type: "expense",
  },
  {
    id: "7",
    name: "Phone Bill",
    amount: 65.0,
    date: subDays(new Date(), 6),
    category: "Utilities",
    type: "expense",
  },
];

export function RecentExpenses() {
  const [expenses, setExpenses] = useState(initialExpenses);

  // Calculate totals
  const totalIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpenses = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Group expenses by category for summary
  const expensesByCategory = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

  // Get top spending categories
  const topCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <Card className="w-full col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your recent expenses</CardDescription>
          </div>
          <NavLink to="/dashboard/expenses">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Top Spending Categories</h3>
          <div className="grid grid-cols-3 gap-2">
            {topCategories.map(([category, amount]) => (
              <div
                key={category}
                className="flex flex-col items-center p-2 rounded-lg border"
              >
                <div
                  className={`p-2 rounded-full ${
                    categoryColors[category].split(" ")[0]
                  }`}
                >
                  {categoryIcons[category]}
                </div>
                <p className="text-xs font-medium mt-1">{category}</p>
                <p className="text-sm font-bold">${amount.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 max-h-[350px] overflow-auto pr-1">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      categoryColors[expense.category]?.split(" ")[0] ||
                      "bg-gray-100"
                    }`}
                  >
                    {categoryIcons[expense.category] || (
                      <CreditCard className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{expense.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{format(expense.date, "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        expense.type === "income" ? "text-emerald-600" : ""
                      }`}
                    >
                      {expense.type === "income" ? "+" : "-"}$
                      {expense.amount.toFixed(2)}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        categoryColors[expense.category]?.split(" ")[1] ||
                        "text-gray-600"
                      }`}
                    >
                      {expense.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <PieChart className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">No Transactions</h3>
              <p className="text-sm text-muted-foreground">
                No transactions found for this period
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
