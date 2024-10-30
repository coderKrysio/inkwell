import { PostCard } from "@/components/post-card";

export default function Home() {
    return (
        <div className="flex flex-wrap items-center justify-start gap-14 w-full max-[768px]:justify-center">
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
}
