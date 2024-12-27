"use client";
import Link from "next/link";
import Image from "next/image";
import { Bookmark, Heart } from "lucide-react";
import {
    Blog_likes,
    Bookmarked_Blog,
    Comment,
    Tag,
    User,
} from "@prisma/client";
import { FC, useState } from "react";
import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { PostProps } from "@/types";

export const BlogCard = ({ post }: { post: PostProps }) => {
    const {
        id,
        title,
        content,
        tags,
        author,
        banner_url,
        comments,
        createdAt,
        blog_likes,
        bookmarked_blog,
    } = post;
    const { getUser } = useKindeBrowserClient();
    const user = getUser();
    const currentUserId = user?.id;
    const readTime = Math.ceil(wordCounter(content) / wordsPerMinute);

    const isPostLikedFound = blog_likes.find(
        ({ post_id, user_id }) => post_id == id && currentUserId == user_id
    );
    const isPostLiked = typeof isPostLikedFound;
    const [isLiked, setIsLiked] = useState(
        isPostLiked === undefined ? false : true
    );

    const isPostBookmarkedFound = bookmarked_blog.find(
        ({ post_id, user_id }) => post_id == id && currentUserId == user_id
    );
    const isPostBookMarked = typeof isPostBookmarkedFound;
    const [isBookmarked, setIsBookmarked] = useState(
        isPostBookMarked === undefined ? false : true
    );

    const handleLiked = () => {
        // deleteLikedBlog()
        setIsLiked(!isLiked);
    };

    const views = 3;
    return (
        <article className="grid grid-cols-1 gap-4 pb-10 border-b-[1px] sm:grid-cols-[1fr_200px] sm:gap-6 last:border-0">
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
                    {tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {format(new Date(createdAt), "dd MMM")}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {readTime} min read
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        2{views} views
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        {comments.length} comment{comments.length > 1 && "s"}
                    </span>
                    <div className="ml-auto flex gap-2">
                        <button onClick={handleLiked}>
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
            <img
                src={banner_url}
                data-priority
                alt={title}
                className="w-52 h-44 my-auto rounded-lg object-center object-fill"
            />
        </article>
    );
};
