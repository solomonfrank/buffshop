import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "~/auth/api/reset-password";

export const createKycFn = (data: Record<string, string>) => {
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/kyc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export type TenantUserServerResponse = {
  data: {
    token: string;
    user: LoginResponse;
  };
};

export type ServerResponse = {
  data: LoginResponse;
};

export type LoginResponse = {
  data: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  email: string;
  id: string;
  userName: string;
  otp?: string;
  role: string;
  name: string;
};

export const useCreateKycTenant = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createKycFn,
  });
};
