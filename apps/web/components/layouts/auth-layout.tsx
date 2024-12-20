"use client";

import { Logo } from "@buff/ui";
import { Params } from "_types";
// import { Params } from "app/_types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export const AuthLayout = ({
  children,
  imageSrc,
}: {
  children: ReactNode;
  params: Params;
  imageSrc?: string;
}) => {
  return (
    <Suspense>
      <div className="h-screen w-screen relative">
        <div className="w-full h-full flex ">
          <div className="relative h-full hidden md:sticky  flex-col md:flex md:min-w-[47.7rem]  ">
            <Image
              alt="vms-auth-landing"
              src={"/images/bg.png"}
              priority
              fill
              sizes="(min-width: 808px) 50vw, 100vw"
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
            <div className="z-50 ml-[3.2rem] mt-[11.24%]">
              <Link href="/auth/login">
                <Logo />
              </Link>
            </div>
            <figure className="z-50 overflow-hidden absolute left-0 bottom-0 w-full">
              <img
                src={imageSrc || "/images/user.png"}
                className="w-full object-contain"
              />
            </figure>
          </div>

          <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
            {children}
          </div>
        </div>
      </div>
    </Suspense>
  );
};
