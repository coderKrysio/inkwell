import { filterPostsByReadTime } from "@/services/getAllPosts";
import { PageProps } from "../types/types";

export async function getPageInfo({ searchParams }: PageProps) {
    const search = (await searchParams)?.search as string;
    const rd = parseInt((await searchParams)?.rd as string);
    const posts = await filterPostsByReadTime({ search, rd });
    const resultLength = await posts.length;

    return { posts, resultLength };
}
