"use client";

import { ModalContentTemplate, useManageAccount } from "@vms/ui";
import { Button } from "@vms/ui/src/components/button";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, useContext } from "react";
import { ModalContext } from "../context-provider";
import { ModalProps } from "../modal/modal";

interface ConfirmationButtonProps {
  buttonText: string;
  onClick: () => void;
  buttonProps?: React.ComponentProps<typeof Button>;
}

const ConfirmationButton: FunctionComponent<ConfirmationButtonProps> = ({
  buttonText,
  onClick,
  buttonProps,
}) => {
  return (
    <Button
      variant='secondary'
      size={"large"}
      className='w=full'
      onClick={onClick}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
};

export const ConfirmationDialog = ({
  okHandler,
  OkText = "Yes",
  cancelText = "No",
  titleText = "Delete",
  descriptionText = "Are you sure?",
  className,
  loading,
}: {
  okHandler?: () => void;
  descriptionText?: string;
  titleText?: string;
  OkText?: string;
  cancelText?: string;
  className?: string;
  loading?: boolean;
}) => {
  const searchParams = useSearchParams();
  const { closeModal, modalAction, tenantStatus } = useContext(
    ModalContext
  ) as ModalProps;

  const tenantId = searchParams.get("tenantId")!;

  const { mutate } = useManageAccount();

  const confirmAction = () => {
    const action = modalAction.includes("suspend")
      ? tenantStatus === "Suspended"
        ? "unsuspend"
        : "suspend"
      : modalAction.includes("delete")
        ? "delete"
        : "";

    if (okHandler) {
      okHandler();
    } else {
      mutate({ action, tenantId });
    }

    //
  };

  // let titleText = "";
  // let descriptionText = "";

  // switch (modalAction) {
  //   case "confirm-delete-tenant":
  //     titleText = "Delete tenant";
  //     descriptionText =
  //       "Are you sure you want to delete this tenent? This action cannot be undone";
  //     break;
  //   case "confirm-suspend-tenant":
  //     titleText = `${tenantStatus === "Suspended" ? "Unsuspend tenant" : "Suspend tenant"}`;
  //     descriptionText = `Are you sure you want to ${tenantStatus === "Suspended" ? "unsuspend" : "suspend"} this tenent?`;
  //     break;
  //   default:
  //     titleText = "";
  //     descriptionText = "";
  //     break;
  // }

  return (
    <ModalContentTemplate
      title={titleText}
      description={descriptionText}
      className={className}
    >
      <div className={classNames("w-full flex flex-col gap-y-[13px]")}>
        <Button
          variant='danger'
          type='button'
          onClick={confirmAction}
          size='large'
          loading={loading}
        >
          {OkText}
        </Button>
        <Button
          variant='outline'
          type='button'
          onClick={closeModal}
          size='large'
        >
          {cancelText}
        </Button>
      </div>
    </ModalContentTemplate>
  );
};
