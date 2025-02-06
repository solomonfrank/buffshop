"use client";

import { PaymentIcon, StoreIcon, UserIcon } from "@components/icons";
import { NavigationItemType, SettingsMenuItem } from "@components/shell";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useProfileStore } from "store/use-edit";
import { AdminSection } from "./component/admin-user";
import { RecoverPasswordSection } from "./component/recover-password";
import { SecurityConfigSection } from "./component/security_config";

const SettingsPage = () => {
  const userProfile = useProfileStore((state) => state.userDetails);

  const query = useSearchParams();

  const tabName = query.get("tab") || "password";

  const { id } = useParams()!;
  const router = useRouter();

  const TENANT_NAVIGATION: NavigationItemType[] = [
    {
      name: "Password",
      href: "/app/settings?tab=password",
      isEnabled: true,
      defaultKey: "password",
      icon: UserIcon,
      isCurrent: ({ pathname }) => {
        return pathname?.includes("password") ?? false;
      },
    },

    {
      name: "User roles and permissions",
      href: "/app/settings?tab=user_roles",
      isEnabled: true,
      icon: StoreIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("user_roles") ?? false;
      },
    },

    {
      name: "Security settings",
      href: "/app/settings?tab=security",
      isEnabled: true,
      icon: PaymentIcon,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("security") ?? false;
      },
    },
  ];

  return (
    <div>
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
              d="M8.73047 21.9986C10.0226 19.7756 12.9819 19.5135 14.6673 21.2122C15.0441 21.592 15.2325 21.782 15.3996 21.8047C15.5667 21.8274 16.6152 21.2261 16.9874 21.0127C17.3668 20.7952 18.4187 20.1918 18.4848 20.034C18.5509 19.8761 18.4817 19.607 18.3433 19.0688C17.8399 17.1117 19.0606 15.052 21.011 14.5208C21.5329 14.3786 21.7938 14.3075 21.8969 14.1716C22 14.0357 22 12.8405 22 12.4032C22 11.966 22 10.7707 21.8969 10.6348C21.7938 10.4989 21.5329 10.4278 21.011 10.2856C19.0603 9.75437 17.8386 7.69473 18.3418 5.73754C18.4801 5.19924 18.5493 4.93009 18.4832 4.77227C18.4171 4.61446 17.3652 4.01115 16.9859 3.79362C16.6136 3.58016 15.5651 2.97888 15.3981 3.0016C15.231 3.02434 15.0426 3.21423 14.6657 3.59403C13.2064 5.06445 10.792 5.06451 9.33276 3.59412C8.95585 3.21433 8.76739 3.02443 8.60035 3.00171C8.4333 2.97898 7.38483 3.58027 7.0126 3.79374C6.63327 4.01128 5.58126 4.61457 5.51516 4.77241C5.44907 4.93025 5.51829 5.19936 5.65672 5.73761C6.16008 7.69474 4.9394 9.75433 2.98902 10.2856C2.46711 10.4278 2.20615 10.4989 2.10308 10.6349C2 10.7707 2 11.966 2 12.4032C2 12.8405 2 14.0357 2.10308 14.1717C2.20617 14.3076 2.467 14.3786 2.98866 14.5207C2.99478 14.5224 3.00089 14.5241 3.007 14.5257"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M2.48891 18.6826C3.56891 17.6031 7.24091 13.9686 7.60091 13.5487C7.98148 13.1049 7.67291 12.5052 7.85651 10.6459C7.94535 9.74627 8.13895 9.07229 8.69291 8.57075C9.35291 7.94701 9.89291 7.94701 11.7529 7.90502C13.3729 7.94701 13.5649 7.76708 13.7329 8.18691C13.8529 8.48679 13.4929 8.66671 13.0609 9.14652C12.1009 10.1061 11.5369 10.586 11.4829 10.8859C11.0929 12.2053 12.6289 12.985 13.4689 12.1453C13.7866 11.8278 15.2569 10.346 15.4009 10.2261C15.5089 10.1301 15.7674 10.1348 15.8929 10.286C16.0009 10.3921 16.0129 10.406 16.0009 10.8858C15.9898 11.33 15.9948 11.9676 15.9961 12.6251C15.9979 13.4771 15.9529 14.4244 15.5929 14.9042C14.8729 15.9837 13.6729 16.0437 12.5929 16.0917C11.5729 16.1517 10.7329 16.0437 10.4689 16.2356C10.2529 16.3436 9.11291 17.5431 7.73291 18.9225L5.27291 21.3815C3.23291 23.0009 0.98891 20.4819 2.48891 18.6826Z"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
            Settings
          </h3>
        </div>
      </div>

      <div className="w-full">
        <div className="flex w-full gap-[17px] ">
          <div className="w-[30%] max-h-[216px] overflow-hidden  relative bg-[#202020] rounded-[10px]  shadow-[0px_1px_3px_rgba(0, 0, 0, 0.1)]">
            <div className="flex flex-col flex-1  ">
              {TENANT_NAVIGATION?.map((item) => (
                <SettingsMenuItem key={item.name} item={item} />
              ))}
            </div>
          </div>

          <div className="flex w-0 flex-col flex-1">
            {tabName === "password" && <RecoverPasswordSection />}
            {tabName === "security" && <SecurityConfigSection />}
            {tabName === "user_roles" && <AdminSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
