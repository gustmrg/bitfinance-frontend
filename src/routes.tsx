import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { Account } from "./pages/account";
import { Bills } from "./pages/bills";
import { Dashboard } from "./pages/dashboard";
import { Expenses } from "./pages/expenses";
import { Error } from "./pages/error";
import { Home } from "./pages/home";
import { NotFound } from "./pages/404";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { CreateOrganization } from "./pages/organizations";
import { ProtectedRoute } from "./components/protected-route";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "bills",
          element: <Bills />,
        },
        {
          path: "expenses",
          element: <Expenses />,
        },
      ],
    },
    {
      path: "account",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "settings",
          element: <Account />,
        },
      ],
    },
    {
      path: "account/create-organization",
      element: (
        <ProtectedRoute>
          <CreateOrganization />
        </ProtectedRoute>
      ),
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
