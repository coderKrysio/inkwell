import { BackButton } from "@/components/backbutton";
import { BlogPost } from "@/components/blog/blog-post";
import { CommentSection } from "@/components/blog/comment-section";
import { getPostById } from "@/services/getPostById";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPostById(id);

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
