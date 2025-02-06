"use client";

import { dayjs } from "@buff/lib";
import { Button, CustomSelect, InputField, Table } from "@buff/ui";
import { Authorization } from "@lib/hooks/useAuthorization";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ROLES } from "_types";
import classNames from "classnames";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { useProfileStore } from "store/use-edit";
import { AdminTableProps, useGetAdmins } from "./api/get-admins";

export const SuperAdminPage = () => {
  const [filter, setFilter] = useState({
    currentPage: "1",
    pageSize: "10",
  });
  const admins = useGetAdmins({
    filter: {
      ...filter,
      PageNumber: `${filter.currentPage}`,
      PageSize: `${filter.pageSize}`,
    },
    enabled: true,
  });

  const userProfile = useProfileStore((state) => state.userDetails);

  return (
    <Authorization allowedRoles={[ROLES.SUPERADMIN, ROLES.ADMIN]}>
      <div className="w-full">
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
                  d="M21.3175 7.64139L20.8239 6.78479C20.4506 6.13696 20.264 5.81305 19.9464 5.68388C19.6288 5.55472 19.2696 5.65664 18.5513 5.86048L17.3311 6.20418C16.8725 6.30994 16.3913 6.24994 15.9726 6.03479L15.6357 5.84042C15.2766 5.61043 15.0004 5.27133 14.8475 4.87274L14.5136 3.87536C14.294 3.21534 14.1842 2.88533 13.9228 2.69657C13.6615 2.50781 13.3143 2.50781 12.6199 2.50781H11.5051C10.8108 2.50781 10.4636 2.50781 10.2022 2.69657C9.94085 2.88533 9.83106 3.21534 9.61149 3.87536L9.27753 4.87274C9.12465 5.27133 8.84845 5.61043 8.48937 5.84042L8.15249 6.03479C7.73374 6.24994 7.25259 6.30994 6.79398 6.20418L5.57375 5.86048C4.85541 5.65664 4.49625 5.55472 4.17867 5.68388C3.86109 5.81305 3.67445 6.13696 3.30115 6.78479L2.80757 7.64139C2.45766 8.24864 2.2827 8.55227 2.31666 8.87549C2.35061 9.19871 2.58483 9.45918 3.05326 9.98012L4.0843 11.1328C4.3363 11.4518 4.51521 12.0078 4.51521 12.5077C4.51521 13.0078 4.33636 13.5636 4.08433 13.8827L3.05326 15.0354C2.58483 15.5564 2.35062 15.8168 2.31666 16.1401C2.2827 16.4633 2.45766 16.7669 2.80757 17.3741L3.30114 18.2307C3.67443 18.8785 3.86109 19.2025 4.17867 19.3316C4.49625 19.4608 4.85542 19.3589 5.57377 19.155L6.79394 18.8113C7.25263 18.7055 7.73387 18.7656 8.15267 18.9808L8.4895 19.1752C8.84851 19.4052 9.12464 19.7442 9.2775 20.1428L9.61149 21.1403C9.83106 21.8003 9.94085 22.1303 10.2022 22.3191C10.4636 22.5078 10.8108 22.5078 11.5051 22.5078H12.6199C13.3143 22.5078 13.6615 22.5078 13.9228 22.3191C14.1842 22.1303 14.294 21.8003 14.5136 21.1403L14.8476 20.1428C15.0004 19.7442 15.2765 19.4052 15.6356 19.1752L15.9724 18.9808C16.3912 18.7656 16.8724 18.7055 17.3311 18.8113L18.5513 19.155C19.2696 19.3589 19.6288 19.4608 19.9464 19.3316C20.264 19.2025 20.4506 18.8785 20.8239 18.2307L21.3175 17.3741C21.6674 16.7669 21.8423 16.4633 21.8084 16.1401C21.7744 15.8168 21.5402 15.5564 21.0718 15.0354L20.0407 13.8827C19.7887 13.5636 19.6098 13.0078 19.6098 12.5077C19.6098 12.0078 19.7888 11.4518 20.0407 11.1328L21.0718 9.98012C21.5402 9.45918 21.7744 9.19871 21.8084 8.87549C21.8423 8.55227 21.6674 8.24864 21.3175 7.64139Z"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.5 16.5C9.19863 15.2923 10.5044 14.4797 12 14.4797C13.4955 14.4797 14.8013 15.2923 15.5 16.5M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
              Super Admin Management
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
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
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
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
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
                    href="/app/super-admin-management/create"
                    variant="danger"
                    size="large"
                    prefixIcon={<AiOutlinePlus />}
                    className={classNames("rounded-[8px] h-[4rem]")}
                  >
                    Add Super Admin
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Table<AdminTableProps>
            isLoading={admins.isPending}
            thClassName="!text-[12px] !uppercase"
            tdClassName="!text-[14px]"
            columns={[
              {
                title: "tenants",
                field: "name",
              },
              {
                title: "status",
                field: "status",
                Cell: ({ entry }) => {
                  if (entry.status === "inactive") {
                    return (
                      <button className="outline-none bg-[#171717] px-[1rem] text-[1.2rem] leading-[1.8rem] border rounded-[6px] text-[#D1D5DB] border-[#D1D5DB] capitalize">
                        Inactive
                      </button>
                    );
                  }
                  if (entry.status === "deactivated") {
                    return (
                      <button className="outline-none  bg-[#171717] px-[1rem] text-[1.2rem] leading-[1.8rem] border rounded-[6px] text-[#F98080] border-[#F98080] capitalize">
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
              { title: "emails", field: "email" },
              { title: "last login", field: "lastlogin" },

              {
                title: "",
                field: "id",

                Cell: ({ entry }) => <MoreMenu entry={entry} />,
              },
            ]}
            data={
              admins.data?.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  email: item.email,
                  status: item.status,
                  lastlogin: dayjs(item?.updatedAt).format(
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
    </Authorization>
  );
};

const MoreMenu = ({ entry }: { entry: AdminTableProps }) => {
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
              onClick={() =>
                router.push(`/app/super-admin-management/${entry.id}`)
              }
            >
              <span>
                <FaEye size={15} />
              </span>
              <span className="text-[16px]">View Admin</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};
