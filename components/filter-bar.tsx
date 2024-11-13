"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SearchBar } from "./search-bar";
import { Tags } from "./tags";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { readTimes } from "@/lib/search";

interface FilterBarProps {
    resultLength: number;
    query?: string;
}

export const FilterBar = ({ resultLength }: FilterBarProps) => {
    const [selectedReadTime, setSelectedReadTimes] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
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
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearAllFilters = () => {
        setSelectedReadTimes("");
        setSelectedTags([]);
        params.delete("rd");
        replace(`${pathname}?${params.toString()}`);
    };

    const hasActiveFilters = selectedReadTime != "" || selectedTags.length > 0;

    return (
        <div className="w-full py-2">
            <div className="flex flex-wrap items-center gap-2">
                <SearchBar />
                <Select>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="likes">Most Likes</SelectItem>
                        <SelectItem value="readTime">Read Time</SelectItem>
                    </SelectContent>
                </Select>
                <Tags
                    {...{
                        selectedReadTime,
                        selectedTags,
                        handleTagToggle,
                        handleReadTimeToggle,
                    }}
                />
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="text-red-700 border-red-700 hover:text-white hover:bg-red-700 flex items-center justify-center"
                    >
                        Clear Filters{" "}
                        <X strokeWidth={2.5} className="h-4 w-4" />
                    </Button>
                )}
            </div>
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {readTimes.map(
                        ({ name, value }, id) =>
                            value === selectedReadTime && (
                                <Badge
                                    key={id}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => handleReadTimeToggle(value)}
                                >
                                    {name}
                                    <X className="ml-1 h-3 w-3" />
                                </Badge>
                            )
                    )}
                    {selectedTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => handleTagToggle(tag)}
                        >
                            {tag} <X className="ml-1 h-3 w-3" />
                        </Badge>
                    ))}
                </div>
            )}
            <p className="mt-2">
                Showing {resultLength} {resultLength > 1 ? "Posts" : "Post"}
            </p>
        </div>
    );
};
