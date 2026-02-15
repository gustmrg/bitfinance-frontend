import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";

const UpdateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type UpdateProfileFormValues = z.infer<typeof UpdateProfileSchema>;

export function Account() {
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
        toast.success("Profile updated", {
          description: "You have successfully updated your account information.",
        });
      }
    } catch {
      // Error toast is handled globally by Axios interceptors.
    }
  }

  return (
    <PageContainer className="max-w-3xl">
      <div>
        <h3 className="text-lg font-bold">Account</h3>
        <p className="text-sm text-zinc-500">
          This is how others will see you on the site.
        </p>
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
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>Enter your first name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>Enter your last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update account</Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
