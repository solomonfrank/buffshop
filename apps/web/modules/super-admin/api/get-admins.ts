import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";

export const getAdminHandler = async (
  req: Record<string, string>
): Promise<AdminProps[]> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<AdminProps[]>>(
    `${API_BASE_URL}/user/admin?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as AdminProps[];
};

export type GetTenantFnProps = {
  page?: number;
};

const getAttendeesFn = async (
  data: Record<string, string>
): Promise<AdminProps[]> => {
  const response = await getAdminHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export type AdminProps = {
  name: string;
  email: string;
  status: string;
  updatedAt: string;
  lastlogin: string;
  id: string;
};

export type AdminTableProps = Pick<
  AdminProps,
  "email" | "name" | "status" | "lastlogin" | "id"
>;

export const useGetAdmins = ({ filter, enabled }: queryConfigOption) => {
  return useQuery<AdminProps[], Error>({
    queryKey: ["admins", JSON.stringify(filter)],
    queryFn: () => getAttendeesFn(filter),
    enabled,
  });
};
