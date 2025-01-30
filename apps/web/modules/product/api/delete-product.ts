import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessageProps } from "_types";
import { ServerResponseType } from "~/auth/api/reset-password";

export const deleteProductHandler = async (id: string) => {
  const token = getCookie("accessToken");
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeleteProduct = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, ErrorMessageProps, unknown>,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: deleteProductHandler,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(...args);
    },
  });
};
