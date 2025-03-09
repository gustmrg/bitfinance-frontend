import * as React from "react";

import {
  Sidebar,
  SidebarContent,
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

const data = {
  organizations: ["Acme Inc", "Nord University", "Private Apartment"],
  navMain: [
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: LayoutGrid,
          isActive: true,
        },
        {
          title: "Bills",
          url: "#",
          icon: ReceiptText,
        },
        {
          title: "Expenses",
          url: "#",
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
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <OrganizationSwitcher
          versions={data.organizations}
          defaultVersion={data.organizations[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        {item.icon && <item.icon />} {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
