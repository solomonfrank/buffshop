import * as RadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface CustomRadioProps {
  options: RadioOption[];
  defaultValue?: string;
  value: string | undefined;
  onChange?: (value: string) => void;
  className?: string;
}

export const CustomRadio = ({
  options,
  defaultValue,
  onChange,
  className,
  value,
}: CustomRadioProps) => {
  return (
    <RadioGroup.Root
      defaultValue={defaultValue}
      onValueChange={onChange}
      value={value}
      className={classNames("flex  gap-4", className)}
      aria-label="Select option"
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroup.Item
            id={option.id}
            value={option.value}
            className="w-6 h-6 rounded-full border border-[#333333] data-[state=checked]:border-[#FFBE0A] data-[state=checked]:bg-[#FFBE0A]"
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3.5 after:h-3.5 after:rounded-full after:bg-[#282828]" />
          </RadioGroup.Item>
          <label
            htmlFor={option.id}
            className="text-[14px] leading-[14px] font-medium  cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  );
};
