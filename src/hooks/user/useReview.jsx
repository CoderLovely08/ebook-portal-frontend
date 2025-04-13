import { handlePostRequest } from "@/api/common.api";
import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useReview = (bookId, onSuccess) => {
  const queryClient = useQueryClient();
  const { mutate: createReview, isPending } = useMutation({
    mutationFn: (reviewData) =>
      handlePostRequest(apiRoutes.REVIEWS.BASE, {
        bookId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }),

    onSuccess: (data) => {
      toast.success(data.message);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createReview, isPending };
};
