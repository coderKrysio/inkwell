import { FilterBar } from "@/components/filter-bar";
import { PostCard } from "@/components/post-card";
import { getPageInfo } from "@/lib/hooks/getPageInfo";
import { PageProps } from "@/lib/types/types";

export default async function Home({ searchParams }: PageProps) {
    const { posts, resultLength } = await getPageInfo({ searchParams });
    return (
        <div className="w-full flex flex-col gap-4">
            <FilterBar resultLength={resultLength} />
            <div className="flex flex-wrap items-center justify-start gap-14 w-full max-[768px]:justify-center">
                {posts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
