import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "_types";
import { FileWithPreview } from "../components/file-upload";

export const getProductHandler = async (
  req: Record<string, string>
): Promise<ProductProps[]> => {
  const query = new URLSearchParams(req).toString();
  const token = getCookie("accessToken");
  const res = await fetchJson<ServerResponse<ProductProps[]>>(
    `${API_BASE_URL}/product?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as ProductProps[];
};

export type GetTenantFnProps = {
  page?: number;
};

const getProductsFn = async (
  data: Record<string, string>
): Promise<ProductProps[]> => {
  const response = await getProductHandler(data);
  return response;
};

export type queryConfigOption = {
  filter: Record<string, string>;
  enabled?: boolean;
};

export type ProductProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  product_type: string;
  number_of_products: string;
  minimum_restock: string;
  pickup_location: string;
  pickup_time: string;
  subscription_type: string;
  createdAt: string;
  updatedAt: string;
  discount: string;
  images: FileWithPreview[];
};

export const useGetProducts = ({ filter, enabled }: queryConfigOption) => {
  return useQuery<ProductProps[], Error>({
    queryKey: ["products", JSON.stringify(filter)],
    queryFn: () => getProductsFn(filter),
    enabled,
  });
};
