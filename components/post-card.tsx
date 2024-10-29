import Link from "next/link";

export const PostCard = () => {
    return (
        <div className="w-[300px] h-[200px] border-2 border-slate-200 rounded-xl shadow-xl p-6 flex flex-col justify-between">
            <h2 className="text-2xl font-semibold line-clamp-1">Card Title</h2>
            <p className="line-clamp-3 text-slate-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                molestiae repellat minus nesciunt modi atque quo nemo, facere
                libero minima quaerat, laboriosam quis sed dolorum ad doloremque
                voluptatibus rem repudiandae!
            </p>
            <Link href={"/blog/1"} className="text-right hover:underline">
                Read More
            </Link>
        </div>
    );
};
