import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faHouse,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
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

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <img
              src="assets/logo.png"
              alt="BitFinance Logo"
              width="72"
              height="64"
            />
          </NavLink>
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
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faHouse} />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/bills"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faBarcode} />
            Bills
          </NavLink>
          <NavLink
            to="/dashboard/expenses"
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-zinc-900 hover:bg-zinc-100 ${
                isActive ? "bg-zinc-100" : ""
              }`
            }
          >
            <FontAwesomeIcon icon={faReceipt} />
            Expenses
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
