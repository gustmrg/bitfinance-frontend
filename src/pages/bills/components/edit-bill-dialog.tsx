import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CalendarIcon, PencilLine } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Bill } from "../types";
import { useTranslation } from "react-i18next";

const EditBillSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.string(),
  amountDue: z.number(),
  amountPaid: z.number().optional(),
  dueDate: z.date(),
  paymentDate: z.date().optional(),
  notes: z.string().optional(),
});

type EditBillForm = z.infer<typeof EditBillSchema>;

interface EditBillDialogProps {
  bill: Bill;
  onEdit: (data: any) => void;
}

export default function EditBillDialog({ bill, onEdit }: EditBillDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<EditBillForm>({
    resolver: zodResolver(EditBillSchema),
    defaultValues: {
      id: bill.id,
      description: bill.description,
      category: bill.category.toLowerCase(),
      status: bill.status,
      amountDue: bill.amountDue,
      amountPaid: bill.amountPaid ?? undefined,
      dueDate: bill.dueDate ? new Date(bill.dueDate) : undefined,
      paymentDate: bill.paymentDate ? new Date(bill.paymentDate) : undefined,
      notes: bill.notes ?? "",
    },
  });
  const { t } = useTranslation();

  const status = form.watch("status");

  const handleEditBill: SubmitHandler<EditBillForm> = (data: EditBillForm) => {
    setOpen(false);
    onEdit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>{t("labels.edit")}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("bills.dialog.edit.title")}</DialogTitle>
          <DialogDescription>
            {t("bills.dialog.edit.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditBill)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    {t("labels.description")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder={t("labels.description")}
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
                  <FormLabel className="text-right">
                    {t("labels.category")}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t("labels.selectCategory")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="housing">
                        {t("labels.housing")}
                      </SelectItem>
                      <SelectItem value="transportation">
                        {t("labels.transportation")}
                      </SelectItem>
                      <SelectItem value="food">{t("labels.food")}</SelectItem>
                      <SelectItem value="utilities">
                        {t("labels.utilities")}
                      </SelectItem>
                      <SelectItem value="clothing">
                        {t("labels.clothing")}
                      </SelectItem>
                      <SelectItem value="healthcare">
                        {t("labels.healthcare")}
                      </SelectItem>
                      <SelectItem value="insurance">
                        {t("labels.insurance")}
                      </SelectItem>
                      <SelectItem value="personal">
                        {t("labels.personal")}
                      </SelectItem>
                      <SelectItem value="debt">{t("labels.debt")}</SelectItem>
                      <SelectItem value="savings">
                        {t("labels.savings")}
                      </SelectItem>
                      <SelectItem value="education">
                        {t("labels.education")}
                      </SelectItem>
                      <SelectItem value="entertainment">
                        {t("labels.entertainment")}
                      </SelectItem>
                      <SelectItem value="miscellaneous">
                        {t("labels.miscellaneous")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amountDue"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    {t("labels.amount")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
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
              name="dueDate"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    {t("labels.dueDate")}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t("labels.pickDate")}</span>
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
                        <SelectValue placeholder={t("labels.selectStatus")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="upcoming">
                        {t("labels.upcoming")}
                      </SelectItem>
                      <SelectItem value="due">{t("labels.due")}</SelectItem>
                      <SelectItem value="paid">{t("labels.paid")}</SelectItem>
                      <SelectItem value="overdue">
                        {t("labels.overdue")}
                      </SelectItem>
                      <SelectItem value="cancelled">
                        {t("labels.cancelled")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {status === "paid" ? (
              <div>
                <FormField
                  control={form.control}
                  name="amountPaid"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        {t("labels.amountPaid")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="col-span-3"
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
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
                  name="paymentDate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        {t("labels.paymentDate")}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t("labels.pickDate")}</span>
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
              </div>
            ) : null}
            <DialogFooter className="mt-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setOpen(false)}
              >
                {t("labels.cancel")}
              </Button>
              <Button variant="default" type="submit">
                {t("labels.confirm")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
