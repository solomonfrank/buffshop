import { RecoverPasswordForm } from "./recover-password-form";

export const RecoverPasswordSection = () => {
  return (
    <div className="bg-[#202020] rounded-[12px] px-[3rem] py-[4rem]">
      <div className="flex gap-[1.8rem] items-center mb-[5rem]">
        <span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.3604 15.9688H14.3693M9.41406 15.9688H9.42295"
              stroke="#FFBE0A"
              stroke-width="1.98209"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.23026 19.2829C4.45312 20.9382 5.82417 22.235 7.49263 22.3117C8.89655 22.3763 10.3227 22.4099 11.8932 22.4099C13.4637 22.4099 14.8898 22.3763 16.2937 22.3117C17.9623 22.235 19.3333 20.9382 19.5562 19.2829C19.7016 18.2027 19.8216 17.0956 19.8216 15.9682C19.8216 14.8407 19.7016 13.7336 19.5562 12.6534C19.3333 10.9981 17.9623 9.70128 16.2937 9.62457C14.8898 9.56003 13.4637 9.52637 11.8932 9.52637C10.3227 9.52637 8.89655 9.56003 7.49263 9.62457C5.82417 9.70128 4.45312 10.9981 4.23026 12.6534C4.08481 13.7336 3.96484 14.8407 3.96484 15.9682C3.96484 17.0956 4.08481 18.2027 4.23026 19.2829Z"
              stroke="#FFBE0A"
              stroke-width="1.48657"
            />
            <path
              d="M7.43359 9.52716V7.04954C7.43359 4.58652 9.43027 2.58984 11.8933 2.58984C14.3563 2.58984 16.353 4.58652 16.353 7.04954V9.52716"
              stroke="#FFBE0A"
              stroke-width="1.48657"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h4 className="text-[2rem] leadng-[2.7rem] font-medium">Password</h4>
      </div>

      <div className="w-[80%]">
        <RecoverPasswordForm />
      </div>
    </div>
  );
};
