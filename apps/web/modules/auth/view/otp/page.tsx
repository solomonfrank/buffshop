"use client";

import { ErrorMessageProps } from "_types";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { ServerResponse } from "~/auth/api/login";
import { useOtp } from "~/auth/api/otp";
import { OtpForm } from "./otp-form";

type OptParams = {
  uid: string;
  uemail: string;
  id: string;
  q: string;
};

const Otp = () => {
  const searchParams = useSearchParams();
  const qOtp = searchParams.get("q") as string;
  const rememberMe = searchParams.get("remember") as string;

  const [enableResend, setEnabledResend] = useState(false);
  const [otp, setOpt] = useState("");
  const uniqId = useId();
  const router = useRouter();

  const onSuccess = (response: ServerResponse) => {
    const exp = "";
    document.cookie = `rememberMe=${rememberMe};path=/;max-age=${exp};SameSite=Lax;`;
    document.cookie = `accessToken=${response.data.accessToken};path=/;max-age=${exp};SameSite=Lax;`;
    document.cookie = `role=${response?.data?.role};path=/;max-age=${exp};SameSite=Lax;`;

    router.replace(`/app/tenants`);
  };

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
            Verify your account. 🔑
          </h2>
          <p className="text-[#B8B8B8] text-[1.4rem] text-center leading-[2rem]">
            Enter the 8-digit OTP code and <br />
            account will be verified.
          </p>
        </div>

        <OtpForm />
      </div>
    </div>
  );
};
export default Otp;
