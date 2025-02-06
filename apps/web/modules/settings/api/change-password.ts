import { fetchJson, getCookie, passwordValidator } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ServerResponse } from "_types";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(3, "Old password is required."),
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

export type changePasswordInput = {
  currentPassword: string;
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
export const changePasswordFn = (data: changePasswordInput) => {
  const token = getCookie("accessToken");

  const payload = {
    old_password: data.currentPassword,
    new_password: data.password,
  };
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  });
};

export const useChangePassword = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: changePasswordFn,
  });
};
