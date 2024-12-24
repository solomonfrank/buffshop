"use client";
import { showToast } from "@buff/ui";
import { Logo } from "@components/logo";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProgressBar from "./components/progress-bar";

export const WaitList = () => {
  const query = useSearchParams();

  function copyTextToClipboard(url: string) {
    // Check if the clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showToast("Referral link copied successfully.", "success");
        })
        .catch((err) => {
          showToast("Failed to copy link", "error");
        });
    } else {
      showToast("Clipboard API is not supported in this browser.", "warning");
    }
  }
  return (
    <Suspense>
      <div className="h-screen w-screen relative">
        <div className="relative  w-full h-full">
          <div className="w-full flex justify-center   ">
            <div className=" bg-brand-black w-[66.8rem] mt-[7.8rem] h-[8.4rem] z-50 rounded-[4rem] flex justify-center items-center">
              <Logo />
            </div>
          </div>
          <div className="flex items-center justify-center flex-col  mt-[14.3rem]">
            <div className="text-center z-50 relative mb-[8px]">
              <h6 className="text-white  text-center ">
                <span className="text-[7.2rem]  md:text-[2.7rem] font-bold  lg:text-[2.7rem] leading-[3.2rem]">
                  Your Current Ranking: {query.get("rank")}
                </span>
              </h6>
            </div>

            <div className="z-50 md:w-[68rem]">
              <div className="w-full mb-[5.1rem]">
                <ProgressBar
                  progress={60}
                  max={100}
                  size="md"
                  color="secondary"
                  animate={true}
                  showLabel={false}
                />
                <p className="text-center text-[#848484] text-[1.6rem] font-bold leading-[2rem] mt-[8px]">
                  {query.get("referrals_needed") &&
                    `You're ${query.get("referrals_needed")} referrals away from the next rank!`}
                </p>
              </div>

              <div className="w-full bg-white h-[5.2rem] items-center flex rounded-[8px] text-[#282828] overflow-hidden mb-[2.8rem]">
                <span className="text-[2.7rem] leading-[3.2rem] ml-[81px] mr-auto">
                  {window.location.origin}/{query.get("referral_code")}
                </span>
                <div
                  onClick={() =>
                    copyTextToClipboard(
                      `${window.location.origin}/home?referralCode=${query.get("referral_code")}`
                    )
                  }
                  className="bg-[#848484]  flex items-center w-[21.5rem] justify-center  font-bold text-[18px] leading-[22.5px]  rounded-[8px] text-center h-full text-white"
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6365 7.48509C14.6345 5.02663 14.5973 3.75322 13.8815 2.88129C13.7434 2.7129 13.589 2.55851 13.4206 2.42032C12.5007 1.66547 11.1341 1.66547 8.40077 1.66547C5.66746 1.66547 4.3008 1.66547 3.38095 2.42032C3.21255 2.5585 3.05814 2.7129 2.91994 2.88129C2.16504 3.80108 2.16504 5.16765 2.16504 7.90077C2.16504 10.6339 2.16504 12.0004 2.91994 12.9203C3.05813 13.0886 3.21255 13.243 3.38095 13.3812C4.25293 14.0968 5.52644 14.134 7.98506 14.136"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.1903 7.52044L14.6617 7.48492M12.1786 18.3344L14.65 18.2988M18.8097 11.6851L18.7864 14.1515M8.00866 11.6964L7.98535 14.1627M10.0728 7.52044C9.3788 7.64474 8.26489 7.77259 8.00866 9.20732M16.7456 18.2988C17.4414 18.1852 18.5571 18.0745 18.8355 16.6438M16.7456 7.52044C17.4396 7.64474 18.5535 7.77259 18.8097 9.20732M10.0834 18.2977C9.38938 18.1738 8.27538 18.0466 8.01836 16.612"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Copy Referral link
                </div>
              </div>
              <div className="flex flex-col gap-8 mb-[5.2rem]">
                <div className="text-[#848484] text-[1.6rem] text-center leading-[2rem]">
                  Boost your rank and earn rewards! Share <br />
                  your referral link on social media.
                </div>

                <div className="flex gap-2 justify-center">
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 1.5H3C2.60218 1.5 2.22064 1.65804 1.93934 1.93934C1.65804 2.22064 1.5 2.60218 1.5 3V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H11.5V14.5H9.5V11.5H11.5V9.5C11.5 8.43913 11.9214 7.42172 12.6716 6.67157C13.4217 5.92143 14.4391 5.5 15.5 5.5H18.5V8.5H15.5C15.2348 8.5 14.9804 8.60536 14.7929 8.79289C14.6054 8.98043 14.5 9.23478 14.5 9.5V11.5H18.5L18 14.5H14.5V22.5H21C21.3978 22.5 21.7794 22.342 22.0607 22.0607C22.342 21.7794 22.5 21.3978 22.5 21V3C22.5 2.60218 22.342 2.22064 22.0607 1.93934C21.7794 1.65804 21.3978 1.5 21 1.5Z"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_48_726)">
                        <path
                          d="M19.7 23.5H4.3C2.2 23.5 0.5 21.8 0.5 19.7V4.3C0.5 2.2 2.2 0.5 4.3 0.5H19.6C21.7 0.5 23.4 2.2 23.4 4.3V19.6C23.5 21.8 21.8 23.5 19.7 23.5ZM4.3 1.5C2.7 1.5 1.5 2.8 1.5 4.3V19.6C1.5 21.2 2.8 22.4 4.3 22.4H19.6C21.2 22.4 22.4 21.1 22.4 19.6V4.3C22.4 2.7 21.1 1.5 19.6 1.5H4.3Z"
                          fill="white"
                        />
                        <path
                          d="M18.5 19.1H15C14.8 19.1 14.7 19 14.6 18.9L12 14.4L9.5 18.8C9.4 19 9.2 19.1 9 19.1H5.5C5.3 19.1 5.2 19 5.1 18.9C5 18.8 5 18.6 5.1 18.4C5.1 18.3 5.1 18.3 5.2 18.3L8.7 12L5.1 5.80002L5 5.70002C5 5.50002 5 5.30002 5.1 5.20002C5.2 5.00002 5.4 4.90002 5.5 4.90002H9C9.2 4.90002 9.3 5.00002 9.4 5.10002L12 9.60002L14.5 5.20002C14.6 5.00002 14.8 4.90002 15 4.90002H18.5C18.7 4.90002 18.8 5.00002 18.9 5.10002C19 5.20002 19 5.40002 18.9 5.60002C18.9 5.70002 18.9 5.70002 18.8 5.80002L15.3 12L18.9 18.2L19 18.3C19.1 18.5 19.1 18.6 19 18.8C18.8 19 18.7 19.1 18.5 19.1ZM15.3 18.1H17.7L14.3 12.3C14.2 12.1 14.2 12 14.3 11.8L17.7 6.00002H15.3L12.5 10.9C12.4 11.1 12.2 11.1 12.1 11.1C11.9 11.1 11.8 11 11.7 10.9L8.7 5.90002H6.4L9.8 11.7C9.9 11.9 9.9 12 9.8 12.2L6.4 18H8.8L11.6 13.1C11.8 12.8 12.3 12.8 12.5 13.1L15.3 18.1Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_726">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10V17"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.00801 7H6.99902"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.89998 10.3 9.79998C10.2 9.69998 9.7 8.49998 9.5 7.99998C9.4 7.29998 9.2 7.29998 9 7.29998H8.5C8.3 7.29998 8 7.49998 7.9 7.59998C7.3 8.19998 7 8.89998 7 9.69998C7.1 10.6 7.4 11.5 8 12.3C9.1 13.9 10.5 15.2 12.2 16C12.7 16.2 13.1 16.4 13.6 16.5C14.1 16.7 14.6 16.7 15.2 16.6C15.9 16.5 16.5 16 16.9 15.4C17.1 15 17.1 14.6 17 14.2L16.6 14ZM19.1 4.89998C15.2 0.999976 8.9 0.999976 5 4.89998C1.8 8.09998 1.2 13 3.4 16.9L2 22L7.3 20.6C8.8 21.4 10.4 21.8 12 21.8C17.5 21.8 21.9 17.4 21.9 11.9C22 9.29997 20.9 6.79998 19.1 4.89998ZM16.4 18.9C15.1 19.7 13.6 20.2 12 20.2C10.5 20.2 9.1 19.8 7.8 19.1L7.5 18.9L4.4 19.7L5.2 16.7L5 16.4C2.6 12.4 3.8 7.39998 7.7 4.89998C11.6 2.39998 16.6 3.69998 19 7.49998C21.4 11.4 20.3 16.5 16.4 18.9Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="z-50 flex flex-col items-center gap-[5.2rem]">
              <button className="bg-[#FFBE0A] h-[5.2rem] w-[21.5rem] text-[#171717] gap-[5px] rounded-[8px] flex items-center justify-center font-medium text-[1.8rem] leading-[22.5px] ">
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
                <span> Go Home</span>
              </button>
            </div>
          </div>
          <figure className="w-full h-full absolute top-0 left-0 -z-0">
            <img
              src="/images/hero.webp"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </div>
    </Suspense>
  );
};
