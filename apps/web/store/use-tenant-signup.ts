// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Status = "completed" | "current" | "upcoming";
// export interface StepProps {
//   icon: React.ElementType;
//   title: ((props: { status: Status }) => JSX.Element) | string;
//   subtitle: string;
//   status: Status;
//   onClick: () => void;
// }
// interface UserInfo {
//   tenantSteps: UserDetails;
//   updateUserDetail: (data: UserDetails) => void;
// }
// export const useProfileStore = create<UserInfo>()(
//   persist(
//     (set) => {
//       return {
//         userDetails: {
//           firstName: "",
//           lastName: "",
//           email: "",
//           name: "",
//           role: "",
//         },
//         updateUserDetail: (data) => set({ userDetails: data }),
//       };
//     },
//     {
//       name: "userinfo",
//     }
//   )
// );
