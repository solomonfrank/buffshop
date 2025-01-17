import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";

export const getTenantHandler = async (
  req: Record<string, string>
): Promise<TenantsProps[]> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<TenantsProps[]>>(
    `${API_BASE_URL}/user/admin/tenant?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as TenantsProps[];
};

export type GetTenantFnProps = {
  page?: number;
};

const getTenantsFn = async (
  data: Record<string, string>
): Promise<TenantsProps[]> => {
  const response = await getTenantHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export type TenantsProps = {
  name: string;
  email: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  lastlogin: string;
  business_name: string;
  phone: string;
  id: string;
};

export type TenantTableProps = Pick<
  TenantsProps,
  "email" | "name" | "status" | "lastlogin" | "id"
>;

export const useGetTenants = ({ filter, enabled }: queryConfigOption) => {
  return useQuery<TenantsProps[], Error>({
    queryKey: ["tenants", JSON.stringify(filter)],
    queryFn: () => getTenantsFn(filter),
    enabled,
  });
};
