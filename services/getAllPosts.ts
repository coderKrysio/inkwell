import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { db } from "@/lib/db";

interface GetPostsProps {
    search?: string;
    tags?: string[];
    rd?: number;
}

async function getFilteredPosts({ search }: GetPostsProps) {
    try {
        const response = await db.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search ?? "",
                            mode: "insensitive",
                        },
                    },
                    {
                        content: {
                            contains: search ?? "",
                            mode: "insensitive",
                        },
                    },
                    {
                        tags: {
                            some: {
                                name: {
                                    contains: search ?? "",
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                    {
                        author: {
                            OR: [
                                {
                                    first_name: {
                                        contains: search ?? "",
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    last_name: {
                                        contains: search ?? "",
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                ],
                AND: {
                    post_type: "PUBLISHED",
                },
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
                post_type: true,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching filtered posts:", error);
        throw new Error("Unable to fetch posts.");
    }
}

export async function filterPostsByReadTime({ search, rd }: GetPostsProps) {
    try {
        const allPosts = await getFilteredPosts({ search });

        const filteredPosts = allPosts.filter((post) => {
            const postReadTime = Math.ceil(
                wordCounter(post.content) / wordsPerMinute
            );
            if (rd === 4) {
                return postReadTime > 0 && postReadTime <= 4;
            } else if (rd === 5) {
                return postReadTime >= 5 && postReadTime < 10;
            } else if (rd === 10) {
                return postReadTime >= 10 && postReadTime < 20;
            } else if (rd === 20) {
                return postReadTime >= 20;
            } else {
                return postReadTime > 0;
            }
        });

        return filteredPosts;
    } catch (error) {
        console.error("Error filtering posts by read time:", error);
        throw new Error("Unable to filter posts by read time.");
    }
}

export async function getPosts({ search, tags, rd }: GetPostsProps) {
    try {
        const postsByReadTime = await filterPostsByReadTime({
            search,
            rd,
        });

        if (tags && tags.length > 0) {
            return postsByReadTime.filter((post) =>
                post.tags.some((tag) =>
                    tags.some(
                        (tagName) =>
                            tag.name.toLowerCase() === tagName.toLowerCase()
                    )
                )
            );
        }

        return postsByReadTime;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Unable to fetch posts.");
    }
}
