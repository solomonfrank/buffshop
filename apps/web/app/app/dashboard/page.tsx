import { ROLES } from "_types";
import { cookies } from "next/headers";
import { DashboardPage } from "~/dashboard/page";
import { TenantDashboardPage } from "~/dashboard/tenant-dashboard";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role");

  if (role?.value === ROLES.BUYER) {
    return <div>Welcome to buyer home</div>;
  }

  if (role?.value === ROLES.TENANT) {
    return <TenantDashboardPage />;
  }
  return <DashboardPage />;
};

export default Dashboard;
