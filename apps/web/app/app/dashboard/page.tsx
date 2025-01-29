import { ROLES } from "_types";
import { cookies } from "next/headers";
import { DashboardPage } from "~/dashboard/page";
import { TenantDashboardPage } from "~/dashboard/tenant-dashboard";

const Dashboard = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role");

  console.log("role", role);

  if (role?.value === ROLES.TENANT) {
    return <TenantDashboardPage />;
  }
  return <DashboardPage />;
};

export default Dashboard;
