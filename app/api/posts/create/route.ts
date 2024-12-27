import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const post = await db.post.create({
            data: {
                title: body.title,
                content: body.content,
                author_id: body.authorId,
                banner_url: body.banner_url,
                post_type: body.post_type,
                tags: body.tags,
            },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "could not create post" },
            { status: 500 }
        );
    }
}
