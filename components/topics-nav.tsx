"use client";

import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
    "For you",
    "Following",
    "Money",
    "Psychology",
    "Business",
    "Space",
    "Travel",
    "Science",
];

export function TopicsNav() {
    return (
        <div className="border-b">
            <div className="container flex items-center gap-2 sm:gap-4 px-2 sm:px-4">
                <Button variant="ghost" size="icon" className="shrink-0">
                    <Plus className="h-4 w-4" />
                </Button>
                <ScrollArea className="max-w-[calc(100vw-100px)] sm:max-w-[600px] lg:max-w-none">
                    <div className="flex h-12 sm:h-14 items-center">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href="#"
                                className="flex h-full items-center border-b-2 border-transparent px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors hover:border-foreground whitespace-nowrap"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto shrink-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
