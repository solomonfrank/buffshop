import { fetchJson, getCookie } from "@buff/lib";
import { API_BASE_URL } from "@config/constant";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ServerResponse } from "_types";

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

export type ProductCreationInput = z.infer<typeof ProductInputSchema>;

// type ServerResponse = {
//   data: TenantResponse;
// };

export type TenantResponse = {
  data: Record<string, string>;
};

export const createProductFn = (data: ProductCreationInput) => {
  const token = getCookie("accessToken");

  const payload = {
    ...data,
    subscription_type: data.subscription_type.value,
    // files: data.files.map((item) => {
    //   if ("preview" in item) {
    //     return {
    //       ...item,
    //       preview: undefined,
    //     };
    //   } else {
    //     return item;
    //   }
    // }),
  };

  console.log("payload=>", payload);

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      console.log("previewpreview", value);
      value.forEach((document, index) => {
        console.log("document=>", document);
        console.log("keyee=>", key);

        formData.append(`${key}[${index}]`, document);
        // Object.entries(document).forEach(([innerkey, value]) => {
        //   console.log("innerkey=>", innerkey);

        //   if (innerkey !== "preview") {
        //     formData.append(`${key}[${index}].${innerkey}`, value);
        //   }
        // });
      });
    } else {
      formData.append(key, `${value}`);
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
    UseMutationOptions<ServerResponse<TenantResponse>, Error, unknown>,
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
