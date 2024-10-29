import { PostCard } from "@/components/post-card";

export default function Home() {
    return (
        <main className="flex items-start justify-center w-full min-h-screen p-14 pt-[92px]">
            <div className="flex flex-wrap items-center justify-start gap-14 w-full">
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </main>
    );
}
