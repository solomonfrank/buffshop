"use client";

import { CustomTabs, Logo, TabsNavigationItem } from "@buff/ui";
import { useSetStep } from "@lib/hooks/useStep";
import classNames from "classnames";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import Steps from "rc-steps";

import "rc-steps/assets/index.css";
import { useEffect, useState } from "react";
import { LoginForm } from "~/auth/view/login/form";
import { SignupForm } from "./auth/signup";

export const BuyerAuthTab = () => {
  const query = useSearchParams();
  const setpStep = useSetStep("q");
  const router = useRouter();

  const [userIfo, setUserInfo] = useState<{
    name: string;
    firstName: string;
  } | null>(null);

  const currentTab = query.get("q") || "signup";

  console.log("currentTab", currentTab);

  useEffect(() => {
    if (!query.has("q")) {
      setpStep("signup");
    }
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("tenant_user");

    if (userInfo) {
      const userData = userInfo && JSON.parse(userInfo);
      setUserInfo(userData);
    }
  }, []);

  const items: TabsNavigationItem = [
    {
      label: ({ isSelected }) => (
        <div
          className={classNames(
            "flex gap-[1rem] items-center text-center justify-center h-full",
            isSelected && "text-white"
          )}
          onClick={(e) => {
            e.preventDefault();
            setpStep("signup");
          }}
        >
          <span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.17986 10.6976C3.34147 11.189 1.14329 12.1924 2.48213 13.448C3.13615 14.0613 3.86455 14.5 4.78033 14.5H10.0059C10.9217 14.5 11.6501 14.0613 12.3041 13.448C13.643 12.1924 11.4448 11.189 10.6064 10.6976C8.64041 9.54523 6.14585 9.54523 4.17986 10.6976Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.0598 5.16667C10.0598 6.63943 8.8659 7.83333 7.39317 7.83333C5.92041 7.83333 4.7265 6.63943 4.7265 5.16667C4.7265 3.69391 5.92041 2.5 7.39317 2.5C8.8659 2.5 10.0598 3.69391 10.0598 5.16667Z"
                stroke="white"
              />
              <path
                d="M13.7265 3.16669V6.50002M15.3931 4.83335H12.0598"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Create Account</span>
        </div>
      ),
      key: "signup",
      children: <SignupForm />,
    },

    {
      label: ({ isSelected }) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            setpStep("signin");
          }}
          className={classNames(
            "flex gap-[1rem] items-center text-center justify-center h-full",
            isSelected && "text-white"
          )}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.91486 11.9075C5.18127 12.3287 3.25786 13.1888 4.42934 14.265C5.00161 14.7907 5.63896 15.1667 6.44027 15.1667H11.0127C11.814 15.1667 12.4513 14.7907 13.0236 14.265C14.1951 13.1888 12.2717 12.3287 11.5381 11.9075C9.81788 10.9198 7.63508 10.9198 5.91486 11.9075Z"
              stroke="#848484"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.0599 7.16665C11.0599 8.45531 10.0152 9.49998 8.72652 9.49998C7.43786 9.49998 6.39319 8.45531 6.39319 7.16665C6.39319 5.87798 7.43786 4.83331 8.72652 4.83331C10.0152 4.83331 11.0599 5.87798 11.0599 7.16665Z"
              stroke="#848484"
            />
            <path
              d="M2.62915 11.1666C2.26315 10.3442 2.05981 9.43398 2.05981 8.47638C2.05981 4.80751 5.04458 1.83331 8.72648 1.83331C12.4083 1.83331 15.3931 4.80751 15.3931 8.47638C15.3931 9.43398 15.1898 10.3442 14.8238 11.1666"
              stroke="#848484"
              stroke-linecap="round"
            />
          </svg>

          <span>Sign In</span>
        </div>
      ),
      key: "signin",
      children: <LoginForm showRememberMe={true} role="buyer" />,
    },
  ];

  return (
    <div className="h-screen w-screen relative">
      <div className="w-full h-full flex ">
        <div className="relative h-full hidden md:sticky  flex-col md:flex md:min-w-[47.7rem]  ">
          <div className="z-50 ml-[5.3rem] mt-[11.24%]">
            <Link href="/auth/tenant">
              <Logo />
            </Link>
          </div>

          <figure className="overflow-hidden absolute left-[5.3rem] top-[160px]  w-full">
            <img src={"/images/buyer.png"} className="w-full object-contain" />
            <div className="absolute right-[18%] tracking-[-0.25px]  bottom-[5%] z-50 font-medium text-[#171717] text-[40px] leading-[50px]">
              Level Up <br />
              Your Game
            </div>
          </figure>
        </div>

        <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
          <div className="flex w-[43rem] flex-col items-center justify-center">
            <div className="w-full flex gap-[2.4rem] flex-col">
              <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.3rem] text-white">
                Create Account
              </h2>

              <div className="w-full block mb-[1.6rem]">
                <div className="w-full ">
                  <CustomTabs
                    key={currentTab}
                    items={items}
                    defaultActiveKey={currentTab}
                    activeClassName="border-none text-left bg-[#848484] text-[#FFFFFF] "
                    tabItemClassName=" text-left  cursor-pointer  flex-1  items-center  py-[1.5rem]  overflow-hidden  "
                    headerClassName="bg-[#282828] mb-[2.4rem] rounded-[12px] leading-[2.1rem] overflow-hidden items-center   justify-center shadow-[0px_1px_2px_rgba(0, 0, 0, 0.08)] "
                  />

                  <div className="text-center relative mt-[2.4rem] ">
                    <span className="text-[#848484] after:bg-[#848484] after:absolute after:w-[45%] after:h-[1px] after:top-[50%] after:left-0  before:absolute before:w-[45%] before:h-[1px] before:top-[50%] before:right-0  before:bg-[#848484]  text-center text-[14px] leading-[16.7px]">
                      Or
                    </span>
                  </div>

                  <div className="flex gap-[2rem] mt-[2.4rem]">
                    <button className="shadow-[0px_18px_30px_0px_#8377C61C] flex items-center gap-[1.5px] rounded-[15px]  px-[16px] h-[6rem] basis-1/2 bg-white font-medium text-[#1D1C2B] text-[14px] leading-[2rem]">
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.6 10.2273C19.6 9.51819 19.5364 8.83637 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
                            fill="#4285F4"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.9999 19.9998C12.6999 19.9998 14.9635 19.1044 16.6181 17.5771L13.3863 15.068C12.4908 15.668 11.3454 16.0226 9.9999 16.0226C7.39536 16.0226 5.19081 14.2635 4.40445 11.8998H1.06354V14.4908C2.70899 17.7589 6.09081 19.9998 9.9999 19.9998Z"
                            fill="#34A853"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.40455 11.9001C4.20455 11.3001 4.09091 10.6592 4.09091 10.0001C4.09091 9.34097 4.20455 8.70006 4.40455 8.10006V5.50916H1.06364C0.386364 6.85916 0 8.38643 0 10.0001C0 11.6137 0.386364 13.141 1.06364 14.491L4.40455 11.9001Z"
                            fill="#FBBC05"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.9999 3.97727C11.4681 3.97727 12.7863 4.48182 13.8226 5.47273L16.6908 2.60455C14.959 0.990909 12.6954 0 9.9999 0C6.09081 0 2.70899 2.24091 1.06354 5.50909L4.40445 8.1C5.19081 5.73636 7.39536 3.97727 9.9999 3.97727Z"
                            fill="#EA4335"
                          />
                        </svg>
                      </span>
                      <span>Sign up with Google</span>
                    </button>

                    <button className="shadow-[0px_18px_30px_0px_#8377C61C] flex items-center gap-[1.5px] rounded-[15px]  px-[16px] h-[6rem] basis-1/2 bg-[#1877F2] font-medium text-[#fff] text-[14px] leading-[2rem]">
                      <span>
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.0968 10C20.0968 4.47717 15.6197 2.09808e-05 10.0968 2.09808e-05C4.57395 2.09808e-05 0.0968018 4.47717 0.0968018 10C0.0968018 14.9913 3.75366 19.1283 8.5343 19.8785V12.8906H5.99524V10H8.5343V7.7969C8.5343 5.29065 10.0272 3.90627 12.3115 3.90627C13.4055 3.90627 14.5499 4.10158 14.5499 4.10158V6.56252H13.2889C12.0467 6.56252 11.6593 7.33336 11.6593 8.12418V10H14.4327L13.9894 12.8906H11.6593V19.8785C16.4399 19.1283 20.0968 14.9913 20.0968 10Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span>Sign up with Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type Status = "completed" | "current" | "upcoming";
export interface StepProps {
  icon: React.ElementType;
  title: ((props: { status: Status }) => JSX.Element) | string;
  subtitle: string;
  status: Status;
  onClick?: () => void;
}

