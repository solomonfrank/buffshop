import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const CreateTenantAuthInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  password: z.string().min(5, "Required"),
});

export type CreateTenantAuthInput = z.infer<typeof CreateTenantAuthInputSchema>;

export const createAuthTenantFn = (data: CreateTenantAuthInput) => {
  return fetchJson<TenantUserServerResponse>(`${API_BASE_URL}/user/tenant`, {
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

export const useCreateAuthTenant = (
  options?: Omit<
    UseMutationOptions<TenantUserServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createAuthTenantFn,
  });
};
