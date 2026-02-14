import { NavLink, useLocation } from "react-router-dom";

import {
  isAppNavItemActive,
  mobileBottomNavigation,
} from "@/layouts/app-navigation";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-background/70 md:hidden"
    >
      <ul className="grid min-h-16 grid-cols-4 gap-1 p-1">
        {mobileBottomNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = isAppNavItemActive(item, location.pathname);

          return (
            <li key={item.id}>
              <NavLink
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-transparent px-1 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
