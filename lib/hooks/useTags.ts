"use client";
import { TagsProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export const useTags = ({
    handleReadTimeToggle,
    handleTagToggle,
}: TagsProps) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleReadTimeChange = useDebouncedCallback((term: string) => {
        handleReadTimeToggle(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("rd", term);
        } else {
            params.delete("rd");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);

    const handleTagsChange = useDebouncedCallback((tag: string) => {
        handleTagToggle(tag);
        const params = new URLSearchParams(searchParams);
        if (params.has("tag")) {
            params.append("tag", tag);
        } else if (tag) {
            params.set("tag", tag);
        } else {
            params.delete("tag");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return { handleReadTimeChange, handleTagsChange };
};
