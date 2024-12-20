"use client";
import { AnimatedLoader } from "@/components/animated-loader";
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
    return (
        <div className="my-auto">
            <div className="space-y-4 p-4 flex flex-col items-center">
                <AnimatedLoader
                    width="w-64"
                    height="h-1"
                    backgroundColor="bg-gray-300"
                    loaderColor="bg-green-500"
                    duration={2}
                />
                <h2 className="text-lg font-semibold">Loading...</h2>
            </div>
        </div>
    );
}
