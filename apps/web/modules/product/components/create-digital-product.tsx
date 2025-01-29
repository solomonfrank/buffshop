"use client";
import {
  Button,
  CustomSelect,
  InputField,
  Label,
  Loader,
  NumberInput,
  showToast,
} from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { ErrorMessageProps } from "_types";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineWarning } from "react-icons/md";
import {
  ProductCreationInput,
  ProductInputSchema,
  useCreateProduct,
} from "../api/create-product";
import { SUBSCRIPTION_TYPE } from "../product-details";
import CustomFileUpload, { FileWithPreview } from "./file-upload";

export const CreateDigitalForm = () => {
  const router = useRouter();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [image, setImage] = useState<string>();
  const [copyfile, setCopyFile] = useState<FileWithPreview[]>([]);
  const methods = useForm<ProductCreationInput>({
    resolver: zodResolver(ProductInputSchema),
    mode: "onChange",
    defaultValues: {
      discount: 50,
      files: [],
      drmProtection: false,
    },
  });
  const previousValues = useRef<ProductCreationInput | null>(null);

  const onSuccess = (response: unknown) => {
    showToast("Product created successfully", "success");
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

  const { register, handleSubmit, formState, watch } = methods;

  const currentValues = watch();

  // Track previous values
  useEffect(() => {
    previousValues.current = currentValues;
  }, [currentValues]);

  console.log("previousValues=>", previousValues.current);

  const onSubmit = (data: ProductCreationInput) => {
    console.log("ddddd", data);
    setOpenConfirmModal(true);

    // login.mutate(payload);
  };

  const submitHandler = () => {
    const data = methods.getValues();

    const payload = {
      ...data,
      price: data.price.replace("₦", ""),
      product_type: "digital",
    };

    product.mutate(payload);
  };
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
                        placeholder="Enter Product Name"
                        containerClassName="mb-3"
                        onChange={onChange}
                        value={value}
                        className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                      />
                    </>
                  )}
                />

                <div>
                  {" "}
                  <Controller
                    control={methods.control}
                    name="subscription_type"
                    render={({ field: { value, onChange } }) => (
                      <>
                        <Label className="text-[1rem] leading-[16px] inline-block text-[#B8B8B8]">
                          SELECT SUBSCRIPTION TYPE
                        </Label>
                        <CustomSelect
                          name="subscription_type"
                          placeholder="Select Subscription Type"
                          options={SUBSCRIPTION_TYPE}
                          value={value}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          styles={{
                            menuList: (provided) => ({
                              ...provided,
                              color: "#fff",
                              fontSize: "1.4rem",
                              background: "#333333",
                              ":hover": {
                                borderColor: "#000",
                              },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#FFBE0A"
                                : "#333333",
                              color: "white",

                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: state.isSelected
                                  ? "#FFBE0A"
                                  : "#333333",
                              },
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              fontSize: "1.2rem",
                              lineHeight: "2.4rem",
                              fontWeight: 500,
                              color: "#fff",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              fontSize: "1.2rem",
                            }),
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: "45px",
                              borderColor: "#333333",
                              boxShadow: "none",
                              borderRadius: "12px",
                              background: "transparent",
                              flexShrink: 0,
                              color: "#fff",

                              ":hover": {
                                borderColor: "#333333",
                              },

                              ":active": {
                                borderColor: "#333333",
                                color: "#fff",
                              },
                            }),
                          }}
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
                <div className="w-full mb-3  bg-neutral-900 flex items-center gap-[1.6rem]">
                  <Label
                    className=" leading-[24px] w-[200px] text-[16px] inline-block text-[#D1D5DB] font-medium"
                    htmlFor="drm-mode"
                  >
                    DRM Protection
                  </Label>
                  <Controller
                    name="drmProtection"
                    control={methods.control}
                    render={({ field: { value, onChange } }) => (
                      <Switch.Root
                        id="drm-mode"
                        checked={value}
                        onCheckedChange={onChange}
                        className="w-[42px] h-[24px] bg-neutral-700 rounded-full relative data-[state=checked]:bg-yellow-400 outline-none cursor-default"
                      >
                        <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] m-[2px]" />
                      </Switch.Root>
                    )}
                  />
                </div>
                <p className=" text-[#848484] uppercase font-medium text-[1rem] leading-[16px]">
                  ENABLING THE DRM PROTECTION ATTRACTS FEE ADJUSTMENTS
                </p>
              </div>
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

              <ProductFileUpload />

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
                          render={({ field: { value, onChange } }) => {
                            console.log("ddddvvvv", value);
                            return (
                              <>
                                <CustomFileUpload
                                  maxFiles={3}
                                  maxFileSize={25 * 1024 * 1024} // 25MB
                                  allowedFileTypes={[
                                    "image/jpeg",
                                    "image/png",
                                    "image/gif",
                                  ]}
                                  files={copyfile}
                                  onFilesChange={(files) => {
                                    setCopyFile((prev) => [...prev, ...files]);
                                    // onChange([...value, ...files]);
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
                            );
                          }}
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
              "w-[23.9rem]"
            )}
          >
            Add Product
          </Button>
        </div>

        {openConfirmModal && (
          <Loader
            loading={openConfirmModal}
            Message={() => (
              <ConfirmModal
                isPending={product.isPending}
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

export const ProductFileUpload = () => {
  const methods = useFormContext();

  const { formState } = methods;

  const [copyfile, setCopyFile] = useState<FileWithPreview[]>([]);
  console.log("copyfile", copyfile);

  useEffect(() => {
    methods.setValue("files", copyfile, {
      // shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [copyfile.length]);

  console.log("formState?.errors.files", formState?.errors.files);

  return (
    <div>
      <Controller
        control={methods.control}
        name="files"
        render={({ field: { value, onChange } }) => {
          console.log("ddddvvvv", value);
          return (
            <>
              <CustomFileUpload
                maxFiles={3}
                maxFileSize={25 * 1024 * 1024} // 25MB
                allowedFileTypes={["image/jpeg", "image/png", "image/gif"]}
                files={value}
                onFilesChange={(files, isDelete) => {
                  // handleFileUpload(files);

                  console.log("files", files);

                  if (isDelete) {
                    setCopyFile(files);
                  } else {
                    setCopyFile((prev) => [...prev, ...files]);
                  }
                }}
              />
              {formState?.errors.files?.message && (
                <div className="text-red-900 flex space-x-1 text-center text-[10px] mt-1">
                  <span className="flex items-center">
                    <MdOutlineWarning className="text-red-900 h-5 w-5" />
                  </span>
                  <span>{formState?.errors.files.message as string}</span>
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
