import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faHouse,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "@tanstack/react-router";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAuth } from "@/auth/auth-provider";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const location = useLocation();

  const { user, selectedOrganization, setSelectedOrganization } = useAuth();

  useEffect(() => {
    if (selectedOrganization) {
      setValue(selectedOrganization.id);
    }
  }, [selectedOrganization]);
  let organizations = user?.organizations ?? [];

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center mb-4 lg:h-[60px]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img
              src="assets/logo.png"
              alt="BitFinance Logo"
              width="72"
              height="64"
            />
          </Link>
        </div>
        <div className="ml-10 mb-6">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? organizations.find(
                      (organization) => organization.id === value
                    )?.name
                  : "Select organization..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No organization found.</CommandEmpty>
                  <CommandGroup>
                    {organizations.map((organization) => (
                      <CommandItem
                        key={organization.id}
                        value={organization.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setSelectedOrganization(
                            organizations.find((x) => x.id === currentValue) ??
                              null
                          );
                          setOpen(false);
                        }}
                      >
                        {organization.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === organization.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <nav className="flex flex-col items-start px-2 text-sm font-medium lg:px-4 space-y-2">
          <Link
            to="/dashboard"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              location.pathname === "/dashboard" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHouse} />
            {t("sidebar.dashboard")}
          </Link>

          <Link
            to="/bills"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              location.pathname === "/bills" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faBarcode} />
            {t("sidebar.bills")}
          </Link>
          <Link
            to="/expenses"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
              location.pathname === "/expenses" ? "bg-zinc-100" : ""
            }`}
          >
            <FontAwesomeIcon icon={faReceipt} />
            {t("sidebar.expenses")}
          </Link>
        </nav>
      </div>
    </aside>
  );
}
