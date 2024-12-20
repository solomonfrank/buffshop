import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import ForgotPassword from "~/auth/view/forgot-password/page";

const ForgotPasswordPage = async (props: PageProps) => {
  const pageParam = await props.params;
  return (
    <AuthLayout imageSrc="/images/girl2.png" params={pageParam}>
      <ForgotPassword />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
