"use client";

import { Button } from "@vms/ui/src/components/button";
import classNames from "classnames";
import { FunctionComponent } from "react";

interface SuccessDialogProps {
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  okLoading?: boolean;
  disabled?: boolean;
  onOkClick: () => void;
  onCancelClick: () => void;
}

export const ConfirmationDialogBox: FunctionComponent<SuccessDialogProps> = ({
  title,
  message,
  onOkClick,
  onCancelClick,
  okText,
  cancelText,
  okLoading,
  disabled,
}) => {
  return (
    <div
      className={classNames(
        "flex  flex-col justify-center items-center  overflow-hidden sm:w-[507px] md:w-[507px] w-11/12 h-[449px] sm:px-[89px] px-20 z-50"
      )}
    >
      <div className='mb-[13px] w-full text-center'>
        <h1 className='text-3xl font-bold mb-[13px] capitalize'>{title}</h1>
        <div className='text-[16px] leading-[16.8px] text-center mb-[13px] text-wrap'>
          {message}
        </div>
      </div>

      <div className={classNames("w-full flex flex-col gap-y-[13px]")}>
        <Button
          variant='outline'
          type='button'
          onClick={onOkClick}
          size='large'
          loading={okLoading}
          disabled={disabled}
          className='border-brand text-solid'
        >
          {okText}
        </Button>
        <Button
          variant='outline'
          type='button'
          onClick={onCancelClick}
          size='large'
          disabled={disabled}
          className='border-brand text-solid'
        >
          {cancelText}
        </Button>
      </div>
    </div>
  );
};
