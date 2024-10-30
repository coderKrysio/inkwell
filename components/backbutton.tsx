"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const BackButton = () => {
    const router = useRouter();
    return (
        <button
            className="flex gap-2 items-center hover:underline"
            onClick={() => router.back()}
        >
            <ChevronLeft width={18} />
            Back
        </button>
    );
};
