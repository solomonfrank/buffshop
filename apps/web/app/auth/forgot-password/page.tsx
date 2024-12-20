import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import ForgotPassword from "~/auth/view/forgot-password/page";

const ForgotPasswordPage = ({ params }: PageProps) => {
  return (
    <AuthLayout imageSrc="/images/girl2.png" params={params}>
      <ForgotPassword />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
