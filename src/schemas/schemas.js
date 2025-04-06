import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const createBookFormSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            message: "Title is required",
        })
        .min(5, { message: "Title must be at least 5 characters long" }),
    author: z
        .string({
            required_error: "Author is required",
            message: "Author is required",
        })
        .min(3, { message: "Author must be at least 3 characters long" }),
    description: z
        .string({
            required_error: "Description is required",
            message: "Description is required",
        })
        .min(10, {
            message: "Description must be at least 10 characters long",
        }),
    categories: z.array(z.string(), {
        required_error: "Categories are required",
        message: "Categories are required",
    }),
    price: z.coerce.number({
        required_error: "Price is required",
        message: "Price is required",
    }),
    isFree: z.boolean(),
    publishedDate: z.coerce.date({
        required_error: "Published date is required",
        message: "Published date is required",
    }),
    coverImage: z.instanceof(File, {
        message: "Cover image must be a valid file",
    }),
    filePath: z.instanceof(File, {
        message: "Book PDF must be a valid file",
    }),
});
