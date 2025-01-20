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
import { ErrorMessageProps } from "_types";
import classNames from "classnames";
import { AiOutlinePlus } from "react-icons/ai";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { LoginServerResponse } from "~/auth/api/login";
import {
  createTenantInput,
  createTenantInputSchema,
} from "../api/create-tenant";
import { useUpdateTenant } from "../api/edit-tenant";
import { TenantsProps } from "../api/get-tenants";

export const EditTenantForm = ({ details }: { details: TenantsProps }) => {
  const router = useRouter();
  const { id } = useParams()!;

  console.log("details", details);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const methods = useForm<createTenantInput>({
    resolver: zodResolver(createTenantInputSchema),
    mode: "onChange",
    defaultValues: {
      business_name: details?.business_name,
      email: details?.email,
      name: details?.name,
      phone: details?.phone,
    },
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: LoginServerResponse) => {
    showToast("Tenant updated successfully", "success");
    router.replace(`/app/tenant-management`);
  };

  const onError = (error: unknown) => {
    setOpenConfirmModal(false);
  };

  const login = useUpdateTenant({
    onSuccess,
    onError,
  });

  const onSubmit = (data: createTenantInput) => {
    setOpenConfirmModal(true);

    // login.mutate(payload);
  };

  const submitHandler = () => {
    const data = methods.getValues();

    const payload: createTenantInput & { id: string } = {
      email: data.email,
      phone: data.phone,
      business_name: data.business_name,
      name: data.name,
      id: id as string,
    };

    login.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full block mb-[1.6rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-[2.4rem]">
          <div className="space-y-8">
            <div>
              <Controller
                control={methods.control}
                name="phone"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Label className="text-[1rem] leading-[16px] inline-block text-[#B8B8B8]">
                      Phone Number
                    </Label>
                    <NumberInput
                      name="phone"
                      placeholder="Enter phone number"
                      thousandSeparator={false}
                      maxLength={11}
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
            <div>
              <Controller
                control={methods.control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="Name"
                      value={value}
                      name="name"
                      onChange={onChange}
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="text"
                      placeholder="Enter fullname"
                      containerClassName="mb-3"
                      className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                    />
                  </>
                )}
              />
            </div>

            <div>
              <Controller
                control={methods.control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="Email"
                      name="email"
                      readOnly
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="email"
                      placeholder="Enter email address"
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
                name="business_name"
                render={({ field: { value, onChange } }) => (
                  <>
                    <InputField
                      label="Business Name"
                      name="business_name"
                      labelProps={{ className: "text-[#B8B8B8]" }}
                      type="text"
                      placeholder="Enter business name"
                      containerClassName="mb-3"
                      className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                      onChange={onChange}
                      value={value}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {login.isError && <ErrorMessage {...JSON.parse(login.error.message)} />}

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
            login.isPending && "opacity-60"
          )}
        >
          Confirm Edits
        </Button>

        {openConfirmModal && (
          <Loader
            loading={openConfirmModal}
            Message={() => (
              <ConfirmModal
                isPending={login.isPending}
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
  okText = "Yes, confirm details",
  cancelText = "No, Cancel",
  title = "Confirm New Update.",
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
