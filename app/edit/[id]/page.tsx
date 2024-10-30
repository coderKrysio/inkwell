"use client";
import { BackButton } from "@/components/backbutton";
import { FormPost } from "@/components/formpost";
import { FormInputPost } from "@/types";
import { SubmitHandler } from "react-hook-form";

export default function Page() {
    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        console.log(data);
    };
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-slate-900">Edit post</h1>
            <FormPost submit={handleEditPost} isEditing={true} />
        </div>
    );
}
