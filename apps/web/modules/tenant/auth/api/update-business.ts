import { fetchJson } from "@buff/lib";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { API_BASE_URL } from "@config/constant";

export const BusinessFormScheme = z.object({
  businessName: z.string().trim().min(1, { message: "Business is required" }),
});

export type BusinessFormInput = z.infer<typeof BusinessFormScheme>;

export const updateTenantBusinessFn = (data: BusinessFormInput) => {
  const userInfo = localStorage.getItem("tenant_user");
  const userData = userInfo && JSON.parse(userInfo);

  return fetchJson<BusinessServerResponse>(`${API_BASE_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    },
    body: JSON.stringify(data),
  });
};

export type BusinessServerResponse = {
  data: Record<string, string>;
};

export const useUpdateTenantBusiness = (
  options?: Omit<
    UseMutationOptions<BusinessServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateTenantBusinessFn,
  });
};
