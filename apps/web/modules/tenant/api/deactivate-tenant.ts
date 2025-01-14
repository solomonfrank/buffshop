import { fetchJson, getCookie } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponse } from "_types";

type ServerResponseType = ServerResponse<Record<string, string>>;
export const deactivateTenantFn = (data: Record<string, string>) => {
  const url = data.status === "active" ? "deactivate" : "reactivate";
  const payload = {
    id: data.id,
  };
  const token = getCookie("accessToken");
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/admin/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const useDeactivateTenant = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: deactivateTenantFn,
  });
};
