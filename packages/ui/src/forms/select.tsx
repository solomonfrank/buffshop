"use client";

import { FieldError } from "react-hook-form";
import Select, { components, GroupBase, Props } from "react-select";
import { ErrorMessage } from "./error-message";

type FormWrapperProps = {
  children: React.ReactNode;
  label?: string;
  className?: string;
  error?: FieldError | undefined;
  description?: string;
};
export type FormWrapperPassThroughProps = Omit<
  FormWrapperProps,
  "children" | "className"
>;

type SelectFieldProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = FormWrapperPassThroughProps &
  Props<Option, IsMulti, Group> & {
    className?: string;
    defaultValue?: string;
    placeholder?: string;
  };
export const CustomSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectFieldProps<Option, IsMulti, Group>
) => {
  const { label, error, className, placeholder, ...rest } = props;

  return (
    <>
      <Select
        placeholder={placeholder}
        className={className}
        classNamePrefix="react-select"
        {...rest}
        styles={{
          // menuList: (provided) => ({
          //   ...provided,
          //   fontSize: "1.4rem",
          //   color: "black",
          // }),

          singleValue: (provided) => ({
            ...provided,
            fontSize: "1.6rem",
            color: "black",
          }),
          container: (provided, state) => ({
            ...provided,
            width: "100%",
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: "1.4rem",
          }),
          control: (provided, state) => ({
            ...provided,
            minHeight: "45px",
            borderColor: state.isFocused ? "#000" : "#000",
            boxShadow: "none",
            flexShrink: 0,
            ":hover": {
              borderColor: "#000",
            },

            ":active": {
              borderColor: "#000",
            },
          }),

          ...props.styles,
        }}
        components={{
          ...components,
          IndicatorSeparator: () => null,
        }}
      />
      <ErrorMessage fieldName={props.name || ""} />
    </>
  );
};

// export const DropdownIndicator = <
//   Option,
//   IsMulti extends boolean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>,
// >({
//   ...props
// }: DropdownIndicatorProps<Option, IsMulti, Group>) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       <svg
//         width="13"
//         height="9"
//         viewBox="0 0 13 9"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M7.66109 7.58042C7.06093 8.3142 5.93907 8.3142 5.33891 7.58042L1.1424 2.44967C0.341306 1.47023 1.03816 0 2.30349 0H10.6965C11.9618 0 12.6587 1.47023 11.8576 2.44967L7.66109 7.58042Z"
//           fill="#407BFF"
//         />
//       </svg>
//     </components.DropdownIndicator>
//   );
// };
