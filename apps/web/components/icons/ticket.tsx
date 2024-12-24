export const TicketIcon = ({
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
        d="M21.9996 8.87895C21.9327 7.33687 21.7452 6.33298 21.2199 5.53884C20.9177 5.08196 20.5424 4.68459 20.1108 4.36468C18.9443 3.5 17.2986 3.5 14.0074 3.5H9.99263C6.70136 3.5 5.05573 3.5 3.88921 4.36468C3.45764 4.68459 3.08226 5.08196 2.78006 5.53884C2.25485 6.33289 2.06735 7.33665 2.00042 8.87843C1.98897 9.14208 2.21607 9.34375 2.4649 9.34375C3.85068 9.34375 4.97408 10.533 4.97408 12C4.97408 13.467 3.85068 14.6562 2.4649 14.6562C2.21607 14.6562 1.98897 14.8579 2.00042 15.1216C2.06735 16.6634 2.25485 17.6671 2.78006 18.4612C3.08226 18.918 3.45764 19.3154 3.88921 19.6353C5.05573 20.5 6.70137 20.5 9.99265 20.5H14.0074C17.2986 20.5 18.9443 20.5 20.1108 19.6353C20.5424 19.3154 20.9177 18.918 21.2199 18.4612C21.7452 17.667 21.9327 16.6631 21.9996 15.1211V8.87895Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M13 12H17"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 16H17"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
