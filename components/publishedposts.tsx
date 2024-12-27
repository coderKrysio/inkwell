import { Button } from "@/components/ui/button";
import { getUserPosts } from "@/lib/hooks/getUserPosts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "./blog/blog-card";

export const PublishedPosts = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const { posts, resultLength } = await getUserPosts({
        user_id: user.id,
        first_name: user.given_name,
        last_name: user.family_name,
    });

    return (
        <div className="w-full flex flex-col gap-4 h-full">
            {resultLength > 0 ? (
                <>
                    <p className="font-medium text-gray-800 mb-4">
                        {resultLength} Blog{resultLength > 1 ? "s" : ""}{" "}
                        Published
                    </p>

                    <div className="space-y-6">
                        {posts.map((post: any) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg shadow-sm">
                    <div className="mb-4">
                        <PlusCircle className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        No blogs published yet
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Get started by creating your first blog post!
                    </p>
                    <Link href={"/create"}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add a new
                            blog post
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
