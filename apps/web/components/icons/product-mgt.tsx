export const ProductMgtIcon = ({
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
        d="M3 6.84353V4H13V6.84353C13 8.96007 13 10.0183 12.3491 10.6758C11.6983 11.3333 10.6507 11.3333 8.55553 11.3333H7.44447C5.34931 11.3333 4.30175 11.3333 3.65087 10.6758C3 10.0183 3 8.96007 3 6.84353Z"
        stroke="#848484"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 4.00004L3.48077 2.9744C3.85363 2.17896 4.04006 1.78124 4.41795 1.55731C4.79583 1.33337 5.28056 1.33337 6.25 1.33337H9.75C10.7195 1.33337 11.2041 1.33337 11.5821 1.55731C11.9599 1.78124 12.1464 2.17896 12.5192 2.9744L13 4.00004"
        stroke="#848484"
        stroke-linecap="round"
      />
      <path d="M7 6H9" stroke="#848484" stroke-linecap="round" />
      <path
        d="M7.9987 13V14.6667M7.9987 13H4.66536M7.9987 13H11.332M4.66536 13H2.9987C2.07822 13 1.33203 13.7462 1.33203 14.6667M4.66536 13V14.6667M11.332 13H12.9987C13.9192 13 14.6654 13.7462 14.6654 14.6667M11.332 13V14.6667"
        stroke="#848484"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
