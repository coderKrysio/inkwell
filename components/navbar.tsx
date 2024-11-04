import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

export const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <nav className="fixed top-0 left-0 w-full h-[60px] bg-slate-200 flex items-center justify-between px-8 text-slate-900">
            <Link href={"/"} className="flex gap-2 items-center justify-center">
                <BookOpenCheck />
                <h1 className="text-2xl font-bold">Inkwell</h1>
            </Link>
            <div className="flex items-center justify-center gap-4">
                <Link
                    href={"/create"}
                    className="py-2 px-7 bg-white font-semibold text-lg rounded-xl flex items-center hover:text-white hover:bg-slate-900 transition-colors"
                >
                    Create Post
                </Link>

                {user && (
                    <Avatar>
                        {user?.picture ? (
                            <Image
                                className="rounded-full"
                                src={user?.picture}
                                width={40}
                                height={40}
                                alt={user.given_name + "" + user.family_name}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <AvatarFallback>
                                {user.given_name?.charAt(0) +
                                    "" +
                                    user.family_name?.charAt(0)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                )}
            </div>
        </nav>
    );
};
