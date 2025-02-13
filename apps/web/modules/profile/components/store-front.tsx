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
import { CreateStoreForm } from "./store-front-form";

export const StoreFrontSection = () => {
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
        Storefront Customization
      </h3>
      <div className="flex gap-[21px]">
        <div className="flex-1">
          <CreateStoreForm />
        </div>
      </div>
    </div>
  );
};
