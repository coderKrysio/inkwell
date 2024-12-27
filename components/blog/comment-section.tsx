import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@prisma/client";
import { PostComments } from "@/types";
import { db } from "@/lib/db";

async function getComments(postId: String) {
    const response = await db.comment.findMany({
        where: {
            post_id: postId as string,
        },
        select: {
            comment_id: true,
            commented_at: true,
            user: true,
            comment_content: true,
        },
    });
    if (response != undefined) return response;
    return;
}

export const CommentSection = async ({ postId }: { postId: String }) => {
    const comments = await getComments(postId);
    // const [comments, setComments] = useState();
    // const [comments, setComments] = useState<Comment[]>();
    // const [newComment, setNewComment] = useState("");

    // const handleSubmitComment = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // if (newComment.trim()) {
    //     //     const comment: Comment = {
    //     //         id: comments.length + 1,
    //     //         author: {
    //     //             name: "Current User",
    //     //             avatar: "/placeholder.svg?height=40&width=40",
    //     //         },
    //     //         content: newComment.trim(),
    //     //         createdAt: new Date(),
    //     //     };
    //     //     setComments([...comments, comment]);
    //     //     setNewComment("");
    //     // }
    // };

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">
                Comments ({comments?.length})
            </h2>
            {/* <form onSubmit={handleSubmitComment} className="mb-8 flex gap-4">
                <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="mb-2"
                />
                <Button type="submit">Post Comment</Button>
            </form> */}
            <div className="space-y-6">
                {comments?.map((comment) => (
                    <div key={comment.comment_id} className="flex space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={comment.user.profile_image || ""}
                                alt={comment.user.first_name}
                            />
                            <AvatarFallback>
                                {comment.user.first_name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold">
                                    {comment.user.first_name +
                                        " " +
                                        comment.user.last_name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(comment.commented_at, {
                                        addSuffix: true,
                                    })}
                                </span>
                            </div>
                            <p className="text-gray-700">
                                {comment.comment_content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
