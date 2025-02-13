import { fetchJson, passwordValidator } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { AuthServerResponse } from "_types";

export const createBuyerInputSchema = z.object({
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

  email: z.string().trim().email({ message: "Invalid email address" }),
});
export type createBuyerInput = z.infer<typeof createBuyerInputSchema>;

export const createBuyerFn = (data: createBuyerInput) => {
  return fetchJson<AuthServerResponse>(`${API_BASE_URL}/user/buyer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const useCreateBuyer = (
  options?: Omit<
    UseMutationOptions<AuthServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createBuyerFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
