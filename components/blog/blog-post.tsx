"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    CloudIcon as ClapIcon,
    ShareIcon,
    EditIcon,
    TrashIcon,
    Share2,
    MoreHorizontal,
    MessageCircleMore,
    MessageCircle,
    BookmarkPlus,
} from "lucide-react";
import { Bookmark, BookmarkCheck, Heart } from "lucide-react";
import { PostProps } from "@/types";
import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const BlogPost = ({ post }: { post: PostProps }) => {
    const {
        id,
        title,
        author,
        banner_url,
        content,
        createdAt,
        comments,
        blog_likes,
        tags,
        bookmarked_blog,
    } = post;

    const readTime = Math.ceil(wordCounter(post.content) / wordsPerMinute);
    const [claps, setClaps] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const { user, isAuthenticated } = useKindeBrowserClient();

    const handleClap = () => {
        setClaps((prevClaps) => prevClaps + 1);
    };

    const handleShare = () => {
        // Implement share functionality
        console.log("Share button clicked");
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };
    const handleEdit = () => {
        console.log("Edit button clicked");
    };

    const handleDelete = () => {
        console.log("Delete button clicked");
    };
    return (
        <>
            <div className="relative w-full h-[40vh] mb-8">
                <img
                    data-priority
                    src={banner_url}
                    alt={`Banner image for ${title}`}
                    className="border w-full h-full rounded-2xl object-cover object-center"
                />
            </div>
            <header className="mb-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl font-bold">{title}</h1>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={author.profile_image || ""}
                                alt={author.first_name}
                            />
                            <AvatarFallback>
                                {author.first_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">
                                {author.first_name + " " + author.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {format(new Date(createdAt), "dd MMM")} ·{" "}
                                {readTime} min read
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleEdit}
                        >
                            <EditIcon className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>
            <div className="flex items-center justify-between py-4 border-y mb-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isLiked ? "fill-red-500 text-red-500" : ""
                            }`}
                        />
                        <span>{blog_likes.length}</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-5 w-5" />
                        <span>{comments.length}</span>
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBookmark}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        {isBookmarked ? (
                            <Bookmark className="w-5 h-5 fill-current" />
                        ) : (
                            <BookmarkPlus className="h-5 w-5" />
                        )}
                    </button>
                    <button className="text-muted-foreground hover:text-foreground">
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <footer className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isLiked ? "fill-red-500 text-red-500" : ""
                            }`}
                        />
                        <span>17.3K</span>
                    </button>

                    <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-5 w-5" />
                        <span>429</span>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleBookmark}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        {isBookmarked ? (
                            <Bookmark className="w-5 h-5 fill-current" />
                        ) : (
                            <BookmarkPlus className="h-5 w-5" />
                        )}
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
            </footer>

            <Separator className="my-3" />
        </>
    );
};
