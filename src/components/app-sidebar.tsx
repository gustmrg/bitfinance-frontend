import * as React from "react";

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
import { OrganizationSwitcher } from "./organization-switcher";
import {
  Building,
  CreditCard,
  LayoutGrid,
  ReceiptText,
  Users,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { useCurrentUser } from "@/auth/auth-provider";
import { Link, useLocation } from "react-router-dom";

const data = {
  user: {
    name: "John Doe",
    email: "johndoe@email.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "",
          icon: LayoutGrid,
          isActive: true,
        },
        {
          title: "Bills",
          url: "bills",
          icon: ReceiptText,
        },
        {
          title: "Expenses",
          url: "expenses",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Administration",
      url: "#",
      items: [
        {
          title: "Members",
          url: "#",
          icon: Users,
        },
        {
          title: "Organizations",
          url: "#",
          icon: Building,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUserQuery = useCurrentUser();
  const user = currentUserQuery.data ?? null;

  let location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <OrganizationSwitcher organizations={user?.organizations ?? []} />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        location.pathname.substring("/dashboard/".length) ===
                        item.url
                      }
                    >
                      <Link to={item.url}>
                        {item.icon && <item.icon />} {item.title}
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
        <NavUser 
          name={user?.fullName ?? "User"} 
          email={user?.email ?? ""} 
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
