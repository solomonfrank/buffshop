import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "~/auth/api/reset-password";

type CreateNinRequest = {
  nin: string;
  firstName: string;
  lastName: string;
};

export const createNinFn = (data: CreateNinRequest) => {
  const userInfo = localStorage.getItem("tenant_user");
  const userData = userInfo && JSON.parse(userInfo);
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user/nin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
    body: JSON.stringify(data),
  });
};

export const useCreateNin = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createNinFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
