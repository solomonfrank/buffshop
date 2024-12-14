import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface LoadingProps {
  className?: string;
}

export const Loading: FunctionComponent<LoadingProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        `animate-pulse relative h-14 block bg-gray-300 mb-4 w-20 ${className}`
      )}
    />
  );
};
