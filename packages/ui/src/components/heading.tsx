import classNames from "classnames";
import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingProps {
  headingText?: string;
  className?: string;
}

export const Heading: FunctionComponent<HeadingProps> = ({
  headingText,
  className,
}) => {
  return (
    <h3
      className={twMerge(
        `text-center text-default font-bold text-[2.4rem] leading-[3.6rem] ${className}`
      )}
    >
      {headingText}
    </h3>
  );
};
