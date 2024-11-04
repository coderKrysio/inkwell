import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { getUser, isAuthenticated } = getKindeServerSession();
        const user = await getUser();
        const isAuth = await isAuthenticated();

        if (!isAuth) {
            redirect("/");
        }

        if (user != null) {
            console.log(user);

            let existingUser = await db.user.findUnique({
                where: {
                    id: user.id,
                },
            });
            if (existingUser != null) {
                redirect("/");
            } else {
                existingUser = await db.user.create({
                    data: {
                        id: user.id,
                        first_name: user.given_name ?? "",
                        last_name: user.family_name ?? "",
                        email: user.email ?? "",
                        profile_image: user.picture ?? "",
                    },
                });
            }
        }

        return NextResponse.json(
            { data: user, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "could not create user" },
            { status: 500 }
        );
    }
}
