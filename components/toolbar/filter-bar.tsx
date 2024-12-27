"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "./search-bar";
import { Tags } from "./tags";
import { readTimes } from "@/lib/search";
import { useFilterBar } from "@/lib/hooks/useFilterBar";
import { MobileFilterMenu } from "./mobile-filter-menu";

interface FilterBarProps {
    resultLength: number;
    query?: string;
    searhtags: string[];
}

export const FilterBar = ({ resultLength, searhtags }: FilterBarProps) => {
    const {
        selectedReadTime,
        selectedTags,
        handleReadTimeToggle,
        handleTagToggle,
        hasActiveFilters,
        clearAllFilters,
    } = useFilterBar({ searhtags });
    return (
        <div className="w-full py-2 pt-4">
            <div className="flex flex-wrap items-center gap-2">
                <SearchBar />
                <MobileFilterMenu
                    {...{
                        searhtags,
                        handleReadTimeToggle,
                        handleTagToggle,
                    }}
                />
                <Tags
                    {...{
                        searhtags,
                        handleReadTimeToggle,
                        handleTagToggle,
                    }}
                />
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="text-red-700 border-red-700 hover:text-white hover:bg-red-700 flex items-center justify-center max-[640px]:p-2 max-[640px]:border-none"
                    >
                        <span className="max-[640px]:hidden">
                            Clear Filters
                        </span>
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
            {hasActiveFilters && (
                <p className="mt-2">
                    Showing {resultLength} {resultLength > 1 ? "Posts" : "Post"}
                </p>
            )}
        </div>
    );
};
