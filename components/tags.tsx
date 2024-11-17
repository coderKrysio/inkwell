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

import { useFilterBar } from "@/lib/hooks/useFilterBar";
import { useTags } from "@/lib/hooks/useTags";
import { TagsProps } from "@/types";

const tags = [
    "Web Dev",
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
];

export const Tags: FC<TagsProps> = ({
    searhtags,
    handleReadTimeToggle,
    handleTagToggle,
}) => {
    const { handleReadTimeChange, handleTagsChange } = useTags({
        handleReadTimeToggle,
        handleTagToggle,
    });
    const { selectedReadTime } = useFilterBar({
        searhtags,
    });
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
                            checked={false}
                            onCheckedChange={() => handleTagsChange(tag)}
                        >
                            {tag}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
