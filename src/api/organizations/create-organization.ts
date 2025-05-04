import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface CreateOrganizationRequest {
  name: string;
}

export interface CreateOrganizationResponse {
  id: string;
  name: string;
}

export async function createOrganization({
  name,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse | undefined> {
  try {
    const response = await api.post<CreateOrganizationResponse>(
      "/organizations",
      {
        name,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not find a valid access token");
  }
}