const Step = ({ icon: Icon, title, subtitle, status, onClick }: StepProps) => {
  return (
    <div className="flex items-start group">
      {/* Circle with Icon */}
      <div
        onClick={onClick}
        className={`
            relative flex h-[2.8rem] w-[2.8rem] shrink-0 items-center justify-center rounded-full
            ${
              status === "completed"
                ? "bg-[#31C48D]"
                : status === "current"
                  ? "bg-yellow-500"
                  : "bg-zinc-700"
            }
            ${status === "upcoming" ? "group-hover:bg-zinc-600" : ""}
            transition-colors duration-300
          `}
      >
        {status === "completed" ? (
          <Check className="h-[20px] w-[20px] text-zinc-900" />
        ) : (
          <Icon
            className={`h-[20px] w-[20px] ${status === "upcoming" ? "text-zinc-900" : "text-zinc-900"}`}
          />
        )}
      </div>

      {/* Content */}
      <div className="ml-4 w-full">
        <div className="flex items-center justify-between">
          <p
            className={` 
                font-medium text-[16px] leading-[2.4rem] flex gap-[4px] items-center
                ${status === "upcoming" ? "text-zinc-500" : "text-white"}
              `}
          >
            {typeof title === "string" ? title : title({ status })}
          </p>
        </div>
        <p className="text-[1rem] leading-[1.6rem] uppercase text-[#848484] mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
