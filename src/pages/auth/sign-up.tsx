import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import logoImg from "/assets/logo.png";
import { useAuth } from "@/auth/auth-provider";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/
);

const signUpForm = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 characters" })
    .regex(passwordValidation, { message: "Password format is invalid" }),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSignUp(data: SignUpForm) {
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.password, // Assuming confirmPassword is the same as password for now
      });
      navigate({ to: "/organizations" });
    } catch (error) {
      // Handle registration error (e.g., show a toast notification)
      console.error("Registration failed:", error);
      // You might want to display an error message to the user here
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
          {t("auth.signUp.title")}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium leading-6 text-gray-900">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Steve" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Jobs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                {t("labels.signUp")}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-6">
          <p className="text-sm text-center leading-5 text-gray-600">
            {t("auth.signUp.redirect")}{" "}
            <Link
              to="/auth/sign-in"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("labels.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
