import { EditProfileForm } from "./edit-form";

export const ProfileSection = () => {
  return (
    <div className="bg-[#202020] rounded-[12px] pl-[6.1rem] pr-[8.6rem] pt-[4.9rem] pb-[8.7rem]">
      <h3 className="text-white text-[2.7rem] leading-[3.2rem] font-thin mb-[3.3rem]">
        Profile Information
      </h3>
      <div className="flex gap-[21px]">
        <div className="w-[30%]">
          <div className="flex  justify-center flex-col gap-[1.1rem]">
            <div>
              <svg
                width="121"
                height="117"
                viewBox="0 0 121 117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="60.5"
                  cy="58.3178"
                  rx="60"
                  ry="58.3178"
                  fill="#FFBE0A"
                />
                <ellipse
                  cx="61.6496"
                  cy="43.7382"
                  rx="21.9231"
                  ry="21.3084"
                  fill="white"
                />
                <mask
                  id="mask0_1485_8933"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="7"
                  y="6"
                  width="107"
                  height="104"
                >
                  <ellipse
                    cx="60.5027"
                    cy="58.3179"
                    rx="53.0769"
                    ry="51.5888"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_1485_8933)">
                  <ellipse
                    cx="60.4986"
                    cy="109.907"
                    rx="40.3385"
                    ry="39.2075"
                    fill="white"
                  />
                </g>
              </svg>
            </div>

            <div>
              <label htmlFor="uploadPhoto">
                <input
                  type="file"
                  id="uploadPhoto"
                  className="hidden"
                  onChange={(e) => console.log(e.target.files)}
                />
                <div
                  //variant="outline"
                  // size="medium"
                  className="bg-transparent w-[135px] h-[3.4rem] cursor-pointer flex items-center justify-center  text-center border border-[#848484] rounded-[8px] text-[#848484] hover:bg-[#848484] hover:text-white"
                >
                  Upload New Picture
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
};
