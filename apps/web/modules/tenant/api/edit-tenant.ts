import { fetchJson, getCookie } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { createTenantInput } from "./create-tenant";

export const updateTenantFn = (data: createTenantInput) => {
  const token = getCookie("accessToken");
  return fetchJson<LoginServerResponse>(`${API_BASE_URL}/user/admin/tenant`, {
    method: "PATCH",
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

export const useUpdateTenant = (
  options?: Omit<
    UseMutationOptions<LoginServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateTenantFn,
  });
};
