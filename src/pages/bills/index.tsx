import { useState } from "react";

import { ReceiptText } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

import type {
  BillCategory,
  BillDocumentType,
  BillStatus,
  UpdateBillRequest,
} from "@/api/bills";
import { useSelectedOrganization } from "@/auth/auth-provider";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { PageContainer, PageHeader } from "@/components/page-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { useBillMutations } from "@/hooks/mutations/use-bill-mutations";
import { useBillsQuery } from "@/hooks/queries/use-bills-query";

import { AddBillDialog } from "./components/add-bill-dialog";
import { BillsMobileList } from "./components/bills-mobile-list";
import { BillsTable } from "./components/bills-table";

interface AddBillFormValues {
  description: string;
  category: string;
  dueDate: Date;
  amount: number;
}

interface EditBillFormValues {
  id: string;
  description: string;
  category: string;
  status: string;
  amountDue: number;
  amountPaid?: number;
  dueDate: Date;
  paymentDate?: Date;
}

export function Bills() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const selectedOrganization = useSelectedOrganization();
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

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <StatusBadge variant="green">{t("labels.paid")}</StatusBadge>;
      case "upcoming":
        return <StatusBadge variant="yellow">{t("labels.upcoming")}</StatusBadge>;
      case "due":
        return <StatusBadge variant="red">{t("labels.due")}</StatusBadge>;
      case "overdue":
        return <StatusBadge variant="red">{t("labels.overdue")}</StatusBadge>;
      case "cancelled":
        return <StatusBadge variant="gray">{t("labels.cancelled")}</StatusBadge>;
      default:
        return <StatusBadge variant="indigo">{t("labels.created")}</StatusBadge>;
    }
  };

  const getTotalAmount = () => {
    return bills.reduce((total, bill) => total + bill.amountDue, 0).toFixed(2);
  };

  const handleAddBill = async (data: AddBillFormValues) => {
    try {
      await addBillAsync({
        description: data.description,
        category: data.category as BillCategory,
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

  const handleEditBill = async (data: EditBillFormValues) => {
    try {
      const payload: Omit<UpdateBillRequest, "organizationId"> = {
        id: data.id,
        description: data.description,
        category: data.category as BillCategory,
        status: data.status as BillStatus,
        dueDate: data.dueDate.toISOString(),
        paymentDate: data.paymentDate ? data.paymentDate.toISOString() : null,
        amountDue: data.amountDue,
        amountPaid: data.amountPaid ?? null,
      };

      await updateBillAsync(payload);
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
        documentType: documentType as BillDocumentType,
      });
    } catch (error) {
      console.error("Failed to upload documents:", error);
      throw error;
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title={t("bills.title")}
        description={t("bills.subtitle")}
        actions={
          <>
            <AddBillDialog onAddBill={handleAddBill} />
            <CalendarDateRangePicker
              startDate={dateRange?.from}
              endDate={dateRange?.to}
              onDateChange={handleDateFilterChange}
            />
          </>
        }
      />

      {billsQuery.isPending ? (
        <div className="rounded-lg border p-10 text-center">
          <h3 className="text-lg font-semibold">Loading bills...</h3>
        </div>
      ) : bills.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-2 text-lg font-semibold">No Bills</h3>
          <p className="text-sm text-muted-foreground">
            You haven&apos;t added any bills. Start tracking your expenses by adding one now!
          </p>
        </div>
      ) : (
        <>
          <div className="md:hidden">
            <BillsMobileList bills={bills} renderStatusBadge={renderStatusBadge} />
          </div>
          <div className="hidden md:block">
            <BillsTable
              bills={bills}
              totalAmount={getTotalAmount()}
              renderStatusBadge={renderStatusBadge}
              onDeleteBill={handleDeleteBill}
              onEditBill={handleEditBill}
              onUploadDocuments={handleUploadDocuments}
            />
          </div>
        </>
      )}
    </PageContainer>
  );
}
