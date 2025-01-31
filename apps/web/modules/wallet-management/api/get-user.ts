import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponseType } from "~/auth/api/reset-password";

export const getUserHandler = async (): Promise<ServerResponseType> => {
  const token = getCookie("accessToken");
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export type queryConfigOption = {
  enabled?: boolean;
};

export const useGetUser = ({ enabled }: queryConfigOption) => {
  return useQuery<ServerResponseType, Error>({
    queryKey: ["user"],
    queryFn: () => getUserHandler(),
    enabled,
  });
};
