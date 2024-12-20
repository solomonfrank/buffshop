import Otp from "~/auth/view/otp/page";

import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";

const OtpPage = ({ params }: PageProps) => {
  return (
    <AuthLayout imageSrc="/images/girl.png" params={params}>
      <Otp />
    </AuthLayout>
  );
};

export default OtpPage;
