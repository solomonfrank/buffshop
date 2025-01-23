import { AuthLayout } from "@components/layouts/auth-layout";
import { PageProps } from "_types";
import { Login } from "~/auth/view/login/page";

const LoginPage = async (props: PageProps) => {
  const pageParam = await props.params;
  return (
    <AuthLayout params={pageParam}>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
