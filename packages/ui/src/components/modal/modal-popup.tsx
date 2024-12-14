"use client";

import classNames from "classnames";
import { FunctionComponent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ModalProp = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
};

export const ModalPopup: FunctionComponent<ModalProp> = ({
  children,
  className,
  isOpen,
}) => {
  return (
    <>
      {isOpen && (
        <main
          className={classNames(
            "w-screen h-screen overflow-y-scroll overscroll-y-contain left-0 py-10 bg-primary-navy bg-opacity-70 grid place-items-center bottom-0  fixed top-0 z-30 bg-black/50"
          )}
        >
          <div
            className={twMerge(
              "bg-white rounded-3xl relative mx-auto",
              className
            )}
          >
            {children}
          </div>
        </main>
      )}
    </>
  );
};
