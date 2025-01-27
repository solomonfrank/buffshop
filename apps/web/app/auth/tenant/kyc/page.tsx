import { PageProps } from "_types";
import { KycAuthTab } from "~/tenant/auth/kyc-page";

const KycAuthPage = async (props: PageProps) => {
  return <KycAuthTab />;
};

export default KycAuthPage;
