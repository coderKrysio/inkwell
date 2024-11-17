"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const useFilterBar = ({
    searhtags,
}: {
    searhtags: string[] | undefined;
}) => {
    const [selectedReadTime, setSelectedReadTimes] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searhtags != undefined ? (searhtags as string[]) : []
    );
    const { replace } = useRouter();
    const pathname = usePathname();
    const params = new URLSearchParams(useSearchParams());

    const handleReadTimeToggle = (readTime: string) => {
        if (selectedReadTime.includes(readTime)) {
            setSelectedReadTimes("");
            params.delete("rd");
            replace(`${pathname}?${params.toString()}`);
        } else {
            setSelectedReadTimes((prev) =>
                prev.includes(readTime) ? prev.replace(readTime, "") : readTime
            );
        }
    };

    const handleTagToggle = (tag: string) => {
        if (selectedTags != undefined && selectedTags.includes(tag)) {
            setSelectedTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev]
            );
            params.delete("tag", tag);
            replace(`${pathname}?${params.toString()}`);
        } else {
            setSelectedTags((prev) => [...prev, tag]);
        }
    };

    const clearAllFilters = () => {
        setSelectedReadTimes("");
        setSelectedTags([]);
        params.delete("rd");
        params.delete("tag");
        replace(`${pathname}?${params.toString()}`);
    };

    const hasActiveFilters = selectedReadTime != "" || selectedTags.length != 0;

    return {
        selectedReadTime,
        setSelectedReadTimes,
        selectedTags,
        setSelectedTags,
        handleReadTimeToggle,
        handleTagToggle,
        hasActiveFilters,
        clearAllFilters,
    };
};
