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

const CustomRadio = ({
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
            className="w-5 h-5 rounded-full border border-[#333333] data-[state=checked]:border-[#FFBE0A] data-[state=checked]:bg-[#FFBE0A]"
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-white" />
          </RadioGroup.Item>
          <label
            htmlFor={option.id}
            className="text-[12px] font-medium leading-none cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  );
};

export default CustomRadio;
