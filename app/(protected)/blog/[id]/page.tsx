import { BackButton } from "@/components/backbutton";
import { BlogPost } from "@/components/blog/blog-post";
import { CommentSection } from "@/components/blog/comment-section";
import { db } from "@/lib/db";

async function getPost(id: string) {
    const response = await db.post.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            tags: true,
            author: true,
            createdAt: true,
            blog_likes: true,
            banner_url: true,
            bookmarked_blog: true,
            comments: true,
        },
    });
    if (response != null) return response;
    return;
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return <div>Post not found!</div>;
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <BackButton />
            <article className="max-w-4xl mx-auto p-4 md:p-2">
                <BlogPost post={post} />
                <CommentSection postId={id} />
            </article>
        </div>
    );
}
