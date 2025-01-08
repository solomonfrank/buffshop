"use client";

import { CreateAdminForm } from "./components/create-admin";

export const CreateSuperAdminPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-[4rem]">
        <span>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66602 20H33.3327"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.9993 28.3337C14.9993 28.3337 6.66605 22.1963 6.66602 20.0003C6.666 17.8043 14.9993 11.667 14.9993 11.667"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-white text-[2.7rem] leading-[3.2rem] font-bold">
          Add Super Admin
        </h3>
      </div>

      <div className="w-1/2 mt-[3.2rem]">
        <CreateAdminForm />
      </div>
    </div>
  );
};
