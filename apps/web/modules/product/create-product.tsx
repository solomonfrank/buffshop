"use client";

import { CustomTabs, TabsNavigationItem } from "@buff/ui";
import classNames from "classnames";
import { useParams, useRouter } from "next/navigation";
import { useGetProducts } from "./api/get-product";
import { CreateDigitalForm } from "./components/create-digital-product";
import { CreatePhysicalForm } from "./components/create-physical-product";

export const CreateProduct = ({
  title = "Add New Product",
}: {
  title?: string;
}) => {
  const router = useRouter();
  const { id } = useParams()!;
  const products = useGetProducts({
    filter: {
      PageNumber: `1`,
      PageSize: `10`,
      name: id as string,
    },
    enabled: Boolean(id),
  });

  const product = products.data?.[0];

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
      children: <CreateDigitalForm defaultValue={product} />,
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
      children: <CreatePhysicalForm defaultValue={product} />,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center gap-[4rem]">
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
          {title}
        </h3>
      </div>

      <div className="w-full mt-[3.2rem]">
        <div className="w-full">
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
  );
};
