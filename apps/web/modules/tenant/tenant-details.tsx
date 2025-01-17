"use client";

import { Loader, showToast } from "@buff/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useProfileStore } from "store/use-edit";
import { ServerResponseType } from "~/auth/api/reset-password";
import { useDeactivateTenant } from "./api/deactivate-tenant";
import { useGetTenants } from "./api/get-tenants";
import { ConfirmModal } from "./components/create-tenant";

const TenantDetails: React.FC = () => {
  const [accesses, setAccesses] = useState<string[]>(["1", "2", "3", "5", "6"]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [profileStatus, setProfileStatus] = useState("");
  const userProfile = useProfileStore((state) => state.userDetails);

  const { id } = useParams()!;
  const router = useRouter();

  const admins = useGetTenants({
    filter: {
      id: `${id}`,
    },
    enabled: true,
  });

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

  const deactivateAdminUser = useDeactivateTenant({
    onSuccess,
    onError,
  });

  const queryClient = useQueryClient();

  const toggleConfirmModal = (status: string) => {
    setOpenConfirmModal(true);
    setProfileStatus(status);
  };

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
          Tenant Details
        </h3>
      </div>

      <div className="flex gap-[10.6rem]">
        <div className="w-[40%]">
          {admins.isFetching && (
            <div>
              <div className="animate-pulse relative h-10 block bg-[#282828] mb-4 w-full"></div>
              <div className="animate-pulse relative h-8 block bg-[#282828] mb-4 w-1/2"></div>

              <div className="animate-pulse relative h-10 block bg-[#282828] mb-4 w-full"></div>
            </div>
          )}
          {!admins.isFetching && admins.data && admins.data.length
            ? admins.data.map((item) => (
                <div className="mb-[3rem]">
                  <div className="flex items-center gap-[8px]">
                    <h2 className="text-[#FFBE0A] text-[2.7rem] leading-[3.2rem] font-bold mb-2">
                      {item.name}
                    </h2>
                    <div className="flex items-center mb-4 space-x-2">
                      {item.status === "active" && (
                        <span className="border border-[#FFBE0A] bg-[#171717] text-[#FFBE0A] px-3 py-1 rounded-full text-sm">
                          {item.status}
                        </span>
                      )}
                      {item.status === "inactive" && (
                        <span className="border text-[#D1D5DB] border-[#D1D5DB] bg-[#171717] px-3 py-1 rounded-full text-sm">
                          {item.status}
                        </span>
                      )}
                      {item.status === "deactivated" && (
                        <span className="border border-[#F98080] bg-[#171717] text-[#F98080] px-3 py-1 rounded-full text-sm">
                          {item.status}
                        </span>
                      )}
                    </div>
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
                          d="M1.33398 4L5.94266 6.61131C7.64172 7.574 8.35958 7.574 10.0587 6.61131L14.6673 4"
                          stroke="#848484"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.3445 8.98341C1.38808 11.0271 1.40987 12.0489 2.16396 12.8059C2.91804 13.5629 3.96754 13.5892 6.06654 13.6419C7.36018 13.6745 8.64112 13.6745 9.93478 13.6419C12.0338 13.5892 13.0833 13.5629 13.8374 12.8059C14.5915 12.0489 14.6133 11.0271 14.6568 8.98341C14.6709 8.32628 14.6709 7.67308 14.6568 7.01594C14.6133 4.97225 14.5915 3.9504 13.8374 3.19345C13.0833 2.4365 12.0338 2.41013 9.93478 2.35739C8.64112 2.32488 7.36018 2.32488 6.06653 2.35738C3.96754 2.41012 2.91804 2.43648 2.16395 3.19344C1.40986 3.9504 1.38808 4.97224 1.34449 7.01594C1.33048 7.67308 1.33048 8.32628 1.3445 8.98341Z"
                          stroke="#848484"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-white font-medium text-[12px] leading-[24px]">
                      {item.email}
                    </span>
                  </p>

                  <div className="flex gap-[4rem]">
                    <div className="mb-4">
                      <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem]">
                        Email
                      </p>
                      <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      // onClick={() => setOpenConfirmModal(true)}

                      onClick={() => toggleConfirmModal(item.status)}
                      className="bg-[#E12827] text-white py-[12px] px-[37px] rounded-[8px] flex items-center space-x-2"
                    >
                      <span>
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.85938 3.52051L12.8194 12.4805"
                            stroke="white"
                            stroke-width="0.96"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.7395 8.00059C14.7395 4.46596 11.874 1.60059 8.33945 1.60059C4.80483 1.60059 1.93945 4.46596 1.93945 8.00059C1.93945 11.5352 4.80483 14.4006 8.33945 14.4006C11.874 14.4006 14.7395 11.5352 14.7395 8.00059Z"
                            stroke="white"
                            stroke-width="0.96"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-[12px] leading-[1.5rem]">
                        {item.status === "inactive" ||
                        item.status === "deactivated"
                          ? "Reactivate"
                          : "Deactivate"}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        router.push(`/app/tenant-management/${item.id}/edit`)
                      }
                      className="bg-[#FFBE0A] text-[#171717] py-[12px] px-[37px] rounded-[8px] flex items-center space-x-2"
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
                            d="M14.1868 3.83757L15.0118 3.01258C15.6953 2.32914 16.8033 2.32914 17.4868 3.01258C18.1702 3.69603 18.1702 4.80411 17.4868 5.48756L16.6618 6.31255M14.1868 3.83757L8.63733 9.387C8.21441 9.81 7.91438 10.3398 7.76932 10.9201L7.16602 13.3333L9.57927 12.73C10.1595 12.585 10.6893 12.2849 11.1123 11.862L16.6618 6.31255M14.1868 3.83757L16.6618 6.31255"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.3333 11.2498C16.3333 13.9894 16.3333 15.3592 15.5767 16.2812C15.4382 16.4499 15.2834 16.6047 15.1146 16.7432C14.1927 17.4998 12.8228 17.4998 10.0833 17.4998H9.66667C6.52397 17.4998 4.95263 17.4998 3.97632 16.5235C3.00002 15.5473 3 13.9758 3 10.8332V10.4165C3 7.67694 3 6.30716 3.75662 5.3852C3.89514 5.21642 4.04992 5.06165 4.2187 4.92312C5.14066 4.1665 6.51043 4.1665 9.25 4.1665"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-[12px] leading-[1.5rem]">
                        Modify Tenant
                      </span>
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>

        {/* Permissions Section */}

        <div className="bg-[#202020] p-[3.1rem] rounded-[12px]  w-[60%]">
          <div className="flex gap-[1.8rem] mr-auto mb-[3.2rem]">
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.03552 15.7667C3.82815 16.4972 0.662525 17.9888 2.59061 19.8554C3.53246 20.7671 4.58145 21.4192 5.90027 21.4192H13.4258C14.7446 21.4192 15.7936 20.7671 16.7354 19.8554C18.6635 17.9888 15.4979 16.4972 14.2905 15.7667C11.4593 14.0537 7.86677 14.0537 5.03552 15.7667Z"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.3795 7.54475C13.3795 9.7341 11.6047 11.5089 9.41535 11.5089C7.22599 11.5089 5.45117 9.7341 5.45117 7.54475C5.45117 5.35539 7.22599 3.58057 9.41535 3.58057C11.6047 3.58057 13.3795 5.35539 13.3795 7.54475Z"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                />
                <path
                  d="M16.8477 5.5625H21.8029"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.8477 8.53564H21.8029"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.8203 11.5088H21.8024"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <h3 className="text-[2rem] capitalize font-medium text-white leading-[2.7rem]">
              User logs
            </h3>
          </div>
          <div>No Recent</div>
        </div>
      </div>

      {openConfirmModal && (
        <Loader
          loading={openConfirmModal}
          Message={() => (
            <ConfirmModal
              isPending={deactivateAdminUser.isPending}
              closeModal={() => setOpenConfirmModal(false)}
              okHandler={() => {
                deactivateAdminUser.mutate({
                  id: `${id}`,
                  status: profileStatus,
                });
              }}
              okText="Confirm"
              title="Are you sure about this action?"
            />
          )}
        />
      )}
    </div>
  );
};

export default TenantDetails;
