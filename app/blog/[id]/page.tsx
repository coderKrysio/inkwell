import { BackButton } from "@/components/backbutton";
import { ButtonAction } from "@/components/buttonaction";
import { db } from "@/lib/db";
import React from "react";

async function getPost(id: string) {
    const response = await db.post.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            tag: true,
        },
    });
    return response;
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    return (
        <div className="w-full flex flex-col gap-4">
            <BackButton />
            <h1 className="text-3xl font-bold mt-4 mb-8">{post?.title}</h1>
            <ButtonAction id={id} />
            <p className="bg-black text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full w-fit">
                {post?.tag.name}
            </p>
            <p className="text-slate-700">{post?.content}</p>
        </div>
    );
}
