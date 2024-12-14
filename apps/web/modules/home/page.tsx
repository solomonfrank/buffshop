"use client";

import { CustomTabs, TabsNavigationItem } from "@buff/ui";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { ReactNode, useState } from "react";
import { MdClose } from "react-icons/md";
import { Faq } from "./components/faq";
import { Footer } from "./components/footer";
import { Creator } from "./components/form/creator";
import { User } from "./components/form/user";
import { Hero } from "./components/hero";
import { SuccessFeedback } from "./components/sucess-feedback";

export type TabsProps = {
  label: ((props: { isSelected: boolean }) => JSX.Element) | string;
  key: string;
  children: ReactNode;
};

export const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSuccessDrawer, setOpenSuccessDrawer] = useState(false);

  const items: TabsNavigationItem = [
    {
      label: "Join as a Creator",
      key: "creator",
      children: (
        <Creator
          userType="creator"
          handleOpenSuccessDrawer={() => setOpenSuccessDrawer(true)}
        />
      ),
    },

    {
      label: "Join as a User",
      key: "user",
      children: (
        <User
          userType="user"
          handleOpenSuccessDrawer={() => setOpenSuccessDrawer(true)}
        />
      ),
    },
  ];
  return (
    <div className="min-h-screen w-screen relative">
      <Hero openDrawerHandler={() => setOpenDrawer(true)} />
      <Faq />
      <Footer openDrawerHandler={() => setOpenDrawer(true)} />

      {openDrawer && (
        <Drawer open={openDrawer} className="z-50" width={519}>
          <div className="bg-[#202020] h-full px-[3.9rem] py-[4.5rem] overflow-auto">
            {openSuccessDrawer ? (
              <div className="h-full relative">
                <div>
                  <span
                    onClick={() => {
                      setOpenSuccessDrawer(false);
                      setOpenDrawer(false);
                    }}
                    className="cursor-pointer absolute right-6"
                  >
                    <MdClose className="h-[2.4rem] w-[2.4rem] " />
                  </span>
                </div>

                <SuccessFeedback />
              </div>
            ) : (
              <>
                <div className="flex items-center mb-[5rem]">
                  <h3 className="mr-auto text-[#848484] text-[2rem] uppercase leading-[3rem] font-medium">
                    Join Our Waitlist
                  </h3>
                  <span
                    onClick={() => setOpenDrawer(false)}
                    className="cursor-pointer"
                  >
                    <MdClose className="h-[2.4rem] w-[2.4rem] " />
                  </span>
                </div>
                <div className="relative w-full">
                  <CustomTabs
                    items={items}
                    defaultActiveKey="creator"
                    activeClassName="border-none text-left bg-[#FFBE0A] text-[#171717] "
                    tabItemClassName="text-left  cursor-pointer  flex-1  items-center  py-[1.5rem]  overflow-hidden  "
                    headerClassName="  bg-[#282828] mb-[2.4rem] rounded-[12px] leading-[2.1rem] overflow-hidden items-center   justify-center shadow-[0px_1px_2px_rgba(0, 0, 0, 0.08)] "
                  />
                </div>
              </>
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
};
