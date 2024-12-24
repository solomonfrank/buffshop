import Shell from "@components/shell";
import { Params } from "_types";
import { ReactNode } from "react";

export const DashboardLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  return <Shell params={params}>{children}</Shell>;
};
