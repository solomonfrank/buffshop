import { fetchJson, getCookie } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponse } from "_types";

type ServerResponseType = ServerResponse<Record<string, string>>;
export const assignAdminPermFn = (data: Record<string, string>) => {
  const url = data.status === "allow" ? "assign" : "remove";
  const payload = {
    id: data.id,
    name: data.name,
  };
  const token = getCookie("accessToken");
  return fetchJson<ServerResponseType>(
    `${API_BASE_URL}/user/permission/${url}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
};

export const useAssignPermAdminUser = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: assignAdminPermFn,
  });
};
