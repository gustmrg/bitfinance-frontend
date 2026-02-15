import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCreditCard,
  faEllipsis,
  faFileInvoiceDollar,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import {
  CreditCard,
  LayoutGrid,
  MoreHorizontal,
  ReceiptText,
  Settings,
} from "lucide-react";

type AppNavSurface = "desktop-sidebar" | "mobile-bottom";

export interface AppNavItem {
  id: "dashboard" | "bills" | "expenses" | "account" | "more";
  label: string;
  to: string;
  icon: typeof LayoutGrid;
  activeIcon?: IconDefinition;
  section: "management" | "account";
  surfaces: AppNavSurface[];
  isMatch: (pathname: string) => boolean;
}

export const appNavigation: AppNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutGrid,
    activeIcon: faTableCellsLarge,
    section: "management",
    surfaces: ["desktop-sidebar", "mobile-bottom"],
    isMatch: (pathname) => pathname === "/dashboard" || pathname === "/dashboard/",
  },
  {
    id: "bills",
    label: "Bills",
    to: "/dashboard/bills",
    icon: ReceiptText,
    activeIcon: faFileInvoiceDollar,
    section: "management",
    surfaces: ["desktop-sidebar", "mobile-bottom"],
    isMatch: (pathname) =>
      pathname.startsWith("/dashboard/bills") || pathname.startsWith("/bills"),
  },
  {
    id: "expenses",
    label: "Expenses",
    to: "/dashboard/expenses",
    icon: CreditCard,
    activeIcon: faCreditCard,
    section: "management",
    surfaces: ["desktop-sidebar", "mobile-bottom"],
    isMatch: (pathname) => pathname.startsWith("/dashboard/expenses"),
  },
  {
    id: "account",
    label: "Account",
    to: "/account/settings",
    icon: Settings,
    section: "account",
    surfaces: ["desktop-sidebar"],
    isMatch: (pathname) => pathname.startsWith("/account"),
  },
  {
    id: "more",
    label: "More",
    to: "/account/more",
    icon: MoreHorizontal,
    activeIcon: faEllipsis,
    section: "account",
    surfaces: ["mobile-bottom"],
    isMatch: (pathname) => pathname.startsWith("/account"),
  },
];

export const desktopSidebarNavigation = appNavigation.filter((item) =>
  item.surfaces.includes("desktop-sidebar")
);

export const mobileBottomNavigation = appNavigation.filter((item) =>
  item.surfaces.includes("mobile-bottom")
);

export function isAppNavItemActive(item: AppNavItem, pathname: string) {
  return item.isMatch(pathname);
}
