import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ButtonAction = () => {
    return (
        <div className="mb-2 flex gap-4">
            <Link
                href={"/edit/1"}
                className="py-2 px-7 bg-slate-300 font-semibold text-lg rounded-xl flex items-center hover:text-white hover:bg-slate-700 transition-colors"
            >
                <Pencil width={18} className="mr-2" />
                Edit
            </Link>
            <button className="py-2 px-7 bg-red-500 font-semibold text-lg rounded-xl flex items-center text-white hover:bg-red-700 transition-colors">
                <Trash width={18} className="mr-2" />
                Delete
            </button>
        </div>
    );
};
