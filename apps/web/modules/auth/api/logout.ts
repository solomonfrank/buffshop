import { fetchJson, getCookie } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "./reset-password";

export const logoutFn = () => {
  const token = getCookie("accessToken");
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
};

export const uselogout = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: logoutFn,
  });
};
