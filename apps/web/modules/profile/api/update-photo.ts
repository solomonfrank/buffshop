import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

export type ImageServerResponse = {
  data: string;
};

export const createUpdateImageFn = (data: { image: File }) => {
  const token = getCookie("accessToken");

  const formData = new FormData();
  formData.append("image", data.image);

  return fetchJson<ServerResponse<string>>(`${API_BASE_URL}/user/image`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const useUpdateProfileImage = (
  options?: Omit<
    UseMutationOptions<ServerResponse<string>, ErrorMessageProps, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createUpdateImageFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
