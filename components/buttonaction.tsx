"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ButtonActionProps {
    id: string;
}
export const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
    const router = useRouter();

    const { mutate: deletePost, isPending } = useMutation({
        mutationFn: async () => {
            return axios.delete(`/api/posts/${id}`);
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
        <div className="mb-2 flex gap-4">
            <Link
                href={`/edit/${id}`}
                className="py-2 px-7 bg-slate-300 font-semibold text-lg rounded-xl flex items-center hover:text-white hover:bg-slate-700 transition-colors"
            >
                <Pencil width={18} className="mr-2" />
                Edit
            </Link>
            <button
                onClick={() => deletePost()}
                className="py-2 px-7 bg-red-500 font-semibold text-lg rounded-xl flex items-center text-white hover:bg-red-700 transition-colors"
            >
                {isPending ? (
                    "loading..."
                ) : (
                    <>
                        <Trash width={18} className="mr-2" />
                        Delete
                    </>
                )}
            </button>
        </div>
    );
};
