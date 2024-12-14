"use client";

import classNames from "classnames";
import { FunctionComponent, ReactNode, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { ModalContext } from "../context-provider";

type ModalProp = {
  children: ReactNode;
  className?: string;
};

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  modalAction: string;
  updateModalAction: (value: string) => void;
  updateTenantStatus: (value: string) => void;
  tenantStatus: string;
}

export const Modal: FunctionComponent<ModalProp> = ({
  children,
  className,
}) => {
  const { isOpen } = useContext(ModalContext) as ModalProps;

  if (isOpen) {
    return (
      <main
        className={classNames(
          "w-screen h-screen overflow-y-scroll overscroll-y-contain left-0 py-10 bg-primary-navy bg-opacity-70 grid place-items-center bottom-0  fixed top-0 z-30 bg-black/50"
        )}
      >
        <div
          className={twMerge(
            " bg-white xl:min-w-[35%] lg:min-w-[50.7rem] md:min-[50.7rem] min-w-11/12 rounded-3xl relative mx-auto",
            className
          )}
        >
          {children}
        </div>
      </main>
    );
  } else {
    return null;
  }
};
