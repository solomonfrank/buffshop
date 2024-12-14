import { Logo } from "@components/logo";
import { useTimer } from "react-timer-hook";

export const Hero = ({
  openDrawerHandler,
}: {
  openDrawerHandler: () => void;
}) => {
  const { seconds, minutes, hours, days } = useTimer({
    autoStart: true,
    expiryTimestamp: () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 86400 * 2);
      return time;
    },
  });

  return (
    <div className="relative h-[88.1rem]  w-full bg-no-repeat">
      <div className="w-full flex justify-center   ">
        <div className=" bg-brand-black w-[66.8rem] mt-[7.8rem] h-[8.4rem] z-50 rounded-[4rem] flex justify-center items-center">
          <Logo />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col  mt-[14.3rem]">
        <div className="text-center z-50 relative mb-[5.2rem]">
          <h6 className="text-white  ">
            <span className="text-[6rem] leading-[62.94px]">
              Be the First to Transform{" "}
            </span>
            <br />
            <span className="text-[6rem] text-default font-bold leading-[64.41px]">
              Gaming and Selling.
            </span>
          </h6>
        </div>
        <div className="z-50 flex gap-8 items-center mb-[5.2rem]">
          <Digit label="Days" value={days} />
          <span className="text-[#848484] text-[7.2rem]">:</span>
          <Digit label="Hours" value={hours} />
          <span className="text-[#848484] text-[7.2rem]">:</span>
          <Digit label="Minutes" value={minutes} />
          <span className="text-[#848484] text-[7.2rem]">:</span>
          <Digit label="Seconds" value={seconds} />
        </div>
        <div className="z-50 flex flex-col items-center gap-[5.2rem]">
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

          <span>
            <svg
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 40V8"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.5001 30C34.5001 30 27.1351 40 24.4999 40C21.8647 40 14.5 30 14.5 30"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <figure className="w-full h-full absolute top-0 left-0 -z-0">
        <img src="/images/hero.webp" className="w-full h-full object-cover" />
      </figure>
      Hero
    </div>
  );
};

export const Digit = ({ value, label }: { value: number; label?: string }) => {
  const leftDigit = String(value).padStart(2, "0");

  return (
    <div className="text-[16px] font-medium text-[#848484] flex flex-col justify-center items-center">
      {label && (
        <span className="text-[1.4rem] font-thin text-[#C8C8C8] leading-[16.93px]">
          {label}
        </span>
      )}
      <span className="text-[7.2rem] font-normal leading-[85.9px]">
        {leftDigit}
      </span>
    </div>
  );
};
