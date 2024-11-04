"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const { mutate: createPost } = useMutation({
        mutationFn: () => {
            return axios.post("/api/user");
        },
        onError: (error) => {
            console.error(error);
        },
        onSuccess: () => {
            router.push("/");
            router.refresh();
        },
    });
    useEffect(() => {
        createPost();
    }, []);
}
