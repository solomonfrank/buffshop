"use client";

import { Button, CustomSelect } from "@buff/ui";
import { useProfileStore } from "store/use-edit";
import AreaGraph from "./components/graph";

export const TenantDashboardPage = () => {
  const userProfile = useProfileStore((state) => state.userDetails);
  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col gap-[2.3rem] ">
        <div className=" w-full lg:w-[65%]">
          <div className="w-full flex flex-col gap-[2rem] mb-[3.2rem]">
            <h3 className="font-bold text-[2.7rem] leading-[3.2rem]">
              Good Afternoon, {userProfile?.name.split(" ")[0]} 👋
            </h3>
            <div className="flex gap-[1.6rem]  items-start">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.9668 10.4958V15.4976C2.9668 18.3271 2.9668 19.7418 3.84548 20.6208C4.72416 21.4998 6.13837 21.4998 8.9668 21.4998H14.9668C17.7952 21.4998 19.2094 21.4998 20.0881 20.6208C20.9668 19.7418 20.9668 18.3271 20.9668 15.4976V10.4958"
                    stroke="#848484"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6.9668 17.993H10.9668"
                    stroke="#848484"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M10.1038 8.41812C9.82182 9.43652 8.79628 11.1933 6.84777 11.4479C5.12733 11.6727 3.82246 10.9217 3.48916 10.6077C3.12168 10.3531 2.28416 9.53836 2.07906 9.02916C1.87395 8.51996 2.11324 7.41669 2.28416 6.9669L2.96743 4.98851C3.13423 4.49159 3.5247 3.31629 3.92501 2.91876C4.32533 2.52123 5.13581 2.50394 5.4694 2.50394H12.4749C14.2781 2.52941 18.2209 2.48786 19.0003 2.50394C19.7797 2.52002 20.2481 3.17336 20.3848 3.45342C21.5477 6.27024 22 7.88346 22 8.57088C21.8482 9.30419 21.22 10.6869 19.0003 11.2951C16.6933 11.9272 15.3854 10.6978 14.9751 10.2258M9.15522 10.2258C9.47997 10.6246 10.4987 11.4275 11.9754 11.4479C13.4522 11.4682 14.7273 10.4379 15.1802 9.92026C15.3084 9.7675 15.5853 9.31431 15.8725 8.41812"
                    stroke="#848484"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <div>
                <h4 className="text-[#848484] font-medium uppercase text-[1rem] leading-[1.6rem]">
                  marketplace store URL
                </h4>
                <h6 className="text-[1.2rem] leading-[2rem] flex gap-4 items-center">
                  <span> {userProfile?.email}</span>
                  <span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 7.5C4.5 6.0858 4.5 5.3787 4.93934 4.93934C5.3787 4.5 6.0858 4.5 7.5 4.5H8C9.4142 4.5 10.1213 4.5 10.5606 4.93934C11 5.3787 11 6.0858 11 7.5V8C11 9.4142 11 10.1213 10.5606 10.5606C10.1213 11 9.4142 11 8 11H7.5C6.0858 11 5.3787 11 4.93934 10.5606C4.5 10.1213 4.5 9.4142 4.5 8V7.5Z"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.49995 4.5C8.49875 3.02146 8.4764 2.2556 8.046 1.73122C7.9629 1.62995 7.87005 1.53709 7.7688 1.45398C7.2156 1 6.39375 1 4.75 1C3.10626 1 2.28439 1 1.73122 1.45398C1.62995 1.53708 1.53709 1.62995 1.45398 1.73122C1 2.28439 1 3.10626 1 4.75C1 6.39375 1 7.2156 1.45398 7.7688C1.53708 7.87005 1.62995 7.9629 1.73122 8.046C2.2556 8.4764 3.02146 8.49875 4.5 8.49995"
                        stroke="#FFBE0A"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#202020] px-[4rem] rounded-[12px] py-[4rem] mb-[2rem]">
            <div className="flex items-center gap-[1.8rem] mb-[1.6rem] ">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18.5V16.5M12 18.5V15.5M17 18.5V13.5M2.5 12.5C2.5 8.02166 2.5 5.78249 3.89124 4.39124C5.28249 3 7.52166 3 12 3C16.4783 3 18.7175 3 20.1088 4.39124C21.5 5.78249 21.5 8.02166 21.5 12.5C21.5 16.9783 21.5 19.2175 20.1088 20.6088C18.7175 22 16.4783 22 12 22C7.52166 22 5.28249 22 3.89124 20.6088C2.5 19.2175 2.5 16.9783 2.5 12.5Z"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.99219 11.9863C8.14729 12.0581 13.0341 11.7328 15.8137 7.32132M13.9923 6.78835L15.8678 6.48649C16.0964 6.45738 16.432 6.63785 16.5145 6.85298L17.0104 8.49142"
                  stroke="#FFBE0A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3 className="text-white text-[2rem] leading-[2.7rem] font-medium">
                Overview
              </h3>
            </div>

            <div className="flex items-center w-full ">
              <div className="flex items-center w-full gap-[1.6rem]">
                <h3 className="text-[#848484] text-[12px] font-medium leading-[1.4rem]">
                  Filter by Duration
                </h3>
                <div className="flex gap-[1.6rem]">
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
            </div>
          </div>

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
                    d="M5.57617 26.9959L26.9578 5.61438M31.0527 18.4259L27.3868 22.0918M24.2582 25.1831L22.627 26.8143"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.29177 26.9019C2.68139 24.2915 2.68139 20.0592 5.29177 17.4489L17.4495 5.29116C20.0598 2.68078 24.2922 2.68078 26.9025 5.29116L34.7095 13.0982C37.32 15.7086 37.32 19.9409 34.7095 22.5512L22.5518 34.7089C19.9415 37.3194 15.7092 37.3194 13.0988 34.7089L5.29177 26.9019Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                  <path
                    d="M6.66602 36.6666H33.3327"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8] capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Total Sales
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
                    d="M23.3327 36.6667H16.0357C12.1226 36.6667 10.1661 36.6667 8.80877 35.4908C7.45147 34.3148 7.11903 32.3318 6.45417 28.3657L4.44823 16.3997C4.14493 14.5905 3.9933 13.6859 4.4789 13.0929C4.96452 12.5 5.85703 12.5 7.64208 12.5H32.3567C34.1417 12.5 35.0342 12.5 35.5198 13.0929C36.0053 13.6859 35.8537 14.5905 35.5505 16.3997L35.0867 19.1667"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M29.1673 12.5C29.1673 7.43742 25.0633 3.33337 20.0007 3.33337C14.938 3.33337 10.834 7.43742 10.834 12.5"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                  />
                  <path
                    d="M27.5 27.5C28.3192 26.6572 30.4997 23.3334 31.6667 23.3334M31.6667 23.3334C32.8337 23.3334 35.0142 26.6572 35.8333 27.5M31.6667 23.3334V36.6667"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8]  capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Number of Orders
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  356
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
                    d="M19.1673 13.3333H33.6607C34.702 13.3333 35.2227 13.3333 35.6038 13.5014C37.29 14.2448 36.5362 16.1179 36.2525 17.464C36.2015 17.7058 36.0357 17.9116 35.8033 18.022C34.8395 18.4793 34.1643 19.3468 33.9872 20.3556L32.9995 25.9796C32.565 28.4541 32.4165 31.9905 30.248 33.7336C28.657 35 26.3647 35 21.7798 35H18.2215C13.6367 35 11.3443 35 9.75332 33.7336C7.58486 31.9903 7.43629 28.4541 7.00176 25.9796L6.0141 20.3556C5.83694 19.3468 5.16187 18.4793 4.198 18.022C3.96559 17.9116 3.79986 17.7058 3.74889 17.464C3.46522 16.1179 2.71132 14.2448 4.39752 13.5014C4.77872 13.3333 5.29936 13.3333 6.34061 13.3333H12.5007"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M23.3327 20H16.666"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.834 18.3333L16.6673 5M25.0007 5L29.1673 13.3333"
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
                    d="M5 21.6666V13.3333H35V21.6666C35 27.952 35 31.0948 33.0473 33.0473C31.0948 35 27.952 35 21.6667 35H18.3333C12.0479 35 8.90525 35 6.95262 33.0473C5 31.0948 5 27.952 5 21.6666Z"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 13.3333L6.4423 10.1282C7.5609 7.64245 8.12018 6.39958 9.25385 5.69978C10.3875 5 11.8417 5 14.75 5H25.25C28.1583 5 29.6125 5 30.7462 5.69978C31.8798 6.39958 32.4392 7.64245 33.5577 10.1282L35 13.3333"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M20 13.3333V5"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14.1673 22.5H23.334C25.175 22.5 26.6673 23.9924 26.6673 25.8334C26.6673 27.6744 25.175 29.1667 23.334 29.1667H21.6673M16.6673 19.1667L13.334 22.5L16.6673 25.8334"
                    stroke="#FFBE0A"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div className="mr-auto ml-[2.7rem]">
                <h3 className="text-[#B8B8B8]  capitalize font-medium text-[1.2rem] leading-[2.4rem]">
                  Return Rates
                </h3>
                <h2 className="text-white font-bold text-[2.2rem] leading-[2.8rem]">
                  2.6%
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
                  d="M2.97266 2.58948H4.26216C5.43711 2.58948 6.02458 2.58948 6.42288 2.95757C6.82119 3.32568 6.89883 3.94034 7.05412 5.16967L8.17141 14.0149C8.37845 15.654 8.48197 16.4735 9.01304 16.9644C9.54413 17.4551 10.3274 17.4551 11.894 17.4551H21.8025"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                />
                <path
                  d="M11.3967 21.4194C12.2177 21.4194 12.8833 20.7539 12.8833 19.9329C12.8833 19.1118 12.2177 18.4463 11.3967 18.4463C10.5757 18.4463 9.91016 19.1118 9.91016 19.9329C9.91016 20.7539 10.5757 21.4194 11.3967 21.4194Z"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                />
                <path
                  d="M18.3342 21.4194C19.1552 21.4194 19.8208 20.7539 19.8208 19.9329C19.8208 19.1118 19.1552 18.4463 18.3342 18.4463C17.5132 18.4463 16.8477 19.1118 16.8477 19.9329C16.8477 20.7539 17.5132 21.4194 18.3342 21.4194Z"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                />
                <path
                  d="M17.8388 14.4821H15.8568C13.988 14.4821 13.0537 14.4821 12.4731 13.9015C11.8926 13.321 11.8926 12.3866 11.8926 10.5179V8.53583C11.8926 6.6671 11.8926 5.73273 12.4731 5.1522C13.0537 4.57166 13.988 4.57166 15.8568 4.57166H17.8388C19.7076 4.57166 20.6419 4.57166 21.2225 5.1522C21.803 5.73273 21.803 6.6671 21.803 8.53583V10.5179C21.803 12.3866 21.803 13.321 21.2225 13.9015C20.6419 14.4821 19.7076 14.4821 17.8388 14.4821Z"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.3516 7.54468H17.3426"
                  stroke="#FFBE0A"
                  stroke-width="1.48657"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <h3 className="text-[2rem] capitalize font-medium text-white leading-[2.7rem]">
              Pending Orders
            </h3>
          </div>

          <div className="flex  flex-col gap-[2rem] mt-[20px]  ">
            <div className="flex gap-[2rem] pb-[2rem] [&:not(:last-child)]:border-white [&:not(:last-child)]:border-b-[1px]">
              <div>
                <figure className="h-[6rem] w-[6rem]">
                  <img src="/images/order.png" className="w-full h-full" />
                </figure>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-[7px] items-center">
                  <span className="font-medium text-[1.6rem] leading-[1.6rem]">
                    Playstation 5
                  </span>
                  <Button
                    size="large"
                    variant="outline"
                    className="bg-transparent text-[#FFBE0A] w-[6.6rem] h-[2.2rem] text-[1.2rem] leading-[1.8rem] rounded-[6px] px-[1rem] py-[2px]"
                  >
                    Pending
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">order number:</span>
                  <span className="text-white">23454890</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">vIEW ORDER</span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.666 10.0001L3.3327 10.0001"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.4994 5.83329C12.4994 5.83329 16.666 8.90196 16.666 9.99996C16.666 11.098 12.4993 14.1666 12.4993 14.1666"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-[2rem] pb-[2rem] [&:not(:last-child)]:border-white [&:not(:last-child)]:border-b-[1px]">
              <div>
                <figure className="h-[6rem] w-[6rem]">
                  <img src="/images/order.png" className="w-full h-full" />
                </figure>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-[7px] items-center">
                  <span className="font-medium text-[1.6rem] leading-[1.6rem]">
                    Playstation 5
                  </span>
                  <Button
                    size="large"
                    variant="outline"
                    className="bg-transparent text-[#FFBE0A] w-[6.6rem] h-[2.2rem] text-[1.2rem] leading-[1.8rem] rounded-[6px] px-[1rem] py-[2px]"
                  >
                    Pending
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">order number:</span>
                  <span className="text-white">23454890</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">vIEW ORDER</span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.666 10.0001L3.3327 10.0001"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.4994 5.83329C12.4994 5.83329 16.666 8.90196 16.666 9.99996C16.666 11.098 12.4993 14.1666 12.4993 14.1666"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[2rem] pb-[2rem] [&:not(:last-child)]:border-white [&:not(:last-child)]:border-b-[1px]">
              <div>
                <figure className="h-[6rem] w-[6rem]">
                  <img src="/images/order.png" className="w-full h-full" />
                </figure>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-[7px] items-center">
                  <span className="font-medium text-[1.6rem] leading-[1.6rem]">
                    Playstation 5
                  </span>
                  <Button
                    size="large"
                    variant="outline"
                    className="bg-transparent text-[#FFBE0A] w-[6.6rem] h-[2.2rem] text-[1.2rem] leading-[1.8rem] rounded-[6px] px-[1rem] py-[2px]"
                  >
                    Pending
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">order number:</span>
                  <span className="text-white">23454890</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">vIEW ORDER</span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.666 10.0001L3.3327 10.0001"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.4994 5.83329C12.4994 5.83329 16.666 8.90196 16.666 9.99996C16.666 11.098 12.4993 14.1666 12.4993 14.1666"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[2rem] pb-[2rem] [&:not(:last-child)]:border-white [&:not(:last-child)]:border-b-[1px]">
              <div>
                <figure className="h-[6rem] w-[6rem]">
                  <img src="/images/order.png" className="w-full h-full" />
                </figure>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-[7px] items-center">
                  <span className="font-medium text-[1.6rem] leading-[1.6rem]">
                    Playstation 5
                  </span>
                  <Button
                    size="large"
                    variant="outline"
                    className="bg-transparent text-[#FFBE0A] w-[6.6rem] h-[2.2rem] text-[1.2rem] leading-[1.8rem] rounded-[6px] px-[1rem] py-[2px]"
                  >
                    Pending
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">order number:</span>
                  <span className="text-white">23454890</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">vIEW ORDER</span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.666 10.0001L3.3327 10.0001"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.4994 5.83329C12.4994 5.83329 16.666 8.90196 16.666 9.99996C16.666 11.098 12.4993 14.1666 12.4993 14.1666"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-[2rem] pb-[2rem] [&:not(:last-child)]:border-white [&:not(:last-child)]:border-b-[1px]">
              <div>
                <figure className="h-[6rem] w-[6rem]">
                  <img src="/images/order.png" className="w-full h-full" />
                </figure>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-[7px] items-center">
                  <span className="font-medium text-[1.6rem] leading-[1.6rem]">
                    Playstation 5
                  </span>
                  <Button
                    size="large"
                    variant="outline"
                    className="bg-transparent text-[#FFBE0A] w-[6.6rem] h-[2.2rem] text-[1.2rem] leading-[1.8rem] rounded-[6px] px-[1rem] py-[2px]"
                  >
                    Pending
                  </Button>
                </div>
                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">order number:</span>
                  <span className="text-white">23454890</span>
                </div>

                <div className="flex items-center gap-2 font-medium text-[1rem] uppercase leading-[1.6rem]">
                  <span className="text-[#848484]">vIEW ORDER</span>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.666 10.0001L3.3327 10.0001"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.4994 5.83329C12.4994 5.83329 16.666 8.90196 16.666 9.99996C16.666 11.098 12.4993 14.1666 12.4993 14.1666"
                        stroke="#B8B8B8"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
