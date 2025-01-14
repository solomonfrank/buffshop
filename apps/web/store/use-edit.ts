import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  role: string;
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
          role: "",
        },
        updateUserDetail: (data) => set({ userDetails: data }),
      };
    },
    {
      name: "userinfo",
    }
  )
);
