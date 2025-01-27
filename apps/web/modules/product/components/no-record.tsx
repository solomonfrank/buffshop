import { Button } from "@buff/ui";
import { ROLES } from "_types";
import { HiOutlinePlus } from "react-icons/hi2";
import { useProfileStore } from "store/use-edit";

export const NoRecord = () => {
  const userProfile = useProfileStore((state) => state.userDetails);
  return (
    <div className="flex flex-col items-center gap-[1.8rem]">
      <span>
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.2911 5.30876L28.6206 4.86367C23.8957 3.60475 21.5333 2.97531 19.6721 4.04379C17.8109 5.11227 17.1779 7.46142 15.9119 12.1597L14.1214 18.8041C12.8553 23.5023 12.2223 25.8515 13.2969 27.7021C14.3714 29.5529 16.7339 30.1823 21.4589 31.4412L23.1294 31.8864C27.8543 33.1452 30.2168 33.7747 32.0779 32.7063C33.939 31.6377 34.5722 29.2885 35.8381 24.5903L37.6285 17.9459C38.8947 13.2476 39.5276 10.8984 38.4531 9.04778C37.3786 7.19712 35.0161 6.56766 30.2911 5.30876Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
          />
          <path
            d="M29.9931 13.0078C29.9931 14.4324 28.8316 15.5873 27.3989 15.5873C25.9662 15.5873 24.8047 14.4324 24.8047 13.0078C24.8047 11.5831 25.9662 10.4282 27.3989 10.4282C28.8316 10.4282 29.9931 11.5831 29.9931 13.0078Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
          />
          <path
            d="M21.5 36.656L19.8335 37.1098C15.1196 38.3934 12.7626 39.0353 10.9058 37.9457C9.04905 36.8564 8.41751 34.4611 7.15443 29.6707L5.36819 22.8959C4.10511 18.1055 3.47357 15.7103 4.5456 13.8233C5.47293 12.191 7.5 12.2504 10.125 12.2502"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <h4 className="text-[16px] leading-[16px] text-white">No Record</h4>

      {(userProfile.role === ROLES.SUPERADMIN ||
        userProfile.role === ROLES.ADMIN) && (
        <Button
          href="/app/product-management/create"
          className="rounded-[8px] font-medium text-[12px] leading-[15px] bg-brand-default w-[149px] h-[40px] "
          prefixIcon={<HiOutlinePlus />}
        >
          Add New Product
        </Button>
      )}
    </div>
  );
};
