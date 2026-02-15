import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { useCurrentUser } from "@/auth/auth-provider";
import {
  desktopSidebarNavigation,
  isAppNavItemActive,
} from "@/layouts/app-navigation";

import { NavUser } from "@/components/nav-user";
import { OrganizationSwitcher } from "@/components/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import logoImg from "/assets/app-icon.png";

const sectionLabelMap = {
  management: "Management",
  account: "Account",
} as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUserQuery = useCurrentUser();
  const user = currentUserQuery.data ?? null;
  const location = useLocation();

  const groupedItems = desktopSidebarNavigation.reduce<
    Record<string, typeof desktopSidebarNavigation>
  >((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="shrink-0">
            <img alt="BitFinance logo" src={logoImg} className="h-9 w-auto" />
          </Link>
          <div className="min-w-0 flex-1">
            <OrganizationSwitcher organizations={user?.organizations ?? []} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(groupedItems).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel>
              {sectionLabelMap[section as keyof typeof sectionLabelMap]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isAppNavItemActive(item, location.pathname)}
                    >
                      <Link to={item.to}>
                        <item.icon /> {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={user?.fullName ?? "User"} email={user?.email ?? ""} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
