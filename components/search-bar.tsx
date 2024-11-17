"use client";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSearchBar } from "@/lib/hooks/useSearchBar";

export const SearchBar = () => {
    const { value, handleChange, handleClear } = useSearchBar();

    return (
        <div className="relative flex-grow min-w-[200px]">
            <Search className="absolute left-2 top-1/2 h-5 w-5 transform -translate-y-1/2 text-gray-400" />
            <Input
                type="text"
                className="pr-10 pl-10"
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                value={value}
                placeholder="Search blog posts..."
            />

            {value && (
                <Button
                    variant="ghost"
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 flex items-center h-full px-2 py-0 hover:bg-transparent"
                >
                    <X className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Clear search</span>
                </Button>
            )}
        </div>
    );
};
