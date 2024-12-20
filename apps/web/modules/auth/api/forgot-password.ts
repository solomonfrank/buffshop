import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "./reset-password";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
});

export type loginInput = z.infer<typeof loginInputSchema>;

export type LoginRequest = loginInput;

export const forgotPasswordFn = (data: LoginRequest) => {
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const useForgotPassword = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: forgotPasswordFn,
  });
};
