import { DashboardLayout } from "@components/layouts/dashboard-layout";
import { Params } from "_types";
import { ReactNode } from "react";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  return <DashboardLayout params={params}>{children}</DashboardLayout>;
};

export default Layout;
