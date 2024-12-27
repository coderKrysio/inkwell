import { BlogCard } from "@/components/blog/blog-card";
import { FilterBar } from "@/components/toolbar/filter-bar";
import { RecommendationSection } from "@/components/suggestion-bar/recommendation-section";
import { TopicsNav } from "@/components/toolbar/topics-nav";
import { getPageInfo } from "@/lib/hooks/getPageInfo";
import { PageProps } from "@/types";

export default async function Home({ searchParams }: PageProps) {
    const { posts, resultLength, tags } = await getPageInfo({ searchParams });

    return (
        <div className="w-full min-h-screen bg-background">
            {/* To Do: Recommendation Bar */}
            {/* <TopicsNav /> */}
            <FilterBar searhtags={tags} resultLength={resultLength} />
            <div className="max-w-7xl h-full container mx-auto mt-4 px-4 max-[640px]:px-2">
                <div className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
                    <main className="">
                        {posts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </main>
                    <aside className="h-full pl-8 border-l max-[1024px]:border-none max-[1024px]:pl-0">
                        <RecommendationSection />
                    </aside>
                </div>
            </div>
        </div>
    );
}
