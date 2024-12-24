import { fetchJson } from "@buff/lib";

import { API_BASE_URL } from "@config/constant";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type WaitListType = {
  name: string;
  email: string;
  referral: string;
  user_type: string;
  product_category: string;
};

export type ServerResponse = {
  data: Record<string, string>;
  message: string;
};

export type EventResponse = {
  data: Record<string, string>;
};

export const joinWaitlistFn = (data: WaitListType) => {
  return fetchJson<ServerResponse>(`${API_BASE_URL}/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const useJoinWaitlist = (
  options?: Omit<
    UseMutationOptions<ServerResponse, Error, unknown>,
    "mutationFn"
  >
) => {
  return useMutation({
    ...options,
    mutationFn: joinWaitlistFn,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
    },
  });
};
