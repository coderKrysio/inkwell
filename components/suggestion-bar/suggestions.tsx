"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Sample data
const topics = [
    "Self Improvement",
    "Machine Learning",
    "Writing",
    "Relationships",
    "Politics",
    "Productivity",
    "Python",
];

const followSuggestions = [
    {
        name: "Austin Starks",
        bio: "https://nexustrade.io/ Highly technical and ambitious....",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Coinmonks",
        bio: "Coinmonks is a non-profit Crypto Educational...",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Ethan Siegel",
        bio: "The Universe is: Expanding, cooling, and dark. It starts wit...",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

const savedArticles = [
    {
        title: "Jeff Bezos Says the 1-Hour Rule Makes Him Smarter. New Neuroscience Says He's Right",
        author: "Jessica Stillman",
        date: "Oct 30",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        title: "The Benefits of Using Vite Over Create React App for Your Next Project",
        author: "Aman Verma",
        date: "Apr 15, 2023",
        avatar: "/placeholder.svg?height=40&width=40",
    },
];

export const Suggestions = () => {
    return (
        <>
            <div className="bg-blue-200 rounded-xl z-10 flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Writing on Medium</h2>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <div className="font-semibold">New Writer Experience</div>
                    <div className="font-semibold">Expert Reviews</div>
                    <div className="font-semibold">Grow your Audience</div>
                </div>
                <div className="p-2">
                    <Button className="w-full bg-background text-primary hover:bg-primary hover:text-background transition-colors rounded-full">
                        Start writing
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Recommended topics</h3>
                <div className="flex flex-wrap gap-3">
                    {topics.map((topic) => (
                        <Badge
                            key={topic}
                            variant="secondary"
                            className="cursor-pointer hover:bg-gray-100 bg-gray-100 text-gray-700 rounded-full px-3 py-1"
                        >
                            {topic}
                        </Badge>
                    ))}
                </div>
                <a
                    href="#"
                    className="block text-sm text-gray-500 font-semibold hover:text-primary"
                >
                    See more topics
                </a>
            </div>

            <div className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-bold">Who to follow</h3>
                <div className="flex flex-col gap-5">
                    {followSuggestions.map((person) => (
                        <div
                            key={person.name}
                            className="flex items-start justify-between"
                        >
                            <div className="flex gap-3">
                                <img
                                    src={person.avatar}
                                    alt=""
                                    className="h-8 w-8 rounded-full bg-gray-200 object-cover flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[14px] font-medium text-gray-900 leading-5">
                                        {person.name}
                                    </span>
                                    <span className="text-[13px] text-gray-500 leading-5 line-clamp-2 break-words">
                                        {person.bio}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-[30px] px-4 rounded-full border-gray-300 text-gray-700 font-medium text-sm hover:border-primary hover:bg-primary hover:text-background transition-colors"
                            >
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
                <button className="block text-sm text-gray-500 font-semibold hover:text-primary">
                    See more suggestions
                </button>
            </div>

            <div className="flex flex-col items-start gap-3">
                <h3 className="text-lg font-bold">Recently saved</h3>
                <div className="flex flex-col gap-5">
                    {savedArticles.map((article) => (
                        <div
                            key={article.title}
                            className="flex flex-col gap-2 cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={article.avatar}
                                    alt=""
                                    className="h-6 w-6 rounded-full bg-gray-200"
                                />
                                <span className="text-sm">
                                    {article.author}
                                </span>
                            </div>
                            <h3 className="text-base font-bold leading-tight">
                                {article.title}
                            </h3>
                            <span className="text-xs text-gray-500">
                                {article.date}
                            </span>
                        </div>
                    ))}
                </div>
                <a
                    href="#"
                    className="block text-sm text-gray-500 font-semibold hover:text-primary"
                >
                    See all (2)
                </a>
            </div>
        </>
    );
};
