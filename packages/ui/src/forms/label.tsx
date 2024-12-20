import classNames from "classnames";

export const Label = (props: JSX.IntrinsicElements["label"]) => {
  return (
    <label
      className={classNames(
        "block text-[#B8B8B8] font-medium text-[1rem] leading-[1.6rem]",
        props.className
      )}
      {...props}
    >
      {props.children}
    </label>
  );
};
