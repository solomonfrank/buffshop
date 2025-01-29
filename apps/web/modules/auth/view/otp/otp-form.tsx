"use client";
import { Button, InputField, Loader } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useOtp } from "~/auth/api/otp";
import { ServerResponseType } from "~/auth/api/reset-password";

export const loginScheme = z.object({
  otp: z.string().trim().min(1, { message: "OTP is required" }),
});

type FormValue = {
  otp: string;
};

export const OtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;
  const email = searchParams.get("uemail") as string;
  const role = searchParams.get("role") as string;

  const onSuccess = (response: ServerResponseType) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const { exp } = jwtDecode(token);
      document.cookie = `accessToken=${token};path=/;max-age=${exp};SameSite=Lax;`;
      document.cookie = `role=${role};path=/;max-age=${exp};SameSite=Lax;`;
      localStorage.removeItem("accessToken");
      router.replace(`/app/dashboard`);
    } else {
      router.replace(`/auth/login`);
    }

    //  router.replace(`/app/dashboard`);
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     role: response.data?.role,
    //     firstName: response?.data?.firstName,
    //     lastName: response?.data?.lastName,
    //     userId: response?.data.userId,
    //   })
    // );
    // //  const { exp } = jwtDecode(response.data?.accessToken);
    // const exp = "3600";
    // document.cookie = `role=${response?.data?.role};path=/;max-age=${exp};SameSite=Lax;`;
    // document.cookie = `accessToken=${response.data.accessToken};path=/;max-age=${exp};SameSite=Lax;`;
    // router.replace(redirectTo ? redirectTo : `/app/dashboard`);
    // showToast("Logged in successfully", "success");
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
      otp: data.otp,
      email,
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
                label="VERIFICATION CODE"
                labelProps={{ className: "text-[#B8B8B8]" }}
                type="text"
                placeholder="Enter OTP code"
                containerClassName="mb-3"
                className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                {...register("otp")}
              />

              <p className="text-left">
                <Link
                  href="/auth/forgot-password"
                  className=" text-[#B8B8B8]  hover:text-[#B8B8B8] font-medium text-[1rem] leading-[16px] text-right"
                >
                  Didn’t receive your code? Resend
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* 
        <div className="flex items-center justify-between mb-2.4rem">
          <label className="flex  text-black items-center text-xl leading-[16.8px] gap-2 font-lato">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                setIsChecked(checked);
              }}
            />
            Remember me
          </label>
        </div> */}

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
          Login
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

const MessageDisplay = () => {
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
            d="M38.125 21C38.125 30.1817 30.6817 37.625 21.5 37.625C12.3183 37.625 4.875 30.1817 4.875 21C4.875 11.8183 12.3183 4.375 21.5 4.375C28.3173 4.375 34.1763 8.47836 36.7416 14.35M38.125 9.625L37.2937 15.1813L32 14"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 19.25V16.625C18 14.692 19.567 13.125 21.5 13.125C23.433 13.125 25 14.692 25 16.625V19.25M20.1875 28.875H22.8125C24.8649 28.875 25.8911 28.875 26.5979 28.3325C26.7799 28.1929 26.9428 28.0299 27.0825 27.8479C27.625 27.1411 27.625 26.1149 27.625 24.0625C27.625 22.0101 27.625 20.9839 27.0825 20.2771C26.9428 20.0951 26.7799 19.9322 26.5979 19.7925C25.8911 19.25 24.8649 19.25 22.8125 19.25H20.1875C18.1351 19.25 17.1089 19.25 16.402 19.7925C16.22 19.9322 16.0571 20.0951 15.9174 20.2771C15.375 20.9839 15.375 22.0101 15.375 24.0625C15.375 26.1149 15.375 27.1411 15.9174 27.8479C16.0571 28.0299 16.22 28.1929 16.402 28.3325C17.1089 28.875 18.1351 28.875 20.1875 28.875Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Success!
          <br /> Signing into your account.
        </p>
      </div>
    </div>
  );
};
