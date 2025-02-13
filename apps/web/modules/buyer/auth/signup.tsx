"use client";
import { Button, InputField, Loader, PasswordInputField } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthServerResponse, ErrorMessageProps } from "_types";
import classNames from "classnames";

import { useSetStep } from "@lib/hooks/useStep";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  createBuyerInput,
  createBuyerInputSchema,
  useCreateBuyer,
} from "../api/create-buyer";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setpStep = useSetStep("q");

  const methods = useForm<createBuyerInput>({
    resolver: zodResolver(createBuyerInputSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: AuthServerResponse) => {
    const token = response.data.token;
    const userData = response.data.user;

    const name = userData.name;
    const nameArr = name.split(" ");
    localStorage.setItem(
      "tenant_user",
      JSON.stringify({
        token,
        userId: userData.id,
        email: userData.email,
        name: userData?.name,
        lastName: nameArr[1] || "",
        firstName: nameArr[0] || "",
      })
    );
  };

  const registerBuyer = useCreateBuyer({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: createBuyerInput) => {
    const payload = {
      email: data.email,
      password: data.password,
      name: data.name,
    };

    registerBuyer.mutate(payload);
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
              label="NAME"
              labelProps={{
                className:
                  "text-[#B8B8B8] text-[1rem] leading-[1.6rem] uppercase",
              }}
              type="text"
              placeholder="Enter first name"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              {...register("name")}
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
                className="w-full p-4 rounded-lg text-[1rem] leading-[1.6rem]  placeholder:capitalize  h-[4.8rem] placeholder:text-[14px]"
                {...register("password")}
              />
            </div>
          </div>
        </div>

        {registerBuyer.isError && (
          <ErrorMessage {...JSON.parse(registerBuyer.error.message)} />
        )}

        <Button
          type="submit"
          variant="danger"
          size="large"
          loading={registerBuyer.isPending}
          disabled={registerBuyer.isPending}
          className={classNames(
            "rounded-[12px] opacity-30",
            formState.isValid
              ? "bg-brand-default text-brand hover:bg-brand-default opacity-100 "
              : "cursor-not-allowed",
            "w-full",
            registerBuyer.isPending && "opacity-60"
          )}
        >
          Submit
        </Button>

        {registerBuyer.isSuccess && (
          <Loader
            redirectUrl="/auth/login"
            loading={registerBuyer.isSuccess}
            Message={() => (
              <SuccessDisplay
                closeModal={() => {
                  registerBuyer.reset();
                  setpStep("signin");
                }}
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

const SuccessDisplay = ({ closeModal }: { closeModal?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          if (closeModal) {
            closeModal();
          }
        }
      }, 3000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div ref={ref}>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39 21.8752C39 21.0152 38.9907 19.2801 38.9723 18.4177C38.8581 13.053 38.8009 10.3707 36.8214 8.38366C34.8418 6.39665 32.087 6.32744 26.5771 6.189C23.1812 6.10367 19.8188 6.10367 16.4229 6.18898C10.9131 6.32741 8.15814 6.39662 6.17866 8.38364C4.19919 10.3706 4.14199 13.053 4.02758 18.4177C3.99079 20.1427 3.99081 21.8573 4.0276 23.5823C4.142 28.9471 4.1992 31.6293 6.17868 33.6165C8.15814 35.6034 10.9131 35.6725 16.423 35.811C17.8278 35.8463 19.2269 35.867 20.625 35.8731"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.75 14.875L17.8985 17.9189C20.9001 19.6936 22.0999 19.6936 25.1015 17.9189L30.25 14.875"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25 30.625H39M25 30.625C25 29.3996 28.49 27.1101 29.375 26.25M25 30.625C25 31.8504 28.49 34.1399 29.375 35"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Check your mail for verification link
        </p>
      </div>
    </div>
  );
};
