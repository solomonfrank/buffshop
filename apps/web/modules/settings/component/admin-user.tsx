import { dayjs } from "@buff/lib";
import { Button, Table } from "@buff/ui";
import { useState } from "react";
import { AdminTableProps, useGetAdmins } from "~/super-admin/api/get-admins";

export const AdminSection = () => {
  const [filter, setFilter] = useState({
    currentPage: "1",
    pageSize: "10",
  });
  const admins = useGetAdmins({
    filter: {
      ...filter,
      PageNumber: `${filter.currentPage}`,
      PageSize: `${filter.pageSize}`,
    },
    enabled: true,
  });
  return (
    <div className="bg-[#202020] rounded-[12px] px-[3rem] py-[4rem]">
      <div className="flex gap-[1.8rem] items-center mb-[5rem]">
        <span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0029 2.5H10.0062C6.72443 2.5 5.08355 2.5 3.92039 3.31382C3.49006 3.6149 3.11577 3.98891 2.81445 4.41891C2 5.58116 2 7.22077 2 10.5C2 13.7792 2 15.4188 2.81445 16.5811C3.11577 17.0111 3.49006 17.3851 3.92039 17.6862C5.08355 18.5 6.72443 18.5 10.0062 18.5H14.0093C17.2911 18.5 18.932 18.5 20.0951 17.6862C20.5254 17.3851 20.8997 17.0111 21.2011 16.5811C21.8156 15.7042 21.9663 14.5941 22 13.5"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M18 10.2143V11.5M18 10.2143C16.8432 10.2143 15.8241 9.64608 15.2263 8.78331M18 10.2143C19.1568 10.2143 20.1759 9.64608 20.7737 8.78331M15.2263 8.78331L14.0004 9.57143M15.2263 8.78331C14.8728 8.27304 14.6667 7.65973 14.6667 7C14.6667 6.34035 14.8727 5.72711 15.2262 5.21688M20.7737 8.78331L21.9996 9.57143M20.7737 8.78331C21.1272 8.27304 21.3333 7.65973 21.3333 7C21.3333 6.34035 21.1273 5.72711 20.7738 5.21688M18 3.78571C19.1569 3.78571 20.1761 4.354 20.7738 5.21688M18 3.78571C16.8431 3.78571 15.8239 4.354 15.2262 5.21688M18 3.78571V2.5M20.7738 5.21688L22 4.42857M15.2262 5.21688L14 4.42857"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M11 15.5H13"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M12 18.5V22.5" stroke="#FFBE0A" stroke-width="1.5" />
            <path
              d="M8 22.5H16"
              stroke="#FFBE0A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <h4 className="text-[2rem] leadng-[2.7rem] font-medium">
          User roles and permissions
        </h4>
      </div>

      <div className="w-full">
        <Table<AdminTableProps>
          isLoading={admins.isPending}
          thClassName="!text-[12px] !uppercase !px-[16px]"
          tdClassName="!text-[14px] !px-[16px]"
          showFilter={false}
          columns={[
            {
              title: "admin names",
              field: "name",
            },

            { title: "emails", field: "email" },

            {
              title: "ACTION",
              field: "id",

              Cell: ({ entry }) => (
                <Button
                  size="large"
                  variant="outline"
                  href={`/app/super-admin-management/${entry.id}`}
                  className="bg-transparent border border-[#848484] rounded-[8px] text-[#848484]"
                  prefixIcon={
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6887 4.28191L14.5137 3.45692C15.1972 2.77348 16.3053 2.77348 16.9887 3.45692C17.6721 4.14037 17.6721 5.24844 16.9887 5.93189L16.1637 6.75688M13.6887 4.28191L8.13929 9.83133C7.71636 10.2543 7.41634 10.7842 7.27128 11.3644L6.66797 13.7777L9.08122 13.1743C9.66147 13.0293 10.1913 12.7293 10.6143 12.3063L16.1637 6.75688M13.6887 4.28191L16.1637 6.75688"
                        stroke="#848484"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.8333 11.6947C15.8333 14.4342 15.8333 15.804 15.0767 16.726C14.9382 16.8947 14.7834 17.0495 14.6146 17.188C13.6927 17.9447 12.3228 17.9447 9.58325 17.9447H9.16667C6.02397 17.9447 4.45263 17.9447 3.47632 16.9683C2.50002 15.9921 2.5 14.4207 2.5 11.278V10.8613C2.5 8.12176 2.5 6.75199 3.25662 5.83003C3.39514 5.66124 3.54992 5.50647 3.7187 5.36794C4.64066 4.61133 6.01043 4.61133 8.75 4.61133"
                        stroke="#848484"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  }
                >
                  Modify Permissions
                </Button>
              ),
            },
          ]}
          data={
            admins.data?.map((item) => {
              return {
                id: item.id,
                name: item.name,
                email: item.email,
                status: item.status,
                lastlogin: dayjs(item?.updatedAt).format(
                  "DD MMM, YYYY hh:mm:ssa"
                ),
              };
            }) ?? []
          }
          totalItems={20}
          pageSize={10}
          currentPage={1}
          onPageSizeChange={(size: number) => {}}
          onPageChange={(page: number) => {}}
        />
      </div>
    </div>
  );
};
