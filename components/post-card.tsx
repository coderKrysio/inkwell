import { Tag } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
interface PostCardProps {
    post: {
        id: string;
        title: string;
        content: string;
        tag: Tag;
    };
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const { id, title, content, tag } = post;
    return (
        <div className="w-[300px] max-h-[200px] border-2 border-slate-200 rounded-xl shadow-xl p-6 flex flex-col gap-2 justify-between">
            <h2 className="text-2xl font-semibold line-clamp-1">{title}</h2>
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
