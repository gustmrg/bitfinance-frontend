import { Suspense, lazy, type ReactNode, useState } from "react";

import { Pencil, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { BillFileCategory } from "@/api/bills";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/formatter";

import { DeleteBillDialog } from "./delete-bill-dialog";
import { DetailsBillDialog } from "./details-bill-dialog";
import type { Bill } from "../types";

const EditBillDialog = lazy(async () => ({
  default: (await import("./edit-bill-dialog")).EditBillDialog,
}));

const UploadDocumentsDialog = lazy(async () => ({
  default: (await import("./upload-documents-dialog")).UploadDocumentsDialog,
}));

export interface BillsTableProps {
  bills: Bill[];
  totalAmount: string;
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteBill: (id: string) => Promise<void>;
  onEditBill: (data: EditBillFormValue) => Promise<void>;
  onUploadDocuments: (
    billId: string,
    files: File[],
    documentType: BillFileCategory
  ) => Promise<void>;
}

interface EditBillFormValue {
  id: string;
  description: string;
  category: string;
  status: string;
  amountDue: number;
  amountPaid?: number;
  dueDate: Date;
  paymentDate?: Date;
}

function LazyEditBillAction({
  bill,
  onEditBill,
}: {
  bill: Bill;
  onEditBill: (data: EditBillFormValue) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);

  if (!enabled) {
    return (
      <Button variant="outline" onClick={() => setEnabled(true)}>
        <Pencil className="h-4 w-4" />
        {t("labels.edit")}
      </Button>
    );
  }

  return (
    <Suspense
      fallback={
        <Button disabled variant="outline">
          <Pencil className="h-4 w-4" />
          {t("labels.edit")}
        </Button>
      }
    >
      <EditBillDialog
        bill={bill}
        defaultOpen
        onEdit={onEditBill}
        trigger={<Button variant="outline">{t("labels.edit")}</Button>}
      />
    </Suspense>
  );
}

function LazyUploadBillAction({
  bill,
  onUploadDocuments,
}: {
  bill: Bill;
  onUploadDocuments: (
    billId: string,
    files: File[],
    documentType: BillFileCategory
  ) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);

  if (!enabled) {
    return (
      <Button variant="outline" onClick={() => setEnabled(true)}>
        <Upload className="h-4 w-4" />
        {t("labels.attachments")}
      </Button>
    );
  }

  return (
    <Suspense
      fallback={
        <Button disabled variant="outline">
          <Upload className="h-4 w-4" />
          {t("labels.attachments")}
        </Button>
      }
    >
      <UploadDocumentsDialog
        billId={bill.id}
        defaultOpen
        onUpload={onUploadDocuments}
        trigger={<Button variant="outline">{t("labels.attachments")}</Button>}
      />
    </Suspense>
  );
}

export function BillsTable({
  bills,
  totalAmount,
  renderStatusBadge,
  onDeleteBill,
  onEditBill,
  onUploadDocuments,
}: BillsTableProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("labels.description")}</TableHead>
              <TableHead>{t("labels.category")}</TableHead>
              <TableHead>{t("labels.dueDate")}</TableHead>
              <TableHead>{t("labels.status")}</TableHead>
              <TableHead>{t("labels.amount")}</TableHead>
              <TableHead>{t("labels.details")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.description}</TableCell>
                <TableCell className="capitalize">{bill.category}</TableCell>
                <TableCell>{dateFormatter.format(new Date(bill.dueDate))}</TableCell>
                <TableCell>{renderStatusBadge(bill.status)}</TableCell>
                <TableCell>${bill.amountDue.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-2">
                    <DetailsBillDialog bill={bill} />
                    <LazyEditBillAction bill={bill} onEditBill={onEditBill} />
                    <LazyUploadBillAction
                      bill={bill}
                      onUploadDocuments={onUploadDocuments}
                    />
                    <DeleteBillDialog id={bill.id} onDelete={onDeleteBill} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="font-semibold">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>${totalAmount}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
