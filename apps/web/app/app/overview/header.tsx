"use client";

import { InputField, Logo } from "@buff/ui";
import { SearchIcon } from "lucide-react";
import { useProfileStore } from "store/use-edit";

import { useRouter } from "next/navigation";
export const Header = () => {
  const userProfile = useProfileStore((state) => state.userDetails);

  const router = useRouter();

  return (
    <div className="w-full h-[calc(var(--header-navigation-height))] bg-[#202020]  px-[8rem] py-[2.6rem] flex items-center">
      <div className="flex items-center gap-[83px] mr-auto">
        <Logo />
        <div className="w-[454px] flex h-[4rem]">
          <InputField
            placeholder="Search"
            className="w-full h-[4rem] border-none"
            inputContainer="bg-[#171717] border-none  rounded-none rounded-tl-[8px] rounded-bl-[8px]"
            prefixIcon={<SearchIcon className="h-[1.6rem] w-[1.6rem]" />}
          />
          <button
            type="button"
            className="px-[1.2rem] font-medium text-black text-[1.4rem] leading-[2.1rem] bg-brand-default h-full rounded-none rounded-tr-[8px] rounded-br-[8px]"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex gap-[3.2rem] items-center">
        <div className="flex gap-[8px] items-center justify-center">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C20.9033 11.0876 20.4982 11.6081 20.3919 12.2134L19.7993 15.5878C19.5386 17.0725 19.4495 19.1943 18.1484 20.2402C17.1938 21 15.8184 21 13.0675 21H10.9325C8.18162 21 6.8062 21 5.8516 20.2402C4.55052 19.1942 4.46138 17.0725 4.20066 15.5878L3.60807 12.2134C3.50177 11.6081 3.09673 11.0876 2.51841 10.8132C2.37896 10.747 2.27952 10.6235 2.24894 10.4784C2.07874 9.67075 1.6264 8.5469 2.63812 8.10084C2.86684 8 3.17922 8 3.80397 8H7.5"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M14 12H10"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 11L10 3M15 3L17.5 8"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span className="text-[16px] leading-[20px]">₦23,500.00</span>
        </div>
        <div className="">
          <div className="flex gap-[1.6rem] text-[#848484] items-center text-[1.6rem] leading-[2rem]">
            {userProfile.image ? (
              <figure className="w-[4.8rem] h-[4.8rem] rounded-full overflow-hidden">
                <img src={userProfile?.image} className="w-full h-full" />
              </figure>
            ) : (
              <svg
                width="42"
                height="40"
                viewBox="0 0 42 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="20.5769"
                  cy="20"
                  rx="20.5769"
                  ry="20"
                  fill="#FFBE0A"
                />
                <ellipse
                  cx="20.9726"
                  cy="15"
                  rx="7.51849"
                  ry="7.30769"
                  fill="white"
                />
                <mask
                  id="mask0_196_56"
                  // style="mask-type:luminance"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="2"
                  width="37"
                  height="36"
                >
                  <ellipse
                    cx="20.5767"
                    cy="20"
                    rx="18.2027"
                    ry="17.6923"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_196_56)">
                  <ellipse
                    cx="20.5762"
                    cy="37.6924"
                    rx="13.834"
                    ry="13.4462"
                    fill="white"
                  />
                </g>
              </svg>
            )}

            <div
              onClick={() => router.push("/app/profile?tab=information")}
              className="cursor-pointer"
            >
              <h3 className="text-[#FFFFFF] text-[1.6rem] leading-[2rem]">
                {`${userProfile?.name ?? ""}`}
              </h3>
              <p className="text-[1.3rem] leading-[2rem]">
                {userProfile?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
