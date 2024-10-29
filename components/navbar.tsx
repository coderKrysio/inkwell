import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full h-[60px] bg-slate-200 flex items-center justify-between px-8 text-slate-900">
            <Link href={"/"}>
                <h1 className="text-2xl font-bold">Inkwell</h1>
            </Link>
            <Link
                href={"/create"}
                className="py-2 px-7 bg-white font-semibold text-lg rounded-xl flex items-center hover:text-white hover:bg-slate-900 transition-colors"
            >
                Create Post
            </Link>
        </nav>
    );
};
