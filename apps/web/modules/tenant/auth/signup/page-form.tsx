"use client";
import { Button, InputField, Loader, PasswordInputField } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useProfileStore } from "store/use-edit";
import { z } from "zod";
import {
  CreateTenantAuthInput,
  CreateTenantAuthInputSchema,
  TenantUserServerResponse,
  useCreateAuthTenant,
} from "../api/create-tenant";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export const SignupForm = ({
  onClick,
}: {
  onClick: (index: number) => void;
}) => {
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");
  const updateUserDetail = useProfileStore((state) => state.updateUserDetail);

  const methods = useForm<CreateTenantAuthInput>({
    resolver: zodResolver(CreateTenantAuthInputSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: TenantUserServerResponse) => {
    console.log("resume", response);

    const token = response.data.token;
    const userData = response.data.user;
    localStorage.setItem(
      "tenant_user",
      JSON.stringify({
        token,
        userId: userData.id,
      })
    );
    onClick(1);
  };

  const onError = (error: unknown) => {
    console.log("est=>", error);
  };

  const login = useCreateAuthTenant({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: CreateTenantAuthInput) => {
    const payload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
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
            <InputField
              label="FIRST NAME"
              labelProps={{
                className:
                  "text-[#B8B8B8] text-[1rem] leading-[1.6rem] uppercase",
              }}
              type="text"
              placeholder="Enter first name"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              {...register("firstName")}
            />
            <InputField
              label="LAST NAME"
              labelProps={{
                className:
                  "text-[#B8B8B8] text-[1rem] leading-[1.6rem] uppercase",
              }}
              type="text"
              placeholder="Enter last name"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              {...register("lastName")}
            />
            <InputField
              label="Email"
              labelProps={{
                className:
                  "text-[#B8B8B8] text-[1rem] leading-[1.6rem] uppercase",
              }}
              type="email"
              placeholder="Enter email address"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              {...register("email")}
            />

            <div>
              <PasswordInputField
                label="PASSWORD"
                labelProps={{
                  className:
                    "text-[#B8B8B8] text-[1rem] leading-[1.6rem] uppercase",
                }}
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg text-[1rem] leading-[1.6rem] uppercase placeholder:capitalize  h-[4.8rem] placeholder:text-[14px]"
                {...register("password")}
              />
            </div>
          </div>
        </div>

        {login.isError && <ErrorMessage {...JSON.parse(login.error.message)} />}

        <Button
          type="submit"
          variant="danger"
          size="large"
          loading={login.isPending}
          disabled={login.isPending}
          className={classNames(
            "rounded-[12px] opacity-30",
            formState.isValid
              ? "bg-brand-default text-brand hover:bg-brand-default opacity-100 "
              : "cursor-not-allowed",
            "w-full",
            login.isPending && "opacity-60"
          )}
        >
          Next
        </Button>

        {login.isPending && <Loader loading={login.isPending} />}
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
