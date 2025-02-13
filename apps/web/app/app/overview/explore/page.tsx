import { BreadCrumb } from "../component/breadcrum";
import ProductCategories from "../component/category";
import { FilterProduct } from "../component/filter-product";

const ExploreProduct = () => {
  return (
    <div>
      <BreadCrumb />
      <section className="flex mt-[3.2rem] gap-[2rem]">
        <aside className="w-[25%]">
          <div className="flex flex-col">
            <ProductCategories />
          </div>
        </aside>
        <section className="flex-1">
          <FilterProduct />
        </section>
      </section>
    </div>
  );
};

export default ExploreProduct;
