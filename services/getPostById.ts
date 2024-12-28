import { db } from "@/lib/db";

export async function getPostById(id: string) {
    const response = await db.post.findFirst({
        where: {
            id: id,
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
    if (response != null) return response;
    return;
}
