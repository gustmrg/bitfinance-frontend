import { Check, ChevronsUpDown, X } from "lucide-react";

import type { Organization } from "@/auth/types";
import {
  useSelectedOrganization,
  useSetSelectedOrganizationId,
} from "@/auth/auth-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface OrganizationSwitcherProps {
  organizations: Organization[];
  variant?: "sidebar" | "topbar";
}

function getOrganizationInitials(name?: string): string {
  const normalizedName = name?.trim().replace(/\s+/g, " ") ?? "";
  if (!normalizedName) {
    return "OR";
  }

  const parts = normalizedName.split(" ");

  if (parts.length === 1) {
    const firstTwoLetters = Array.from(parts[0]).slice(0, 2).join("").toUpperCase();
    return firstTwoLetters || "OR";
  }

  const initials = `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  return initials || "OR";
}

export function OrganizationSwitcher({
  organizations,
  variant = "sidebar",
}: OrganizationSwitcherProps) {
  const selectedOrganization = useSelectedOrganization();
  const setSelectedOrganizationId = useSetSelectedOrganizationId();
  const isMobile = useIsMobile();

  if (variant === "topbar") {
    if (isMobile) {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="h-9 w-full justify-between gap-2 px-2 sm:px-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <Avatar className="h-6 w-6" aria-hidden="true">
                  <AvatarFallback className="text-[10px] font-semibold">
                    {getOrganizationInitials(selectedOrganization?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-sm font-medium">
                  {selectedOrganization?.name ?? "Select Organization"}
                </span>
              </div>
              <ChevronsUpDown className="size-4 text-muted-foreground" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[90vh]">
            <div className="flex max-h-[calc(90vh-1rem)] flex-col">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <DrawerTitle className="text-base font-semibold">
                  Select an organization
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Close organization selector"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {organizations.length > 0 ? (
                  <div className="space-y-1">
                    {organizations.map((organization) => (
                      <DrawerClose asChild key={organization.id}>
                        <Button
                          variant="ghost"
                          className="h-12 w-full justify-start gap-2 px-3"
                          onClick={() => setSelectedOrganizationId(organization.id)}
                        >
                          <Avatar className="h-7 w-7" aria-hidden="true">
                            <AvatarFallback className="text-[10px] font-semibold">
                              {getOrganizationInitials(organization.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{organization.name}</span>
                          {organization.id === selectedOrganization?.id ? (
                            <Check className="ml-auto h-4 w-4" />
                          ) : null}
                        </Button>
                      </DrawerClose>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-4 text-sm text-muted-foreground">
                    No organizations available.
                  </p>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-9 w-full justify-between gap-2 px-2 sm:px-3"
          >
            <span className="truncate text-sm font-medium">
              {selectedOrganization?.name ?? "Select Organization"}
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 max-w-[calc(100vw-1rem)]">
          {organizations.map((organization) => (
            <DropdownMenuItem
              key={organization.id}
              onSelect={() => setSelectedOrganizationId(organization.id)}
            >
              <span className="truncate">{organization.name}</span>
              {organization.id === selectedOrganization?.id ? (
                <Check className="ml-auto" />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <span className="truncate font-semibold">
                {selectedOrganization?.name ?? "Select Organization"}
              </span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn("w-[--radix-dropdown-menu-trigger-width]", "max-w-xs")}
            align="start"
          >
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                onSelect={() => setSelectedOrganizationId(organization.id)}
              >
                <span className="truncate">{organization.name}</span>
                {organization.id === selectedOrganization?.id ? (
                  <Check className="ml-auto" />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
