"use client";

import { dayjs } from "@buff/lib";
import {
  Button,
  CustomSelect,
  InputField,
  Table,
  TRANSACTION_OPTIONS,
} from "@buff/ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ROLES } from "_types";
import classNames from "classnames";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CiBank } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { useProfileStore } from "store/use-edit";
import { TransactionProps, useTenantTransaction } from "./api/get-transactions";
import { useGetUser } from "./api/get-user";

export const WalletPage = () => {
  const [filter, setFilter] = useState({
    currentPage: "1",
    pageSize: "10",
  });

  const userDetails = useGetUser({ enabled: true });
  const transactions = useTenantTransaction({
    filter: {
      ...filter,
      PageNumber: `${filter.currentPage}`,
      PageSize: `${filter.pageSize}`,
    },
    enabled: true,
  });

  console.log("userDetails", userDetails.data?.data);

  const userProfile = useProfileStore((state) => state.userDetails);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between bg-[#202020] mb-[3.2rem] px-[4rem] rounded-tl-[12px] rounded-tr-[12px] py-[3rem]">
        <div className="flex items-center gap-[1.8rem] mb-[1.6rem] ">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 14.5C16 15.3284 16.6716 16 17.5 16C18.3284 16 19 15.3284 19 14.5C19 13.6716 18.3284 13 17.5 13C16.6716 13 16 13.6716 16 14.5Z"
              stroke="#FFBE0A"
              stroke-width="1.5"
            />
            <path
              d="M18.9 8.5C18.9656 8.17689 19 7.84247 19 7.5C19 4.73858 16.7614 2.5 14 2.5C11.2386 2.5 9 4.73858 9 7.5C9 7.84247 9.03443 8.17689 9.10002 8.5"
              stroke="#FFBE0A"
              stroke-width="1.5"
            />
            <path
              d="M7 8.49324H16C18.8284 8.49324 20.2426 8.49324 21.1213 9.37234C22 10.2515 22 11.6663 22 14.4961V16.4971C22 19.3269 22 20.7418 21.1213 21.6209C20.2426 22.5 18.8284 22.5 16 22.5H10C6.22876 22.5 4.34315 22.5 3.17157 21.3279C2 20.1557 2 18.2692 2 14.4961V12.4952C2 8.72211 2 6.83558 3.17157 5.66344C4.11466 4.7199 5.52043 4.53589 8 4.5H10"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
            Wallet Management
          </h3>
        </div>
        <div className="flex items-center  gap-[45px]">
          <div className="flex gap-[2.7rem]">
            <div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.57617 26.9958L26.9578 5.61426M31.0527 18.4258L27.3868 22.0917M24.2582 25.183L22.627 26.8142"
                  stroke="#FFBE0A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5.29177 26.9015C2.68139 24.2912 2.68139 20.0588 5.29177 17.4485L17.4495 5.2908C20.0598 2.68041 24.2922 2.68041 26.9025 5.2908L34.7095 13.0979C37.32 15.7082 37.32 19.9405 34.7095 22.5508L22.5518 34.7085C19.9415 37.319 15.7092 37.319 13.0988 34.7085L5.29177 26.9015Z"
                  stroke="#FFBE0A"
                  stroke-width="2.5"
                />
                <path
                  d="M6.66602 36.667H33.3327"
                  stroke="#FFBE0A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div>
              <h5 className="capitalize font-medium text-[1.2rem] leading-[2.4rem] text-[#B8B8B8]">
                Available Balance
              </h5>
              <h3 className="font-bold text-[22px] leading-[28px]">
                ₦{userDetails.data?.data?.balance ?? 0.0}
              </h3>
              <h5 className="capitalize font-medium text-[1.1rem] tracking-[0.06px] leading-[1.3rem] text-[#B8B8B8]">
                Pending Earnings: ₦{userDetails.data?.data?.balance ?? 0.0}
              </h5>
            </div>
          </div>
          <Button
            href="/app/tenant-management/create"
            variant="danger"
            size="large"
            prefixIcon={<CiBank size={20} />}
            className={classNames("rounded-[8px] h-[4rem]")}
          >
            Withdraw Balance
          </Button>
        </div>
      </div>

      <div className="w-full bg-[#202020] px-[4rem] rounded-tl-[12px] rounded-tr-[12px] py-[3rem]">
        <div className="flex items-center gap-[1.8rem] mb-[1.6rem] ">
          <span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0065 21.5H9.60546C6.02021 21.5 4.22759 21.5 3.11379 20.365C2 19.2301 2 17.4034 2 13.75C2 10.0966 2 8.26992 3.11379 7.13496C4.22759 6 6.02021 6 9.60546 6H13.4082C16.9934 6 18.7861 6 19.8999 7.13496C20.7568 8.00819 20.9544 9.2909 21 11.5"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.85 19.35L17.5 18.45V16.2M13 18C13 20.4853 15.0147 22.5 17.5 22.5C19.9853 22.5 22 20.4853 22 18C22 15.5147 19.9853 13.5 17.5 13.5C15.0147 13.5 13 15.5147 13 18Z"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 6L15.9007 5.69094C15.4056 4.15089 15.1581 3.38087 14.5689 2.94043C13.9796 2.5 13.197 2.5 11.6316 2.5H11.3684C9.80304 2.5 9.02036 2.5 8.43111 2.94043C7.84186 3.38087 7.59436 4.15089 7.09934 5.69094L7 6"
                stroke="#FFBE0A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
            Transaction History
          </h3>
        </div>

        <div className="flex items-center w-full border-b border-[#848484] pb-[3rem]">
          <div className="flex items-center w-full gap-[1.6rem]">
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

            <h3 className="text-[#848484] text-[12px] font-medium leading-[1.4rem]">
              Filter by Duration
            </h3>
            <div className="flex gap-[1.6rem]">
              <div className="w-[12rem]">
                <CustomSelect
                  name="from"
                  placeholder="From"
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
                  // value={value}
                  onChange={(e) => {
                    //  onChange(e);
                  }}
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
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
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
                      minHeight: "4rem",
                      borderColor: "#171717",
                      boxShadow: "none",
                      borderRadius: "8px",
                      background: "#171717",
                      flexShrink: 0,
                      color: "#fff",

                      ":hover": {
                        borderColor: "#171717",
                      },

                      ":active": {
                        borderColor: "#171717",
                        color: "#fff",
                      },
                    }),
                  }}
                />
              </div>
              <div className="w-[12rem]">
                <CustomSelect
                  name="To"
                  placeholder="To"
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
                  // value={value}
                  onChange={(e) => {
                    //  onChange(e);
                  }}
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
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
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
                      whiteSpace: "nowrap",
                    }),
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "4rem",
                      borderColor: "#171717",
                      boxShadow: "none",
                      borderRadius: "8px",
                      background: "#171717",
                      flexShrink: 0,
                      color: "#fff",

                      ":hover": {
                        borderColor: "#171717",
                      },

                      ":active": {
                        borderColor: "#171717",
                        color: "#fff",
                      },
                    }),
                  }}
                />
              </div>

              {userProfile.role === ROLES.SUPERADMIN && (
                <Button
                  href="/app/tenant-management/create"
                  variant="danger"
                  size="large"
                  prefixIcon={<AiOutlinePlus />}
                  className={classNames("rounded-[8px] h-[4rem]")}
                >
                  create new tenant
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Table<TransactionProps>
          isLoading={transactions.isPending}
          thClassName="!text-[12px] !uppercase"
          tdClassName="!text-[14px]"
          filterFields={TRANSACTION_OPTIONS}
          columns={[
            {
              title: "transaction id",
              field: "id",
            },
            { title: "transaction amount", field: "amount" },
            { title: "descriptions", field: "description" },
            {
              title: "status",
              field: "status",
              Cell: ({ entry }) => {
                if (entry.status === "inactive") {
                  return (
                    <button className="outline-none bg-[#171717] px-[1rem] text-[1.2rem] leading-[1.8rem] border rounded-[6px] text-[#D1D5DB] border-[#D1D5DB] capitalize">
                      {entry.status}
                    </button>
                  );
                }
                if (entry.status === "deactivated") {
                  return (
                    <button className="outline-none bg-[#171717] px-[1rem] text-[1.2rem] leading-[1.8rem] border rounded-[6px] text-[#F98080] border-[#F98080] capitalize">
                      {entry.status}
                    </button>
                  );
                }
                return (
                  <button className="outline-none bg-[#171717] px-[1rem] text-[1.2rem] leading-[1.8rem] border rounded-[6px] text-[#FACA15] border-[#FACA15] capitalize">
                    {entry.status}
                  </button>
                );
              },
            },

            { title: "transaction date", field: "createdAt" },

            {
              title: "",
              field: "id",

              Cell: ({ entry }) => <MoreMenu entry={entry} />,
            },
          ]}
          data={
            transactions.data?.map((item) => {
              return {
                id: item.id,
                amount: item.amount,
                description: item.description,
                status: item.status,
                createdAt: dayjs(item?.createdAt).format(
                  "DD MMM, YYYY hh:mm:ssa"
                ),
              };
            }) ?? []
          }
          totalItems={20}
          pageSize={10}
          currentPage={1}
          onPageSizeChange={(size: number) => {}}
          onPageChange={(page: number) => {}}
        />
      </div>
    </div>
  );
};

const MoreMenu = ({ entry }: { entry: TransactionProps }) => {
  const router = useRouter();

  const dropdownMenuItemClass =
    "flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1";

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="" aria-label="Customise options">
            <MdMoreHoriz size={24} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className=" space-y-6  border min-w-[200px] bg-[#202020] rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            side="bottom"
          >
            <DropdownMenu.Item
              className={dropdownMenuItemClass}
              onClick={() => router.push(`/app/tenant-management/${entry.id}`)}
            >
              <span>
                <FaEye size={15} />
              </span>
              <span className="text-[16px]">View Tenant</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
