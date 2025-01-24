"use client";

import { LoginForm } from "./form";

export const Login = () => {
  return (
    <div className="flex w-[44rem] flex-col items-center justify-center">
      <div className="w-full flex gap-[2.4rem] flex-col">
        <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.3rem] text-white">
          Hello Super Admin! 👋
          <br />
          Sign in your Account.
        </h2>
        <LoginForm showRememberMe={false} />
        {/* <Link
          href="/auth/forgot-password"
          className=" text-black underline hover:text-gray-700 font-normal text-[1.4rem] leading-[16.8px] font-lato"
        >
          Forgot your password?
        </Link> */}
      </div>
    </div>
  );
};
