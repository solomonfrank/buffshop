import Otp from "~/auth/view/otp/page";

import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";

const OtpPage = async (props: PageProps) => {
  const pageParam = await props.params;
  const query = await props.searchParams;

  const imageUrl =
    query.role === "tenant" ? "/images/tenant.png" : "/images/girl.png";
  return (
    <AuthLayout imageSrc={imageUrl} params={pageParam}>
      <Otp />
    </AuthLayout>
  );
};

export default OtpPage;
