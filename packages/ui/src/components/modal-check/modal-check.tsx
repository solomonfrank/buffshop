"use client";

import { ConfirmationDialog, SuccessDialog } from "@vms/ui";
import { FunctionComponent, useContext } from "react";
import { ModalContext } from "../context-provider";
import { Modal, ModalProps } from "../modal/modal";

export const ModalCheck: FunctionComponent = () => {
  const { modalAction } = useContext(ModalContext) as ModalProps;

  const successMessages = [
    "tenant-edited-successfully",
    "tenant-deleted-successfully",
    "tenant-suspended-successfully",
    "tenant-unsuspended-successfully",
    "proxy-deleted-successfully",
    "resolution-created-successfully",
    "attendee-created-successfully",
  ];

  const actions = [
    "confirm-delete-tenant",
    "confirm-suspend-tenant",
    "confirm-delete-proxy",
  ];

  return (
    <Modal>
      {actions.includes(modalAction) ? (
        <ConfirmationDialog />
      ) : successMessages.includes(modalAction.toLowerCase()) ? (
        <SuccessDialog />
      ) : null}
    </Modal>
  );
};
