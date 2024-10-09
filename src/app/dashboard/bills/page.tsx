"use client";

import { useState } from "react";
import { dateFormatter } from "@/utils/formatter";
import { v4 as uuidv4 } from "uuid";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bill } from "./types";
import { AddBillDialog } from "./components/add-bill-dialog";
import { DetailBillDialog } from "./components/detail-bill-dialog";
import { DeleteBillDialog } from "./components/delete-bill-dialog";
import EditBillDialog from "./components/edit-bill-dialog";
import { StatusBadge } from "./components/status-badge";

// Mock data for bills
const initialBills: Bill[] = [
  {
    id: "1f3e3a1a-8c68-4537-9e4d-56c1f19a8bc9",
    description: "Electricity Bill",
    category: "utilities",
    status: "upcoming",
    amountDue: 120.5,
    amountPaid: null,
    createdDate: "2024-08-01T09:30:00",
    dueDate: "2024-09-01T00:00:00",
    paymentDate: null,
    deletedDate: null,
    notes: "This is the monthly electricity bill for the apartment.",
  },
  {
    id: "7b9c8277-f8f0-48f2-bc29-d1e38e7d79e5",
    description: "Internet Bill",
    category: "utilities",
    status: "paid",
    amountDue: 75.0,
    amountPaid: 75.0,
    createdDate: "2024-08-03T12:00:00",
    dueDate: "2024-09-03T00:00:00",
    paymentDate: "2024-08-20T11:00:00",
    deletedDate: null,
    notes: "This is the monthly internet bill for the apartment.",
  },
  {
    id: "c1b232a4-8275-4fa9-a3df-cb8e18c46c73",
    description: "Water Bill",
    category: "utilities",
    status: "overdue",
    amountDue: 45.75,
    amountPaid: null,
    createdDate: "2024-08-05T10:00:00",
    dueDate: "2024-09-05T00:00:00",
    paymentDate: null,
    deletedDate: null,
  },
  {
    id: "39c2a346-5c85-4238-bc46-b122b916e1d8",
    description: "Rent",
    category: "housing",
    status: "paid",
    amountDue: 1500.0,
    amountPaid: 1500.0,
    createdDate: "2024-07-25T08:00:00",
    dueDate: "2024-08-01T00:00:00",
    paymentDate: "2024-07-28T15:00:00",
    deletedDate: null,
  },
  {
    id: "9984e527-24b6-45b1-9af5-8c053e1b8d26",
    description: "Car Loan",
    category: "debt",
    status: "cancelled",
    amountDue: 320.0,
    amountPaid: null,
    createdDate: "2024-08-10T13:00:00",
    dueDate: "2024-09-10T00:00:00",
    paymentDate: null,
    deletedDate: null,
    notes: "This is the monthly car loan payment.",
  },
  {
    id: "c68a8932-fb07-4997-bd23-13387d41e132",
    description: "Gym Membership",
    category: "healthcare",
    status: "due",
    amountDue: 45.0,
    amountPaid: null,
    createdDate: "2024-08-01T09:00:00",
    dueDate: "2024-09-01T00:00:00",
    paymentDate: null,
    deletedDate: null,
    notes: "This is the monthly gym membership fee.",
  },
  {
    id: "df4c2bc2-624f-4b1f-9dd9-8a5e1cf2c264",
    description: "Credit Card Bill",
    category: "personal",
    status: "upcoming",
    amountDue: 600.0,
    amountPaid: null,
    createdDate: "2024-08-08T09:00:00",
    dueDate: "2024-09-08T00:00:00",
    paymentDate: null,
    deletedDate: null,
    notes: "This is the monthly credit card bill.",
  },
  {
    id: "f84d7cb5-24ad-4a94-9376-4c791b8b9634",
    description: "Phone Bill",
    category: "utilities",
    status: "paid",
    amountDue: 60.0,
    amountPaid: 60.0,
    createdDate: "2024-08-01T11:00:00",
    dueDate: "2024-09-01T00:00:00",
    paymentDate: "2024-08-10T08:00:00",
    deletedDate: null,
    notes: "This is the monthly phone bill for the apartment.",
  },
  {
    id: "1b9b8b44-cc10-46df-a4d4-56425b5b25ef",
    description: "Netflix Subscription",
    category: "entertainment",
    status: "paid",
    amountDue: 15.99,
    amountPaid: 15.99,
    createdDate: "2024-08-05T12:30:00",
    dueDate: "2024-09-05T00:00:00",
    paymentDate: "2024-08-06T14:00:00",
    deletedDate: null,
    notes: "This is the monthly Netflix subscription fee.",
  },
  {
    id: "c7ad6e6d-ccbb-4a0d-a4bc-416f25e0fc68",
    description: "Student Loan",
    category: "debt",
    status: "overdue",
    amountDue: 250.0,
    amountPaid: null,
    createdDate: "2024-08-15T14:00:00",
    dueDate: "2024-09-15T00:00:00",
    paymentDate: null,
    deletedDate: null,
    notes: "This is the monthly student loan payment.",
  },
];

