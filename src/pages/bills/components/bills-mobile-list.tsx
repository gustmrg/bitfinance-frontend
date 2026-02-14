import { type ReactNode } from "react";

import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { dateFormatter } from "@/utils/formatter";

import { DeleteBillDialog } from "./delete-bill-dialog";
import { DetailsBillDialog } from "./details-bill-dialog";
import { EditBillDialog } from "./edit-bill-dialog";
import { UploadDocumentsDialog } from "./upload-documents-dialog";
import type { Bill } from "../types";

export interface BillsMobileListProps {
  bills: Bill[];
  renderStatusBadge: (status: string) => ReactNode;
  onDeleteBill: (id: string) => Promise<void>;
  onEditBill: (data: EditBillFormValue) => Promise<void>;
  onUploadDocuments: (
    billId: string,
    files: File[],
    documentType: string
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

export function BillsMobileList({
  bills,
  renderStatusBadge,
  onDeleteBill,
  onEditBill,
  onUploadDocuments,
}: BillsMobileListProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {bills.map((bill) => (
        <Card key={bill.id}>
          <CardContent className="space-y-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold leading-5">{bill.description}</p>
                <p className="mt-1 text-sm capitalize text-muted-foreground">{bill.category}</p>
              </div>
              {renderStatusBadge(bill.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("labels.dueDate")}
                </p>
                <p className="font-medium">{dateFormatter.format(new Date(bill.dueDate))}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {t("labels.amount")}
                </p>
                <p className="font-medium">${bill.amountDue.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <DetailsBillDialog bill={bill} />
              <EditBillDialog bill={bill} onEdit={onEditBill} />
              <UploadDocumentsDialog billId={bill.id} onUpload={onUploadDocuments} />
              <DeleteBillDialog id={bill.id} onDelete={onDeleteBill} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
