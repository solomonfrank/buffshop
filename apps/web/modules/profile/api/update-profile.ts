import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

import { z } from "zod";
import { LoginResponse } from "~/tenant/api/create-tenant";

export const ProfileInputSchema = z.object({
  address: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string(),
});

export type ProfileUpdateInput = z.infer<typeof ProfileInputSchema>;

export const updateProfileFn = (data: ProfileUpdateInput) => {
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

export const useUpdateProfile = (
  options?: Omit<
    UseMutationOptions<
      ServerResponse<LoginResponse>,
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
