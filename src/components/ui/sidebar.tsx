"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";
import { Barcode, Home, Package2, Receipt, Users } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  const show = true;

  if (show) {
    return (
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/bills"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Barcode className="h-4 w-4" />
                Bills
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Receipt className="h-4 w-4" />
                Expenses{" "}
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 block md:block`}
    >
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className={`link w-full justify-start bg-accent text-accent-foreground ${
              pathname === "/dashboard" ? "bg-zinc-100 text-zinc-900" : ""
            }`}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/bills">
          <Button
            variant="ghost"
            className={`link w-full justify-start ${
              pathname === "/bills" ? "bg-zinc-100 text-zinc-900" : ""
            }`}
          >
            <Barcode className="mr-2 h-4 w-4" />
            Bills
          </Button>
        </Link>
        {/* <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start ${matchPath({ path: "/expenses", end: true }, location.pathname) ? "bg-accent text-accent-foreground" : ""}`}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Expenses
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="ghost"
            className={`w-full justify-start ${matchPath({ path: "/settings", end: true }, location.pathname) ? "bg-accent text-accent-foreground" : ""}`}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link> */}
      </nav>
    </aside>
  );
}
