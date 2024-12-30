"use client";
import { BackButton } from "@/components/backbutton";
import { FormPost } from "@/components/create-form/formpost";
import { FormInputPost } from "@/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

export default function Page() {
    const router = useRouter();
    const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
        data.authorId = user?.id ?? "";
        createPost(data);
    };

    const { mutate: createPost, isPending } = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.post("/api/posts/create-new-blog", newPost);
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            router.push("/");
            router.refresh();
        },
    });

    const { user } = useKindeBrowserClient();

    return (
        <div className="w-full min-h-screen flex flex-col gap-4 mt-4">
            {/* <BackButton /> */}
            <h1 className="text-3xl font-bold">Add new post</h1>
            <FormPost
                submit={handleCreatePost}
                isEditing={false}
                isPending={isPending}
            />
        </div>
    );
}
