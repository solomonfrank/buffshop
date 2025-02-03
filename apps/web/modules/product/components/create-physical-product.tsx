"use client";
import {
  Button,
  InputField,
  Label,
  Loader,
  NumberInput,
  showToast,
} from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Slider from "@radix-ui/react-slider";
import { ErrorMessageProps } from "_types";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineWarning } from "react-icons/md";
import {
  PhysicalProductCreationInput,
  ProductPhysicalInputSchema,
  useCreateProduct,
} from "../api/create-product";
import { ProductProps } from "../api/get-product";
import { useUpdateProduct } from "../api/update-product";
import { ProductFileUpload } from "./create-digital-product";

export const CreatePhysicalForm = ({
  defaultValue,
}: {
  defaultValue?: ProductProps;
}) => {
  const router = useRouter();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const methods = useForm<PhysicalProductCreationInput>({
    resolver: zodResolver(ProductPhysicalInputSchema),
    mode: "onChange",
    defaultValues: {
      discount: 50,
      files: [],
    },
  });
  const onSuccess = (response: unknown) => {
    showToast(
      defaultValue
        ? "Product updated successfully"
        : "Product created successfully",
      "success"
    );
    setOpenConfirmModal(false);
    router.replace(`/app/product-management`);
  };

  const onError = (error: ErrorMessageProps) => {
    const errorMessage = JSON.parse(error.message);

    showToast(errorMessage?.message ?? "Something went wrong.", "error");
    setOpenConfirmModal(false);
  };

  const product = useCreateProduct({
    onSuccess,
    onError,
  });

  const updateProduct = useUpdateProduct({
    onSuccess,
    onError,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = (data: PhysicalProductCreationInput) => {
    setOpenConfirmModal(true);

    // login.mutate(payload);
  };

  const submitHandler = () => {
    const data = methods.getValues();

    const payload = {
      ...data,
      price: data.price.replace("₦", ""),
      product_type: "physical",
    };

    if (defaultValue) {
      const req = {
        id: defaultValue.id,
        payload,
      };
      updateProduct.mutate(req);
    } else {
      product.mutate(payload);
    }
  };

  useEffect(() => {
    console.log("defaultValue", defaultValue);
    if (defaultValue) {
      const {
        name,
        price,
        description,
        discount,
        pickup_location,
        number_of_products,
        // drmProtection,
        images,
      } = defaultValue;
      methods.setValue("name", name);
      methods.setValue("price", `${price}`);
      methods.setValue("number_of_products", `${number_of_products}`);
      methods.setValue("pickup_location", pickup_location);
      methods.setValue("description", description);
      methods.setValue("discount", Number(discount || 0));
      // methods.setValue("drmProtection", drmProtection);
    }
  }, [defaultValue]);

  return (
    <FormProvider {...methods}>
      <form
        className="w-full block mb-[1.6rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-[2.1rem]">
          <div className="w-1/2">
            <div className="mb-[2.4rem]">
              <div className="space-y-[3.2rem]">
                <Controller
                  control={methods.control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <InputField
                        label="PRODUCT NAME"
                        name="name"
                        labelProps={{ className: "text-[#B8B8B8]" }}
                        type="text"
                        placeholder="Enter product name"
                        containerClassName="mb-3"
                        onChange={onChange}
                        value={value}
                        className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                      />
                    </>
                  )}
                />

                <div className="flex gap-[2.4rem]">
                  <div className="w-1/2">
                    <div>
                      <Controller
                        control={methods.control}
                        name="number_of_products"
                        render={({ field: { value, onChange } }) => (
                          <>
                            <Label className="text-[1rem] uppercase  leading-[16px] inline-block text-[#B8B8B8]">
                              Number of products available
                            </Label>
                            <NumberInput
                              name="number_of_products"
                              placeholder="Enter number of products available"
                              thousandSeparator={true}
                              allowLeadingZeros={true}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, "");
                                onChange(value);
                              }}
                              value={value}
                              allowNegative={false}
                              className=" w-full p-4  h-[4.8rem] placeholder:text-[14px] placeholder:text-[#848484]  text-[16px]"
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div>
                      <Controller
                        control={methods.control}
                        name="currency"
                        render={({ field: { value, onChange } }) => (
                          <>
                            <Label className="text-[1rem] uppercase leading-[16px] inline-block text-[#B8B8B8]">
                              estimate days for pickup (days)
                            </Label>
                            <NumberInput
                              name="currency"
                              placeholder="Enter estimate days"
                              thousandSeparator={false}
                              allowLeadingZeros={true}
                              onChange={(e) => {
                                const value = e.target.value.replace(/,/g, "");
                                onChange(value);
                              }}
                              value={value}
                              allowNegative={false}
                              className=" w-full p-4  h-[4.8rem] placeholder:text-[14px] placeholder:text-[#848484]  text-[16px]"
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Controller
                    control={methods.control}
                    name="pickup_location"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <InputField
                          label="PICKUP ADDRESS"
                          name="pickup_location"
                          labelProps={{ className: "text-[#B8B8B8]" }}
                          type="text"
                          placeholder="Enter pickup address"
                          containerClassName="mb-3"
                          onChange={onChange}
                          value={value}
                          className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                        />
                      </>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    control={methods.control}
                    name="price"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <Label className="text-[1rem] leading-[16px] inline-block text-[#B8B8B8]">
                          ENTER PRODUCT PRICE
                        </Label>
                        <NumberInput
                          name="price"
                          placeholder="Enter product price"
                          thousandSeparator={true}
                          allowLeadingZeros={true}
                          prefix="₦"
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            onChange(value);
                          }}
                          value={value}
                          allowNegative={false}
                          className=" w-full p-4  h-[4.8rem] placeholder:text-[14px] placeholder:text-[#848484]  text-[16px]"
                        />
                      </>
                    )}
                  />
                </div>

                <div>
                  <Controller
                    control={methods.control}
                    name="discount"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <Label className="text-[1rem] leading-[16px] inline-block text-[#B8B8B8]">
                          {`SET DISCOUNT - ${value}%`}
                        </Label>
                        <Slider.Root
                          className="relative flex items-center select-none touch-none w-full h-5"
                          value={[value]}
                          onValueChange={(newValue) => onChange(newValue[0])}
                          max={100}
                          step={1}
                        >
                          <Slider.Track className="bg-neutral-700 relative grow h-[8px] rounded-full">
                            <Slider.Range className="absolute bg-yellow-400 rounded-full h-full" />
                          </Slider.Track>
                          <Slider.Thumb
                            className="block w-[22px] h-[22px] bg-[#848484] rounded-full hover:bg-[#848484] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            aria-label="Discount percentage"
                          />
                        </Slider.Root>
                        <div className="flex justify-between mt-[12px]">
                          <span className="text-[#9CA3AF] text-[14px] leading-[21px] font-medium">
                            0
                          </span>
                          <span className="text-[#9CA3AF] text-[14px] leading-[21px] font-medium">
                            50
                          </span>
                          <span className="text-[#9CA3AF] text-[14px] leading-[21px] font-medium">
                            100
                          </span>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="space-y-[3.2rem] w-full">
              <div>
                <Controller
                  control={methods.control}
                  name="description"
                  render={({ field: { value, onChange }, formState }) => (
                    <>
                      <Label className="text-[1rem] uppercase leading-[16px] inline-block text-[#B8B8B8]">
                        PRODUCT description
                      </Label>
                      <textarea
                        placeholder="Enter Product description"
                        rows={5}
                        name="description"
                        onChange={onChange}
                        value={value}
                        className="block placeholder:text-[14px] placeholder:text-[#848484] text-[16px] w-full  resize-none border border-[#848484] rounded-[12px] bg-transparent  px-[1.8rem] py-[1.5rem] focus:outline-none"
                      />

                      {formState?.errors.description?.message && (
                        <div className="text-red-900 flex space-x-1 text-center text-[10px] mt-1">
                          <span className="flex items-center">
                            <MdOutlineWarning className="text-red-900 h-5 w-5" />
                          </span>
                          <span>
                            {formState?.errors.description?.message ?? ""}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              <ProductFileUpload defaultFiles={defaultValue?.images} />

              {/* <div>
                <Controller
                  control={methods.control}
                  name="price"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <div>
                        <Controller
                          control={methods.control}
                          name="files"
                          render={({ field: { value, onChange } }) => (
                            <>
                              <CustomFileUpload
                                maxFiles={3}
                                maxFileSize={25 * 1024 * 1024} // 25MB
                                allowedFileTypes={[
                                  "image/jpeg",
                                  "image/png",
                                  "image/gif",
                                ]}
                                files={value}
                                onFilesChange={(files) => {
                                  onChange(files);
                                }}
                              />
                              {formState?.errors.files?.message && (
                                <div className="text-red-900 flex space-x-1 text-center text-[10px] mt-1">
                                  <span className="flex items-center">
                                    <MdOutlineWarning className="text-red-900 h-5 w-5" />
                                  </span>
                                  <span>
                                    {formState?.errors.files?.message ?? ""}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        />
                      </div>
                    </>
                  )}
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="text-right mt-[30px]">
          <Button
            type="submit"
            variant="danger"
            size="large"
            prefixIcon={<AiOutlinePlus />}
            className={classNames(
              "rounded-[12px] opacity-30",
              formState.isValid
                ? "bg-brand-default text-brand hover:bg-brand-default opacity-100 "
                : "cursor-not-allowed",
              "w-[23.9rem]",
              (product.isPending || updateProduct.isPending) && "opacity-60"
            )}
          >
            {defaultValue ? "Update Product" : " Add Product"}
          </Button>
        </div>

        {openConfirmModal && (
          <Loader
            loading={openConfirmModal}
            Message={() => (
              <ConfirmModal
                okText={
                  defaultValue ? "Yes, Update Product" : "Yes, Create Product"
                }
                title={defaultValue ? "Update Product" : "Add New Product"}
                isPending={
                  defaultValue ? updateProduct.isPending : product.isPending
                }
                closeModal={() => setOpenConfirmModal(false)}
                okHandler={submitHandler}
              />
            )}
          />
        )}
      </form>
    </FormProvider>
  );
};

export const ErrorMessage = ({ message, code }: ErrorMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = "none";
        }
      }, 9000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="rounded-md my-7  p-5 bg-red-100 text-red-900 text-[14px] font-medium"
    >
      {message}
    </div>
  );
};

export const ConfirmModal = ({
  closeModal,
  isPending,
  okHandler,
  okText = "Yes, Create Product",
  cancelText = "No, Cancel",
  title = "Add New Product?",
}: {
  closeModal: () => void;
  isPending: boolean;
  okHandler: () => void;
  okText?: string;
  cancelText?: string;
  title?: string;
}) => {
  return (
    <div>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.75 36.75H18C11.4003 36.75 8.10051 36.75 6.05025 34.6997C4 32.6496 4 29.3496 4 22.75V17.5C4 10.9003 4 7.60051 6.05025 5.55025C8.10051 3.5 11.4003 3.5 18 3.5H21.5C28.0996 3.5 31.3996 3.5 33.4497 5.55025C35.5 7.60051 35.5 10.9003 35.5 17.5V18.375"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30.962 25.2063C31.3336 24.2646 32.6664 24.2646 33.0379 25.2063L33.1021 25.3695C34.0093 27.6697 35.8302 29.4906 38.1304 30.3978L38.2937 30.462C39.2353 30.8336 39.2353 32.1664 38.2937 32.5379L38.1304 32.6021C35.8302 33.5093 34.0093 35.3302 33.1021 37.6304L33.0379 37.7937C32.6664 38.7353 31.3336 38.7353 30.962 37.7937L30.8978 37.6304C29.9906 35.3302 28.1697 33.5093 25.8695 32.6021L25.7063 32.5379C24.7646 32.1664 24.7646 30.8336 25.7063 30.462L25.8695 30.3978C28.1697 29.4906 29.9906 27.6697 30.8978 25.3695L30.962 25.2063Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.75 12.25H26.75M12.75 20.125H26.75M12.75 28H19.75"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem] mb-[1.4rem]">
          {title}
        </p>

        <div className="flex gap-[1.9rem]">
          <Button
            type="button"
            size="medium"
            onClick={closeModal}
            className=" font-medium leading-[1.8rem] text-[1.2rem]   bg-[848484] text-[#848484] rounded-[8px] w-[8.3rem] h-[3.4rem] border border-[#848484]"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            size="medium"
            onClick={okHandler}
            variant="danger"
            loading={isPending}
            disabled={isPending}
            className=" font-medium leading-[1.8rem] text-[1.2rem]  rounded-[8px]  h-[3.4rem] border border-[#848484]"
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
};
