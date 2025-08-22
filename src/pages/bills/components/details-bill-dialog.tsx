import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Paperclip } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bill } from "../types";
import { StatusBadge } from "@/components/ui/status-badge";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { downloadDocument } from "@/api/bills/download-document";
import { useAuth } from "@/auth/auth-provider";

interface DetailsBillDialogProps {
  bill: Bill;
}

export function DetailsBillDialog({ bill }: DetailsBillDialogProps) {
  const { t } = useTranslation();
  const { selectedOrganization } = useAuth();

  const handleDownloadDocument = async (
    documentId: string,
    fileName: string
  ) => {
    if (!selectedOrganization) {
      console.error("No organization selected");
      return;
    }

    try {
      await downloadDocument(
        selectedOrganization.id,
        bill.id,
        documentId,
        fileName
      );
    } catch (error) {
      console.error("Failed to download document:", error);
    }
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          onSelect={(e) => e.preventDefault()}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">{t("labels.details")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-4 sm:px-0">
          <DialogTitle className="text-base font-semibold leading-7 text-gray-900">
            {t("bills.dialog.details.title")}
          </DialogTitle>
          <DialogDescription className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            {t("bills.dialog.details.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("labels.description")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bill.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("labels.category")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bill.category}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {t("labels.status")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {getStatusBadge(bill.status)}
              </dd>
            </div>
            {bill.status === "paid" ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.paymentDate")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bill.paymentDate &&
                    format(bill.paymentDate, "Pp", { locale: ptBR })}
                </dd>
              </div>
            ) : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.dueDate")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {format(bill.dueDate, "P", { locale: ptBR })}
                </dd>
              </div>
            )}

            {bill.status === "paid" ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.amountPaid")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {`$${bill.amountPaid?.toFixed(2)}`}
                </dd>
              </div>
            ) : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.amountDue")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {`$${bill.amountDue.toFixed(2)}`}
                </dd>
              </div>
            )}

            {bill.notes ? (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.notes")}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {bill.notes}
                </dd>
              </div>
            ) : null}
            {bill.documents && bill.documents.length > 0 && (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {t("labels.attachments")}
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    {bill.documents.map((document) => (
                      <li
                        key={document.id}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <Paperclip
                            aria-hidden="true"
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {document.fileName}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            onClick={() =>
                              handleDownloadDocument(
                                document.id,
                                document.fileName
                              )
                            }
                            className="font-medium text-blue-700 hover:text-blue-500"
                          >
                            {t("labels.download")}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </DialogContent>
    </Dialog>
  );
}
