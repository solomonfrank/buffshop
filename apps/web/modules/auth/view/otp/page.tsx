"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
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
