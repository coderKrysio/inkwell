import { db } from "@/lib/db";
import { GetUserPostsProps } from "@/types";

export async function getUserAllPosts({
    user_id,
    first_name,
    last_name,
}: GetUserPostsProps) {
    const response = await db.post.findMany({
        where: {
            OR: [
                {
                    author_id: {
                        contains: user_id as string,
                    },
                },
                {
                    author: {
                        first_name: {
                            contains: first_name as string,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    author: {
                        last_name: {
                            contains: last_name as string,
                            mode: "insensitive",
                        },
                    },
                },
                // {
                //     post_type: ''
                // }
            ],
        },
        select: {
            id: true,
            title: true,
            content: true,
            tags: true,
            author: true,
            createdAt: true,
            blog_likes: true,
            banner_url: true,
            bookmarked_blog: true,
            comments: true,
        },
    });
    return response;
}
