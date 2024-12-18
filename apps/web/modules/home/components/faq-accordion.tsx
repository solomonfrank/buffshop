import * as AccordionPrimitive from "@radix-ui/react-accordion";
import classNames from "classnames";
import * as React from "react";

import { GoChevronDown } from "react-icons/go";
import { FAQ_CONTENT } from "../constant/faq-content";

const Accordion = AccordionPrimitive.Root;

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full px-10 md:px-10 lg:px-0"
    >
      {FAQ_CONTENT.map((accordion) => (
        <AccordionItem
          value={accordion.key}
          className="md:w-[91rem] lg:w-[91rem] bg-[#232323] mb-[4.2rem] rounded-lg  md:rounded-[2rem] border border-[rgba(255,255,255,0.38)]  py-[25px] px-[20px] md:py-[48.45px] lg:py-[48.45px]  md:px-[82.09px] lg:px-[82.09px] "
        >
          <AccordionTrigger> {accordion.title}</AccordionTrigger>
          <AccordionContent className=" lg:w-[716.03px] text-[2rem] leading-[3.4rem] text-[rgba(255,255,255,0.63)]">
            {accordion.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={classNames("", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex ">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={classNames(
        "flex flex-1 items-center justify-between text-[2.4rem] leading-[28.63px] font-normal transition-all  [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <GoChevronDown className="h-[4rem] w-[4rem] shrink-0 text-[#FFBE0A] transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={classNames(
      "overflow-hidden  data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-[34px]">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
