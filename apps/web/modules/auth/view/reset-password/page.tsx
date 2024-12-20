"use client";

import { ErrorMessageProps } from "_types";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { useOtp } from "~/auth/api/otp";
import { ServerResponseType } from "~/auth/api/reset-password";
import { ResetPasswordForm } from "./reset-form";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const qOtp = searchParams.get("q") as string;
  const rememberMe = searchParams.get("remember") as string;

  const [enableResend, setEnabledResend] = useState(false);
  const [otp, setOpt] = useState("");
  const uniqId = useId();
  const router = useRouter();

  const onSuccess = (response: ServerResponseType) => {};

  const handleError = (error: Error) => {
    const obj = JSON.parse(error.message) as ErrorMessageProps;
  };

  const otpHandle = useOtp({
    onSuccess,
    onError: handleError,
  });

  const email = searchParams.get("uemail") as string;

  const verifyOtpHandler = () => {
    otpHandle.mutate({
      otp,
      email,
    });
  };

  return (
    <div className="flex w-[44rem] flex-col items-center justify-center">
      <div className="w-full flex gap-[2.4rem] flex-col">
        <div>
          <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.6rem] text-white">
            Change Password 🔒
          </h2>
          <p className="text-[#B8B8B8] text-[1.4rem] text-center leading-[2rem]">
            Use a strong password is a combination of upper <br />
            and lowercase letters, numbers, and symbols.
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
};
export default ResetPassword;
