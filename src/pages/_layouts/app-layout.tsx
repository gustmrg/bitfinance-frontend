import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Home,
  Settings,
  ChevronDown,
  Plus,
  Wallet,
  Receipt,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export function AppLayout() {
  const organizations = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Business" },
    { id: 3, name: "Non-profit" },
  ];

  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);

  const billsByOrg = {
    1: [
      {
        name: "Electricity",
        amount: 85.5,
        dueDate: "2023-05-15",
        status: "pending",
      },
      { name: "Water", amount: 45.2, dueDate: "2023-05-18", status: "paid" },
      {
        name: "Internet",
        amount: 69.99,
        dueDate: "2023-05-20",
        status: "overdue",
      },
      { name: "Phone", amount: 55.0, dueDate: "2023-05-22", status: "pending" },
    ],
    2: [
      {
        name: "Office Rent",
        amount: 1500.0,
        dueDate: "2023-06-01",
        status: "pending",
      },
      {
        name: "Business Insurance",
        amount: 200.75,
        dueDate: "2023-06-05",
        status: "paid",
      },
      {
        name: "Utilities",
        amount: 300.0,
        dueDate: "2023-06-10",
        status: "pending",
      },
    ],
    3: [
      {
        name: "Donation Platform Fee",
        amount: 30.0,
        dueDate: "2023-05-25",
        status: "pending",
      },
      {
        name: "Event Space Rental",
        amount: 500.0,
        dueDate: "2023-06-15",
        status: "pending",
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500 hover:bg-green-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "overdue":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Finance App</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto bg-sky-600">
                {selectedOrg.name} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {organizations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onSelect={() => setSelectedOrg(org)}
                >
                  {org.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Bills</h2>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    size="sm"
                    className="text-white bg-blue-600 hover:bg-blue-500"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Bill
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Add New Bill</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="billName">Bill Name</Label>
                        <Input id="billName" placeholder="Enter bill name" />
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" type="date" />
                      </div>
                      <Button type="submit">Add Bill</Button>
                    </form>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="space-y-4">
              {billsByOrg[selectedOrg.id].map((bill, index) => (
                <Card key={index}>
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-medium">{bill.name}</h3>
                      <p className="text-sm text-gray-500">
                        Due: {bill.dueDate}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-semibold mb-2">
                        ${bill.amount.toFixed(2)}
                      </span>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status.charAt(0).toUpperCase() +
                          bill.status.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>

      <nav className="bg-blue-900 text-primary-foreground">
        <ul className="flex justify-around items-center h-16">
          <li>
            <NavLink
              to="#"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-white" : "text-blue-400"
                }`
              }
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/bills"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-white" : "text-blue-400"
                }`
              }
            >
              <Receipt className="h-6 w-6" />
              <span className="text-xs mt-1">Bills</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/expenses"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-white" : "text-blue-400"
                }`
              }
            >
              <Wallet className="h-6 w-6" />
              <span className="text-xs mt-1">Expenses</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-white" : "text-blue-400"
                }`
              }
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
