import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

import { LoginResponse } from "~/tenant/api/create-tenant";

export const updateProfileConfigFn = (data: Record<string, boolean>) => {
  const token = getCookie("accessToken");

  const { email, ...rest } = data;

  return fetchJson<ServerResponse<LoginResponse>>(`${API_BASE_URL}/user`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(rest),
  });
};

export const useUpdateProfileConfig = (
  options?: Omit<
    UseMutationOptions<
      ServerResponse<LoginResponse>,
      ErrorMessageProps,
      unknown
    >,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateProfileConfigFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
