import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

export type loginInput = z.infer<typeof loginInputSchema>;

export type LoginRequest = loginInput;

export const loginFn = (data: LoginRequest) => {
  return fetchJson<LoginServerResponse>(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
};

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: loginFn,
  });
};
