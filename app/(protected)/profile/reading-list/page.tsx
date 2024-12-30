import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { getUserBookmarks } from "@/services/getUserBookmarks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookmarkPlus, Link, PlusCircle } from "lucide-react";

export default async function Page() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const bookmarks = await getUserBookmarks({ user_id: user.id });
    const bookmarksLength = bookmarks.length;
    return (
        <div className="container flex flex-col gap-4 pt-4">
            <h1 className="text-3xl font-bold">Reading List</h1>
            {bookmarksLength > 0 ? (
                <>
                    <p className="font-medium text-muted-foreground mb-4">
                        {bookmarksLength} Blog
                        {bookmarksLength > 1 ? "s" : ""} added to the reading
                        list
                    </p>

                    <div className="flex flex-col gap-10">
                        {/* {bookmarks.map((post: any) =>
                            
                                // <BlogCard key={post.id} post={post} />
                            
                        )} */}
                    </div>
                </>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg shadow-sm">
                    <div className="mb-4">
                        <BookmarkPlus className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        No blogs bookmarked yet
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Get started by creating your first blog post!
                    </p>
                    <Link href={"/"}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Bookmark a blog
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
