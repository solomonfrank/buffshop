import { DashboardLayout } from "@components/layouts/dashboard-layout";
import { LayoutProps } from "_types";
import { cookies } from "next/headers";

const Layout = async ({ children, params }: LayoutProps) => {
  const pageParam = await params;

  const cookieStore = await cookies();
  const role = cookieStore.get("role");

  if (role && role.value === "buyer") {
    return children;
  }
  return <DashboardLayout params={pageParam}>{children}</DashboardLayout>;
};

export default Layout;
