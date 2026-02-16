import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";

import { UpdateProfile } from "@/api/account/update-profile";
import { PageContainer } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const languages = [
  { locale: "en-US", name: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { locale: "pt-BR", name: "Portugu\u00eas", flag: "\u{1F1E7}\u{1F1F7}" },
];

const UpdateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type UpdateProfileFormValues = z.infer<typeof UpdateProfileSchema>;

export function Account() {
  const { t, i18n } = useTranslation();

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(data: UpdateProfileFormValues) {
    try {
      const response = await UpdateProfile(data);

      if (response) {
        toast.success(t("account.updateSuccess"), {
          description: t("account.updateSuccessDescription"),
        });
      }
    } catch {
      // Error toast is handled globally by Axios interceptors.
    }
  }

  return (
    <PageContainer className="max-w-3xl">
      <div>
        <h3 className="text-lg font-bold">{t("account.title")}</h3>
        <p className="text-sm text-zinc-500">{t("account.subtitle")}</p>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("account.firstName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("account.firstNamePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("account.firstNameDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("account.lastName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("account.lastNamePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("account.lastNameDescription")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{t("account.updateAccount")}</Button>
          </form>
        </Form>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-bold">
          {t("account.preferences.title")}
        </h3>
        <p className="text-sm text-zinc-500">
          {t("account.preferences.subtitle")}
        </p>
      </div>
      <div className="space-y-2">
        <Label>{t("account.preferences.language")}</Label>
        <Select
          value={i18n.language}
          onValueChange={(locale) => i18n.changeLanguage(locale)}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.locale} value={lang.locale}>
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[0.8rem] text-muted-foreground">
          {t("account.preferences.languageDescription")}
        </p>
      </div>
    </PageContainer>
  );
}
