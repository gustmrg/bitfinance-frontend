import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { DocumentType } from "@/api/bills/upload-document";
import { useAuth } from "@/auth/auth-provider";
import { dateFormatter } from "@/utils/formatter";

import { DetailsBillDialog } from "./components/details-bill-dialog";
import { DeleteBillDialog } from "./components/delete-bill-dialog";
import { EditBillDialog } from "./components/edit-bill-dialog";
import { UploadDocumentsDialog } from "./components/upload-documents-dialog";
import { ReceiptText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
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
import { AddBillDialog } from "./components/add-bill-dialog";
import { useBillMutations } from "@/hooks/mutations/use-bill-mutations";
import { useBillsQuery } from "@/hooks/queries/use-bills-query";

export function Bills() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const { selectedOrganization } = useAuth();
  const { t } = useTranslation();
  const billsQuery = useBillsQuery(selectedOrganization?.id ?? null, {
    from: dateRange?.from,
    to: dateRange?.to,
  });
  const { addBillAsync, deleteBillAsync, updateBillAsync, uploadBillDocumentsAsync } =
    useBillMutations({
      organizationId: selectedOrganization?.id ?? null,
    });
  const bills = billsQuery.data ?? [];

  const handleDateFilterChange = (newDate: DateRange) => {
    setDateRange(newDate);
  };

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

  const getTotalAmount = () => {
    return bills.reduce((total, bill) => total + bill.amountDue, 0).toFixed(2);
  };

  const handleAddBill = async (data: any) => {
    try {
      await addBillAsync({
        description: data.description,
        category: data.category,
        status: "upcoming",
        dueDate: data.dueDate.toISOString(),
        amountDue: data.amount,
        paymentDate: null,
        amountPaid: null,
      });
    } catch (error) {
      console.error("Failed to add the bill:", error);
    }
  };

  const handleDeleteBill = async (id: string) => {
    try {
      await deleteBillAsync(id);
    } catch (error) {
      console.error("Failed to delete the bill:", error);
    }
  };

  const handleEditBill = async (data: any) => {
    try {
      await updateBillAsync({
        id: data.id,
        description: data.description,
        category: data.category,
        status: data.status,
        dueDate: data.dueDate.toISOString(),
        amountDue: data.amountDue,
        paymentDate: data.paymentDate,
        amountPaid: data.amountPaid,
      });
    } catch (error) {
      console.error("Failed to update the bill:", error);
    }
  };

  const handleUploadDocuments = async (
    billId: string,
    files: File[],
    documentType: string
  ) => {
    try {
      await uploadBillDocumentsAsync({
        billId,
        files,
        documentType: documentType as DocumentType,
      });
    } catch (error) {
      console.error("Failed to upload documents:", error);
      throw error;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Bills</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
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
                <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {bill.category}
                  </TableCell>
                  <TableCell>
                    {dateFormatter.format(new Date(bill.dueDate))}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(bill.status)}
                  </TableCell>
                  <TableCell>${bill.amountDue.toFixed(2)}</TableCell>
                  <TableCell className="flex flex-row space-x-2 items-center">
                    <DetailsBillDialog bill={bill} />
                    <EditBillDialog bill={bill} onEdit={handleEditBill} />
                    <UploadDocumentsDialog
                      billId={bill.id}
                      onUpload={handleUploadDocuments}
                    />
                    <DeleteBillDialog id={bill.id} onDelete={handleDeleteBill} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {bills.length > 0 && (
              <>
                {/* Desktop Footer */}
                <TableFooter className="hidden md:table-footer-group">
                  <TableRow className="font-semibold">
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell>${getTotalAmount()}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
                {/* Mobile Footer */}
                <TableFooter className="table-footer-group md:hidden">
                  <TableRow className="font-semibold">
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>${getTotalAmount()}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </>
            )}
          </Table>
          {billsQuery.isPending ? (
            <div className="text-center py-6">
              <h3 className="mt-2 text-lg font-semibold">Loading bills...</h3>
            </div>
          ) : bills.length === 0 ? (
            <div className="text-center py-6">
              <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-2 text-lg font-semibold">No Bills</h3>
              <p className="text-sm text-muted-foreground">
                You haven&apos;t added any bills. Start tracking your expenses
                by adding one now!
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
