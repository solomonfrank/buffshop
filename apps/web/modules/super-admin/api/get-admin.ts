import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";
import { AdminProps } from "./get-admins";
const getEvent = async (id: string): Promise<ServerResponse<AdminProps>> => {
  const token = getCookie("accessToken");
  return fetchJson<ServerResponse<AdminProps>>(
    `${API_BASE_URL}/user/admin/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const useGetEventById = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery<ServerResponse<AdminProps>, Error>({
    queryFn: () => getEvent(id),
    queryKey: ["event", id],
    enabled,
  });
};
