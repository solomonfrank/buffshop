import classNames from "classnames";
import { NumericFormat } from "react-number-format";
import { ErrorMessage } from "./error-message";

type NumberInputProps = {
  isFullwidth?: boolean;
} & React.ComponentProps<typeof NumericFormat>;

export const NumberInput = ({
  isFullwidth,

  ...props
}: NumberInputProps) => {
  return (
    <>
      <NumericFormat
        {...props}
        className={classNames(
          " border transition-all border-default relative  focus-within:ring-slate-900   focus-within:outline-none focus-within:ring-1 placeholder:text-[14px] overflow-hidden  mt-0 text-[1.6rem] bg-white block text-black   rounded-md px-3 py-2 outline-none  focus:outline-none",
          isFullwidth && "w-full",
          props.className
        )}
      />

      <ErrorMessage fieldName={props.name || ""} />
    </>
  );
};
