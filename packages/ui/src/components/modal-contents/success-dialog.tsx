"use client";

import { ModalContentTemplate } from "@vms/ui";
import { Button } from "@vms/ui/src/components/button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "../context-provider";
import { ModalProps } from "../modal/modal";

export const SuccessDialog = () => {
  const { closeModal, modalAction } = useContext(ModalContext) as ModalProps;
  const router = useRouter();

  const handleContinue = () => {
    const path = `${modalAction.split("-")[0]?.toLowerCase()}`;
    router.replace(`/app/${path}s`);
    closeModal();
  };

  let titleText = "";
  let descriptionText = "";

  switch (modalAction) {
    case "tenant-edited-successfully":
      titleText = "Tenant edited successfully";
      descriptionText =
        "Your tenant has been edited successfully. Click below to continue";
      break;
    case "tenant-deleted-successfully":
      titleText = "Tenant deleted successfully";
      descriptionText =
        "Your tenant has been deleted successfully. Click below to continue";
      break;
    case "tenant-suspended-successfully":
      titleText = "Tenant suspended successfully";
      descriptionText =
        "Your tenant has been suspended successfully. Click below to continue";
      break;
    case "tenant-unsuspended-successfully":
      titleText = "Tenant unsuspended successfully";
      descriptionText =
        "Your tenant has been unsuspended successfully. Click below to continue";
      break;
    case "resolution-created-successfully":
      titleText = "Resolution created successfully";
      descriptionText =
        "Your resolution has been created successfully. Click below to continue";
      break;
    case "attendee-created-successfully":
      titleText = "Attendee created successfully";
      descriptionText =
        "Attendee has been created successfully. Click below to continue";
      break;
    default:
      descriptionText = "";
      break;
  }

  return (
    <ModalContentTemplate title={titleText} description={descriptionText}>
      <div className='w-full flex flex-col gap-y-[13px]'>
        <Button
          variant='primary'
          size={"large"}
          className='text-white bg-brand-default border border-brand-default w-full'
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </ModalContentTemplate>
  );
};
