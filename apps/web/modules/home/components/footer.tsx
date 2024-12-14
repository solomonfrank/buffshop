export const Footer = ({
  openDrawerHandler,
}: {
  openDrawerHandler: () => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-[12rem] mt-[7.8rem]">
      <div>
        <button
          onClick={openDrawerHandler}
          className="bg-[#FFBE0A] h-[5.2rem] w-[21.5rem] text-[#171717] gap-[5px] rounded-[8px] flex items-center justify-center font-medium text-[1.8rem] leading-[22.5px] "
        >
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5398 2.54415C15.7248 0.589509 2.07211 5.37771 2.08338 7.12587C2.09616 9.10829 7.41511 9.71812 8.88937 10.1318C9.77596 10.3805 10.0134 10.6355 10.2178 11.5651C11.1436 15.7755 11.6085 17.8696 12.6679 17.9164C14.3565 17.991 19.3111 4.45171 17.5398 2.54415Z"
                stroke="#141B34"
                stroke-width="1.25"
              />
              <path
                d="M9.58337 10.4167L12.5 7.5"
                stroke="#141B34"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span> Join waitlist</span>
        </button>
      </div>
      <p className="text-[16px] leading-[2.4rem] mb-[200.24px]">
        © Copyright 2024. BuffShop
      </p>
    </div>
  );
};
