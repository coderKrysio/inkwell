"use client";
import React, { FC } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { readTimes } from "@/lib/search";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const tags = [
    "Web Dev",
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
];

interface TagsProps {
    selectedReadTime: string;
    selectedTags: string[];
    handleTagToggle: (tag: string) => void;
    handleReadTimeToggle: (readTime: string) => void;
}

export const Tags: FC<TagsProps> = ({
    selectedReadTime,
    selectedTags,
    handleTagToggle,
    handleReadTimeToggle,
}) => {
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
    }, 300);

    return (
        <>
            <Select
                onValueChange={handleReadTimeChange}
                value={selectedReadTime === "" ? "" : selectedReadTime}
            >
                <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Read Time" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Filter by Read Time</SelectLabel>
                        {readTimes.map(({ name, value }, id) => (
                            <SelectItem key={id} value={value}>
                                {name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        Tags <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {tags.map((tag) => (
                        <DropdownMenuCheckboxItem
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => handleTagToggle(tag)}
                        >
                            {tag}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
