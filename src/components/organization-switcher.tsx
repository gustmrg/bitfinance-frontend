import { useState } from "react";
import { Check, ChevronsUpDown, DollarSign } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Organization } from "@/auth/auth-provider";

export function OrganizationSwitcher({
  organizations,
  defaultOrganization,
}: {
  organizations: Organization[];
  defaultOrganization: Organization;
}) {
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization>(defaultOrganization);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <DollarSign className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">BitFinance</span>
                <span className="">{selectedOrganization.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onSelect={() => setSelectedOrganization(organization)}
              >
                {organization.name}
                {""}
                {organization === selectedOrganization && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
