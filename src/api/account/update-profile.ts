import { privateAPI } from "@/lib/axios";

const api = privateAPI();

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

export async function UpdateProfile({
  firstName,
  lastName,
}: UpdateProfileRequest) {
  const response = await api.post("/identity/manage/profile", {
    firstName,
    lastName,
  });

  return response.data;
}
