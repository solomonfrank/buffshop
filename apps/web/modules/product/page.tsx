"use client";

import { Button, CustomTabs, InputField, TabsNavigationItem } from "@buff/ui";
import { Authorization } from "@lib/hooks/useAuthorization";
import { ROLES } from "_types";
import classNames from "classnames";
import { SearchIcon } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import { useProfileStore } from "store/use-edit";
import { DigitalProduct } from "./components/digital-product";

export const ProductManagementPage = () => {
  const userProfile = useProfileStore((state) => state.userDetails);

  const items: TabsNavigationItem = [
    {
      label: ({ isSelected }) => (
        <div
          className={classNames(
            "flex gap-[1rem] items-center text-center justify-center h-full",
            isSelected && "text-white"
          )}
        >
          <span>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66732 10.8334C1.93094 10.8334 1.33398 10.2365 1.33398 9.50008C1.33398 8.76368 1.93094 8.16675 2.66732 8.16675"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.334 10.8334C14.0704 10.8334 14.6673 10.2365 14.6673 9.50008C14.6673 8.76368 14.0704 8.16675 13.334 8.16675"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.66602 5.16675V3.16675"
                stroke="white"
                stroke-linejoin="round"
              />
              <path
                d="M11.334 5.16675V3.16675"
                stroke="white"
                stroke-linejoin="round"
              />
              <path
                d="M4.66667 3.16659C5.03486 3.16659 5.33333 2.86811 5.33333 2.49992C5.33333 2.13173 5.03486 1.83325 4.66667 1.83325C4.29848 1.83325 4 2.13173 4 2.49992C4 2.86811 4.29848 3.16659 4.66667 3.16659Z"
                stroke="white"
                stroke-linejoin="round"
              />
              <path
                d="M11.3327 3.16659C11.7009 3.16659 11.9993 2.86811 11.9993 2.49992C11.9993 2.13173 11.7009 1.83325 11.3327 1.83325C10.9645 1.83325 10.666 2.13173 10.666 2.49992C10.666 2.86811 10.9645 3.16659 11.3327 3.16659Z"
                stroke="white"
                stroke-linejoin="round"
              />
              <path
                d="M9 5.16675H7C5.11438 5.16675 4.17157 5.16675 3.58579 5.77273C3 6.37872 3 7.35401 3 9.30468C3 11.2553 3 12.2306 3.58579 12.8366C4.17157 13.4426 5.11438 13.4426 7 13.4426H7.68353C8.21127 13.4426 8.39747 13.5516 8.76113 13.9476C9.16333 14.3856 9.78607 14.9701 10.3495 15.1061C11.1503 15.2997 11.2399 15.032 11.0613 14.2688C11.0104 14.0514 10.8835 13.7038 11.0173 13.5013C11.0923 13.3878 11.2173 13.3599 11.4672 13.3041C11.8615 13.2161 12.1865 13.0721 12.4142 12.8366C13 12.2306 13 11.2553 13 9.30468C13 7.35401 13 6.37872 12.4142 5.77273C11.8284 5.16675 10.8856 5.16675 9 5.16675Z"
                stroke="white"
                stroke-linejoin="round"
              />
              <path
                d="M6.33398 10.5C6.71405 10.9048 7.31912 11.1667 8.00065 11.1667C8.68218 11.1667 9.28725 10.9048 9.66732 10.5"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.00597 7.83325H6"
                stroke="white"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.006 7.83325H10"
                stroke="white"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span>Digital Product (0)</span>
        </div>
      ),
      key: "digital",
      children: <DigitalProduct type="digital" />,
    },

    {
      label: ({ isSelected }) => (
        <div
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
              d="M1.83949 11.0395C1.98808 8.71073 2.42557 7.0066 2.79629 6.01674C2.98345 5.517 3.38611 5.14485 3.90162 5.02014C6.7683 4.32662 10.2331 4.32662 13.0997 5.02014C13.6153 5.14485 14.0179 5.517 14.2051 6.01674C14.5758 7.0066 15.0133 8.71073 15.1619 11.0395C15.2507 12.4326 14.2439 13.2002 13.1293 13.7617C12.4193 14.1193 11.8734 13.0638 11.511 12.2469C11.313 11.8005 10.8785 11.5237 10.3861 11.5237H6.61529C6.12286 11.5237 5.68837 11.8005 5.49036 12.2469C5.12791 13.0638 4.58199 14.1193 3.87206 13.7617C2.76875 13.2059 1.74988 12.4438 1.83949 11.0395Z"
              stroke="#848484"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.83398 3.50008L5.14255 3.16675M13.1673 3.50008L11.834 3.16675"
              stroke="#848484"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.5 9.16675L5.5 8.16675M5.5 8.16675L4.5 7.16675M5.5 8.16675L4.5 9.16675M5.5 8.16675L6.5 7.16675"
              stroke="#848484"
              stroke-linecap="round"
            />
            <path
              d="M11.1582 7.16675H11.1642"
              stroke="#848484"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.4922 9.16675H12.4982"
              stroke="#848484"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span>Physical Product (0)</span>
        </div>
      ),
      key: "physical",
      children: <DigitalProduct type="physical" />,
    },
  ];

  return (
    <Authorization allowedRoles={[ROLES.TENANT]}>
      <div className="w-full">
        <div className="w-full bg-[#202020] px-[4rem] rounded-tl-[12px] rounded-tr-[12px] py-[3rem]">
          <div className="flex items-center w-full border-b border-[#848484] pb-[3rem]">
            <div className="flex items-center w-full gap-[1.6rem]">
              <div className="flex items-center gap-[1.8rem] mr-auto">
                <div className="flex items-center gap-[1.8rem]  ">
                  <span>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 16.5H15.2632C19.7508 16.5 20.4333 13.6808 21.261 9.56908C21.4998 8.38311 21.6192 7.79013 21.3321 7.39507C21.045 7 20.4947 7 19.3941 7H6"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8 16.5L5.37873 4.01493C5.15615 3.12459 4.35618 2.5 3.43845 2.5H2.5"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M8.88 16.5H8.46857C7.10522 16.5 6 17.6513 6 19.0714C6 19.3081 6.1842 19.5 6.41143 19.5H17.5"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.5 22.5C11.3284 22.5 12 21.8284 12 21C12 20.1716 11.3284 19.5 10.5 19.5C9.67157 19.5 9 20.1716 9 21C9 21.8284 9.67157 22.5 10.5 22.5Z"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                      />
                      <path
                        d="M17.5 22.5C18.3284 22.5 19 21.8284 19 21C19 20.1716 18.3284 19.5 17.5 19.5C16.6716 19.5 16 20.1716 16 21C16 21.8284 16.6716 22.5 17.5 22.5Z"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                      />
                    </svg>
                  </span>
                  <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
                    Product Management
                  </h3>
                </div>
                <div className="w-[454px] flex h-[4rem]">
                  <InputField
                    placeholder="Search"
                    className="w-full h-[4rem] border-none"
                    inputContainer="bg-[#171717] border-none  rounded-none rounded-tl-[8px] rounded-bl-[8px]"
                    prefixIcon={
                      <SearchIcon className="h-[1.6rem] w-[1.6rem]" />
                    }
                  />
                  <button
                    type="button"
                    className="px-[1.2rem] font-medium text-black text-[1.4rem] leading-[2.1rem] bg-brand-default h-full rounded-none rounded-tr-[8px] rounded-br-[8px]"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="">
                <Button
                  href="/app/product-management/create"
                  variant="danger"
                  size="large"
                  prefixIcon={<AiOutlinePlus />}
                  className={classNames("rounded-[8px] h-[4rem]")}
                >
                  Add New Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[3.2rem]">
          <div>
            <CustomTabs
              items={items}
              defaultActiveKey="digital"
              activeClassName="border-none text-left bg-[#848484] text-[#FFFFFF] "
              tabItemClassName=" text-left  cursor-pointer  flex-1  items-center  py-[1.5rem]  overflow-hidden  "
              headerClassName="bg-[#282828] mb-[2.4rem] rounded-[12px] leading-[2.1rem] overflow-hidden items-center   justify-center shadow-[0px_1px_2px_rgba(0, 0, 0, 0.08)] !w-1/2 "
            />
          </div>
        </div>
      </div>
    </Authorization>
  );
};
