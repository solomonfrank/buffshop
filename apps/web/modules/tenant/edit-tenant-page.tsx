"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetTenants } from "./api/get-tenants";
import { EditTenantForm } from "./components/edit-tenant";

export const EditTenantPage = () => {
  const router = useRouter();
  const { id } = useParams()!;

  const admins = useGetTenants({
    filter: {
      id: `${id}`,
    },
    enabled: true,
  });
  return (
    <div className="w-full">
      <div className="flex items-center gap-[4rem]">
        <span onClick={() => router.back()} className="cursor-pointer">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66602 20H33.3327"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.9993 28.3337C14.9993 28.3337 6.66605 22.1963 6.66602 20.0003C6.666 17.8043 14.9993 11.667 14.9993 11.667"
              stroke="#B8B8B8"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-white text-[2.7rem] leading-[3.2rem] font-bold">
          Edit Tenant Details
        </h3>
      </div>

      <div className="w-1/2 mt-[3.2rem]">
        {admins.isFetching && (
          <div>
            <div>
              <div className="animate-pulse relative h-12 block bg-[#282828] mb-4 w-full"></div>
              <div className="animate-pulse relative h-12 block bg-[#282828] mb-4 w-full"></div>

              <div className="animate-pulse relative h-12 block bg-[#282828] mb-4 w-full"></div>
              <div className="animate-pulse relative h-12 block bg-[#282828] mb-4 w-full"></div>
            </div>
          </div>
        )}
        {!admins.isFetching &&
          admins.data &&
          admins.data.length &&
          admins.data.map((item) => (
            <EditTenantForm key={item.id} details={item} />
          ))}
      </div>
    </div>
  );
};
