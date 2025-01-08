import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";

export const getPermissionHandler = async (): Promise<PermissionType> => {
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<PermissionType>>(
    `${API_BASE_URL}/user/permission`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as PermissionType;
};

const getPermissionFn = async (): Promise<PermissionType> => {
  const response = await getPermissionHandler();
  return response;
};

export type queryConfigOption = {
  enabled?: boolean;
};

type PermissionsProps = {
  id: string;
  name: string;
};

export type PermissionType = PermissionsProps[];

export const useGetPermission = ({ enabled }: queryConfigOption) => {
  return useQuery<PermissionType, Error>({
    queryKey: ["permissions"],
    queryFn: () => getPermissionFn(),
    enabled,
  });
};
