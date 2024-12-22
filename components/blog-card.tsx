"use client";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Heart } from "lucide-react";
import { Tag, User } from "@prisma/client";
import { FC, useState } from "react";
import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        tag: Tag;
        author: User;
        views: string;
        comments: number;
        bannerUrl: string;
        date: string;
    };
}

export const BlogCard: FC<BlogCardProps> = ({ post }) => {
    const {
        id,
        title,
        content,
        tag,
        author,
        bannerUrl,
        views,
        comments,
        date,
    } = post;
    const readTime = Math.ceil(wordCounter(content) / wordsPerMinute);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    let postImage = "/public/banner.jpeg";
    return (
        <article className="grid grid-cols-1 gap-4 pb-6 border-b-[1px] sm:grid-cols-[1fr_200px] sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src={
                                author.profile_image ||
                                "https://github.com/shadcn.png"
                            }
                            alt="User"
                        />
                        <AvatarFallback>
                            {author.first_name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs sm:text-sm">
                        {author.first_name + " " + author.last_name}
                    </span>
                </div>
                <div>
                    <h2 className="mb-2 text-lg sm:text-xl font-bold leading-tight">
                        <Link
                            href={`/blog/${id}`}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        {content}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {/* {tags.map((tag, index) => ( */}
                    <Badge variant="outline">{tag.name}</Badge>
                    {/* ))} */}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {"24 May"}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {readTime} min read
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        2{views} views
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        3{comments} comments
                    </span>
                    <div className="ml-auto flex gap-2">
                        <button onClick={() => setIsLiked(!isLiked)}>
                            <Heart
                                className={`w-4 h-4 ${
                                    isLiked
                                        ? "fill-red-500 text-red-500"
                                        : "fill-none"
                                }`}
                            />
                        </button>
                        <button onClick={() => setIsBookmarked(!isBookmarked)}>
                            <Bookmark
                                className={`w-4 h-4 ${
                                    isBookmarked
                                        ? "fill-black text-black"
                                        : "fill-none"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Image
                src={"/banner.jpeg"}
                alt=""
                className="w-full h-48 sm:h-auto sm:w-[200px] rounded-lg object-cover"
                width={200}
                height={200}
            />
        </article>
    );
};
