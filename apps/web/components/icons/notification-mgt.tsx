export const NotificationMgtIcon = ({
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
        d="M1.68792 9.84644C1.54615 10.7758 2.17997 11.4208 2.956 11.7423C5.93118 12.9748 10.0714 12.9748 13.0466 11.7423C13.8226 11.4208 14.4564 10.7758 14.3147 9.84644C14.2276 9.27531 13.7968 8.79971 13.4776 8.33531C13.0595 7.71957 13.018 7.04791 13.0179 6.33337C13.0179 3.57195 10.7719 1.33337 8.0013 1.33337C5.23072 1.33337 2.98472 3.57195 2.98472 6.33337C2.98466 7.04791 2.94312 7.71957 2.52504 8.33531C2.20586 8.79971 1.77504 9.27531 1.68792 9.84644Z"
        stroke="#848484"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.33203 12.6666C5.63769 13.8168 6.7157 14.6666 7.9987 14.6666C9.2817 14.6666 10.3597 13.8168 10.6654 12.6666"
        stroke="#848484"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
