"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { IoMdSettings } from "react-icons/io";

import { deleteCookie } from "@buff/lib";
import { Button, InputField, Loader, Logo, showToast } from "@buff/ui";
import { useAuthorization } from "@lib/hooks/useAuthorization";
import { Params, ROLES } from "_types";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { useProfileStore } from "store/use-edit";
import { uselogout } from "~/auth/api/logout";
import {
  AdsIcon,
  AuditIcon,
  CustomSupportIcon,
  HomeIcon,
  LiveChatIcon,
  NotificationIcon,
  OrderIcon,
  RefundIcon,
  ReportIcon,
  SettingsIcon,
  SettingTwoIcon,
  SupportIcon,
  TenantSettingsIcon,
  TicketIcon,
  UserIcon,
  WalletIcon,
} from "./icons";

const ADMIN_NAVIGATION: NavigationItemType[] = [
  {
    name: "Home",
    href: "/app/dashboard",
    isEnabled: true,
    icon: HomeIcon,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/dashboard") ?? false;
    },
  },
  {
    name: "Ad Management",
    href: "/app/ad-management",
    icon: AdsIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/ad-management") ?? false;
    },
  },
  {
    name: "Tenant Management",
    href: "/app/tenant-management",
    isEnabled: true,
    icon: UserIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/tenant-management") ?? false;
    },
  },

  // {
  //   name: "Product Management",
  //   href: "/app/product-management",
  //   isEnabled: true,
  //   icon: UserIcon,

  //   isCurrent: ({ pathname }) => {
  //     return pathname?.includes("/product-management") ?? false;
  //   },
  // },
  {
    name: "Super Admin Management",
    href: "/app/super-admin-management",
    isEnabled: true,
    icon: SettingsIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/super-admin-management") ?? false;
    },
  },
  {
    name: "Order Management",
    href: "/app/order-management",
    icon: OrderIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/order-management") ?? false;
    },
  },
  {
    name: "Ticket Management",
    href: "/app/ticket-management",
    icon: TicketIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/ticket-management") ?? false;
    },
  },
  {
    name: "Technical Support Resources",
    href: "/app/technical-support-resources",
    icon: SupportIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/technical-support-resources") ?? false;
    },
  },
  {
    name: "Refund Management",
    href: "/app/refund-management",
    icon: RefundIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/refund-management") ?? false;
    },
  },
  {
    name: "Audit Log",
    href: "/app/audit-log",
    icon: AuditIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/audit-log") ?? false;
    },
  },
  {
    name: "Reports",
    href: "/app/reports",
    icon: ReportIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/reports") ?? false;
    },
  },
  {
    name: "Notification Management",
    href: "/app/notification-management",
    icon: NotificationIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/notification-management") ?? false;
    },
  },
  {
    name: "Settings",
    href: "/app/settings",
    icon: SettingTwoIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/settings") ?? false;
    },
  },
];

const TENANT_NAVIGATION: NavigationItemType[] = [
  {
    name: "Home",
    href: "/app/dashboard",
    isEnabled: true,
    icon: HomeIcon,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/dashboard") ?? false;
    },
  },

  {
    name: "Product Management",
    href: "/app/product-management",
    isEnabled: true,
    icon: UserIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/product-management") ?? false;
    },
  },

  {
    name: "Order Management",
    href: "/app/order-management",
    icon: OrderIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/order-management") ?? false;
    },
  },
  {
    name: "Wallet Management",
    href: "/app/wallet-management",
    isEnabled: true,
    icon: WalletIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/wallet-management") ?? false;
    },
  },
  {
    name: "Customer Support",
    href: "/app/customer-support",
    icon: CustomSupportIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/customer-support") ?? false;
    },
  },

  {
    name: "Settings",
    href: "/app/settings",
    icon: TenantSettingsIcon,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/settings") ?? false;
    },
  },
];

