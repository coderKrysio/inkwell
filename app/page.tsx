import { BlogCard } from "@/components/blog-card";
import { FilterBar } from "@/components/filter-bar";
import { PostCard } from "@/components/post-card";
import { RecommendationSection } from "@/components/recommendation-section";
import { TopicsNav } from "@/components/topics-nav";
import { getPageInfo } from "@/lib/hooks/getPageInfo";
import { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
    const { posts, resultLength, tags } = await getPageInfo({ searchParams });

    return (
        // <div className="w-full flex flex-col gap-4">
        //     <FilterBar searhtags={tags} resultLength={resultLength} />
        //     <div className="flex flex-wrap items-center justify-start gap-14 w-full max-[768px]:justify-center">
        //         {posts.map((post: any) => (
        //             <PostCard key={post.id} post={post} />
        //         ))}
        //     </div>
        // </div>

        <div className="w-full min-h-screen bg-background">
            <TopicsNav />
            <FilterBar searhtags={tags} resultLength={resultLength} />
            <div className="container px-4  md:py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
                    <main className="space-y-6">
                        {posts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </main>
                    <aside className="space-y-6">
                        <RecommendationSection />
                    </aside>
                </div>
            </div>
        </div>
    );
}
