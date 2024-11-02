"use client";
import { BackButton } from "@/components/backbutton";
import { FormPost } from "@/components/formpost";
import { FormInputPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

export default function Page() {
    const router = useRouter();
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        createPost(data);
    };

    const { mutate: createPost, isPending } = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.post("/api/posts/create", newPost);
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            router.push("/");
            router.refresh();
        },
    });
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-slate-900">Add new post</h1>
            <FormPost
                submit={handleCreatePost}
                isEditing={false}
                isPending={isPending}
            />
        </div>
    );
}
