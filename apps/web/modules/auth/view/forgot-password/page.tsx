"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useId, useState } from "react";
import { ForgotPasswordForm } from "./form";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const qOtp = searchParams.get("q") as string;
  const rememberMe = searchParams.get("remember") as string;

  const [enableResend, setEnabledResend] = useState(false);
  const [otp, setOpt] = useState("");
  const uniqId = useId();
  const router = useRouter();

  return (
    <Suspense>
      <div className="flex w-[44rem] flex-col items-center justify-center">
        <div className="w-full flex gap-[2.4rem] flex-col">
          <div>
            <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.6rem] text-white">
              Forgot Password? 🔒
            </h2>
            <p className="text-[#B8B8B8] text-[1.4rem] text-center leading-[2rem]">
              Don't let a forgotten password <br />
              slow you down, reset it in few clicks
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </Suspense>
  );
};
export default ForgotPassword;
