import { fetchJson, getCookie } from "@vms/lib";
import { API_BASE_URL } from "../config/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalProps } from "@vms/ui";
import { useContext } from "react";
import { ModalContext } from "@vms/ui";

export const manageAccountFn = ({
  tenantId,
  action,
}: {
  tenantId: string;
  action: string;
}) => {
  const token = getCookie("accessToken");
  const requestMethod = action === "delete" ? "DELETE" : "PUT";

  return fetchJson(`${API_BASE_URL}/admin/tenant/${action}/${tenantId}`, {
    method: requestMethod,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useManageAccount = () => {
  const queryClient = useQueryClient();
  const { updateModalAction, openModal } = useContext(
    ModalContext
  ) as ModalProps;

  return useMutation({
    mutationFn: manageAccountFn,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      //   makeQueryClient().invalidateQueries({ queryKey: ["tenants"] });
      openModal();
      updateModalAction(
        data.message
          .toLowerCase()
          .replace(/\s+/g, "-") // Replaces multiple spaces with a single dash
          .replace(/[.]/g, "") // Removes all periods
      );
    },
  });
};
