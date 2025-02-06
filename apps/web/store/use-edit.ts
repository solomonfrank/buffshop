import { ROLES } from "_types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserDetails = {
  firstName?: string;
  lastName?: string;
  email: string;
  name: string;
  role: ROLES;
  image?: string;
  two_factor?: boolean;
  email_alert?: boolean;
  session_timeout?: boolean;
};

interface UserInfo {
  userDetails: UserDetails;
  updateUserDetail: (data: UserDetails) => void;
}
export const useProfileStore = create<UserInfo>()(
  persist(
    (set) => {
      return {
        userDetails: {
          firstName: "",
          lastName: "",
          email: "",
          name: "",
          role: ROLES.TENANT,
        },
        updateUserDetail: (data) => set({ userDetails: data }),
      };
    },
    {
      name: "userinfo",
    }
  )
);
