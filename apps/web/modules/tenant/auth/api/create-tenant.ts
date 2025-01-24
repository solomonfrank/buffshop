import { fetchJson, passwordValidator } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const CreateTenantAuthInputSchema = z.object({
  email: z.string().min(1, "Email is Required").email("Invalid email"),
  firstName: z.string().min(1, "Firstname is required"),
  lastName: z.string().min(1, "Lastname is required"),
  password: z
    .string()
    .trim()
    .superRefine((password, ctx) => {
      const passwordTestResult = passwordValidator(password);
      Object.keys(passwordTestResult).map((rule) => {
        const ruleCtx =
          passwordTestResult[rule as keyof typeof passwordTestResult];
        if (!ruleCtx.validator) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: ruleCtx?.message,
            path: [rule],
          });
        }
      });
    }),
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
