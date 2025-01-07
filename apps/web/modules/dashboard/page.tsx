"use client";

import { Button, CustomSelect } from "@buff/ui";
import AreaGraph from "./components/graph";
import UserStatsDonut from "./components/pie";

export const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col gap-[2.3rem] ">
        <div className=" w-full lg:w-[65%]">
          <div className="w-full mb-[2.2rem] flex flex-col md:flex-row gap-[2rem] flex-wrap justify-center items-center">
            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.0268 33.3333H31.8438C33.7601 33.3333 35.2845 32.4602 36.6531 31.2393C40.13 28.1377 31.9568 25 29.1666 25M25.8333 8.44796C26.2118 8.37289 26.6048 8.33334 27.008 8.33334C30.0411 8.33334 32.5 10.5719 32.5 13.3333C32.5 16.0948 30.0411 18.3333 27.008 18.3333C26.6048 18.3333 26.2118 18.2938 25.8333 18.2187"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M7.46885 26.852C5.5039 27.905 0.351898 30.0552 3.4898 32.7457C5.02265 34.06 6.72985 35 8.8762 35H21.1238C23.2702 35 24.9773 34.06 26.5102 32.7457C29.6482 30.0552 24.4962 27.905 22.5312 26.852C17.9233 24.3827 12.0767 24.3827 7.46885 26.852Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                  <path
                    d="M21.6666 12.5C21.6666 16.1819 18.6818 19.1667 15 19.1667C11.3181 19.1667 8.33331 16.1819 8.33331 12.5C8.33331 8.81811 11.3181 5.83334 15 5.83334C18.6818 5.83334 21.6666 8.81811 21.6666 12.5Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8] capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Total Users
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  2,460
                </h2>
              </div>

              <div>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5779 19.9997H6.91132"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.2449 28.3333C25.2449 28.3333 33.5781 22.196 33.5781 20C33.5781 17.804 25.2448 11.6667 25.2448 11.6667"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57617 26.996L26.9578 5.61441M31.0527 18.426L27.3868 22.0918M24.2582 25.1831L22.627 26.8143"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.2911 26.9018C2.68072 24.2915 2.68072 20.0592 5.2911 17.4488L17.4488 5.29113C20.0592 2.68075 24.2915 2.68075 26.9018 5.29113L34.7088 13.0982C37.3193 15.7086 37.3193 19.9408 34.7088 22.5512L22.5512 34.7088C19.9408 37.3193 15.7086 37.3193 13.0982 34.7088L5.2911 26.9018Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                  <path
                    d="M6.66669 36.6667H33.3334"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8]  capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  total transactions
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  ₦2,460,000.89
                </h2>
              </div>

              <div>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5779 19.9997H6.91132"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.2449 28.3333C25.2449 28.3333 33.5781 22.196 33.5781 20C33.5781 17.804 25.2448 11.6667 25.2448 11.6667"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1667 13.3333H33.66C34.7013 13.3333 35.222 13.3333 35.6031 13.5014C37.2893 14.2448 36.5355 16.1179 36.2518 17.464C36.2008 17.7058 36.035 17.9117 35.8026 18.022C34.8388 18.4793 34.1636 19.3468 33.9865 20.3557L32.9988 25.9797C32.5643 28.4542 32.4158 31.9905 30.2473 33.7337C28.6563 35 26.364 35 21.7792 35H18.2208C13.636 35 11.3437 35 9.75265 33.7337C7.58418 31.9903 7.43562 28.4542 7.00108 25.9797L6.01343 20.3557C5.83627 19.3468 5.1612 18.4793 4.19733 18.022C3.96492 17.9117 3.79918 17.7058 3.74822 17.464C3.46455 16.1179 2.71065 14.2448 4.39685 13.5014C4.77805 13.3333 5.29868 13.3333 6.33993 13.3333H12.5"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M23.3334 20H16.6667"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.8333 18.3333L16.6666 5M25 5L29.1666 13.3333"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8]  capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  average order value
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  ₦54,900.80
                </h2>
              </div>

              <div>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5779 19.9997H6.91132"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.2449 28.3333C25.2449 28.3333 33.5781 22.196 33.5781 20C33.5781 17.804 25.2448 11.6667 25.2448 11.6667"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-[#202020] pl-[4.2rem] pr-[1.1rem] flex  rounded-[1.2rem] bg-[url('/images/mask.png')]   py-[3.2rem] bg-cover items-center shadow-lg text-white w-full lg:basis-[calc(50%-20px)] h-[12rem]">
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.8333 5H9.16667C8.39223 5 8.00503 5 7.68303 5.06405C6.36073 5.32707 5.32707 6.36073 5.06405 7.68303C5 8.00503 5 8.39223 5 9.16667C5 9.9411 5 10.3283 5.06405 10.6503C5.32707 11.9726 6.36073 13.0063 7.68303 13.2693C8.00503 13.3333 8.39223 13.3333 9.16667 13.3333H30.8333C31.6078 13.3333 31.995 13.3333 32.317 13.2693C33.6393 13.0063 34.673 11.9726 34.936 10.6503C35 10.3283 35 9.9411 35 9.16667C35 8.39223 35 8.00503 34.936 7.68303C34.673 6.36073 33.6393 5.32707 32.317 5.06405C31.995 5 31.6078 5 30.8333 5Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30.8333 18.3333H9.16667C8.39223 18.3333 8.00503 18.3333 7.68303 18.3973C6.36073 18.6603 5.32707 19.694 5.06405 21.0163C5 21.3383 5 21.7255 5 22.5C5 23.2745 5 23.6617 5.06405 23.9837C5.32707 25.306 6.36073 26.3397 7.68303 26.6027C8.00503 26.6667 8.39223 26.6667 9.16667 26.6667H30.8333C31.6078 26.6667 31.995 26.6667 32.317 26.6027C33.6393 26.3397 34.673 25.306 34.936 23.9837C35 23.6617 35 23.2745 35 22.5C35 21.7255 35 21.3383 34.936 21.0163C34.673 19.694 33.6393 18.6603 32.317 18.3973C31.995 18.3333 31.6078 18.3333 30.8333 18.3333Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 31.6667V35M8.33331 35H31.6666"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 22.5H10.0167"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 9.16667H10.0167"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 22.5H15.0167"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 9.16667H15.0167"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8]  capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  system uptime
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  34.96%
                </h2>
              </div>

              <div>
                <svg
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5779 19.9997H6.91132"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.2449 28.3333C25.2449 28.3333 33.5781 22.196 33.5781 20C33.5781 17.804 25.2448 11.6667 25.2448 11.6667"
                    stroke="#848484"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full  px-[4.2rem] py-[2.8rem] bg-[#202020] rounded-[1.2rem] min-h-[335px]">
            <div className="flex mb-[1.2rem]">
              <div className="flex gap-[1.8rem] mr-auto">
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7552 17.2921C20.1047 13.3787 18.0798 10.4645 16.3195 8.75286C15.8073 8.25478 15.5512 8.00574 14.9854 7.77526C14.4196 7.54478 13.9333 7.54478 12.9607 7.54478H10.8244C9.8518 7.54478 9.36548 7.54478 8.79971 7.77526C8.23394 8.00574 7.97783 8.25478 7.46559 8.75286C5.70527 10.4645 3.68036 13.3787 3.0299 17.2921C2.54593 20.2038 5.232 22.4104 8.23392 22.4104H15.5512C18.5531 22.4104 21.2392 20.2038 20.7552 17.2921Z"
                      stroke="#FFBE0A"
                      stroke-width="1.48657"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.19164 5.01055C6.98718 4.71295 6.69082 4.30901 7.303 4.2169C7.93225 4.12221 8.58563 4.55295 9.22519 4.5441C9.80379 4.53609 10.0986 4.27947 10.4148 3.91307C10.7478 3.52725 11.2634 2.58955 11.8925 2.58955C12.5217 2.58955 13.0373 3.52725 13.3703 3.91307C13.6865 4.27947 13.9813 4.53609 14.5598 4.5441C15.1995 4.55295 15.8529 4.12221 16.4821 4.2169C17.0942 4.30901 16.7979 4.71295 16.5935 5.01055L15.6689 6.35616C15.2735 6.93178 15.0758 7.21959 14.6619 7.38219C14.2482 7.54478 13.7134 7.54478 12.644 7.54478H11.1411C10.0717 7.54478 9.53693 7.54478 9.12313 7.38219C8.70932 7.21959 8.51159 6.93178 8.11612 6.35616L7.19164 5.01055Z"
                      stroke="#FFBE0A"
                      stroke-width="1.48657"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5047 13.4104C13.2904 12.6194 12.1999 11.9057 10.8908 12.4396C9.58173 12.9735 9.37379 14.6915 11.3539 14.874C12.2488 14.9565 12.8324 14.7783 13.3665 15.2825C13.9008 15.7865 14 17.1884 12.6344 17.5662C11.2687 17.944 9.91641 17.3537 9.76917 16.5154M11.7357 11.5017V12.2553M11.7357 17.6825V18.439"
                      stroke="#FFBE0A"
                      stroke-width="1.48657"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="text-[2rem] capitalize font-medium text-white leading-[2.7rem]">
                  transactions
                </h3>
              </div>
              <div className="gap-[8px] flex items-center">
                <Button
                  size="medium"
                  className="w-[7.2rem] bg-[#171717] text-[#848484] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
                >
                  Today
                </Button>
                <Button
                  size="medium"
                  className="w-[7.2rem] bg-brand-default text-[#171717] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
                >
                  1 Week
                </Button>
                <Button
                  size="medium"
                  className="w-[7.2rem] bg-[#171717] text-[#848484] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
                >
                  1 Month
                </Button>
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 mb-[22.25px]">
              <h3 className="text-[#848484] text-[10px] font-medium leading-[1.4rem]">
                Filter by Duration
              </h3>
              <div className="flex gap-2">
                <div className="w-[12rem]">
                  <CustomSelect
                    name="from"
                    placeholder="From"
                    options={[
                      {
                        label: "Console Game",
                        value: "category",
                      },
                      {
                        label: "Console Game",
                        value: "category1",
                      },
                    ]}
                    // value={value}
                    onChange={(e) => {
                      //  onChange(e);
                    }}
                    styles={{
                      menuList: (provided) => ({
                        ...provided,
                        color: "#fff",
                        fontSize: "1.4rem",
                        background: "#333333",
                        ":hover": {
                          borderColor: "#000",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
                        color: "white",

                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: state.isSelected
                            ? "#FFBE0A"
                            : "#333333",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        fontSize: "1.2rem",
                        lineHeight: "2.4rem",
                        fontWeight: 500,
                        color: "#fff",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: "1.2rem",
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "4rem",
                        borderColor: "#171717",
                        boxShadow: "none",
                        borderRadius: "8px",
                        background: "#171717",
                        flexShrink: 0,
                        color: "#fff",

                        ":hover": {
                          borderColor: "#171717",
                        },

                        ":active": {
                          borderColor: "#171717",
                          color: "#fff",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-[12rem]">
                  <CustomSelect
                    name="To"
                    placeholder="To"
                    options={[
                      {
                        label: "Console Game",
                        value: "category",
                      },
                      {
                        label: "Console Game",
                        value: "category1",
                      },
                    ]}
                    // value={value}
                    onChange={(e) => {
                      //  onChange(e);
                    }}
                    styles={{
                      menuList: (provided) => ({
                        ...provided,
                        color: "#fff",
                        fontSize: "1.4rem",
                        background: "#333333",
                        ":hover": {
                          borderColor: "#000",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
                        color: "white",

                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: state.isSelected
                            ? "#FFBE0A"
                            : "#333333",
                        },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        fontSize: "1.2rem",
                        lineHeight: "2.4rem",
                        fontWeight: 500,
                        color: "#fff",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        fontSize: "1.2rem",
                        whiteSpace: "nowrap",
                      }),
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "4rem",
                        borderColor: "#171717",
                        boxShadow: "none",
                        borderRadius: "8px",
                        background: "#171717",
                        flexShrink: 0,
                        color: "#fff",

                        ":hover": {
                          borderColor: "#171717",
                        },

                        ":active": {
                          borderColor: "#171717",
                          color: "#fff",
                        },
                      }),
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <AreaGraph />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] bg-[#202020] rounded-[12px] px-[3rem] py-[4rem]">
          <div className="flex gap-[1.8rem] mr-auto">
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5879 18.5C21.3305 18.5 21.9212 18.0285 22.4515 17.3691C23.5372 16.0194 21.7547 14.9408 21.0748 14.4126C20.3837 13.8756 19.6121 13.5714 18.8298 13.5M17.8387 11.5C19.2071 11.5 20.3164 10.3807 20.3164 9C20.3164 7.61929 19.2071 6.5 17.8387 6.5"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.197 18.5C2.4544 18.5 1.86375 18.0285 1.33342 17.3691C0.247773 16.0194 2.03025 14.9408 2.71008 14.4126C3.40116 13.8756 4.1728 13.5714 4.95515 13.5M5.45067 11.5C4.08233 11.5 2.97306 10.3807 2.97306 9C2.97306 7.61929 4.08233 6.5 5.45067 6.5"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.01135 15.6112C6.99872 16.243 4.34367 17.5331 5.96078 19.1474C6.75072 19.936 7.63051 20.5 8.73661 20.5H15.0484C16.1545 20.5 17.0342 19.936 17.8242 19.1474C19.4413 17.5331 16.7863 16.243 15.7736 15.6112C13.399 14.1296 10.3859 14.1296 8.01135 15.6112Z"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.361 8C15.361 9.933 13.8081 11.5 11.8924 11.5C9.97669 11.5 8.42371 9.933 8.42371 8C8.42371 6.067 9.97669 4.5 11.8924 4.5C13.8081 4.5 15.361 6.067 15.361 8Z"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                />
              </svg>
            </span>
            <h3 className="text-[2rem] capitalize font-medium text-white leading-[2.7rem]">
              Total User engagement
            </h3>
          </div>

          <div className="gap-[8px] flex items-center mt-[2rem]">
            <Button
              size="medium"
              className="w-[7.2rem] bg-[#171717] text-[#848484] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
            >
              Today
            </Button>
            <Button
              size="medium"
              className="w-[7.2rem] bg-brand-default text-[#171717] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
            >
              1 Week
            </Button>
            <Button
              size="medium"
              className="w-[7.2rem] bg-[#171717] text-[#848484] border-none h-[2.4rem] rounded-[8px] font-medium text-[1rem] leading-[1.6rem]"
            >
              1 Month
            </Button>
          </div>

          <div className="flex  flex-col gap-2 mt-[20px]">
            <h3 className="text-[#848484] text-[10px] font-medium leading-[1.4rem]">
              Filter by Duration
            </h3>
            <div className="flex gap-2">
              <div className="w-[12rem]">
                <CustomSelect
                  name="from"
                  placeholder="From"
                  options={[
                    {
                      label: "Console Game",
                      value: "category",
                    },
                    {
                      label: "Console Game",
                      value: "category1",
                    },
                  ]}
                  // value={value}
                  onChange={(e) => {
                    //  onChange(e);
                  }}
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      color: "#fff",
                      fontSize: "1.4rem",
                      background: "#333333",
                      ":hover": {
                        borderColor: "#000",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
                      color: "white",

                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: "1.2rem",
                      lineHeight: "2.4rem",
                      fontWeight: 500,
                      color: "#fff",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "1.2rem",
                    }),
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "4rem",
                      borderColor: "#171717",
                      boxShadow: "none",
                      borderRadius: "8px",
                      background: "#171717",
                      flexShrink: 0,
                      color: "#fff",

                      ":hover": {
                        borderColor: "#171717",
                      },

                      ":active": {
                        borderColor: "#171717",
                        color: "#fff",
                      },
                    }),
                  }}
                />
              </div>
              <div className="w-[12rem]">
                <CustomSelect
                  name="To"
                  placeholder="To"
                  options={[
                    {
                      label: "Console Game",
                      value: "category",
                    },
                    {
                      label: "Console Game",
                      value: "category1",
                    },
                  ]}
                  // value={value}
                  onChange={(e) => {
                    //  onChange(e);
                  }}
                  styles={{
                    menuList: (provided) => ({
                      ...provided,
                      color: "#fff",
                      fontSize: "1.4rem",
                      background: "#333333",
                      ":hover": {
                        borderColor: "#000",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "#FFBE0A" : "#333333",
                      color: "white",

                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: state.isSelected
                          ? "#FFBE0A"
                          : "#333333",
                      },
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      fontSize: "1.2rem",
                      lineHeight: "2.4rem",
                      fontWeight: 500,
                      color: "#fff",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      fontSize: "1.2rem",
                      whiteSpace: "nowrap",
                    }),
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: "4rem",
                      borderColor: "#171717",
                      boxShadow: "none",
                      borderRadius: "8px",
                      background: "#171717",
                      flexShrink: 0,
                      color: "#fff",

                      ":hover": {
                        borderColor: "#171717",
                      },

                      ":active": {
                        borderColor: "#171717",
                        color: "#fff",
                      },
                    }),
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <UserStatsDonut />
          </div>
        </div>
      </div>
    </div>
  );
};
