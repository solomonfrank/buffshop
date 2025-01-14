import { fetchJson, getCookie } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const createTenantInputSchema = z.object({
  phone: z.string().trim().min(1, { message: "Phone number is required" }),
  business_name: z
    .string()
    .trim()
    .min(1, { message: "Business name is required" }),
  name: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long." })
    .max(50, { message: "Full name must be less than 50 characters long." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Full name can only contain letters and spaces.",
    })
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Full name must include at least first and last name.",
    }),

  email: z.string().trim().email({ message: "Invalid email address" }),
});
export type createTenantInput = z.infer<typeof createTenantInputSchema>;

export const createATenantFn = (data: createTenantInput) => {
  const token = getCookie("accessToken");
  return fetchJson<LoginServerResponse>(`${API_BASE_URL}/user/admin/tenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export type LoginServerResponse = {
  data: {
    token: string;
    userData: LoginResponse;
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

export const useCreateTenant = (
  options?: Omit<
    UseMutationOptions<LoginServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createATenantFn,
  });
};