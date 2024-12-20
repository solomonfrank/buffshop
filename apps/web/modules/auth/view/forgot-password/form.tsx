"use client";
import { Button, InputField, Loader } from "@buff/ui";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessageProps } from "_types";
import classNames from "classnames";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPassword } from "~/auth/api/forgot-password";

export const loginScheme = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});

type FormValue = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo");

  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: unknown) => {
    // const token = response.data.token;
    // const userData = response.data.userData;
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     role: userData.role,
    //     firstName: userData.firstName,
    //     userId: userData.id,
    //   })
    // );
    // //  const { exp } = jwtDecode(response.data?.accessToken);
    // const exp = "3600";
    // document.cookie = `role=${userData.role};path=/;max-age=${exp};SameSite=Lax;`;
    // document.cookie = `accessToken=${token};path=/;max-age=${exp};SameSite=Lax;`;
    // if (userData?.role === "superadmin") {
    //   router.push(
    //     redirectTo
    //       ? redirectTo
    //       : `/auth/otp?&uid=${userData.id}&uemail=${userData.email}`
    //   );
    //   return;
    // }
  };

  const onError = (error: unknown) => {
    console.log("est=>", error);
  };

  const login = useForgotPassword({
    onSuccess,
    // onError,
  });

  const onSubmit = (data: FormValue) => {
    const payload = {
      email: data.email,
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
                label="Email"
                labelProps={{ className: "text-[#B8B8B8]" }}
                type="email"
                placeholder="Enter email address"
                containerClassName="mb-3"
                className=" w-full p-4 rounded-lg  h-[4.8rem] placeholder:text-[14px]  text-[16px]"
                {...register("email")}
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
          Reset Password
        </Button>

        {login.isPending && <Loader loading={login.isPending} />}
        {login.isSuccess && (
          <Loader loading={login.isSuccess} Message={SuccessDisplay} />
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

const SuccessDisplay = () => {
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
            d="M4 10.5L16.0978 17.3547C20.5578 19.8818 22.4422 19.8818 26.9022 17.3547L39 10.5"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
          <path
            d="M4.0276 23.5823C4.142 28.9471 4.1992 31.6293 6.17868 33.6165C8.15814 35.6034 10.9131 35.6725 16.423 35.811C19.8188 35.8964 23.1812 35.8964 26.5771 35.811C32.087 35.6725 34.8418 35.6034 36.8214 33.6165C38.8008 31.6293 38.8581 28.9471 38.9723 23.5823C39.0093 21.8573 39.0093 20.1427 38.9723 18.4177C38.8581 13.053 38.8008 10.3707 36.8214 8.38366C34.8418 6.39665 32.087 6.32744 26.5771 6.189C23.1812 6.10367 19.8188 6.10367 16.4229 6.18898C10.9131 6.32741 8.15814 6.39662 6.17866 8.38364C4.19919 10.3706 4.14199 13.053 4.02758 18.4177C3.99079 20.1427 3.99081 21.8573 4.0276 23.5823Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Check your mail for
          <br />
          the password reset link.
        </p>
      </div>
    </div>
  );
};
