import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./pages/_layouts/dashboard-layout";
import { AuthLayout } from "./pages/_layouts/auth-layout";
import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { NotFound } from "./pages/404";
import { Bills } from "./pages/bills";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { Dashboard } from "./pages/dashboard";
import { Expenses } from "./pages/expenses";
import { NewDashboardLayout } from "./layouts/DashboardLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/new-dashboard",
      element: <NewDashboardLayout />,
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
          element: <Bills />,
        },
        {
          path: "expenses",
          element: <Expenses />,
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
