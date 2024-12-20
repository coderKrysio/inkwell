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
            ],
        },
        select: {
            id: true,
            title: true,
            content: true,
            tag: true,
            author: true,
        },
    });
    return response;
}
