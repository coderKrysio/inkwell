import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import React from "react";

export async function DELETE(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ postId: string }>;
    }
) {
    try {
        const { postId } = await params;
        await db.post.delete({
            where: {
                id: postId,
            },
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { message: "could not delete post" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ postId: string }>;
    }
) {
    try {
        const { postId } = await params;
        const body = await req.json();
        await db.post.update({
            where: {
                id: postId,
            },
            data: {
                title: body.title,
                content: body.content,
                // tagId: body.tagId,
            },
        });
        return NextResponse.json(
            { message: "update success" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "could not update post" },
            { status: 500 }
        );
    }
}

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: Promise<{ postId: string }>;
    }
) {
    try {
        const { postId } = await params;
        const post = await db.post.findFirst({
            where: {
                id: postId,
            },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "could not fetch post" },
            { status: 500 }
        );
    }
}
