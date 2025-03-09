import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Bill } from "./types";
import { getBills } from "@/api/bills/get-bills";
import { AddBill } from "@/api/bills/add-bill";
import { UpdateBill } from "@/api/bills/update-bill";
import { DeleteBill } from "@/api/bills/delete-bill";
import { useAuth } from "@/auth/auth-provider";
import { useNavigate } from "react-router-dom";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { AddBillDialog } from "./components/add-bill-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Bills() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const { user, isAuthenticated, isLoading, selectedOrganization } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDateFilterChange = (newDate: DateRange) => {
    setDateRange(newDate);
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/auth/sign-in");
      return;
    }

    let organizationId = selectedOrganization ? selectedOrganization.id : null;

    const fetchBills = async () => {
      if (!organizationId) return;

      try {
        const response = await getBills({
          organizationId: organizationId,
          from: dateRange?.from,
          to: dateRange?.to,
        });

        if (!response) {
          console.error("Failed to fetch bills.");
          setBills([]);
          return;
        }

        const bills: Bill[] = response?.data.map((bill: Bill) => ({
          ...bill,
          status: bill.status.toLowerCase() as
            | "created"
            | "due"
            | "paid"
            | "overdue"
            | "cancelled"
            | "upcoming",
        }));

        setBills(bills);
      } catch (error) {
        console.error("Failed to fetch bills:", error);
      }
    };

    fetchBills();
  }, [
    isAuthenticated,
    navigate,
    isLoading,
    user,
    selectedOrganization,
    dateRange,
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <StatusBadge variant="green">{t("labels.paid")}</StatusBadge>;
      case "upcoming":
        return (
          <StatusBadge variant="yellow">{t("labels.upcoming")}</StatusBadge>
        );
      case "due":
        return <StatusBadge variant="red">{t("labels.due")}</StatusBadge>;
      case "overdue":
        return <StatusBadge variant="red">{t("labels.overdue")}</StatusBadge>;
      case "cancelled":
        return (
          <StatusBadge variant="gray">{t("labels.cancelled")}</StatusBadge>
        );
      default:
        return (
          <StatusBadge variant="indigo">{t("labels.created")}</StatusBadge>
        );
    }
  };

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
        organizationId: selectedOrganization!.id,
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

  const handleDeleteBill = async (id: string) => {
    try {
      const response = await DeleteBill(id, selectedOrganization!.id);

      if (response?.status == 204) {
        const updatedBills = bills.filter((item) => item.id !== id);
        setBills(updatedBills);
      }
    } catch (error) {
      console.error("Failed to delete the bill:", error);
    }
  };

  const handleEditBill = async (data: any) => {
    try {
      const response = await UpdateBill({
        id: data.id,
        description: data.description,
        category: data.category,
        status: data.status,
        dueDate: data.dueDate.toISOString(),
        amountDue: data.amountDue,
        paymentDate: data.paymentDate,
        amountPaid: data.amountPaid,
        organizationId: selectedOrganization!.id,
      });

      if (response) {
        const updatedBills = bills.map((bill) =>
          bill.id === response.id
            ? {
                ...bill,
                description: response.description,
                category: response.category,
                status: response.status.toLowerCase() as
                  | "created"
                  | "due"
                  | "paid"
                  | "overdue"
                  | "cancelled"
                  | "upcoming",
                dueDate: response.dueDate,
                paymentDate: response.paymentDate || null,
                amountDue: response.amountDue,
                amountPaid: response.amountPaid || null,
              }
            : bill
        );

        setBills(updatedBills);
      }
    } catch (error) {
      console.error("Failed to update the bill:", error);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Bills</h2>
        <div className="flex flex-row items-center gap-4">
          <AddBillDialog onAddBill={handleAddBill} />
          <CalendarDateRangePicker
            startDate={dateRange?.from}
            endDate={dateRange?.to}
            onDateChange={handleDateFilterChange}
          />
        </div>
      </div>
      <Card className="w-full col-span-8">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                  <TableCell className="">{bill.amountDue}</TableCell>
                  <TableCell>{bill.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className="font-medium">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // return (
  //   <div className="grow m-6 p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm dark:lg:bg-zinc-900">
  //     <div className="flex flex-row items-end justify-between gap-4">
  //       <div className="space-y-2">
  //         <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
  //           {t("bills.title")}
  //         </h1>
  //         <p className="text-sm font-regular text-zinc-500">
  //           {t("bills.subtitle")}
  //         </p>
  //         <div className="mt-2">
  //           <CalendarDateRangePicker
  //             startDate={dateRange?.from}
  //             endDate={dateRange?.to}
  //             onDateChange={handleDateFilterChange}
  //           />
  //         </div>
  //       </div>
  //       <AddBillDialog onAddBill={handleAddBill} />
  //     </div>
  //     <div className="flow-root">
  //       <div className="mt-8 overflow-x-auto whitespace-nowrap">
  //         <Table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
  //           <TableHeader className="font-sans text-zinc-500 dark:text-zinc-400">
  //             <TableRow>
  //               <TableHead className="font-semibold">
  //                 {t("labels.description")}
  //               </TableHead>
  //               <TableHead className="font-semibold">
  //                 {t("labels.category")}
  //               </TableHead>
  //               <TableHead className="font-semibold">
  //                 {t("labels.dueDate")}
  //               </TableHead>
  //               <TableHead className="font-semibold text-right">
  //                 {t("labels.amount")}
  //               </TableHead>
  //               <TableHead className="font-semibold text-center">
  //                 {t("labels.status")}
  //               </TableHead>
  //               <TableHead className="font-semibold text-right"></TableHead>
  //             </TableRow>
  //           </TableHeader>
  //           <TableBody className="font-sans">
  //             {bills &&
  //               bills.map((bill: Bill) => (
  //                 <TableRow key={bill.id}>
  //                   <TableCell className="font-semibold">
  //                     {bill.description}
  //                   </TableCell>
  //                   <TableCell className="capitalize dark:text-zinc-500">
  //                     {bill.category}
  //                   </TableCell>
  //                   <TableCell className="dark:text-zinc-500">
  //                     {dateFormatter.format(new Date(bill.dueDate))}
  //                   </TableCell>
  //                   <TableCell className="text-right">
  //                     ${" "}
  //                     {bill.amountPaid?.toFixed(2) ?? bill.amountDue.toFixed(2)}
  //                   </TableCell>
  //                   <TableCell className="text-center">
  //                     {getStatusBadge(bill.status)}
  //                   </TableCell>
  //                   <TableCell className="text-right">
  //                     <DropdownMenu>
  //                       <DropdownMenuTrigger asChild>
  //                         <Button variant="ghost" className="h-8 w-8 p-0">
  //                           <span className="sr-only">Open menu</span>
  //                           <MoreHorizontal className="h-4 w-4" />
  //                         </Button>
  //                       </DropdownMenuTrigger>
  //                       <DropdownMenuContent align="end">
  //                         <EditBillDialog bill={bill} onEdit={handleEditBill} />
  //                         <DetailsBillDialog bill={bill} />
  //                         <DeleteBillDialog
  //                           id={bill.id}
  //                           onDelete={handleDeleteBill}
  //                         />
  //                       </DropdownMenuContent>
  //                     </DropdownMenu>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //           </TableBody>
  //         </Table>
  //       </div>
  //     </div>
  //   </div>
  // );
}
