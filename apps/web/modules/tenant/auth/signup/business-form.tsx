"use client";
import { Button, InputField } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";

import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  BusinessFormInput,
  BusinessFormScheme,
  BusinessServerResponse,
  useUpdateTenantBusiness,
} from "../api/update-business";

export const BusinessForm = ({
  nextStep,
}: {
  nextStep: (index: number) => void;
}) => {
  const methods = useForm<BusinessFormInput>({
    resolver: zodResolver(BusinessFormScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: BusinessServerResponse) => {
    const token = localStorage.getItem("accessToken");
    nextStep(3);
  };

  const login = useUpdateTenantBusiness({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: BusinessFormInput) => {
    const payload = {
      businessName: data.businessName,
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
          <div className="space-y-4">
            <div>
              <InputField
                label="BUSINESS NAME"
                labelProps={{ className: "text-[#B8B8B8]" }}
                type="text"
                placeholder="Enter business name"
                containerClassName="mb-3"
                className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                {...register("businessName")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-[2.4rem]">
          <Button
            type="button"
            variant="danger"
            size="large"
            onClick={() => nextStep(2)}
            className={classNames(
              "bg-transparent text-[14px] leading-[2rem] basis-[calc(50%-1.2rem)] text-[#848484] border border-[#848484] rounded-[12px]"
            )}
          >
            Skip & Complete
          </Button>
          <Button
            type="submit"
            variant="danger"
            size="large"
            loading={login.isPending}
            disabled={login.isPending}
            className={classNames(
              "rounded-[12px] opacity-30",
              formState.isValid
                ? "bg-brand-default text-brand text-[14px] leading-[2rem] hover:bg-brand-default opacity-100 "
                : "cursor-not-allowed",
              "basis-[calc(50%-1.2rem)]",
              login.isPending && "opacity-60"
            )}
          >
            Create Account
          </Button>
        </div>
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
