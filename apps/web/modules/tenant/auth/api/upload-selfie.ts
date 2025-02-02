import { fetchJson } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

export type ImageServerResponse = {
  data: string;
};

export const createSelfieFn = (data: { image: File }) => {
  const userInfo = localStorage.getItem("tenant_user");
  const userData = userInfo && JSON.parse(userInfo);

  const formData = new FormData();
  formData.append("image", data.image);

  return fetchJson<ServerResponse<string>>(`${API_BASE_URL}/user/image`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
    body: formData,
  });
};

export const useUploadSelfie = (
  options?: Omit<
    UseMutationOptions<ServerResponse<string>, ErrorMessageProps, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createSelfieFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
