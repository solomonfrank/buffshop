export const PaymentIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2.23047 10.7984L10.7831 2.24573M12.4211 7.37035L10.9547 8.83669M9.70327 10.0732L9.0508 10.7257"
        stroke="#848484"
        stroke-linecap="round"
      />
      <path
        d="M2.11515 10.7608C1.07099 9.71664 1.07099 8.02371 2.11515 6.97958L6.97823 2.11649C8.02237 1.07234 9.7153 1.07234 10.7594 2.11649L13.8822 5.23932C14.9264 6.28347 14.9264 7.97638 13.8822 9.02051L9.01917 13.8836C7.97503 14.9278 6.28213 14.9278 5.23797 13.8836L2.11515 10.7608Z"
        stroke="#848484"
      />
      <path
        d="M2.66797 14.6666H13.3346"
        stroke="#848484"
        stroke-linecap="round"
      />
    </svg>
  );
};
