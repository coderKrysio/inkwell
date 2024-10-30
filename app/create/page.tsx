"use client";
import { FormPost } from "@/components/formpost";
import { FormInputPost } from "@/types";
import { SubmitHandler } from "react-hook-form";

export default function Page() {
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
    };
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-900">Add new post</h1>
            <FormPost submit={handleCreatePost} />
        </div>
    );
}
