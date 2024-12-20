import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "./reset-password";

export const otpInputSchema = z.object({
  email: z.string().min(1, "Required"),
  otp: z.string().min(6, "Required"),
});

export type otpInput = z.infer<typeof otpInputSchema>;

export const otpFn = (data: otpInput) => {
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const useOtp = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: otpFn,
  });
};
