import { handleGetRequest } from "@/api/common.api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetch = (url, queryKey, staleTime = 30000) => {
  const {
    data: responseData,
    error: responseError,
    isLoading: responseIsLoading,
    isSuccess: responseIsSuccess,
    isError: responseIsError,
    isFetched: responseIsFetched,
  } = useQuery({
    queryKey: [queryKey],
    staleTime,
    queryFn: async () => handleGetRequest(url),
  });

  if (responseIsError) {
    toast.error(responseError?.message);
  }

  return {
    responseData: responseData?.data,
    responseError: responseError?.message,
    responseIsLoading,
    responseIsSuccess,
    responseIsError,
    responseIsFetched,
  };
};
