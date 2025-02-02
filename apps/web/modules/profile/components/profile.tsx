import { showToast } from "@buff/ui";
import { ROLES, ServerResponse } from "_types";
import { useEffect } from "react";
import { useProfileStore } from "store/use-edit";
import {
  DEFAULT_ALLOWED_TYPES,
  DEFAULT_MAX_FILE_SIZE,
} from "~/product/components/file-upload";
import { useGetUser } from "~/wallet-management/api/get-user";
import { useUpdateProfileImage } from "../api/update-photo";
import { EditProfileForm } from "./edit-form";

export const ProfileSection = () => {
  const userProfile = useProfileStore((state) => state.userDetails);
  const updateUserDetail = useProfileStore((state) => state.updateUserDetail);

  const userDetail = useGetUser({ enabled: true });

  const onSuccess = (response: ServerResponse<string>) => {
    if (response.data) {
      updateUserDetail({
        ...userProfile,
        image: response.data,
      });

      showToast("Profile image updated successfully", "success");
    }
  };

  useEffect(() => {
    if (userDetail.data && userDetail.data.data) {
      updateUserDetail({
        image: userDetail.data.data.image as string,
        email: userDetail.data.data.email as string,
        name: userDetail.data.data.name as string,
        role: userDetail.data.data.role as ROLES,
      });
    }
  }, [userDetail.data]);

  const onError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const validateFile = (file: File): boolean => {
    if (!DEFAULT_ALLOWED_TYPES.includes(file.type)) {
      showToast("File type not supported", "error");
      return false;
    }

    if (file.size > DEFAULT_MAX_FILE_SIZE) {
      showToast(
        `File size should not exceed ${DEFAULT_MAX_FILE_SIZE / (1024 * 1024)}MB`,
        "error"
      );
      return false;
    }

    return true;
  };
  const uploadProfilePhoto = useUpdateProfileImage({ onSuccess, onError });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
    }

    const file = e.target.files?.[0];

    if (file && validateFile(file)) {
      uploadProfilePhoto.mutate({ image: file });
    }
  };

  return (
    <div className="bg-[#202020] rounded-[12px] pl-[6.1rem] pr-[8.6rem] pt-[4.9rem] pb-[8.7rem]">
      <h3 className="text-white text-[2.7rem] leading-[3.2rem] font-thin mb-[3.3rem]">
        Profile Information
      </h3>
      <div className="flex gap-[21px]">
        {!userProfile.image ? (
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
                    onChange={handleFileUpload}
                    accept={DEFAULT_ALLOWED_TYPES.join(",")}
                  />
                  <div
                    //variant="outline"
                    // size="medium"
                    className="bg-transparent w-[135px] h-[3.4rem] cursor-pointer flex items-center justify-center  text-center border border-[#848484] rounded-[8px] text-[#848484] hover:bg-[#848484] hover:text-white"
                  >
                    {uploadProfilePhoto.isPending
                      ? "Uploading..."
                      : "Upload New Picture"}
                  </div>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[30%] flex gap-[2rem] flex-col items-center">
            <div>
              <figure className="w-[135px] h-[135px] rounded-full overflow-hidden">
                <img
                  src={userProfile.image}
                  alt="profile"
                  className="w-full h-full"
                />
              </figure>
            </div>
            <div>
              <label htmlFor="uploadPhoto">
                <input
                  type="file"
                  id="uploadPhoto"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept={DEFAULT_ALLOWED_TYPES.join(",")}
                />
                <div
                  //variant="outline"
                  // size="medium"
                  className="bg-transparent w-[135px] h-[3.4rem] cursor-pointer flex items-center justify-center  text-center border border-[#848484] rounded-[8px] text-[#848484] hover:bg-[#848484] hover:text-white"
                >
                  {uploadProfilePhoto.isPending
                    ? "Uploading..."
                    : "Upload New Picture"}
                </div>
              </label>
            </div>

            <div
              //variant="outline"
              // size="medium"
              className="bg-transparent w-[135px] h-[3.4rem] cursor-pointer flex items-center justify-center  text-center border border-[#E12827] rounded-[8px] text-[#E12827]"
            >
              Delete
            </div>
          </div>
        )}

        <div className="flex-1">
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
};
