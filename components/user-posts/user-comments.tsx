import { getUserComments } from "@/services/getUserComments";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { CommentBox } from "./comment-box";

export const UserComments = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const comments = await getUserComments({ user_id: user?.id });

    return (
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-4 h-full">
            <h2 className="text-2xl font-semibold">Recent Comments</h2>

            {comments.length > 0 ? (
                <div className="w-full">
                    <div className="font-medium text-muted-foreground mb-4">
                        {comments.length} Comment{comments.length > 1 && "s"}{" "}
                        Posted
                    </div>
                    {comments.map((comment) => (
                        <CommentBox
                            key={comment.comment_id}
                            comment={comment}
                        />
                    ))}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg shadow-sm">
                    <div className="mb-4">
                        <PlusCircle className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        No comments added
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Get started by posting your first blog comment!
                    </p>
                    <Link href={"/"}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Explore
                            Blogs
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
