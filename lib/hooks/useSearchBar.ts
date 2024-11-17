"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
export const useSearchBar = () => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search")?.toString());

    const handleChange = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            setValue(term);
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleClear = () => {
        const params = new URLSearchParams(searchParams);
        setValue("");
        params.delete("search");
        replace(`${pathname}?${params.toString()}`);
    };
    return { value, handleChange, handleClear };
};
