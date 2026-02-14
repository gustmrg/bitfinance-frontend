import { useQuery } from "@tanstack/react-query";

import type { User } from "@/auth/types";
import { authApi } from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";

interface MeResponse {
  id: string;
  username: string;
  fullName: string;
  email: string;
  organizations?: User["organizations"];
}

export async function fetchMeAsync(): Promise<User> {
  const response = await authApi.get<MeResponse>("/identity/me");

  return {
    id: response.data.id,
    username: response.data.username,
    fullName: response.data.fullName,
    email: response.data.email,
    organizations: response.data.organizations ?? [],
  };
}

export function useMeQuery(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: fetchMeAsync,
    enabled,
  });
}
