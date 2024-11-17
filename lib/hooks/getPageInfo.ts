import { getPosts } from "@/services/getAllPosts";
import { PageProps } from "@/types";

export async function getPageInfo({ searchParams }: PageProps) {
    const search = (await searchParams)?.search as string;
    const rd = parseInt((await searchParams)?.rd as string);
    const tagsList = (await searchParams)?.tag;
    const tags =
        typeof tagsList === "string" ? [tagsList] : (tagsList as string[]);
    const posts = await getPosts({ search, rd, tags });
    const resultLength = await posts.length;

    return { posts, resultLength, tags };
}
