import { handlePostRequest } from "@/api/common.api";
import { createBookFormSchema } from "@/schemas/schemas";
import { apiRoutes, QUERY_KEYS, routes } from "@/utils/app.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useBook = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const createBookForm = useForm({
        resolver: zodResolver(createBookFormSchema),
        defaultValues: {
            title: "",
            author: "",
            description: "",
            price: 0,
            isFree: false,
            publishedDate: new Date(),
            coverImage: "",
            filePath: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const { mutate: createBookMutation, isPending: isCreatingBook } =
        useMutation({
            mutationFn: (data) => handlePostRequest(apiRoutes.BOOKS.BASE, data),
            onSuccess: () => {
                toast.success("Book created successfully");
                createBookForm.reset();
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.BOOKS.ALL],
                });
                navigate(routes.ADMIN.routes.books.path);
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create book");
            },
        });

    return { createBookForm, onSubmit, isCreatingBook };
};
