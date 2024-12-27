import { BlogCard } from "@/components/blog/blog-card";
import { FilterBar } from "@/components/toolbar/filter-bar";
import { RecommendationSection } from "@/components/suggestion-bar/recommendation-section";
import { TopicsNav } from "@/components/toolbar/topics-nav";
import { getPageInfo } from "@/lib/hooks/getPageInfo";
import { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
    const { posts, resultLength, tags } = await getPageInfo({ searchParams });

    return (
        <div className="max-w-6xl w-full min-h-screen bg-background">
            {/* To Do: Recommendation Bar */}
            {/* <TopicsNav /> */}
            <FilterBar searhtags={tags} resultLength={resultLength} />
            <div className="w-full h-full container mx-auto mt-6 max-[640px]:px-2">
                <div className="h-full grid grid-cols-1 gap-16 lg:grid-cols-[1fr_300px]">
                    <main className="flex flex-col gap-10">
                        {posts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </main>
                    <aside className="w-[300px] min-w-full h-full pl-10 border-l max-[1024px]:border-none max-[1024px]:pl-0">
                        <RecommendationSection />
                    </aside>
                </div>
            </div>
        </div>
    );
}
