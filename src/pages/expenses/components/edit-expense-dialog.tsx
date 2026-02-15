import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PencilLine } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { AdaptiveModal } from "@/components/ui/adaptive-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Expense } from "../types";

const EditExpenseSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .positive("Amount must be a positive number"),
  occurredAt: z.date(),
  status: z.string(),
});

type EditExpenseForm = z.infer<typeof EditExpenseSchema>;

interface EditExpenseDialogProps {
  expense: Expense;
  onEdit: (data: any) => void;
}

export default function EditExpenseDialog({
  expense,
  onEdit,
}: EditExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<EditExpenseForm>({
    resolver: zodResolver(EditExpenseSchema),
    defaultValues: {
      id: expense.id,
      description: expense.description,
      category: expense.category,
      status: expense.status,
      amount: expense.amount,
      occurredAt: expense.occurredAt ? new Date(expense.occurredAt) : undefined,
    },
  });

  const { t } = useTranslation();

  const handleEditExpense: SubmitHandler<EditExpenseForm> = (
    data: EditExpenseForm
  ) => {
    setOpen(false);
    onEdit(data);
  };

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>{t("labels.edit")}</span>
        </DropdownMenuItem>
      }
      title="Edit Expense"
      description="Edit your expense information. Click to add when you're done."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleEditExpense)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Description</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="debt">Debt</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Amount</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3"
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseFloat(event.target.value))
                    }
                    inputMode="decimal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occurredAt"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" type="button" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button variant="default" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </AdaptiveModal>
  );
}
