"use client";

import { CustomTabs, Logo, TabsNavigationItem } from "@buff/ui";
import { useSetStep } from "@lib/hooks/useStep";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import Steps from "rc-steps";

import "rc-steps/assets/index.css";
import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import { BVNForm } from "./bvn-form";
import { NINForm } from "./nin-form";
import { StepProps } from "./page";

export const KycAuthTab = () => {
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

  const currentTab = query.get("q") || "bvn";

  useEffect(() => {
    if (!query.has("q")) {
      setpStep("bvn");
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
            setpStep("bvn");
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
                d="M2.05957 6.21269C2.05957 5.41524 2.38116 4.92653 3.04666 4.55617L5.78615 3.03161C7.22164 2.23275 7.93937 1.83331 8.72624 1.83331C9.5131 1.83331 10.2308 2.23275 11.6663 3.03161L14.4058 4.55617C15.0713 4.92653 15.3929 5.41525 15.3929 6.21269C15.3929 6.42893 15.3929 6.53705 15.3693 6.62594C15.2452 7.09295 14.822 7.16665 14.4134 7.16665H3.03909C2.63042 7.16665 2.20725 7.09294 2.08318 6.62594C2.05957 6.53705 2.05957 6.42893 2.05957 6.21269Z"
                stroke="white"
              />
              <path
                d="M8.72363 5.16669H8.72963"
                stroke="white"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.39355 7.16669V12.8334M6.06022 7.16669V12.8334"
                stroke="white"
              />
              <path
                d="M11.3936 7.16669V12.8334M14.0602 7.16669V12.8334"
                stroke="white"
              />
              <path
                d="M13.3929 12.8333H4.05957C2.955 12.8333 2.05957 13.7287 2.05957 14.8333C2.05957 15.0174 2.20881 15.1666 2.3929 15.1666H15.0596C15.2436 15.1666 15.3929 15.0174 15.3929 14.8333C15.3929 13.7287 14.4975 12.8333 13.3929 12.8333Z"
                stroke="white"
              />
            </svg>
          </span>
          <span>BVN Verification</span>
        </div>
      ),
      key: "bvn",
      children: <BVNForm />,
    },

    {
      label: ({ isSelected }) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            setpStep("nin");
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
              d="M5.41461 11.9075C4.68102 12.3287 2.75761 13.1888 3.9291 14.265C4.50136 14.7907 5.13872 15.1667 5.94002 15.1667H10.5124C11.3138 15.1667 11.9511 14.7907 12.5234 14.265C13.6948 13.1888 11.7714 12.3287 11.0378 11.9075C9.31764 10.9198 7.13484 10.9198 5.41461 11.9075Z"
              stroke="#848484"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5602 7.16665C10.5602 8.45531 9.51555 9.49998 8.22689 9.49998C6.93822 9.49998 5.89355 8.45531 5.89355 7.16665C5.89355 5.87798 6.93822 4.83331 8.22689 4.83331C9.51555 4.83331 10.5602 5.87798 10.5602 7.16665Z"
              stroke="#848484"
            />
            <path
              d="M2.1289 11.1666C1.76291 10.3442 1.55957 9.43398 1.55957 8.47638C1.55957 4.80751 4.54434 1.83331 8.22624 1.83331C11.9081 1.83331 14.8929 4.80751 14.8929 8.47638C14.8929 9.43398 14.6896 10.3442 14.3236 11.1666"
              stroke="#848484"
              stroke-linecap="round"
            />
          </svg>

          <span>NIN Verification</span>
        </div>
      ),
      key: "nin",
      children: <NINForm />,
    },
  ];

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
            <Link href="/auth/tenant">
              <Logo />
            </Link>
          </div>

          <figure className="z-50 overflow-hidden absolute left-0 bottom-0 w-full">
            <img src={"/images/kyc.png"} className="w-full object-contain" />
          </figure>
        </div>

        <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
          <div className="flex w-[43rem] flex-col items-center justify-center">
            <div className="w-full flex gap-[2.4rem] flex-col">
              <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.3rem] text-white">
                Verifying your identity.
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
      </div>
    </div>
  );
};
