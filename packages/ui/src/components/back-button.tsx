import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface BackButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export const BackButton: FunctionComponent<BackButtonProps> = ({
  buttonText,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `inline-block  sm:absolute static left-0 underline text-solid  text-[16px] font-lato leading-[19.2px] ${className}`
      )}
    >
      {buttonText}
    </button>
  );
};
