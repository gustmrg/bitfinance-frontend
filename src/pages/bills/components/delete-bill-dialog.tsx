import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DeleteBillDialogProps {
  id: string;
  onDelete: (id: string) => void;
}

export function DeleteBillDialog({ id, onDelete }: DeleteBillDialogProps) {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">{t("labels.delete")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 rounded-md">
        <AlertDialogHeader className="px-4 py-3 flex flex-row items-start justify-start gap-4">
          <div>
            <AlertDialogTitle className="text-base font-semibold leading-6 text-gray-900">
              {t("bills.dialog.delete.title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2">
              <p className="text-sm text-gray-500">
                {t("bills.dialog.delete.description")}
              </p>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-gray-50 px-4 py-3 rounded-md">
          <AlertDialogCancel>{t("labels.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(id)}
          >
            {t("labels.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
