import { showToast } from "@buff/ui";
import * as Switch from "@radix-ui/react-switch";
import { ServerResponse } from "_types";
import { useProfileStore } from "store/use-edit";
import { LoginResponse } from "~/tenant/api/create-tenant";
import { useUpdateProfileConfig } from "../api/update-config";

export const SecurityConfigSection = () => {
  const userProfile = useProfileStore((state) => state.userDetails);
  const updateUserDetail = useProfileStore((state) => state.updateUserDetail);
  const onSuccess = (response: ServerResponse<LoginResponse>) => {
    if (response.data) {
      showToast("Settings updated successfully", "success");
      updateUserDetail({
        ...userProfile,
        two_factor: Boolean(response?.data?.two_factor),
        session_timeout: Boolean(response?.data?.session_timeout),
        email_alert: Boolean(response?.data?.email_alert),
      });
    }
  };

  const onError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const updateConfig = useUpdateProfileConfig({ onSuccess, onError });

  console.log("userProfile", userProfile);
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
              d="M10.3371 10.8799C9.25714 10.8799 8.71714 11.6599 8.59714 12.1399C8.47714 12.6199 8.47714 14.3599 8.54914 15.0799C8.78914 15.9799 9.38914 16.3519 9.97714 16.4719C10.5171 16.5199 12.7971 16.5019 13.4571 16.5019C14.4171 16.5199 15.1371 16.1599 15.4371 15.0799C15.4971 14.7199 15.5571 12.7399 15.4071 12.1399C15.0891 11.1799 14.2971 10.8799 13.6971 10.8799H10.3371Z"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M10.25 10.4585C10.25 10.3985 10.2582 10.0531 10.2596 9.61854C10.2609 9.22145 10.226 8.83854 10.4156 8.48814C11.126 7.07454 13.166 7.21854 13.67 8.65854C13.7573 8.89562 13.7626 9.27146 13.76 9.61854C13.7567 10.062 13.766 10.4585 13.766 10.4585"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M21 11.6833V8.78029C21 7.14029 21 6.32028 20.5959 5.78529C20.1918 5.25029 19.2781 4.99056 17.4507 4.4711C16.2022 4.1162 15.1016 3.68863 14.2223 3.29829C13.0234 2.7661 12.424 2.5 12 2.5C11.576 2.5 10.9766 2.7661 9.77771 3.29829C8.89839 3.68863 7.79784 4.11619 6.54933 4.4711C4.72193 4.99056 3.80822 5.25029 3.40411 5.78529C3 6.32028 3 7.14029 3 8.78029V11.6833C3 17.3085 8.06277 20.6835 10.594 22.0194C11.2011 22.3398 11.5046 22.5 12 22.5C12.4954 22.5 12.7989 22.3398 13.406 22.0194C15.9372 20.6835 21 17.3085 21 11.6833Z"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <h4 className="text-[2rem] leadng-[2.7rem] font-medium">
          Security settings
        </h4>
      </div>

      <div className="w-[80%]">
        <div className="flex flex-col gap-[24px] relative">
          {updateConfig.isPending && (
            <div className="text-[12px] leading-[2.4rem] absolute right-0 top-[30%]">
              Loading...
            </div>
          )}
          <div className="flex items-center">
            <span className=" inline-block min-w-[250px] capitalize font-medium text-[1.6rem] text-[#D1D5DB] leading-[2.4rem]">
              Two-factor authentication
            </span>

            <Switch.Root
              id="drm-mode"
              // checked={userProfile.two_factor}
              disabled={updateConfig.isPending}
              onCheckedChange={(e) => {
                updateConfig.mutate({ two_factor: e });
              }}
              className="w-[42px] h-[24px] bg-neutral-700 rounded-full relative data-[state=checked]:bg-yellow-400 outline-none cursor-default"
            >
              <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] m-[2px]" />
            </Switch.Root>
          </div>

          <div className="flex items-center">
            <span className=" inline-block min-w-[250px] capitalize font-medium text-[1.6rem] text-[#D1D5DB] leading-[2.4rem]">
              Email Alert
            </span>

            <Switch.Root
              id="drm-mode"
              // checked={value}
              disabled={updateConfig.isPending}
              onCheckedChange={(e) => {
                updateConfig.mutate({ email_alert: e });
              }}
              className="w-[42px] h-[24px] bg-neutral-700 rounded-full relative data-[state=checked]:bg-yellow-400 outline-none cursor-default"
            >
              <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] m-[2px]" />
            </Switch.Root>
          </div>
          <div className="flex items-center">
            <span className=" inline-block min-w-[250px] capitalize font-medium text-[1.6rem] text-[#D1D5DB] leading-[2.4rem]">
              Session timeout
            </span>

            <Switch.Root
              id="drm-mode"
              disabled={updateConfig.isPending}
              onCheckedChange={(e) => {
                updateConfig.mutate({ session_timeout: e });
              }}
              className="w-[42px] h-[24px] bg-neutral-700 rounded-full relative data-[state=checked]:bg-yellow-400 outline-none cursor-default"
            >
              <Switch.Thumb className="block w-[20px] h-[20px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[20px] m-[2px]" />
            </Switch.Root>
          </div>
        </div>
      </div>
    </div>
  );
};
