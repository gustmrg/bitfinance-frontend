"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faHouse,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import UserNav from "./user-nav";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center mb-4 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={`/assets/logo.png`}
              alt="BitFinance Logo"
              width="72"
              height="64"
            />
          </Link>
        </div>
        <nav className="flex flex-col items-start px-2 text-sm font-medium lg:px-4 space-y-2">
          <Link
            href="/dashboard"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              pathname === "/dashboard" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/bills"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              pathname === "/dashboard/bills" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBarcode} />
            Bills
          </Link>
          <Link
            href="/dashboard"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              pathname === "/dashboard/expenses" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faReceipt} />
            Expenses
          </Link>
        </nav>
      </div>
    </aside>
  );
}
