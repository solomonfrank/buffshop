import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";

export const getTransactionHandler = async (
  req: Record<string, string>
): Promise<TransactionProps[]> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<TransactionProps[]>>(
    `${API_BASE_URL}/payment?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as TransactionProps[];
};

export type GetTenantFnProps = {
  page?: number;
};

const getTenantTransactionFn = async (
  data: Record<string, string>
): Promise<TransactionProps[]> => {
  const response = await getTransactionHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export type TransactionProps = {
  amount: string;
  status: string;
  createdAt: string;
  description: string;
  id: string;
};

export const useTenantTransaction = ({
  filter,
  enabled,
}: queryConfigOption) => {
  return useQuery<TransactionProps[], Error>({
    queryKey: ["tenant-trnsactions", JSON.stringify(filter)],
    queryFn: () => getTenantTransactionFn(filter),
    enabled,
  });
};
