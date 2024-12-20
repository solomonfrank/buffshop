import { fetchJson, passwordValidator } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ServerResponse } from "_types";
import { z } from "zod";

export const createPasswordSchema = z
  .object({
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

    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to the field where the error should be displayed
  });

export type createPasswordInput = {
  password: string;
  confirmPassword: string;
};

export type ResetPassword = {
  email: string;
  password: string;
  confirm_password: string;
  reset_code: string;
};

export type ServerResponseType = ServerResponse<Record<string, string>>;
export const resetPasswordFn = (data: ResetPassword) => {
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const useResetPassword = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: resetPasswordFn,
  });
};
