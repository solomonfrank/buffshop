"use client";

import { ROLES } from "_types";
import { createContext, ReactNode } from "react";
import { useProfileStore } from "store/use-edit";

export const RoleContext = createContext<{ role: ROLES } | null>(null);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const userProfile = useProfileStore((state) => state.userDetails);

  return (
    <RoleContext.Provider
      value={{ role: userProfile?.role ?? ROLES.SUPERADMIN }}
    >
      {children}
    </RoleContext.Provider>
  );
};
