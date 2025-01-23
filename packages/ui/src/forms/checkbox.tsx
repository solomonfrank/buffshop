import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { forwardRef } from "react";
import { classNames } from "../lib/className";

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={classNames(
      "w-[1.6rem] h-[1.6rem] bg-[##171717] rounded-[4px] shrink-0 border border-[#848484] flex items-center justify-center focus:outline-none data-[state=checked]:bg-[#FFBE0A]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="h-[8px] w-[8px] text-[#171717]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
