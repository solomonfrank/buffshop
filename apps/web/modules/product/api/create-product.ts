import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessageProps, ServerResponse } from "_types";

import { z } from "zod";

export const ProductInputSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.number().min(0, "Discount required"),
  description: z.string().min(1, "Description is required"),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed")
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/gif"].includes(file.type)
        ),
      "All files must be JPG, PNG or GIF"
    )
    .refine(
      (files) => files.every((file) => file.size <= 25 * 1024 * 1024),
      "Each file must be less than 25MB"
    )
    .refine((files) => {
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      return totalSize <= 50 * 1024 * 1024;
    }, "Total size must not exceed 50MB"),
  drmProtection: z.boolean(),
  subscription_type: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

export const ProductPhysicalInputSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.number().min(0, "Discount required"),
  description: z.string().min(1, "Description is required"),
  currency: z.string().nullable(),
  number_of_products: z.string().min(1, "Number of product is required"),
  pickup_location: z.string().min(1, "Pickup location is required"),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed")
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/gif"].includes(file.type)
        ),
      "All files must be JPG, PNG or GIF"
    )
    .refine(
      (files) => files.every((file) => file.size <= 25 * 1024 * 1024),
      "Each file must be less than 25MB"
    )
    .refine((files) => {
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      return totalSize <= 50 * 1024 * 1024;
    }, "Total size must not exceed 50MB"),
});

export type ProductCreationInput = z.infer<typeof ProductInputSchema>;
export type PhysicalProductCreationInput = z.infer<
  typeof ProductPhysicalInputSchema
>;

export type TenantResponse = {
  data: Record<string, string>;
};

export const createProductFn = (
  data: ProductCreationInput | PhysicalProductCreationInput
) => {
  const token = getCookie("accessToken");

  let payload: ProductCreationInput | PhysicalProductCreationInput = data;

  if ("subscription_type" in data) {
    payload = {
      ...data,
      subscription_type: data.subscription_type,
    };
  }

  const formData = new FormData();

  Object.entries(payload).forEach(([key, bvalue]) => {
    if (Array.isArray(bvalue)) {
      bvalue.forEach((document, index) => {
        formData.append(`${key}`, document);
      });
    } else {
      if (typeof bvalue === "object") {
        formData.append(key, `${bvalue?.value as string}`);
      } else {
        formData.append(key, `${bvalue}`);
      }
    }
  });
  return fetchJson<ServerResponse<TenantResponse>>(`${API_BASE_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const useCreateProduct = (
  options?: Omit<
    UseMutationOptions<
      ServerResponse<TenantResponse>,
      ErrorMessageProps,
      unknown
    >,
    "mutationFn"
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createProductFn,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.(...args);
    },
  });
};
