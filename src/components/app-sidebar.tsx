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
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "John Doe",
    email: "johndoe@email.com",
    avatar: "/avatars/04.png",
  },
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
          organizations={data.organizations}
          defaultOrganization={data.organizations[0]}
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
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
