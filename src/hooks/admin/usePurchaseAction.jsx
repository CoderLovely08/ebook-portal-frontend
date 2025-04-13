import { handlePutRequest } from "@/api/common.api";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePurchaseAction = (id) => {
  const queryClient = useQueryClient();
  const { mutate: updatePurchaseStatus, isPending } = useMutation({
    mutationFn: async (status) =>
      handlePutRequest(apiRoutes.PURCHASES.UPDATE_STATUS(id), {
        status,
      }),
    onSuccess: () => {
      toast.success("Purchase status updated successfully");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ALL_PURCHASES],
      });
    },
    onError: () => {
      toast.error("Failed to update purchase status");
    },
  });

  return { updatePurchaseStatus, isPending };
};
