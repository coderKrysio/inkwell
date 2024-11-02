"use client";
import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
    isPending?: boolean;
    initialValue?: FormInputPost;
}
export const FormPost: FC<FormPostProps> = ({
    submit,
    isEditing,
    isPending,
    initialValue,
}) => {
    const { register, handleSubmit } = useForm<FormInputPost>({
        defaultValues: initialValue,
    });

    //tags
    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await axios.get("/api/tags");
            return response.data;
        },
    });

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col items-center gap-5 my-3"
        >
            <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Blog Title"
                className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
            />

            <textarea
                {...register("content", { required: true })}
                placeholder="Blog Content"
                className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
            ></textarea>
            {isLoadingTags ? (
                "loading..."
            ) : (
                <select
                    {...register("tagId", { required: true })}
                    defaultValue={""}
                    className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
                >
                    <option disabled value={""}>
                        Select tags
                    </option>
                    {dataTags?.map((item: Tag) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            )}

            <button
                type="submit"
                className="py-2 px-7 w-full max-w-lg font-semibold text-lg text-center rounded-xl bg-green-200 hover:text-white hover:bg-green-700 transition-colors"
            >
                {isPending
                    ? "loading..."
                    : (isEditing ? "Update" : "Create") + " Post"}
            </button>
        </form>
    );
};
