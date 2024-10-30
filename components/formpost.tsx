"use client";
import { FormInputPost } from "@/types";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
}
export const FormPost: FC<FormPostProps> = ({ submit }) => {
    const { register, handleSubmit } = useForm<FormInputPost>();
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

            <select
                {...register("tag", { required: true })}
                defaultValue={""}
                className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
            >
                <option disabled value={""}>
                    Select tags
                </option>
                <option value="javascript">javascript</option>
                <option value="php">php</option>
                <option value="python">python</option>
            </select>

            <button
                type="submit"
                className="py-2 px-7 w-full max-w-lg font-semibold text-lg text-center rounded-xl bg-green-200 hover:text-white hover:bg-green-700 transition-colors"
            >
                Create Post
            </button>
        </form>
    );
};
