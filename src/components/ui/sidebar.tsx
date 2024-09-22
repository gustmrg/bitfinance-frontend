"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./button";
import { Barcode, Home } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

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
