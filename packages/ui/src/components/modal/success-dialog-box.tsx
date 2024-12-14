"use client";

import { Button } from "@vms/ui/src/components/button";
import classNames from "classnames";
import { FunctionComponent } from "react";

interface SuccessDialogProps {
  title: string;
  message: string;
  onClick: () => void;
}

export const SuccessDialogBox: FunctionComponent<SuccessDialogProps> = ({
  title,
  message,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        "flex  flex-col justify-center items-center  overflow-hidden sm:w-[507px] md:w-[507px] w-11/12 h-[449px] sm:px-[89px] px-20"
      )}
    >
      <div className='mb-[13px] w-full text-center'>
        <h1 className='text-3xl font-bold mb-[1.3rem]'>{title}</h1>
        <div className='text-[1.4rem] leading-[16.8px] text-center text-wrap'>
          {message}
        </div>
      </div>

      <Button
        variant='primary'
        size={"large"}
        className='text-white bg-brand-default border border-brand-default w-full'
        onClick={onClick}
      >
        Continue
      </Button>
    </div>
  );
};
