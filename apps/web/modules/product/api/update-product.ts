import { fetchJson, getCookie } from "@buff/lib";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { API_BASE_URL } from "@config/constant";
import { ServerResponseType } from "~/auth/api/reset-password";
import {
  PhysicalProductCreationInput,
  ProductCreationInput,
} from "./create-product";

export type updateProductInput = {
  id: string;
  payload: ProductCreationInput | PhysicalProductCreationInput;
};

export const updateProductFn = (data: updateProductInput) => {
  const token = getCookie("accessToken");

  let payload: Record<string, any> = data.payload;

  if ("subscription_type" in payload) {
    payload = {
      ...data.payload,
      subscription_type: payload.subscription_type.value,
    };
  }
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/product/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

export const useUpdateProduct = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, Error, unknown>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: updateProductFn,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(...args);
    },
  });
};
