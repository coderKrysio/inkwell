import { wordCounter, wordsPerMinute } from "@/lib/blog/estimateTime";
import { Tag, User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        tag: Tag;
        author: User;
    };
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const { id, title, content, tag, author } = post;
    const postTime = Math.ceil(wordCounter(content) / wordsPerMinute);
    return (
        <div className="w-[300px] h-[200px] border-2 border-slate-200 rounded-xl shadow-xl p-6 flex flex-col gap-2 justify-between">
            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold line-clamp-1">{title}</h2>
                <span className="text-slate-600">
                    {author.first_name + " " + author.last_name}
                </span>
                <span className="text-slate-600">
                    {postTime} {postTime > 1 ? "mins" : "min"}
                </span>
            </div>
            <p className="line-clamp-3 text-slate-800">{content}</p>
            <div className="flex gap-2 items-center justify-end">
                <p className="bg-black text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full w-fit">
                    {tag.name}
                </p>
                <Link
                    href={`/blog/${id}`}
                    className="text-right hover:underline"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};
