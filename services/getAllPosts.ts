import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { db } from "@/lib/db";

interface GetPostsProps {
    search?: string;
    tags?: string[];
    rd?: number;
}

async function getFilteredPosts({ search }: GetPostsProps) {
    const response = await db.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    tag: {
                        name: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    author: {
                        first_name: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    author: {
                        last_name: {
                            contains: search as string,
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

export async function filterPostsByReadTime({
    search,
    tags,
    rd,
}: GetPostsProps) {
    const allPosts = await getFilteredPosts({ search, tags });

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
}

export async function getPosts({ search, tags, rd }: GetPostsProps) {
    const allPosts = await filterPostsByReadTime({ search, tags, rd });
    const filteredPosts = allPosts.filter((post) => {
        if (tags !== undefined) {
            return tags.some(
                (tagName) =>
                    post.tag.name.toLowerCase() === tagName.toLowerCase()
            );
        } else {
            return post.tag.name;
        }
    });

    return filteredPosts;
}
