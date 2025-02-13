"use client";

import {
  FactorAuthIcon,
  NotificationMgtIcon,
  PaymentIcon,
  ProductMgtIcon,
  SecurityIcon,
  StoreIcon,
  UserIcon,
} from "@components/icons";
import { MenuItem, NavigationItemType } from "@components/shell";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useProfileStore } from "store/use-edit";
import { ProfileSection } from "./components/profile";
import { StoreFrontSection } from "./components/store-front";

const ProfileDetails: React.FC = () => {
  const userProfile = useProfileStore((state) => state.userDetails);

  const { id } = useParams()!;
  const router = useRouter();
  const query = useSearchParams();

  const tabName = query.get("tab") || "information";

  const TENANT_NAVIGATION: NavigationItemType[] = [
    {
      name: "Profile Information",
      href: "/app/profile?tab=information",
      isEnabled: true,
      defaultKey: "information",
      icon: UserIcon,
      isCurrent: ({ pathname }) => {
        return pathname?.includes("information") ?? false;
      },
    },

    {
      name: "Storefront Customization",
      href: "/app/profile?tab=storefront",
      icon: StoreIcon,
      isEnabled: true,
      isCurrent: ({ pathname }) => {
        return pathname?.includes("storefront") ?? false;
      },
    },

    {
      name: "Payment & Billing Information",
      href: "/app/profile?tab=payment",
      icon: PaymentIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("payment") ?? false;
      },
    },
    {
      name: "Product & Content Management",
      href: "/app/profile?tab=product",
      icon: ProductMgtIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("product") ?? false;
      },
    },
    {
      name: "Security & Activity Logs",
      href: "/app/profile?tab=security",
      icon: SecurityIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("security") ?? false;
      },
    },

    {
      name: "Notifications & Alerts",
      href: "/app/profile?tab=notifications",
      icon: NotificationMgtIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("notifications") ?? false;
      },
    },
    {
      name: "2-Factor Authentication",
      href: "/app/profile?tab=2fa",
      icon: FactorAuthIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("2fa") ?? false;
      },
    },
  ];

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
          Profile Management
        </h3>
      </div>

      <div className="w-full">
        <div className="flex w-full gap-[17px] ">
          <div className="w-[30%] max-h-[236px] p-[12px] relative rounded-[6px] bg-[#202020]  shadow-[0px_1px_3px_rgba(0, 0, 0, 0.1)]">
            <div className="flex flex-col flex-1 ">
              {TENANT_NAVIGATION?.map((item) => (
                <MenuItem key={item.name} item={item} />
              ))}
            </div>
          </div>
          <div className="flex w-0 flex-col flex-1">
            {tabName === "information" && <ProfileSection />}
            {tabName === "storefront" && <StoreFrontSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
