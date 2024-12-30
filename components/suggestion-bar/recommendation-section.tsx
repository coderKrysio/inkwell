"use client";
import { StaffPicks } from "./staff-picks";
import { Suggestions } from "./suggestions";

export const RecommendationSection = () => {
    return (
        <div className="w-full h-screen flex flex-col gap-12 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] max-[1024px]:h-auto">
            <StaffPicks />
            <Suggestions />
        </div>
    );
};
