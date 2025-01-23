"use client";
import { Button, InputField } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useOtp } from "~/auth/api/otp";
import { ServerResponseType } from "~/auth/api/reset-password";

export const BusinessFormScheme = z.object({
  businessName: z.string().trim().min(1, { message: "OTP is required" }),
});

type FormValue = {
  businessName: string;
};

export const BusinessForm = ({
  nextStep,
}: {
  nextStep: (index: number) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  const methods = useForm<FormValue>({
    resolver: zodResolver(BusinessFormScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: ServerResponseType) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const { exp } = jwtDecode(token);
      document.cookie = `accessToken=${token};path=/;max-age=${exp};SameSite=Lax;`;
      localStorage.removeItem("accessToken");
      router.replace(`/app/dashboard`);
    } else {
      router.replace(`/auth/login`);
    }
  };

  const onError = (error: unknown) => {
    console.log("est=>", error);
  };

  const login = useOtp({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: FormValue) => {
    const payload = {
      businessName: data.businessName,
    };

    nextStep(3);
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
            type="submit"
            variant="danger"
            size="large"
            loading={login.isPending}
            disabled={login.isPending}
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
