import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const AddExpenseSchema = z.object({
  description: z.string().min(1, "Description is required"),
  category: z.string(),
  amount: z.coerce
    .number({ required_error: "Amount is required" })
    .positive("Amount must be a positive number"),
  occurredAt: z.date(),
  status: z.string(),
});

type AddExpenseForm = z.infer<typeof AddExpenseSchema>;

interface AddExpenseDialogProps {
  onAddExpense: (data: AddExpenseForm) => void;
}

export function AddExpenseDialog({ onAddExpense }: AddExpenseDialogProps) {
  const [open, setOpen] = useState<boolean>();
  const form = useForm<AddExpenseForm>({
    resolver: zodResolver(AddExpenseSchema),
  });
  const { t } = useTranslation();

  const handleAddExpense: SubmitHandler<AddExpenseForm> = (
    data: AddExpenseForm
  ) => {
    setOpen(false);
    onAddExpense(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="h-8 gap-2 cursor-pointer p-4 font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm"
        >
          <FontAwesomeIcon icon={faPlus} />
          {t("expenses.cta")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("expenses.dialog.add.title")}</DialogTitle>
          <DialogDescription>
            {t("expenses.dialog.add.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddExpense)}
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
                      <SelectItem value="travel">
                        {t("labels.travel")}
                      </SelectItem>
                      <SelectItem value="pets">{t("labels.pets")}</SelectItem>
                      <SelectItem value="gifts">{t("labels.gifts")}</SelectItem>
                      <SelectItem value="subscriptions">
                        {t("labels.subscriptions")}
                      </SelectItem>
                      <SelectItem value="taxes">{t("labels.taxes")}</SelectItem>
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
              name="amount"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    {t("labels.amount")}
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
              name="occurredAt"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    {t("labels.date")}
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
                      <SelectItem value="pending">
                        {t("labels.pending")}
                      </SelectItem>
                      <SelectItem value="paid">{t("labels.paid")}</SelectItem>
                      <SelectItem value="cancelled">
                        {t("labels.cancelled")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => form.reset()}
              >
                {t("labels.reset")}
              </Button>
              <Button
                variant="default"
                type="submit"
                className="font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-smcursor-default"
              >
                {t("expenses.cta")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
