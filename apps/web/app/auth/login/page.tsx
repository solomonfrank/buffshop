import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import { Login } from "~/auth/view/login/page";

const LoginPage = ({ params }: PageProps) => {
  return (
    <AuthLayout params={params}>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
