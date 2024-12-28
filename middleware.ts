import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default function middleware(req: any) {
    return withAuth(req);
}

export const config = {
    matcher: [
        "/create-new-blog",
        "/profile",
        "/profile/:path*",
        "/edit",
        "/edit/:path*",
    ],
};
