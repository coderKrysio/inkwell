"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
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
import { CommentSection } from "./comment-section";

interface Comment {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    createdAt: Date;
}

interface BlogPostProps {
    title: string;
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    publishedAt: Date;
    estimatedReadTime: number;
    bannerImage: string;
    onEdit: () => void;
    onDelete: () => void;
    comments: Comment[];
}

export function BlogPost() {
    //     {
    //     title,
    //     content,
    //     author,
    //     publishedAt,
    //     estimatedReadTime,
    //     bannerImage,
    //     onEdit,
    //     onDelete,
    //     comments,
    // }: BlogPostProps
    const samplePost = {
        title: "The Future of Web Development: Trends to Watch in 2024",
        content: `
          <p>As we approach 2024, the landscape of web development continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, reshaping how we build and interact with web applications. In this post, we'll explore some of the most exciting trends that are set to dominate the web development scene in the coming year.</p>
      
          <h2>1. AI-Powered Development Tools</h2>
          <p>Artificial Intelligence is no longer just a buzzword; it's becoming an integral part of the development process. From AI-assisted coding to automated testing and debugging, developers are leveraging machine learning algorithms to streamline their workflows and boost productivity.</p>
      
          <h2>2. WebAssembly and the Rise of Browser-Based Applications</h2>
          <p>WebAssembly (Wasm) is gaining traction, allowing developers to run high-performance applications directly in the browser. This technology is blurring the lines between web and native applications, opening up new possibilities for complex, browser-based software.</p>
      
          <h2>3. Progressive Web Apps (PWAs) 2.0</h2>
          <p>PWAs have been around for a while, but they're evolving. The next generation of PWAs will offer even more native-like experiences, with improved offline capabilities, better performance, and deeper integration with device features.</p>
      
          <h2>4. Serverless Architecture and Edge Computing</h2>
          <p>Serverless computing continues to grow in popularity, and we're seeing a shift towards edge computing. This combination allows for reduced latency, improved performance, and more efficient resource utilization.</p>
      
          <h2>5. Web3 and Decentralized Applications</h2>
          <p>The concept of Web3 and decentralized applications built on blockchain technology is gaining momentum. We can expect to see more integration of cryptocurrencies, NFTs, and decentralized finance (DeFi) features in web applications.</p>
      
          <p>As we look ahead to 2024, these trends represent just a fraction of the innovations shaping the future of web development. Staying informed and adaptable will be key for developers looking to thrive in this ever-changing landscape.</p>
        `,
        author: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        publishedAt: new Date("2023-12-15T10:00:00Z"),
        estimatedReadTime: 5,
        bannerImage: "/placeholder.svg?height=400&width=800",
        comments: [
            {
                id: 1,
                author: {
                    name: "Jane Doe",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content:
                    "Great article! I'm particularly excited about the advancements in AI-powered development tools.",
                createdAt: new Date("2023-12-16T14:30:00Z"),
            },
            {
                id: 2,
                author: {
                    name: "John Smith",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content:
                    "WebAssembly is definitely a game-changer. I've been experimenting with it and the performance gains are impressive.",
                createdAt: new Date("2023-12-17T09:15:00Z"),
            },
        ],
    };
    const {
        title,
        author,
        bannerImage,
        comments,
        content,
        publishedAt,
        estimatedReadTime,
    } = samplePost;
    const [claps, setClaps] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

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
        <article className="max-w-4xl mx-auto p-4">
            <div className="relative w-full h-[40vh] mb-8">
                <img
                    src={"/banner.jpeg"}
                    alt={`Banner image for ${title}`}
                    style={{ objectFit: "cover" }}
                    className="border w-full h-full rounded-2xl"
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
                                src={author.avatar}
                                alt={author.name}
                            />
                            <AvatarFallback>
                                {author.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{author.name}</p>
                            <p className="text-sm text-gray-500">
                                {formatDistanceToNow(publishedAt, {
                                    addSuffix: true,
                                })}{" "}
                                · {estimatedReadTime} min read
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
                        <span>17.3K</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-5 w-5" />
                        <span>429</span>
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

            <Separator className="my-8" />

            <CommentSection comments={comments} />
        </article>
    );
}
