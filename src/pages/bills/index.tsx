import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Bill } from "./types";
import { dateFormatter } from "@/utils/formatter";
import { AddBillDialog } from "./components/add-bill-dialog";
import { DeleteBillDialog } from "./components/delete-bill-dialog";
import { DetailsBillDialog } from "./components/details-bill-dialog";
import EditBillDialog from "./components/edit-bill-dialog";
import { getBills } from "@/api/bills/get-bills";
import { AddBill } from "@/api/bills/add-bill";

export function Bills() {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      const token = localStorage.getItem("_authAccessToken");
      if (token !== null) {
        try {
          const result: Bill[] = await getBills(token);

          const normalizedBills: Bill[] = result.map((bill: Bill) => ({
            ...bill,
            status: bill.status.toLowerCase() as
              | "created"
              | "due"
              | "paid"
              | "overdue"
              | "cancelled"
              | "upcoming",
          }));

          setBills(normalizedBills);
        } catch (error) {
          console.error("Failed to fetch bills:", error);
        }
      }
    };

    fetchBills();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <StatusBadge variant="green">Paid</StatusBadge>;
      case "upcoming":
        return <StatusBadge variant="yellow">Upcoming</StatusBadge>;
      case "due":
        return <StatusBadge variant="red">Due</StatusBadge>;
      case "overdue":
        return <StatusBadge variant="red">Overdue</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="gray">Cancelled</StatusBadge>;
      default:
        return <StatusBadge variant="indigo">Created</StatusBadge>;
    }
  };

  // const handleAddBill = (data: any) => {
  //   const bill: Bill = {
  //     id: uuidv4(),
  //     description: data.description,
  //     category: data.category,
  //     status: "upcoming",
  //     amountDue: data.amount,
  //     amountPaid: null,
  //     createdDate: new Date().toISOString(),
  //     dueDate: data.dueDate.toISOString(),
  //     paymentDate: null,
  //     deletedDate: null,
  //     notes: data.notes || "",
  //   };

  //   const response = AddBill(data);

  //   setBills((prevBills) => [...prevBills, bill]);
  // };

  const handleAddBill = async (data: any) => {
    try {
      const response = await AddBill({
        description: data.description,
        category: data.category,
        status: "upcoming",
        dueDate: data.dueDate.toISOString(),
        amountDue: data.amount,
        paymentDate: null,
        amountPaid: null,
      });

      if (response) {
        const newBill: Bill = {
          id: response.id,
          description: response.description,
          category: response.category,
          status: response.status.toLowerCase() as
            | "created"
            | "due"
            | "paid"
            | "overdue"
            | "cancelled"
            | "upcoming",
          amountDue: response.amountDue,
          amountPaid: response.amountPaid || null,
          createdDate: response.createdDate,
          dueDate: response.dueDate,
          paymentDate: response.paidDate || null,
          deletedDate: null,
          notes: data.notes || "",
        };

        setBills((prevBills) => [...prevBills, newBill]);
      }
    } catch (error) {
      console.error("Failed to add the bill:", error);
    }
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

    setBills(updatedBills);
  }

  return (
    <div className="grow m-6 p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm dark:lg:bg-zinc-900">
      <div className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
            Bills
          </h1>
          <p className="text-sm font-regular text-zinc-500">
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
              {bills &&
                bills.map((bill: Bill) => (
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
                          <EditBillDialog bill={bill} onEdit={handleEditBill} />
                          <DetailsBillDialog bill={bill} />
                          <DeleteBillDialog
                            id={bill.id}
                            onDelete={handleDeleteBill}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
