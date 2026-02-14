import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { createOrganization } from "@/api/organizations/create-organization";
import {
  useGetMeAction,
  useSetSelectedOrganizationId,
} from "@/auth/auth-provider";
import { Button } from "@/components/ui/button";

import logoImg from "/assets/logo.png";

export function CreateOrganization() {
  const [organizationName, setOrganizationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const getMe = useGetMeAction();
  const setSelectedOrganizationId = useSetSelectedOrganizationId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!organizationName.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await createOrganization({ name: organizationName });
      await getMe();
      setSelectedOrganizationId(response.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating organization:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md sm:p-8">
        <img alt="BitFinance" src={logoImg} className="mx-auto h-14 w-auto" />
        <h2 className="mb-4 mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your organization
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Give your organization a name to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="organizationName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Organization Name
            </label>
            <div className="mt-2">
              <input
                id="organizationName"
                name="organizationName"
                type="text"
                required
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                placeholder="e.g., Acme Inc."
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!organizationName.trim() || isLoading}
            className="flex w-full justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Create Organization & Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
