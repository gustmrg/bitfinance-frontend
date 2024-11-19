import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faHouse,
  faReceipt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function BottomBar() {
  return (
    <div className="flex flex-row sticky py-2 w-full bottom-0 justify-around bg-blue-900 lg:hidden">
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-sm ${
            isActive ? "text-white" : "text-blue-400"
          }`
        }
      >
        <FontAwesomeIcon icon={faHouse} />
        Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/bills"
        className={({ isActive }) =>
          `flex flex-col items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-sm ${
            isActive ? "text-white" : "text-blue-400"
          }`
        }
      >
        <FontAwesomeIcon icon={faBarcode} />
        Bills
      </NavLink>
      <NavLink
        to="/dashboard/expenses"
        className={({ isActive }) =>
          `flex flex-col items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-sm ${
            isActive ? "text-white" : "text-blue-400"
          }`
        }
      >
        <FontAwesomeIcon icon={faReceipt} />
        Expenses
      </NavLink>
      <NavLink
        to="/dashboard/expenses"
        className={({ isActive }) =>
          `flex flex-col items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-sm ${
            isActive ? "text-white" : "text-blue-400"
          }`
        }
      >
        <FontAwesomeIcon icon={faUserAlt} />
        Account
      </NavLink>
    </div>
  );
}
