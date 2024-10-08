"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BanknotesIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Home, CreditCardIcon, UsersIcon } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
      <div className="flex h-full min-h-0 flex-col gap-2">
        <div className="lg:px-4 px-2 my-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="sr-only">BitFinance</span>
            <img
              alt="BitFinance App Logo"
              src="/assets/logo.png"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid px-2 text-sm font-medium lg:px-4">
            <div className="self-start space-y-2">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary font-semibold ${
                  pathname === "/dashboard"
                    ? "bg-white text-blue-800 dark:bg-zinc-900 dark:text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-white hover:text-blue-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-black">Dashboard</span>
              </Link>
              <Link
                href="/dashboard/bills"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary font-semibold ${
                  pathname === "/dashboard/bills"
                    ? "bg-white text-blue-800 dark:bg-zinc-900 dark:text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-white hover:text-blue-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <BanknotesIcon className="h-6 w-6" />
                <span className="text-black">Bills</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary font-semibold ${
                  pathname === "/dashboard/expenses"
                    ? "bg-white text-blue-800 dark:bg-zinc-900 dark:text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-white hover:text-blue-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <CreditCardIcon className="h-6 w-6" />
                <span className="text-black">Expenses</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary font-semibold ${
                  pathname === "/users"
                    ? "bg-white text-blue-800 dark:bg-zinc-900 dark:text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-white hover:text-blue-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <UsersIcon className="h-6 w-6" />
                <span className="text-black">Users</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary font-semibold ${
                  pathname === "/settings"
                    ? "bg-white text-blue-800 dark:bg-zinc-900 dark:text-white"
                    : "text-gray-800 dark:text-gray-300 hover:bg-white hover:text-blue-800 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <Cog6ToothIcon className="h-6 w-6" />
                <span className="text-black">Settings</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
