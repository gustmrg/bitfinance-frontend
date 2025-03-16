import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { UpdateProfile } from "@/api/account/update-profile";
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();

  async function onSubmit(data: UpdateProfileFormValues) {
    try {
      const response = await UpdateProfile(data);

      if (response) {
        console.log(response);

        toast({
          title: "Profile updated",
          description:
            "You have successfully updated your account information.",
        });
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  }

  return (
    <div className="space-y-6 lg:w-1/2 p-4">
      <div>
        <h3 className="text-lg font-bold">Account</h3>
        <p className="text-sm text-zinc-500">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <div className="space-x-4">
              <Button type="submit">Update account</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
