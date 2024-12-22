export const dynamic = "force-dynamic";

import { MyPostsTab } from "@/components/mypoststab";
import { Button } from "@/components/ui/button";
import { PenSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 mb-6 space-y-4 sm:space-y-0">
                <h1 className="text-3xl font-bold">My Posts</h1>
                <div className="space-x-4">
                    <Link href={"/create"}>
                        <Button>
                            <PenSquare className="w-4 h-4 mr-2" />
                            Write a Post
                        </Button>
                    </Link>
                    <Link href={"/"}>
                        <Button variant="outline">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Use AI to Write a Post
                        </Button>
                    </Link>
                </div>
            </div>
            <MyPostsTab />
        </div>
    );
}
