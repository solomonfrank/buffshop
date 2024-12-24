export const UserIcon = ({
  className,
  ...props
}: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12 14.0466C9.7927 13.8404 7.53058 14.3187 5.57757 15.4816C4.1628 16.324 0.453366 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H13"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M22 17.5V15C20 15 18.5 14 18.5 14C18.5 14 17 15 15 15V17.5C15 21 18.5 22 18.5 22C18.5 22 22 21 22 17.5Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
