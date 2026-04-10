import { type ReactNode } from "react";

import { useTranslation } from "react-i18next";

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
import { EditBillDialog } from "./edit-bill-dialog";
import { UploadDocumentsDialog } from "./upload-documents-dialog";
import type { Bill } from "../types";

export interface BillsTableProps {
  bills: Bill[];
  totalAmount: string;
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteBill: (id: string) => Promise<void>;
  onEditBill: (data: EditBillFormValue) => Promise<void>;
  onUploadDocuments: (
    billId: string,
    files: File[],
    fileCategory: string
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
                    <EditBillDialog bill={bill} onEdit={onEditBill} />
                    <UploadDocumentsDialog
                      billId={bill.id}
                      onUpload={onUploadDocuments}
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
