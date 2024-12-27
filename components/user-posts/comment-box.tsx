import { Edit2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";
import { getPostById } from "@/services/getPostById";

export const CommentBox = async ({ comment }: { comment: Comment }) => {
    const { comment_content, post_id, commented_at } = comment;
    const post = await getPostById(post_id);
    return (
        <div className="border-b-[1px] pb-6 last:border-0">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {comment_content}
                </h3>
                <div className="flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Edit comment</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete comment</span>
                    </Button>
                </div>
            </div>
            <p className="mb-2 line-clamp-2">
                <span className="font-semibold text-sm text-muted-foreground">
                    {" "}
                    commented on
                </span>
                <br /> <Link href={`/blog/${post_id}`}>{post?.title}</Link>
            </p>
            <span className="text-sm text-gray-500">
                {formatDistanceToNow(commented_at, {
                    addSuffix: true,
                })}
            </span>
        </div>
    );
};
