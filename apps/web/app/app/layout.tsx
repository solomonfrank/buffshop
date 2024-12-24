import { DashboardLayout } from "@components/layouts/dashboard-layout";
import { LayoutProps } from "_types";

const Layout = async ({ children, params }: LayoutProps) => {
  const pageParam = await params;
  return <DashboardLayout params={pageParam}>{children}</DashboardLayout>;
};

export default Layout;
