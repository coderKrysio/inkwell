import Link from "next/link";
import Image from "next/image";

export function StaffPicks() {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Staff Picks</h2>
            {/* <div>(Coming soon...)</div> */}
            <div className="flex flex-col gap-5">
                <article className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/banner.jpeg"
                            alt="Medium"
                            className="rounded-sm"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs sm:text-sm">
                            In The Medium Blog
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                            by Medium Staff
                        </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold leading-tight">
                        <Link href="#" className="hover:underline">
                            It happened on Medium in 2024
                        </Link>
                    </h3>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        1d ago
                    </span>
                </article>
                <article className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/banner.jpeg"
                            alt="Medium"
                            className="rounded-sm"
                            width={20}
                            height={20}
                        />
                        <span className="text-xs sm:text-sm">
                            In The Medium Blog
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                            by Scott Lamb
                        </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold leading-tight">
                        <Link href="#" className="hover:underline">
                            Best gifts for writers, from the Medium community
                        </Link>
                    </h3>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        Dec 9
                    </span>
                </article>
            </div>
            <Link
                href="#"
                className="text-sm text-gray-500 font-semibold hover:text-primary"
            >
                See the full list
            </Link>
        </div>
    );
}
