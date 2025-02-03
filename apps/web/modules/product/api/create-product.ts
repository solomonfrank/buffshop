import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ErrorMessageProps } from "_types";

import { z } from "zod";
import { ServerResponseType } from "~/auth/api/reset-password";

export interface FileWithPreview extends File {
  preview?: string;
  image?: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB in bytes

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const fileWithPreviewSchema = z.object({
  image: z.string().optional(),
  file: z.instanceof(File).nullable(),
  // .refine((file) => file === null || ALLOWED_FILE_TYPES.includes(file.type), {
  //   message: "Invalid file type. Only JPG, PNG, and GIF are allowed.",
  // })
  // .refine((file) => file === null || file.size <= MAX_FILE_SIZE, {
  //   message: "File size must be less than 25MB.",
  // }),
});

export const ProductInputSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.number().min(0, "Discount required"),
  description: z.string().min(1, "Description is required"),
  files: z
    .array(fileWithPreviewSchema)
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed"),
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
    .array(fileWithPreviewSchema)
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed"),
});

export const UpdateProductInputSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  discount: z.number().min(0, "Discount required"),
  description: z.string().min(1, "Description is required"),
  files: z.array(z.instanceof(File)).optional(),
  drmProtection: z.boolean(),
  subscription_type: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

export type ProductCreationInput = z.infer<typeof ProductInputSchema>;
export type PhysicalProductCreationInput = z.infer<
  typeof ProductPhysicalInputSchema
>;

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
        formData.append(`${key}`, document.file as File);
      });
    } else {
      if (typeof bvalue === "object") {
        formData.append(key, `${bvalue?.value as string}`);
      } else {
        formData.append(key, `${bvalue}`);
      }
    }
  });
  return fetchJson<ServerResponseType>(`${API_BASE_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
};

export const useCreateProduct = (
  options?: Omit<
    UseMutationOptions<ServerResponseType, ErrorMessageProps, unknown>,
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
