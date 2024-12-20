"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type LoaderProps = {
  loading: true;
  Message?: () => JSX.Element;
  redirectUrl?: string;
};

export const Loader = ({
  loading,
  Message = MessageDisplay,
  redirectUrl,
}: LoaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          ref.current.style.display = "none";
          if (redirectUrl) {
            router.push(redirectUrl);
          }
        }
      }, 2000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);

  if (!loading) return null;
  return (
    <div
      ref={ref}
      className="fixed inset-0  bg-opacity-80  z-50  flex items-center justify-center  w-full h-full  top-0 left-0 right-0 bottom-0 bg-[#171717] "
    >
      <Message />
    </div>
  );
};

const MessageDisplay = () => {
  return (
    <div>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <span>
          <svg
            width="43"
            height="42"
            viewBox="0 0 43 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.125 21C38.125 30.1817 30.6817 37.625 21.5 37.625C12.3183 37.625 4.875 30.1817 4.875 21C4.875 11.8183 12.3183 4.375 21.5 4.375C28.3173 4.375 34.1763 8.47836 36.7416 14.35M38.125 9.625L37.2937 15.1813L32 14"
              stroke="#FFBE0A"
              stroke-width="2.625"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 19.25V16.625C18 14.692 19.567 13.125 21.5 13.125C23.433 13.125 25 14.692 25 16.625V19.25M20.1875 28.875H22.8125C24.8649 28.875 25.8911 28.875 26.5979 28.3325C26.7799 28.1929 26.9428 28.0299 27.0825 27.8479C27.625 27.1411 27.625 26.1149 27.625 24.0625C27.625 22.0101 27.625 20.9839 27.0825 20.2771C26.9428 20.0951 26.7799 19.9322 26.5979 19.7925C25.8911 19.25 24.8649 19.25 22.8125 19.25H20.1875C18.1351 19.25 17.1089 19.25 16.402 19.7925C16.22 19.9322 16.0571 20.0951 15.9174 20.2771C15.375 20.9839 15.375 22.0101 15.375 24.0625C15.375 26.1149 15.375 27.1411 15.9174 27.8479C16.0571 28.0299 16.22 28.1929 16.402 28.3325C17.1089 28.875 18.1351 28.875 20.1875 28.875Z"
              stroke="#FFBE0A"
              stroke-width="2.625"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Please wait!
          <br /> Confirming your Password.
        </p>
      </div>
    </div>
  );
};
