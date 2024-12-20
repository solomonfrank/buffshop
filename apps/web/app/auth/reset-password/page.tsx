import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import ResetPassword from "~/auth/view/reset-password/page";

const ResetPasswordPage = ({ params }: PageProps) => {
  return (
    <AuthLayout imageSrc="/images/boy1.png" params={params}>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
