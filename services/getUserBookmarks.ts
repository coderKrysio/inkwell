import { db } from "@/lib/db";
import { GetUserPostsProps } from "@/types";

export async function getUserBookmarks({ user_id }: GetUserPostsProps) {
    const response = await db.bookmarked_Blog.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            post: true,
        },
    });
    return response;
}
