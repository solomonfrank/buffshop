import classNames from "classnames";
import { FunctionComponent, ReactNode } from "react";

interface ModalContentTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const ModalContentTemplate: FunctionComponent<
  ModalContentTemplateProps
> = ({ title, description, children, className }) => {
  return (
    <div
      className={classNames(
        "flex  flex-col justify-center items-center  overflow-hidden mt-[149px]",
        className
      )}
    >
      <div className="mb-[13px] w-full text-center">
        <h1 className="text-3xl font-bold mb-[1.3rem]">{title}</h1>
        <div className="text-[1.4rem] leading-[16.8px] text-center text-wrap">
          {description}
        </div>
      </div>

      {children}
    </div>
  );
};
