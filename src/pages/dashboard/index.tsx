import { useEffect, useState } from "react";
import { useAuth } from "@/auth/auth-provider";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentExpenses } from "./components/recent-expenses";
import { UpcomingBills } from "./components/upcoming-bills";
import { getUpcomingBills } from "@/api/dashboard/get-upcoming-bills";
import { Bill } from "../bills/types";
import { useNavigate } from "react-router-dom";
import {
  ExpenseResponseModel,
  getRecentExpenses,
} from "@/api/dashboard/get-recent-expenses";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export function Dashboard() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [expenses, setExpenses] = useState<ExpenseResponseModel[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });
  const { isAuthenticated, isLoading, selectedOrganization } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/auth/sign-in");
      return;
    }

    let organizationId = selectedOrganization ? selectedOrganization.id : null;

    const fetchUpcomingBills = async () => {
      if (organizationId) {
        const response = await getUpcomingBills(organizationId);
        if (response) {
          setBills(response.data.reverse());
        }
      }
    };

    const fetchRecentExpenses = async () => {
      if (organizationId) {
        const response = await getRecentExpenses(organizationId);
        if (response) {
          const expenses: ExpenseResponseModel[] = response?.data.map(
            (expense: ExpenseResponseModel) => ({
              ...expense,
              category: expense.category.toLowerCase() as
                | "housing"
                | "transportation"
                | "food"
                | "utilities"
                | "clothing"
                | "healthcare"
                | "insurance"
                | "personal"
                | "debt"
                | "savings"
                | "education"
                | "entertainment"
                | "miscellaneous",
            })
          );

          setExpenses(expenses);
        }
      }
    };

    fetchUpcomingBills();
    fetchRecentExpenses();
  }, [selectedOrganization]);

  const handleDateFilterChange = (newDate: DateRange) => {
    setDateRange(newDate);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <CalendarDateRangePicker
            startDate={dateRange?.from}
            endDate={dateRange?.to}
            onDateChange={handleDateFilterChange}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UpcomingBills bills={bills} />
        <RecentExpenses expenses={expenses} />
      </div>
    </div>
  );
}