const Shell = ({
  children,
  backPath,
  sidebarContainer,
  navigation = ADMIN_NAVIGATION,
  params,
}: {
  children: ReactNode;
  backPath?: string;
  sidebarContainer?: ReactElement;
  navigation?: NavigationItemType[];
  params: Params;
}) => {
  const { checkAccess } = useAuthorization();
  const router = useRouter();
  const userProfile = useProfileStore((state) => state.userDetails);

  navigation =
    userProfile && userProfile.role === ROLES.TENANT
      ? TENANT_NAVIGATION
      : ADMIN_NAVIGATION;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-1">
        {sidebarContainer ? (
          cloneElement(sidebarContainer, { isCustom: true })
        ) : (
          <Sidebar navigation={navigation} />
        )}

        <div className="flex w-0 flex-col flex-1 bg-black ">
          <MainContainer>
            <div className={classNames("mx-auto h-full")}>{children}</div>
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

const getDesktopNavigationItems = (navigation: NavigationItemType[]) => {
  const navigationType = navigation;
  const moreSeparatorIndex = navigationType.findIndex(
    (item) => item.name === MORE_SEPARATOR_NAME
  );

  const {
    desktopNavigationItems,
    mobileNavigationBottomItems,
    mobileNavigationMoreItems,
  } = navigation.reduce<Record<string, NavigationItemType[]>>(
    (items, item, index) => {
      // We filter out the "more" separator in` desktop navigation
      if (item.name !== MORE_SEPARATOR_NAME)
        items?.desktopNavigationItems?.push(item);
      // Items for mobile bottom navigation
      if (index < moreSeparatorIndex + 1 && !item.onlyDesktop) {
        items?.mobileNavigationBottomItems?.push(item);
      } // Items for the "more" menu in mobile navigation
      else {
        items?.mobileNavigationMoreItems?.push(item);
      }
      return items;
    },
    {
      desktopNavigationItems: [],
      mobileNavigationBottomItems: [],
      mobileNavigationMoreItems: [],
    }
  );

  return {
    desktopNavigationItems,
    mobileNavigationBottomItems,
    mobileNavigationMoreItems,
  };
};

const defaultIsCurrent: NavigationItemType["isCurrent"] = ({
  isChild,
  item,
  pathname,
}) => {
  return isChild
    ? item.href === pathname
    : item.href
      ? (pathname?.startsWith(item.href) ?? false)
      : false;
};

export const NavigationItem: React.FC<{
  index?: number;
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item, isChild } = props;
  const pathname = usePathname();
  const isCurrent: NavigationItemType["isCurrent"] =
    item.isCurrent || defaultIsCurrent;
  const current = isCurrent({ isChild: !!isChild, item, pathname });

  return (
    <Fragment>
      <Link
        data-test-id={item.name}
        href={item.href}
        aria-label={item.name}
        target={item.target}
        onClick={(e) => {
          if (!item.isEnabled) {
            showToast("Not yet available.", "warning");
            e.preventDefault();
          }
        }}
        className={classNames(
          "text-[#848484] mb-[2rem] group leading-[2rem] flex items-center rounded-md  px-2 py-1.5 text-[1.6rem] h-[2.4rem] font-medium transition hover:text-default [&_span]:text-[#B8B8B8] hover:[&_span]:text-default",

          "[&[aria-current='page']]:text-default"
        )}
        aria-current={current ? "page" : undefined}
      >
        {item.icon && (
          <item.icon
            className={classNames(
              `mr-2 lg:mr-[1.8rem] h-[2.4rem] w-[2.4rem] transition flex-shrink-0 `,
              "[&[aria-current='page']]:text-default"
            )}
            aria-hidden="true"
            aria-current={current ? "page" : undefined}
          />
        )}

        <span
          className="hidden w-full justify-between truncate text-ellipsis lg:flex "
          data-testid={`${item.name}-test`}
        >
          {item.name}
        </span>
      </Link>
    </Fragment>
  );
};

