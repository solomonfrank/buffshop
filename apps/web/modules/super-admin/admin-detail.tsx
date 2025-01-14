"use client";

import { dayjs } from "@buff/lib";
import { Loader, showToast } from "@buff/ui";
import * as Switch from "@radix-ui/react-switch";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ServerResponseType } from "~/auth/api/reset-password";
import { useAssignPermAdminUser } from "./api/assign-perm";
import { useDeactivateAdminUser } from "./api/deactivate-admin";
import { useGetAdmins } from "./api/get-admins";
import { useGetPermission } from "./api/get-permissions";
import { ConfirmModal } from "./components/create-admin";

const SuperAdminDetails: React.FC = () => {
  const [accesses, setAccesses] = useState<string[]>(["1", "2", "3", "5", "6"]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [profileStatus, setProfileStatus] = useState("");

  const { id } = useParams()!;
  const router = useRouter();

  const admins = useGetAdmins({
    filter: {
      id: `${id}`,
    },
    enabled: true,
  });

  const permissionOnSuccess = (response: ServerResponseType) => {
    showToast(response.message, "success");
  };

  const permissionOnonError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const userPermissions = useGetPermission({ enabled: true });
  const assignPermission = useAssignPermAdminUser({
    onSuccess: permissionOnSuccess,
    onError: permissionOnonError,
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

  const deactivateAdminUser = useDeactivateAdminUser({
    onSuccess,
    onError,
  });

  // Toggle permission based on key
  const togglePermission = (isChecked: boolean, key: string) => {
    const copyAccess = Array.from(new Set([...accesses]));

    if (isChecked) {
      copyAccess.push(key);

      setAccesses(copyAccess);
    } else {
      setAccesses(copyAccess.filter((item) => item !== key));
    }

    assignPermission.mutate({
      id: key,
      status: isChecked ? "allow" : "disallow",
      name: admins?.data![0]?.name as string,
    });
  };

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
          Super Admin Details
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
                <>
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
                        SUPER ADMIN CREATED
                      </p>
                      <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                        {dayjs(item?.createdAt).format("DD MMM, YYYY")}
                      </p>
                    </div>

                    <div className="mb-[6.4rem]">
                      <p className="text-[#848484] text-[1rem] font-medium leading-[1.6rem]">
                        LAST LOGIN
                      </p>

                      <p className="text-white text-[1.2rem] leading-[2.4rem] font-medium">
                        {dayjs(item?.updatedAt).format("DD MMM, YYYY")}
                      </p>
                    </div>
                  </div>

                  <button
                    // onClick={() => setOpenConfirmModal(true)}

                    onClickCapture={() => toggleConfirmModal(item.status)}
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
                </>
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
                  d="M11.0029 2.5H10.0062C6.72443 2.5 5.08355 2.5 3.92039 3.31382C3.49006 3.6149 3.11577 3.98891 2.81445 4.41891C2 5.58116 2 7.22077 2 10.5C2 13.7792 2 15.4188 2.81445 16.5811C3.11577 17.0111 3.49006 17.3851 3.92039 17.6862C5.08355 18.5 6.72443 18.5 10.0062 18.5H14.0093C17.2911 18.5 18.932 18.5 20.0951 17.6862C20.5254 17.3851 20.8997 17.0111 21.2011 16.5811C21.8156 15.7042 21.9663 14.5941 22 13.5"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M18 10.2143V11.5M18 10.2143C16.8432 10.2143 15.8241 9.64608 15.2263 8.78331M18 10.2143C19.1568 10.2143 20.1759 9.64608 20.7737 8.78331M15.2263 8.78331L14.0004 9.57143M15.2263 8.78331C14.8728 8.27304 14.6667 7.65973 14.6667 7C14.6667 6.34035 14.8727 5.72711 15.2262 5.21688M20.7737 8.78331L21.9996 9.57143M20.7737 8.78331C21.1272 8.27304 21.3333 7.65973 21.3333 7C21.3333 6.34035 21.1273 5.72711 20.7738 5.21688M18 3.78571C19.1569 3.78571 20.1761 4.354 20.7738 5.21688M18 3.78571C16.8431 3.78571 15.8239 4.354 15.2262 5.21688M18 3.78571V2.5M20.7738 5.21688L22 4.42857M15.2262 5.21688L14 4.42857"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M11 15.5H13"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path d="M12 18.5V22.5" stroke="#FFBE0A" stroke-width="1.5" />
                <path
                  d="M8 22.5H16"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <h3 className="text-[2rem] capitalize font-medium text-white leading-[2.7rem]">
              Super Admin pemissions
            </h3>
          </div>
          <div className="flex flex-col gap-[24px]">
            {userPermissions.isFetching && (
              <div className="animate-pulse relative h-10 block bg-[#282828] mb-4 w-full"></div>
            )}
            {!userPermissions.isFetching &&
            userPermissions.data &&
            userPermissions.data.length
              ? userPermissions.data.map((permissionKey) => (
                  <div key={permissionKey.name} className="flex items-center">
                    <span className=" inline-block min-w-[250px] capitalize font-medium text-[1.6rem] text-[#D1D5DB] leading-[2.4rem]">
                      {permissionKey.name.replace(/([A-Z])/g, " $1")}
                    </span>

                    <Switch.Root
                      className={`relative w-[40px] h-[20px] rounded-full ${
                        accesses.includes(permissionKey.id)
                          ? "bg-[#FFBE0A]"
                          : "bg-[#B8B8B8]"
                      }`}
                      checked={accesses.includes(permissionKey.id)}
                      onCheckedChange={(value) =>
                        togglePermission(value, permissionKey.id)
                      }
                    >
                      <Switch.Thumb
                        className={`block w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 ${
                          accesses.includes(permissionKey.id)
                            ? "translate-x-[20px]"
                            : "translate-x-[3px]"
                        }`}
                      />
                    </Switch.Root>
                  </div>
                ))
              : null}
          </div>
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

export default SuperAdminDetails;
