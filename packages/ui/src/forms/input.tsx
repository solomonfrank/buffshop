import { forwardRef } from "react";

import { classNames } from "../lib/className";
import { ErrorMessage } from "./error-message";
import { Label } from "./label";

export type Inputprops = {
  isFullwidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputContainer?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<typeof Label>;
} & JSX.IntrinsicElements["input"];

type AddonProps = {
  children: React.ReactNode;
  isFilled?: boolean;
  className?: string;
  error?: boolean;
};

const Addon = ({ children, className }: AddonProps) => (
  <div
    className={classNames(
      "flex items-center px-2  border-slate-300 py-3 min-h-9 ",
      className
    )}
  >
    <span className="flex whitespace-nowrap items-center">{children}</span>
  </div>
);

export const Input = forwardRef<HTMLInputElement, Inputprops>(function Input(
  { isFullwidth, ...props },
  ref
) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "placeholder:text-[12px] font-medium placeholder:text-[#848484] bg-transparent overflow-hidden  mt-0 text-[1.6rem]  block text-white   rounded-md px-3 py-2 outline-none  focus:outline-none",
        isFullwidth && "w-full",
        props.className
      )}
    />
  );
});

export const InputField = forwardRef<HTMLInputElement, Inputprops>(
  function InputFields(props, ref) {
    const {
      containerClassName,
      labelProps,
      isFullwidth,
      prefixIcon,
      suffixIcon,
      labelClassName,
      label,
      type,
      inputContainer,
      ...otherProps
    } = props;

    return (
      <div className={classNames("w-full", containerClassName)}>
        {label && <Label {...labelProps}>{label}</Label>}

        {prefixIcon || suffixIcon ? (
          <div
            className={classNames(
              "border border-[#333333] transition-all  relative  focus-within:ring-slate-900 flex  items-center justify-center rounded-[12px] focus-within:outline-none focus-within:ring-1",
              inputContainer
            )}
          >
            {prefixIcon && <Addon>{prefixIcon}</Addon>}

            <Input
              type={props.type}
              isFullwidth={isFullwidth}
              {...otherProps}
              ref={ref}
            />
            {suffixIcon && (
              <Addon className={classNames("border-none px-7 pr-7")}>
                {suffixIcon}
              </Addon>
            )}
          </div>
        ) : (
          <div
            className={classNames(
              "border border-[#333333] overflow-hidden  group  focus-within:ring-slate-900 flex  items-center justify-center rounded-[12px] focus-within:outline-none focus-within:ring-1",
              inputContainer
            )}
          >
            <Input isFullwidth={isFullwidth} {...otherProps} ref={ref} />
          </div>
        )}

        <ErrorMessage fieldName={props.name || ""} />
      </div>
    );
  }
);

export const EmailInputField = forwardRef<HTMLInputElement, Inputprops>(
  function EmailInputField(props, ref) {
    return (
      <InputField
        type="email"
        inputMode="email"
        autoCorrect="off"
        autoCapitalize="none"
        {...props}
        ref={ref}
      />
    );
  }
);
