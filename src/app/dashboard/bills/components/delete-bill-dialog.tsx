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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface DeleteBillDialogProps {
  id: string;
  onDelete: (id: string) => void;
}

export function DeleteBillDialog({ id, onDelete }: DeleteBillDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 rounded-md">
        <AlertDialogHeader className="px-4 py-3 flex flex-row items-start justify-start gap-4">
          <div className="mx-auto mt-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>
          <div>
            <AlertDialogTitle className="text-base font-semibold leading-6 text-gray-900">
              Delete bill
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this bill? All of its data will
                be permanently removed. This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="bg-gray-50 px-4 py-3 rounded-md">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