export default function Bills() {
  const [bills, setBills] = useState<Bill[]>(initialBills);

  const handleAddBill = (data: any) => {
    const bill: Bill = {
      id: uuidv4(),
      description: data.description,
      category: data.category,
      status: "upcoming",
      amountDue: data.amount,
      amountPaid: null,
      createdDate: new Date().toISOString(),
      dueDate: data.dueDate.toISOString(),
      paymentDate: null,
      deletedDate: null,
      notes: data.notes || "",
    };
    setBills((prevBills) => [...prevBills, bill]);
  };

  function handleDeleteBill(id: string) {
    const updatedBills = bills.map((bill) =>
      bill.id === id
        ? {
            ...bill,
            deletedDate: new Date().toISOString(),
          }
        : bill
    );

    setBills(updatedBills);
  }

  function handleEditBill(data: any) {
    const updatedBills = bills.map((bill) =>
      bill.id === data.id
        ? {
            ...bill,
            description: data.description,
            category: data.category,
            status: data.status,
            dueDate: data.dueDate,
            paymentDate: data.paymentDate,
            amountDue: data.amountDue,
            amountPaid: data.amountPaid,
          }
        : bill
    );

    console.log(updatedBills);

    setBills(updatedBills);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <StatusBadge variant="green">Paid</StatusBadge>;
      case "upcoming":
        return <StatusBadge variant="yellow">Upcoming</StatusBadge>;
      case "due":
        return <StatusBadge variant="pink">Due</StatusBadge>;
      case "overdue":
        return <StatusBadge variant="red">Overdue</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="gray">Cancelled</StatusBadge>;
      default:
        return <StatusBadge variant="indigo">Created</StatusBadge>;
    }
  };

  return (
    <div className="grow m-6 p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm dark:lg:bg-zinc-900">
      <div className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
            Bills
          </h1>
          <p className="text-sm font-light text-zinc-500">
            Manage your bills and keep your finances in control.
          </p>
        </div>
        <AddBillDialog onAddBill={handleAddBill} />
      </div>
      <div className="flow-root">
        <div className="mt-8 overflow-x-auto whitespace-nowrap">
          <Table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
            <TableHeader className="font-sans text-zinc-500 dark:text-zinc-400">
              <TableRow>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Due Date</TableHead>
                <TableHead className="font-semibold text-right">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-sans">
              {bills.map(
                (bill) =>
                  bill.deletedDate === null && (
                    <TableRow key={bill.id}>
                      <TableCell className="font-semibold">
                        {bill.description}
                      </TableCell>
                      <TableCell className="capitalize dark:text-zinc-500">
                        {bill.category}
                      </TableCell>
                      <TableCell className="dark:text-zinc-500">
                        {dateFormatter.format(new Date(bill.dueDate))}
                      </TableCell>
                      <TableCell className="text-right">
                        $ {bill.amountDue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(bill.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <EditBillDialog
                              bill={bill}
                              onEdit={handleEditBill}
                            />
                            <DetailBillDialog bill={bill} />
                            <DeleteBillDialog
                              id={bill.id}
                              onDelete={handleDeleteBill}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
