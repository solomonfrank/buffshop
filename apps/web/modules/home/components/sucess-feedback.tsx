import { SuccessIcon } from "./icon/success-icon";

export const SuccessFeedback = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <span>
        <SuccessIcon />
      </span>
      <p className="font-bold text-center text-[2.7rem] leading-[3.2rem]">
        Thanks for joining <br />
        the waitlist!
      </p>
    </div>
  );
};
