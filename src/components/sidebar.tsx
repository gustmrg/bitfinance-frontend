import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faHouse,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center mb-4 lg:h-[60px]">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <img
              src={`/assets/logo.png`}
              alt="BitFinance Logo"
              width="72"
              height="64"
            />
          </NavLink>
        </div>
        <nav className="flex flex-col items-start px-2 text-sm font-medium lg:px-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faHouse} />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/bills"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faBarcode} />
            Bills
          </NavLink>
          <NavLink
            to="/dashboard/expenses"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faReceipt} />
            Expenses
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
