"use client";

import classNames from "classnames";
import { ReactNode, useState } from "react";

export type TabsProps = {
  label: ((props: { isSelected: boolean }) => JSX.Element) | string;
  key: string;
  children: ReactNode;
};

export type TabsNavigationItem = TabsProps[];

export type CustomTabsProps = {
  items: TabsNavigationItem;
  headerClassName?: string;
  defaultActiveKey?: string;
  tabPanelClassName?: string;
  activeClassName?: string;
  tabItemClassName?: string;
  direction?: "horizontal" | "vertical";
};

export const CustomTabs = ({
  items,
  headerClassName,
  defaultActiveKey,
  tabPanelClassName,
  activeClassName,
  tabItemClassName,
}: CustomTabsProps) => {
  const [selected, setSelected] = useState(defaultActiveKey);

  const container = classNames("");

  const selectedTab = items.find((item) => item.key == selected);

  const activeClasses = classNames(
    "border-b-brand border-b-2 font-bold text-black",
    activeClassName
  );
  return (
    <div className="w-full flex">
      <div
        className={classNames(
          "w-full flex  text-[#848484] font-bold",
          headerClassName
        )}
      >
        {items.map((item) => {
          const isSelected = selected === item.key;
          return (
            <div
              onClick={() => setSelected(item?.key)}
              className={classNames(
                " flex-1  cursor-pointer  text-center leading-[2.1rem]  text-[1.4rem]",
                tabItemClassName,
                selected === item.key && activeClasses
              )}
              key={item?.key}
            >
              {typeof item?.label === "string"
                ? item?.label
                : item?.label({ isSelected })}
            </div>
          );
        })}
      </div>
      <div className={tabPanelClassName}>{selectedTab?.children}</div>
    </div>
  );
};
