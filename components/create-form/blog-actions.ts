"use server";
import { db } from "@/lib/db";
import { BlogValidations } from "@/validators/blog-validations";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Tag } from "@prisma/client";
import axios from "axios";

export const saveBlog = async (
    prevState: { error: boolean; success: boolean },
    payload: { formData: FormData; tags: { id: string; name: string }[] }
) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const { formData, tags } = payload;
    const fields = Object.fromEntries(formData) as Record<
        string,
        FormDataEntryValue
    >;
    console.log(fields, tags);

    const validation = BlogValidations.safeParse(fields);

    if (!validation.success) {
        // console.log(validation.error.flatten().fieldErrors);
        return {
            error: true,
            success: false,
            errorDetails: validation.error.flatten().fieldErrors,
        };
    }

    try {
        await db.post.create({
            data: {
                title: validation.data.title,
                content: validation.data.content,
                author_id: user.id,
                banner_url: validation.data.bannerUrl,
                post_type: "PUBLISHED",
                tags: {
                    connect: tags.map((tag) => ({ id: tag.id })),
                },
            },
        });
        return { error: false, success: true };
    } catch (error: any) {
        console.log(error);
        return {
            error: true,
            success: false,
            errorDetails: JSON.stringify(error),
        };
    }
};
