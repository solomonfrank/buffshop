"use client";

import { Button, CustomTabs, Logo, TabsNavigationItem } from "@buff/ui";
import { useSetStep } from "@lib/hooks/useStep";
import classNames from "classnames";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import Steps from "rc-steps";

import "rc-steps/assets/index.css";
import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import { LoginForm } from "~/auth/view/login/form";
import { BusinessForm } from "./signup/business-form";
import { SignupFlow } from "./signup/page";
import { VerifyEmailForm } from "./signup/verify-email";

export const TenantAuthTab = () => {
  const query = useSearchParams();
  const setpStep = useSetStep("q");
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const [userIfo, setUserInfo] = useState<{
    name: string;
    firstName: string;
  } | null>(null);

  const [steps, setSteps] = useState<StepProps[]>([
    {
      icon: MdCheck,
      title: () => {
        return (
          <>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.33325 5.99998V9.33331C2.33325 11.8474 2.33325 13.1046 3.1143 13.8856C3.89535 14.6666 5.15243 14.6666 7.66658 14.6666H8.33325C10.8474 14.6666 12.1045 14.6666 12.8855 13.8856C13.6666 13.1046 13.6666 11.8474 13.6666 9.33331V6.66665C13.6666 4.15249 13.6666 2.89541 12.8855 2.11436C12.1045 1.33331 10.8474 1.33331 8.33325 1.33331H7.99992"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 11.3333H11.6667"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 4.66669H11.6667"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 8H11.6667"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.33325 11C4.33325 11 4.97831 11.1781 5.33325 12C5.33325 12 5.99992 9.99998 7.33325 9.33331"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.66659 3.33331H2.33325M6.66659 3.33331C6.66659 2.77313 5.11547 1.72654 4.72214 1.33331M6.66659 3.33331C6.66659 3.89349 5.11546 4.94009 4.72214 5.33331"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>Your details</span>
          </>
        );
      },
      subtitle: "PROVIDE AN EMAIL & PASSWORD",
      status: "current",
    },
    {
      icon: MdCheck,
      title: () => {
        return (
          <>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33325 4L5.94193 6.61131C7.64098 7.574 8.35885 7.574 10.0579 6.61131L14.6666 4"
                  stroke="#848484"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.34377 8.98371C1.38735 11.0274 1.40914 12.0492 2.16323 12.8062C2.91731 13.5632 3.96681 13.5895 6.06581 13.6422C7.35945 13.6748 8.64039 13.6748 9.93405 13.6422C12.0331 13.5895 13.0825 13.5632 13.8367 12.8062C14.5907 12.0492 14.6125 11.0274 14.6561 8.98371C14.6701 8.32658 14.6701 7.67338 14.6561 7.01625C14.6125 4.97255 14.5907 3.95071 13.8367 3.19375C13.0825 2.4368 12.0331 2.41043 9.93405 2.35769C8.64039 2.32519 7.35945 2.32519 6.0658 2.35769C3.96681 2.41042 2.91731 2.43679 2.16322 3.19375C1.40913 3.9507 1.38735 4.97255 1.34376 7.01625C1.32975 7.67338 1.32975 8.32658 1.34377 8.98371Z"
                  stroke="#848484"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span>Verify your email</span>
          </>
        );
      },
      subtitle: "ENTER VERIFICATION CODE",
      status: "upcoming",
    },
    {
      icon: MdCheck,
      title: () => {
        return (
          <>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 10V11"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2 10C2.09955 11.955 2.20381 12.9811 2.93208 13.6298C3.72183 14.3333 4.9537 14.3333 7.41745 14.3333H8.58259C11.0463 14.3333 12.2782 14.3333 13.0679 13.6298C13.7962 12.9811 13.9005 11.955 14 10"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.8982 6.96207C3.03107 9.11627 5.58622 10 8.00008 10C10.4139 10 12.9691 9.11627 14.1019 6.96207C14.6427 5.93371 14.2333 4 12.9014 4H3.09875C1.7669 4 1.35744 5.93371 1.8982 6.96207Z"
                  stroke="#848484"
                />
                <path
                  d="M10.6666 4.00002L10.6077 3.79398C10.3144 2.76728 10.1677 2.25393 9.81853 1.96031C9.46933 1.66669 9.00553 1.66669 8.07787 1.66669H7.92193C6.99433 1.66669 6.5305 1.66669 6.18132 1.96031C5.83213 2.25393 5.68546 2.76728 5.39212 3.79398L5.33325 4.00002"
                  stroke="#848484"
                />
              </svg>
            </span>
            <span>Business Name</span>
          </>
        );
      },
      subtitle: "ENTER YOUR BUSINESS NAME",
      status: "upcoming",
    },
  ]);

  const currentTab = query.get("q") || "signup";

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

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    const updatedSteps = [...steps];

    updatedSteps.forEach((step, i) => {
      if (i < index) {
        step.status = "completed";
      } else if (i === index) {
        step.status = "current";
      } else {
        console.log("hereee", i);
        step.status = "upcoming";
      }
    });
    setSteps(updatedSteps);
  };

  const finishForm = (index: number) => {
    setSteps((prev) => prev.map((item) => ({ ...item, status: "completed" })));
  };

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
      children: (
        <SignupFlow
          nextStep={(currentIndex) => handleStepClick(currentIndex)}
        />
      ),
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
      children: <LoginForm showRememberMe={true} />,
    },
  ];

  const allStepsCompleted = steps.every((step) => step.status === "completed");

  return (
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

          {currentStep === 0 || !currentStep ? (
            <figure className="z-50 overflow-hidden absolute left-0 bottom-0 w-full">
              <img
                src={"/images/tenant.png"}
                className="w-full object-contain"
              />
            </figure>
          ) : (
            <div className="relative flex items-center  mt-[25%] justify-center">
              <div className="relative mb-12">
                {/* Connecting Line */}
                <div
                  className={`
              absolute left-5 top-0 w-px bg-[#848484] -translate-x-1/2 h-[calc(100%-32px)]
              
            `}
                />

                <div className="space-y-[4.3rem]">
                  {steps.map((step, index) => (
                    <Step
                      key={index}
                      icon={step.icon}
                      title={step.title}
                      subtitle={step.subtitle}
                      status={step.status}
                      onClick={() => handleStepClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {currentStep === 0 && (
          <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
            <div className="flex w-[43rem] flex-col items-center justify-center">
              <div className="w-full flex gap-[2.4rem] flex-col">
                <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.3rem] text-white">
                  Create Account as a
                  <br />
                  seller or content creator 🎮
                </h2>

                <div className="w-full block mb-[1.6rem]">
                  <div className="w-full">
                    <CustomTabs
                      items={items}
                      defaultActiveKey={currentTab}
                      activeClassName="border-none text-left bg-[#848484] text-[#FFFFFF] "
                      tabItemClassName=" text-left  cursor-pointer  flex-1  items-center  py-[1.5rem]  overflow-hidden  "
                      headerClassName="bg-[#282828] mb-[2.4rem] rounded-[12px] leading-[2.1rem] overflow-hidden items-center   justify-center shadow-[0px_1px_2px_rgba(0, 0, 0, 0.08)] "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="w-0 flex-1 flex flex-col relative  items-center text-brand justify-center">
            <div className="flex items-center top-[10rem] left-[2rem] gap-[8px] mb-[3.6rem] absolute">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66638 20.0003L33.333 20.0003"
                  stroke="#848484"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.9993 11.6666C14.9993 11.6666 6.66618 17.804 6.66618 20C6.66618 22.196 14.9995 28.3333 14.9995 28.3333"
                  stroke="#848484"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="text-[#B8B8B8] text-[1.4rem] leading-[2rem] font-medium">
                Back to home
              </h3>
            </div>
            <div className="flex w-[43rem] flex-col items-center justify-center">
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

                <div className="w-full block mb-[1.6rem]">
                  <VerifyEmailForm
                    nextStep={(currentIndex) => handleStepClick(currentIndex)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && !allStepsCompleted && (
          <div className="w-0 flex-1 flex flex-col relative  items-center text-brand justify-center">
            <div className="flex items-center top-[10rem] left-[2rem] gap-[8px] mb-[3.6rem] absolute">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66638 20.0003L33.333 20.0003"
                  stroke="#848484"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.9993 11.6666C14.9993 11.6666 6.66618 17.804 6.66618 20C6.66618 22.196 14.9995 28.3333 14.9995 28.3333"
                  stroke="#848484"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="text-[#B8B8B8] text-[1.4rem] leading-[2rem] font-medium">
                Back to home
              </h3>
            </div>
            <div className="flex w-[43rem] flex-col items-center justify-center">
              <div className="w-full flex gap-[2.4rem] flex-col">
                <div>
                  <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.6rem] text-white">
                    Enter Business Name 💼
                  </h2>
                  <p className="text-[#B8B8B8] text-[1.4rem] text-center leading-[2rem]">
                    Skip this section or enter your business name <br />
                    below to create an account.
                  </p>
                </div>

                <div className="w-full block mb-[1.6rem]">
                  <BusinessForm
                    nextStep={(currentIndex) => finishForm(currentIndex)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {allStepsCompleted && (
          <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
            <div className="flex w-[43rem] flex-col items-center justify-center">
              <div className="w-full flex gap-[2.4rem] flex-col">
                <div>
                  <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.6rem] text-white">
                    Account created! Welcome aboard{" "}
                    {userIfo?.name && (
                      <>
                        ,<br />
                        {userIfo?.name} 🎉
                      </>
                    )}
                  </h2>
                </div>

                <div className="w-full block mb-[1.6rem]">
                  <Button
                    type="button"
                    onClick={() => {
                      handleStepClick(0);

                      router.push("/auth/tenant");
                    }}
                    variant="danger"
                    size="large"
                    className={classNames(
                      "rounded-[12px]  w-full",

                      "bg-brand-default text-brand hover:bg-brand-default opacity-100 "
                    )}
                  >
                    Go to dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
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
