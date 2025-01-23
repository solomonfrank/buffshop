import { PageProps } from "_types";
import { TenantAuthTab } from "~/tenant/auth/page";

const TenantAuthPage = async (props: PageProps) => {
  const pageParam = await props.params;
  return <TenantAuthTab />;
};

export default TenantAuthPage;
