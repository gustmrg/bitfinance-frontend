import { useAuth } from "@/auth/auth-provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import logoImg from "/assets/logo.png";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/
);

const signInForm = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 characters" })
    .regex(passwordValidation, { message: "Password format is invalid" }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const { login, getMe } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSignIn(data: SignInForm) {
    const isSuccess = await login({
      email: data.email,
      password: data.password,
    });
    if (isSuccess) {
      await getMe();
      navigate("/dashboard");
    } else {
      toast.error("Login failed. Check your email and password and try again.");
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="BitFinance logo"
          src={logoImg}
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t("auth.signIn.title")}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t("auth.signIn.demoAccount")}
            <br />
            <strong>Username:</strong> demo@bitfinance.com
            <br />
            <strong>{t("labels.password")}:</strong> Demo@123
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSignIn)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@email.com"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium leading-6 text-gray-900">
                    {t("labels.password")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2">
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                disabled={form.formState.isSubmitting}
              >
                {t("labels.signIn")}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-6">
          <p className="text-sm text-center leading-5 text-gray-600">
            {t("auth.signIn.redirect")}{" "}
            <NavLink
              to={form.formState.isSubmitting ? "#" : "/auth/sign-up"}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("labels.signUp")}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
