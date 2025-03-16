import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { AddBill } from "./pages/bills/add";
import { Account } from "./pages/account";
import { Bills } from "./pages/bills";
import { Dashboard } from "./pages/dashboard";
import { Expenses } from "./pages/expenses";
import { Error } from "./pages/error";
import { Home } from "./pages/home";
import { NotFound } from "./pages/404";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "bills",
          children: [
            {
              path: "",
              element: <Bills />,
            },
            {
              path: "add",
              element: <AddBill />,
            },
          ],
        },
        {
          path: "expenses",
          element: <Expenses />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    basename: "/bitfinance",
  }
);
