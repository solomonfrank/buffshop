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
          "border border-[#333333] rounded-[12px] transition-all bg-transparent  relative  focus-within:ring-slate-900 flex  items-center justify-center  focus-within:outline-none focus-within:ring-1",
          isFullwidth && "w-full",
          props.className
        )}
      />

      <ErrorMessage fieldName={props.name || ""} />
    </>
  );
};
