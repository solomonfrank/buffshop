import Otp from "~/auth/view/otp/page";

import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";

const OtpPage = async (props: PageProps) => {
  const pageParam = await props.params;
  return (
    <AuthLayout imageSrc="/images/girl.png" params={pageParam}>
      <Otp />
    </AuthLayout>
  );
};

export default OtpPage;
