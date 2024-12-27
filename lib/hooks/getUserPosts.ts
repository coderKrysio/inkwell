import { getUserAllPosts } from "@/services/getUserAllPosts";
import { GetUserPostsProps } from "@/types";

export async function getUserPosts({
    user_id,
    first_name,
    last_name,
    type,
}: GetUserPostsProps) {
    const posts = await getUserAllPosts({
        user_id,
        first_name,
        last_name,
        type,
    });
    const resultLength = await posts.length;

    return { posts, resultLength };
}
