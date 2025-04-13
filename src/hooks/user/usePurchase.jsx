import { handlePostRequest } from "@/api/common.api";
import { apiRoutes } from "@/utils/app.constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePurchase = (bookId) => {
  const { mutateAsync: purchaseBook, isPending } = useMutation({
    mutationFn: async () =>
      handlePostRequest(apiRoutes.PURCHASES.CREATE, {
        bookId,
      }),
    onSuccess: () => {
      toast.success("Purchase successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { purchaseBook, isPending };
};
