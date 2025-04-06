import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRoutes, routes } from "@/utils/app.constants";
import { useFetch } from "../common/useFetch";
import { toast } from "react-toastify";
import { handlePostRequest } from "@/api/common.api";
import { registerFormSchema } from "@/schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegister = () => {
    const navigate = useNavigate();

    const registerForm = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        registerUser(data);
    };

    const { mutate: registerUser, isPending: isRegistering } = useMutation({
        mutationFn: async (data) =>
            handlePostRequest(apiRoutes.AUTH.REGISTER, {
                ...data,
                userType: 4,
            }),
        onSuccess: (data) => {
            toast.success("Account created successfully!");
            navigate(routes.AUTH.LOGIN);
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create account");
        },
    });

    return {
        registerForm,
        onSubmit,
        isRegistering,
    };
};
