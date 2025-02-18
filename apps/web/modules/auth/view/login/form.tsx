"use client";
import {
  Button,
  Checkbox,
  InputField,
  Loader,
  PasswordInputField,
} from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps, ROLES } from "_types";
import classNames from "classnames";
import Link from "next/link";

import { useSetStep } from "@lib/hooks/useStep";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useProfileStore } from "store/use-edit";
import { z } from "zod";
import { LoginServerResponse, useLogin } from "~/auth/api/login";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

type FormValue = {
  email: string;
  password: string;
};

export const LoginForm = ({
  showRememberMe,
  role,
}: {
  showRememberMe: boolean;
  role?: string;
}) => {
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [authorize, setAuthorize] = useState(false);
  const redirectTo = searchParams?.get("redirectTo");

  const error = searchParams.get("error");

  const step = useSetStep("error");
  const updateUserDetail = useProfileStore((state) => state.updateUserDetail);

  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: LoginServerResponse) => {
    const token = response.data.token;
    const userData = response.data.userData;
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: userData.role,
        firstName: userData.firstName,
        userId: userData.id,
      })
    );

    updateUserDetail({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      name: userData.name,
      role: userData.role as ROLES,
      image: userData?.image ?? "",
      two_factor: Boolean(userData?.two_factor),
      session_timeout: Boolean(userData?.session_timeout),
      email_alert: Boolean(userData?.email_alert),
    });

    const { exp } = jwtDecode(token);

    if (role?.includes(userData?.role)) {
      localStorage.setItem("accessToken", token);
      router.push(
        redirectTo
          ? redirectTo
          : `/auth/otp?&uid=${userData.id}&uemail=${userData.email}&role=${userData?.role}`
      );

      return;
    } else {
      setAuthorize(true);

      return;
    }

    document.cookie = `role=${userData.role};path=/;max-age=${exp};SameSite=Lax;`;
    document.cookie = `accessToken=${token};path=/;max-age=${exp};SameSite=Lax;`;

    router.replace(`/app/dashboard`);
  };

  const login = useLogin({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: FormValue) => {
    const payload = {
      email: data.email,
      password: data.password,
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
              label="Email"
              labelProps={{ className: "text-[#B8B8B8]" }}
              type="email"
              placeholder="Enter email address"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
              {...register("email")}
            />

            <div>
              <PasswordInputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                {...register("password")}
              />

              <p className="text-right">
                <Link
                  href={`/auth/forgot-password?ref=${role}`}
                  className=" text-[#B8B8B8] uppercase  hover:text-[#B8B8B8] font-medium text-[1rem] leading-[16px] text-right"
                >
                  FORGOT PASSWORD?
                </Link>
              </p>
            </div>
          </div>
          {showRememberMe && (
            <div className="flex items-center justify-between mb-2.4rem">
              <label className="flex  text-[#848484] items-center text-[12px] leading-[24px] gap-2 ">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    setIsChecked(checked);
                  }}
                />
                Remember me
              </label>
            </div>
          )}
        </div>
        {authorize && (
          <ErrorMessage
            message="Unauthorized!"
            key={`${Math.random()}`}
            handler={() => setAuthorize(false)}
          />
        )}

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

export const ErrorMessage = ({ message, code, handler }: ErrorMessageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = "none";
          if (handler) {
            handler();
          }
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