export const Navigation = ({
  navigation,
}: {
  navigation: NavigationItemType[];
}) => {
  const { desktopNavigationItems } = getDesktopNavigationItems(navigation);

  navigation = adminBottonNavigation;

  return (
    <nav className=" flex flex-col justify-between h-full border-b border-b-[#4E4848]  ">
      <div className="flex flex-col flex-1 ">
        {desktopNavigationItems?.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
      </div>
      {/* <div className="flex flex-col ">
        {navigation?.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
      </div> */}
    </nav>
  );
};

const Sidebar = ({ navigation }: { navigation: NavigationItemType[] }) => {
  const userProfile = useProfileStore((state) => state.userDetails);

  const router = useRouter();
  return (
    <div className="relative max-h-screen ">
      <aside className="border-[#4E4848] lg:pb-[6rem] vms-scrollbar border-r bg-[#202020]  hidden h-full  w-14 flex-col overflow-y-auto overflow-x-hidden  md:sticky md:flex lg:w-[33.6rem] lg:pl-[32px] lg:pr-[2rem] lg:pt-[3.2rem]">
        <div className="h-full flex flex-col justify-between">
          <div className="mb-[4rem]">
            <Link href="/app/dashboard">
              <Logo />
            </Link>
          </div>
          <Navigation navigation={navigation} />
          <div className="mt-[4rem] ">
            <div className="flex  px-2 items-center gap-[1.6rem] text-[#848484]  text-[1.6rem] leading-[2rem]">
              <span>
                <LiveChatIcon className="h-[2.4rem] w-[2.4rem] transition flex-shrink-0" />
              </span>
              <span className="text-[#B8B8B8] hidden lg:inline-block">
                Live Agent Support
              </span>
              <span className=" hidden lg:flex h-[1.8rem] text-[1.1rem] font-semibold leading-[1.6rem] w-[1.8rem] bg-brand-default text-white  items-center justify-center rounded-full">
                17
              </span>
            </div>
          </div>
          <div className="mt-[4rem]">
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
                  {`${userProfile?.name}`}
                </h3>
                <p className="text-[1.3rem] leading-[2rem]">
                  {userProfile?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative z-0 flex-1 bg-[#171717] max-h-screen overflow-y-auto overflow-x-hidden">
      <Header />
      <div className="max-w-full px-2 py-4 lg:py-[3.2rem] lg:px-[3.2rem]">
        {children}
      </div>
    </main>
  );
};

export type NavigationItemType = {
  name: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  target?: HTMLAnchorElement["target"];
  icon?: IconType;
  child?: NavigationItemType[];
  pro?: true;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  isEnabled?: boolean;
  defaultKey?: string;
  isCurrent?: ({
    item,
    isChild,
    pathname,
  }: {
    item: Pick<NavigationItemType, "href">;
    isChild?: boolean;
    pathname: string | null;
  }) => boolean;
};

const MORE_SEPARATOR_NAME = "more";

const bottonNavigation: NavigationItemType[] = [
  {
    name: "Settings",
    href: "/app/settings",
    icon: IoMdSettings,
  },
];

const adminBottonNavigation: NavigationItemType[] = [
  {
    name: "Settings",
    href: "/app/admin/settings",
    icon: IoMdSettings,
  },
];

const Header = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const userProfile = useProfileStore((state) => state.userDetails);
  const onSuccess = (response: unknown) => {
    logoutHandler(
      userProfile.role === ROLES.TENANT ? "/auth/tenant" : "/auth/login"
    );
  };
  const logout = uselogout({ onSuccess });
  const logoutHandler = (url: string) => {
    deleteCookie("accessToken");
    deleteCookie("rememberMe");
    deleteCookie("role");
    // router.refresh();
    // router.replace("/logout");
    window.location.href = url;
  };
  return (
    <div className="w-full h-[calc(var(--header-navigation-height))] bg-[#202020]  px-[3.2rem] py-[2.6rem] flex items-center">
      <div className="mr-auto w-[33.3rem]">
        <InputField
          placeholder="Search for anything..."
          className="w-full h-[4rem]"
          inputContainer="bg-[#171717]"
          prefixIcon={<SearchIcon className="h-[1.6rem] w-[1.6rem]" />}
        />
      </div>
      <div className="flex gap-[3.2rem] items-center">
        <span>
          <svg
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z"
              stroke="#848484"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z"
              stroke="#848484"
              stroke-width="1.5"
            />
            <path
              d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
              stroke="#848484"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g clip-path="url(#clip0_205_1388)">
              <ellipse cx="21.1731" cy="8" rx="6.17308" ry="6" fill="#FFBE0A" />
              <path
                d="M18.7828 11V6.16L17.6988 6.82V5.888L18.7828 5.24H19.6348V11H18.7828ZM21.4538 11L23.4778 6.036H20.9138V5.24H24.3778V6.036L22.3578 11H21.4538Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_205_1388">
                <rect
                  width="12.3462"
                  height="12"
                  fill="white"
                  transform="translate(15 2)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z"
              stroke="#848484"
              stroke-width="1.5"
            />
            <path
              d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z"
              stroke="#848484"
              stroke-width="1.5"
            />
            <path
              d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z"
              stroke="#848484"
              stroke-width="1.5"
            />
            <path
              d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z"
              stroke="#848484"
              stroke-width="1.5"
            />
          </svg>
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            setOpenConfirmModal(true);
            //  logout.mutate(null);
            // logoutHandler(
            //   userProfile.role === ROLES.TENANT ? "/auth/tenant" : "/auth/login"
            // );
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M25.378 13.5677C25.378 12.9584 25.6124 12.3257 26.081 11.8571C26.5497 11.3884 27.1824 11.1541 27.7916 11.1541C28.5181 11.1541 29.1039 11.4353 29.6194 11.9508C34.7746 17.2232 34.7278 25.6591 29.5022 30.8846C24.2533 36.1336 15.7471 36.1336 10.4747 30.8846C5.22573 25.6356 5.22573 17.106 10.4747 11.8571C10.8965 11.4353 11.4355 11.2009 11.9744 11.1541C12.115 11.1541 12.279 11.1541 12.4196 11.1541C13.6616 11.2712 14.6223 12.3023 14.6223 13.5677C14.6223 14.2004 14.388 14.8096 13.9193 15.3017C8.50634 20.6913 12.3493 29.9707 19.9885 29.9707C27.6276 29.9707 31.4706 20.6913 26.081 15.3017C25.6124 14.8096 25.3546 14.2004 25.3546 13.5677H25.378ZM33.4624 6.51435C26.0342 -0.913883 13.9662 -0.913883 6.51454 6.51435C-0.9137 13.966 -0.9137 26.034 6.51454 33.4622C13.9662 40.9139 26.0342 40.9139 33.4624 33.4622C40.9141 26.034 40.9141 13.966 33.4624 6.51435ZM22.3318 7.52197V18.6292C22.3318 20.6913 19.8244 21.7692 18.3482 20.2929C17.9029 19.8711 17.6452 19.2853 17.6452 18.6292V7.52197C17.6452 6.20973 18.6997 5.15524 19.9885 5.15524C21.2773 5.15524 22.3318 6.20973 22.3318 7.52197Z"
              fill="#FFBE0A"
            />
          </svg>
        </span>
      </div>

      {openConfirmModal && (
        <Loader
          loading={openConfirmModal}
          Message={() => (
            <ConfirmLogoutModal
              okText="Yes, Log Out"
              title="Logging Out?"
              isPending={logout.isPending}
              closeModal={() => setOpenConfirmModal(false)}
              okHandler={() => {
                logout.mutate(null);
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export const MenuItem: React.FC<{
  index?: number;
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item, isChild } = props;
  const query = useSearchParams();
  const pathname = usePathname();
  const currentMenuItem = query.get("tab") || item?.defaultKey || "";

  const isCurrent: NavigationItemType["isCurrent"] =
    item.isCurrent || defaultIsCurrent;
  const current = isCurrent({
    isChild: !!isChild,
    item,
    pathname: currentMenuItem,
  });

  return (
    <Fragment>
      <Link
        data-test-id={item.name}
        href={item.href}
        aria-label={item.name}
        target={item.target}
        onClick={(e) => {
          if (!item.isEnabled) {
            showToast("Not yet available.", "warning");
            e.preventDefault();
          }
        }}
        className={classNames(
          "text-[#848484] mb-[1.2rem] group leading-[1.8rem] flex items-center rounded-md  px-2  text-[1.2rem] h-[2rem] font-medium transition"
        )}
        aria-current={current ? "page" : undefined}
      >
        {item.icon && (
          <item.icon
            className={classNames(
              `mr-2 lg:mr-[1.8rem] h-[1.6rem] w-[1.6rem] transition flex-shrink-0 `,
              "[&[aria-current='page']]:text-default"
            )}
            aria-hidden="true"
            aria-current={current ? "page" : undefined}
          />
        )}

        <span
          className={classNames(
            "hidden w-full justify-between truncate text-ellipsis lg:flex text-[#B8B8B8] ",
            current && "text-default"
          )}
          data-testid={`${item.name}-test`}
        >
          {item.name}
        </span>
      </Link>
    </Fragment>
  );
};

export const ConfirmLogoutModal = ({
  closeModal,
  isPending,
  okHandler,
  okText = "Yes, Add Super Admin",
  cancelText = "No, Cancel",
  title = " Confirm New Super Admin",
}: {
  closeModal: () => void;
  isPending: boolean;
  okHandler: () => void;
  okText?: string;
  cancelText?: string;
  title?: string;
}) => {
  return (
    <div>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.75 30.8437C26.6212 34.0846 23.9204 36.8364 20.3023 36.7479C19.4606 36.7272 18.4202 36.4339 16.3395 35.847C11.3318 34.4344 6.98471 32.0605 5.94173 26.7426C5.75 25.7652 5.75 24.6652 5.75 22.4653V19.5347C5.75 17.3348 5.75 16.2348 5.94173 15.2573C6.98471 9.93938 11.3318 7.56553 16.3395 6.15305C18.4202 5.56612 19.4606 5.27266 20.3023 5.25208C23.9204 5.16356 26.6212 7.91537 26.75 11.1563"
            stroke="#E12827"
            stroke-width="2.625"
            stroke-linecap="round"
          />
          <path
            d="M37.25 21H18M37.25 21C37.25 19.7746 33.76 17.4852 32.875 16.625M37.25 21C37.25 22.2254 33.76 24.5149 32.875 25.375"
            stroke="#E12827"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem] mb-[1.4rem]">
          Logging Out?
        </p>

        <div className="flex gap-[1.9rem]">
          <Button
            type="button"
            size="medium"
            onClick={closeModal}
            className=" font-medium leading-[1.8rem] text-[1.2rem]   bg-[848484] text-[#848484] rounded-[8px] w-[8.3rem] h-[3.4rem] border border-[#848484]"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            size="medium"
            onClick={okHandler}
            variant="danger"
            loading={isPending}
            disabled={isPending}
            className=" font-medium leading-[1.8rem] text-[1.2rem]  rounded-[8px]  h-[3.4rem] border border-[#848484] bg-[#E12827]"
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shell;
