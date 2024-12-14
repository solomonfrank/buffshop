"use client";

import { ModalProps } from "@vms/ui";
import { ReactNode, createContext, useState } from "react";

type ChildrenProp = {
  children: ReactNode;
};

export const ModalContext = createContext<ModalProps | null>(null);

export const ModalContextProvider = ({ children }: ChildrenProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [tenantStatus, setTenantStatus] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const updateModalAction = (value: string) => {
    setModalAction(value);
  };

  const updateTenantStatus = (value: string) => {
    setTenantStatus(value);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        closeModal,
        openModal,
        modalAction,
        updateModalAction,
        updateTenantStatus,
        tenantStatus,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
