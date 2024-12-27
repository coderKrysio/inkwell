"use client";
import React from "react";

interface AnimatedLoaderProps {
    width?: string;
    height?: string;
    backgroundColor?: string;
    loaderColor?: string;
    duration?: number;
}

export function AnimatedLoader({
    width = "w-full",
    height = "h-2",
    backgroundColor = "bg-gray-200",
    loaderColor = "bg-blue-500",
    duration = 1.0,
}: AnimatedLoaderProps) {
    return (
        <div
            className="inline-block animate-spin rounded-full border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] w-8 h-8 border-4 border-primary"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
}
