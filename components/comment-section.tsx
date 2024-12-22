import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Input } from "./ui/input";

interface Comment {
    id: number;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    createdAt: Date;
}

interface CommentSectionProps {
    comments: Comment[];
}

export function CommentSection({
    comments: initialComments,
}: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState("");

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment: Comment = {
                id: comments.length + 1,
                author: {
                    name: "Current User",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content: newComment.trim(),
                createdAt: new Date(),
            };
            setComments([...comments, comment]);
            setNewComment("");
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Comments (439)</h2>
            <form onSubmit={handleSubmitComment} className="mb-8 flex gap-4">
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="mb-2"
                />
                <Button type="submit">Post Comment</Button>
            </form>
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={comment.author.avatar}
                                alt={comment.author.name}
                            />
                            <AvatarFallback>
                                {comment.author.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold">
                                    {comment.author.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(comment.createdAt, {
                                        addSuffix: true,
                                    })}
                                </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
