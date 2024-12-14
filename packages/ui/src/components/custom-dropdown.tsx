"use client";

import { ForwardedRef, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownWrapperProps {
  children: ReactNode;
  className?: string;
}

export const DropdownWrapper = forwardRef<
  HTMLUListElement,
  DropdownWrapperProps
>(({ children, className }, ref: ForwardedRef<HTMLUListElement>) => {
  return (
    <ul
      ref={ref}
      className={twMerge(
        `absolute right-0 text-[12px] top-full bg-white border-[0.5px] border-black rounded-md py-3 ${className}`
      )}
    >
      {children}
    </ul>
  );
});

DropdownWrapper.displayName = "DropdownWrapper";
