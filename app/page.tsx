import { PostCard } from "@/components/post-card";
import { db } from "@/lib/db";
import { title } from "process";

async function getPosts() {
    const response = await db.post.findMany({
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

export default async function Home() {
    const posts = await getPosts();
    return (
        <div className="flex flex-wrap items-center justify-start gap-14 w-full max-[768px]:justify-center">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
