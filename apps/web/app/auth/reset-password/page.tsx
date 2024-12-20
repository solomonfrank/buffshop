import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import ResetPassword from "~/auth/view/reset-password/page";

const ResetPasswordPage = async (props: PageProps) => {
  const pageParam = await props.params;
  return (
    <AuthLayout imageSrc="/images/boy1.png" params={pageParam}>
      <ResetPassword />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
