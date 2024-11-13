"use client";

import { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { Tag, User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        tag: Tag;
        author: User;
    };
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const { id, title, content, tag, author } = post;
    const readTime = Math.ceil(wordCounter(content) / wordsPerMinute);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    let bannerUrl = "/placeholder.svg?height=200&width=400";

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };
    return (
        <Card className="w-[300px] h-[443.2px] flex flex-col shadow-xl overflow-hidden">
            <CardHeader className="p-0">
                <Image
                    src={"/banner.jpeg"}
                    alt={`Banner for ${title}`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            </CardHeader>
            <CardContent className="p-4 relative">
                <h2 className="text-2xl font-bold mb-2 line-clamp-1">
                    {title}
                </h2>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm text-gray-500">
                        <span>
                            {author.first_name + " " + author.last_name}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{readTime} min read</span>
                    </div>
                    <button
                        onClick={handleLike}
                        className="flex items-center justify-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
                    >
                        <Heart
                            className={`w-4 h-4 ${
                                isLiked
                                    ? "fill-red-700 text-red-700"
                                    : "fill-none"
                            }`}
                        />
                        <span>{likeCount}</span>
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                    {/* {tags.map((tag, index) => ( */}
                    <Badge variant="outline">{tag.name}</Badge>
                    {/* ))} */}
                </div>
                <p className="text-gray-600 line-clamp-2 mb-2">{content}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <Link href={`/blog/${id}`} className="w-full">
                    <Button
                        variant={"outline"}
                        className="w-full hover:text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
