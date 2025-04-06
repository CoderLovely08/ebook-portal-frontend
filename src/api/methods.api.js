import { apiRoutes, QUERY_KEYS } from "@/utils/app.constants";
import { handleDeleteRequest, handlePostRequest } from "./common.api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const createCategory = () => {
    const queryClient = useQueryClient();

    const func = async (data) =>
        handlePostRequest(apiRoutes.CATEGORIES.BASE, {
            name: data.name,
            description: data.description,
        });

    const onSuccess = (data) => {
        toast.success("Category created successfully");
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CATEGORIES.ALL],
        });
    };

    const onError = (error) => {
        toast.error(error.message || "Something went wrong");
    };

    return { func, onSuccess, onError };
};


export const deleteCategory = () => {
    const queryClient = useQueryClient();

    const func = async (id) =>
        handleDeleteRequest(apiRoutes.CATEGORIES.DELETE(id));

    const onSuccess = () => {
        toast.success("Category deleted successfully");
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CATEGORIES.ALL],
        });
    };

    const onError = (error) => {
        toast.error(error.message || "Something went wrong");
    };

    return { func, onSuccess, onError };
};
