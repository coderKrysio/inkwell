import { db } from "@/lib/db";
import { GetUserPostsProps } from "@/types";

export async function getUserComments({ user_id }: GetUserPostsProps) {
    const response = await db.comment.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            comment_id: true,
            comment_content: true,
            commented_at: true,
            post_id: true,
            user_id: true,
        },
    });
    return response;
}
