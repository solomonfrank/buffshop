import { RoleContext } from "@lib/role-context";
import { ROLES } from "_types";
import { ReactNode, useContext } from "react";

export type RoleTypes = keyof typeof ROLES;

let user = {
  role: ROLES?.SUPERADMIN,
};
export const useAuthorization = () => {
  const userRole = useContext(RoleContext);

  const checkAccess = ({ allowedRoles }: { allowedRoles: ROLES[] }) => {
    if (allowedRoles && allowedRoles.length > 0 && userRole) {
      return allowedRoles.includes(userRole?.role as ROLES);
    }

    return true;
  };

  return { checkAccess, role: user.role };
};

export const Authorization = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: ROLES[];
}) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;
  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : <div>Oops page not available</div>}</>;
};
