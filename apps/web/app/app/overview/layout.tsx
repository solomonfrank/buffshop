import { LayoutProps } from "_types";
import CategoriesNav from "./category-nav";
import { Header } from "./header";

const Layout = async ({ children, params }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Header />
      <CategoriesNav />

      <main className="px-[8rem] py-[3.2rem]">{children}</main>
    </div>
  );
};

export default Layout;
