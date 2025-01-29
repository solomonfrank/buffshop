"use client";

import { CustomSelect, Label, showToast } from "@buff/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useProfileStore } from "store/use-edit";
import { ServerResponseType } from "~/auth/api/reset-password";
import ReviewsComponent from "./components/review";

const ProductDetailsPage: React.FC = () => {
  const [accesses, setAccesses] = useState<string[]>(["1", "2", "3", "5", "6"]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [profileStatus, setProfileStatus] = useState("");
  const userProfile = useProfileStore((state) => state.userDetails);

  const { id } = useParams()!;
  const router = useRouter();

  const permissionOnSuccess = (response: ServerResponseType) => {
    showToast(response.message, "success");
  };

  const permissionOnonError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const onSuccess = (response: ServerResponseType) => {
    setOpenConfirmModal(false);
    showToast(response.message, "success");

    queryClient.invalidateQueries({ queryKey: ["admins"] });

    return;
  };

  const onError = (errorResponse: any) => {
    setOpenConfirmModal(false);
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const queryClient = useQueryClient();

  return (
    <div>
      <div className="flex items-center gap-[4rem] mb-[3.6rem]">
        <span onClick={() => router.back()} className="cursor-pointer">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66602 20H33.3327"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.9993 28.3337C14.9993 28.3337 6.66605 22.1963 6.66602 20.0003C6.666 17.8043 14.9993 11.667 14.9993 11.667"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-white text-[2.7rem] leading-[3.2rem] font-bold">
          Product Details
        </h3>
      </div>

      <div className="flex gap-[21px]">
        <div className="w-[33%]">
          <div className="flex items-center gap-[8px]">
            <h2 className="text-[#FFBE0A] text-[2.7rem] leading-[3.2rem] font-bold mb-2">
              Basketball Assassin
            </h2>
          </div>

          <p className="flex items-center gap-[8px] mb-[3.2rem]">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.66732 5.33337H13.4647C13.8812 5.33337 14.0895 5.33337 14.2419 5.4006C14.9164 5.69797 14.6149 6.44721 14.5014 6.98564C14.481 7.08237 14.4147 7.16471 14.3217 7.20884C13.9362 7.39177 13.6661 7.73877 13.5953 8.14231L13.2002 10.3919C13.0264 11.3817 12.967 12.7962 12.0996 13.4935C11.4632 14 10.5463 14 8.71232 14H7.28899C5.45507 14 4.53812 14 3.90172 13.4935C3.03433 12.7962 2.97491 11.3817 2.80109 10.3919L2.40603 8.14231C2.33517 7.73877 2.06514 7.39177 1.67959 7.20884C1.58663 7.16471 1.52033 7.08237 1.49995 6.98564C1.38648 6.44721 1.08492 5.69797 1.7594 5.4006C1.91188 5.33337 2.12013 5.33337 2.53663 5.33337H5.00065"
                  stroke="#848484"
                  stroke-linecap="round"
                />
                <path
                  d="M9.33268 8H6.66602"
                  stroke="#848484"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.33398 7.33333L6.66732 2M10.0007 2L11.6673 5.33333"
                  stroke="#848484"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <span className="text-white font-medium text-[12px] leading-[24px]">
              Digital Product
            </span>
          </p>

          <div className="flex gap-[4rem] flex-wrap">
            <div className="mb-4">
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem] uppercase">
                PRODUCT PRICE
              </p>
              <p className="text-white text-[2.4rem] leading-[2.4rem] font-medium">
                ₦25,000.00
              </p>
            </div>
            <div className="mb-4">
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem] uppercase">
                PRICE DISCOUNT
              </p>
              <p className="text-white text-[2.4rem] leading-[2.4rem] font-medium">
                ₦23,500.00
              </p>
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem]">
                23% OFF
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem] uppercase">
                SUBSCRIPTION TYPE
              </p>
              <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                Weekly Access - (3 weeks)
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem] uppercase">
                DRM PROTECTION
              </p>
              <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                Enable
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem] uppercase">
                product description
              </p>
              <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[33%]">
          <div className="mb-[12px]">
            <figure className="h-[228px]">
              <img
                src="/images/prod-card.png"
                className="w-full object-cover h-full rounded-[8px]"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="flex gap-[11px] w-full">
            <figure className="h-[117px] w-1/2">
              <img
                src="/images/prod-card.png"
                className="w-full object-cover h-full rounded-[8px]"
                loading="lazy"
              />
            </figure>
            <figure className="h-[117px] w-1/2">
              <img
                src="/images/prod-card.png"
                className="w-full object-cover h-full rounded-[8px]"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
        <div className="w-[33%]">
          <div className="mb-[2rem]">
            <>
              <Label className="text-[1rem] uppercase leading-[16px] inline-block text-[#B8B8B8]">
                product notification alert
              </Label>
              <CustomSelect
                name="subscription_type"
                placeholder="Immediately"
                options={[
                  {
                    label: "Console Game",
                    value: "category",
                  },
                  {
                    label: "Console Game",
                    value: "category1",
                  },
                ]}
                styles={{
                  menuList: (provided) => ({
                    ...provided,
                    color: "#fff",
                    fontSize: "1.4rem",
                    background: "#333333",
                    ":hover": {
                      borderColor: "#000",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
                    color: "white",

                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
                    },
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    fontSize: "1.2rem",
                    lineHeight: "2.4rem",
                    fontWeight: 500,
                    color: "#fff",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    fontSize: "1.2rem",
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: "45px",
                    borderColor: "#333333",
                    boxShadow: "none",
                    borderRadius: "12px",
                    background: "transparent",
                    flexShrink: 0,
                    color: "#fff",

                    ":hover": {
                      borderColor: "#333333",
                    },

                    ":active": {
                      borderColor: "#333333",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </>
          </div>
          <div className="flex flex-col gap-[2rem]">
            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57617 26.9959L26.9578 5.61438M31.0527 18.4259L27.3868 22.0918M24.2582 25.1831L22.627 26.8143"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.29177 26.9019C2.68139 24.2915 2.68139 20.0592 5.29177 17.4489L17.4495 5.29116C20.0598 2.68078 24.2922 2.68078 26.9025 5.29116L34.7095 13.0982C37.32 15.7086 37.32 19.9409 34.7095 22.5512L22.5518 34.7089C19.9415 37.3194 15.7092 37.3194 13.0988 34.7089L5.29177 26.9019Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                  <path
                    d="M6.66602 36.6666H33.3327"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8] capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Total Sales
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  ₦2,460,000.89
                </h2>
              </div>
            </div>
            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.6667 21.6754V17.7677C31.6667 16.4046 31.6667 15.7231 31.413 15.1103C31.1592 14.4974 30.6775 14.0155 29.714 13.0516L21.8198 5.15397C20.9883 4.32212 20.5727 3.90621 20.0575 3.65976C19.9503 3.60851 19.8407 3.56301 19.7287 3.52347C19.1902 3.33337 18.6023 3.33337 17.4263 3.33337C12.018 3.33337 9.31385 3.33337 7.48222 4.81081C7.11218 5.10927 6.77513 5.44649 6.47678 5.81667C5 7.64909 5 10.3545 5 15.7652V23.342C5 29.6302 5 32.7742 6.95262 34.7277C8.52443 36.3002 10.8674 36.6069 15 36.6667M20 4.16707V5.00076C20 9.71686 20 12.0749 21.4645 13.54C22.929 15.0051 25.286 15.0051 30 15.0051H30.8333"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6673 36.6666C31.2697 36.6666 35.0007 31.6666 35.0007 31.6666C35.0007 31.6666 31.2697 26.6666 26.6673 26.6666C22.065 26.6666 18.334 31.6666 18.334 31.6666C18.334 31.6666 22.065 36.6666 26.6673 36.6666Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M26.6504 31.6666H26.6654"
                    stroke="#FFBE0A"
                    stroke-width="3.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8] capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Number of views
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  356
                </h2>
              </div>
            </div>

            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.2945 32.5C32.3362 29.8127 35 25.2175 35 20C35 11.7157 28.2843 5 20 5C18.8543 5 17.7387 5.12843 16.6667 5.3717M28.2945 32.5V26.6667M28.2945 32.5H34.1667M11.6667 7.52592C7.64672 10.2168 5 14.7993 5 20C5 28.2843 11.7157 35 20 35C21.1457 35 22.2613 34.8715 23.3333 34.6283M11.6667 7.52592V13.3333M11.6667 7.52592H5.83333"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8] capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Conversion rate
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  23.5%
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mb-[8rem]">
        <button
          // onClick={() => setOpenConfirmModal(true)}

          className="bg-[#E12827] text-white py-[12px] px-[37px] rounded-[8px] flex items-center space-x-2"
        >
          <span>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.75 4.58337L16.4152 10.0052M4.25 4.58337L4.75384 12.9374C4.88287 15.0769 4.9474 16.1466 5.48223 16.9159C5.74667 17.2962 6.08733 17.6173 6.48254 17.8585C7.04196 18.2 7.73423 18.3026 8.83333 18.3334"
                stroke="white"
                stroke-width="1.25"
                stroke-linecap="round"
              />
              <path
                d="M17.1673 12.5L11.334 18.3329M17.1673 18.3333L11.334 12.5004"
                stroke="white"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 4.58329H18M13.8797 4.58329L13.3109 3.40973C12.933 2.63018 12.744 2.24039 12.4181 1.9973C12.3458 1.94338 12.2693 1.89541 12.1892 1.85388C11.8283 1.66663 11.3951 1.66663 10.5287 1.66663C9.64067 1.66663 9.19667 1.66663 8.82973 1.86173C8.74842 1.90497 8.67082 1.95488 8.59774 2.01093C8.26803 2.26388 8.08386 2.66792 7.71551 3.47601L7.21077 4.58329"
                stroke="white"
                stroke-width="1.25"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span className="font-medium text-[12px] leading-[1.5rem]">
            Delete Product
          </span>
        </button>

        <button className="bg-[#FFBE0A] text-[#171717] py-[12px] px-[37px] rounded-[8px] flex items-center space-x-2">
          <span>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1868 3.83757L15.0118 3.01258C15.6953 2.32914 16.8033 2.32914 17.4868 3.01258C18.1702 3.69603 18.1702 4.80411 17.4868 5.48756L16.6618 6.31255M14.1868 3.83757L8.63733 9.387C8.21441 9.81 7.91438 10.3398 7.76932 10.9201L7.16602 13.3333L9.57927 12.73C10.1595 12.585 10.6893 12.2849 11.1123 11.862L16.6618 6.31255M14.1868 3.83757L16.6618 6.31255"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M16.3333 11.25C16.3333 13.9895 16.3333 15.3593 15.5767 16.2813C15.4382 16.45 15.2834 16.6048 15.1146 16.7433C14.1927 17.5 12.8228 17.5 10.0833 17.5H9.66667C6.52397 17.5 4.95263 17.5 3.97632 16.5236C3.00002 15.5474 3 13.976 3 10.8333V10.4166C3 7.67706 3 6.30728 3.75662 5.38533C3.89514 5.21654 4.04992 5.06177 4.2187 4.92324C5.14066 4.16663 6.51043 4.16663 9.25 4.16663"
                stroke="#171717"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span className="font-medium text-[12px] leading-[1.5rem]">
            Edit Product
          </span>
        </button>
      </div>

      <ReviewsComponent />
    </div>
  );
};

export default ProductDetailsPage;
