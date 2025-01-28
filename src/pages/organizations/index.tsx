import { useAuth } from "@/auth/auth-provider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Organizations() {
  const { user, isAuthenticated, isLoading, selectedOrganization } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/auth/sign-in");
      return;
    }

    let organizationId = selectedOrganization ? selectedOrganization.id : null;
  }, [isAuthenticated, isLoading, navigate, selectedOrganization]);

  return (
    <div className="grow m-6 p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm dark:lg:bg-zinc-900">
      <div className="flex flex-row items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
            Organizations
          </h1>
          <p className="text-sm font-regular text-zinc-500">
            Manage your organizations and add or remove members.
          </p>
        </div>
      </div>
      <div className="flow-root">
        <div className="mt-8 overflow-x-auto whitespace-nowrap">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
              Members
            </h2>
            <p className="text-sm font-regular text-zinc-500">
              A list of all the users in your organization including their name,
              email and role.
            </p>
          </div>
          <Table className="min-w-full text-left text-sm/6 text-zinc-950 dark:text-white">
            <TableHeader className="font-sans text-zinc-500 dark:text-zinc-400">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-sans"></TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
