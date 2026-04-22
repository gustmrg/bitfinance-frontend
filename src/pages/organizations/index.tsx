import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { ArrowRight, BadgeCheck, Building2, Loader2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  useGetMeAction,
  useSetSelectedOrganizationId,
} from "@/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useOrganizationMutations } from "@/hooks/mutations/use-organization-mutations";

import logoImg from "/assets/app-icon.png";

const createOrganizationSchema = z.object({
  name: z.string().trim().min(1),
});

type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;

export function CreateOrganization() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getMe = useGetMeAction();
  const setSelectedOrganizationId = useSetSelectedOrganizationId();
  const { createOrganizationAsync, isCreatingOrganization } =
    useOrganizationMutations();

  const form = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: CreateOrganizationFormValues) => {
    try {
      const response = await createOrganizationAsync({
        name: data.name,
      });

      await getMe();
      setSelectedOrganizationId(response.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 via-background to-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="order-2 lg:order-1">
          <Card className="border-zinc-200/80 bg-white/90 shadow-xl backdrop-blur">
            <CardHeader className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                {t("organization.create.eyebrow")}
              </Badge>
              <div className="space-y-3">
                <CardTitle className="text-3xl leading-tight sm:text-4xl">
                  {t("organization.create.title")}
                </CardTitle>
                <CardDescription className="max-w-xl text-base leading-7">
                  {t("organization.create.description")}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <Building2 className="mb-3 h-5 w-5 text-foreground" />
                  <p className="text-sm font-medium">
                    {t("organization.create.benefits.workspace")}
                  </p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <Users className="mb-3 h-5 w-5 text-foreground" />
                  <p className="text-sm font-medium">
                    {t("organization.create.benefits.invites")}
                  </p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <BadgeCheck className="mb-3 h-5 w-5 text-foreground" />
                  <p className="text-sm font-medium">
                    {t("organization.create.benefits.settings")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="border-zinc-200/80 bg-white/95 shadow-xl backdrop-blur">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <img alt="BitFinance" src={logoImg} className="h-12 w-auto" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">BitFinance</p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {t("organization.create.formTitle")}
                  </h2>
                </div>
              </div>
              <CardDescription className="text-sm leading-6">
                {t("organization.create.formDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("organization.create.nameLabel")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("organization.create.namePlaceholder")}
                            autoComplete="organization"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("organization.create.nameDescription")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || isCreatingOrganization}
                    className="w-full justify-center gap-2"
                  >
                    {isCreatingOrganization ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                    {isCreatingOrganization
                      ? t("organization.create.submitting")
                      : t("organization.create.submit")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
