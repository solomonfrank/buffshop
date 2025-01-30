import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

import { z } from "zod";

export const ProfileInputSchema = z.object({
  address: z.string().min(3, "Contact Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileInputSchema>;

export type TenantResponse = {
  data: Record<string, string>;
};

export const updateProfileFn = (data: ProfileUpdateInput) => {
  const token = getCookie("accessToken");

  return fetchJson<ServerResponse<TenantResponse>>(`${API_BASE_URL}/user`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const useUpdateProfile = (
  options?: Omit<
    UseMutationOptions<
      ServerResponse<TenantResponse>,
      ErrorMessageProps,
      unknown
    >,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateProfileFn,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(...args);
    },
  });
};
