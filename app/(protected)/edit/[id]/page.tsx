"use client";
import { BackButton } from "@/components/backbutton";
import { FormPost } from "@/components/formpost";
import { FormInputPost } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SubmitHandler } from "react-hook-form";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    const { data: dataPost, isLoading: isLoadingPost } = useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const response = await axios.get(`/api/posts/${id}`);
            return response.data;
        },
    });

    const handleEditPost: SubmitHandler<FormInputPost> = (data) => {
        editPost(data);
    };

    const { mutate: editPost, isPending } = useMutation({
        mutationFn: (newPost: FormInputPost) => {
            return axios.patch(`/api/posts/${id}`, newPost);
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            router.push("/");
            router.refresh();
        },
    });

    if (isLoadingPost) {
        return <div>loading...</div>;
    }

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold text-slate-900">Edit post</h1>
            <FormPost
                submit={handleEditPost}
                isEditing={true}
                initialValue={dataPost}
                isPending={isPending}
            />
        </div>
    );
}
