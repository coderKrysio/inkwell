import { z } from "zod";

export const BlogValidations = z.object({
    bannerUrl: z.string().min(1, "Banner image is required"),
    title: z
        .string()
        .min(2, "Title must be at least of 2 characters")
        .max(200, "Title cannot exceed 200 characters"),
    content: z
        .string()
        .min(10, "Content must be at least 10 characters")
        .max(10000, "Content cannot exceed 10000 characters"),
});
