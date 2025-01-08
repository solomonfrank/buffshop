"use client";

import { Table } from "@buff/ui";

export const ViewAdmins = () => {
  return (
    <div className="w-full">
      <Table<any>
        isLoading={false}
        thClassName="!text-[12px] !uppercase"
        tdClassName="!text-[14px]"
        columns={[
          {
            title: "tenants",
            field: "tenants",
          },
          { title: "status", field: "status" },
          { title: "emails", field: "email" },
          { title: "last login", field: "lastlogin" },
        ]}
        data={[
          {
            tenants: "Olamide Adebayo",
            status: "Active",
            email: "olamide@buffshop.ng",
            lastlogin: "2024-10-25 14:12:37",
          },
          {
            tenants: "Olamide Adebayo",
            status: "Inactive",
            email: "olamide@buffshop.ng",
            lastlogin: "2024-10-25 14:12:37",
          },
          {
            tenants: "Olamide Adebayo",
            status: "Deactivated",
            email: "olamide@buffshop.ng",
            lastlogin: "2024-10-25 14:12:37",
          },
        ]}
        totalItems={20}
        pageSize={10}
        currentPage={1}
        onPageSizeChange={(size: number) => {}}
        onPageChange={(page: number) => {}}
      />
    </div>
  );
};
