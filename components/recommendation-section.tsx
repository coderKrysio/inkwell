"use client";
import { StaffPicks } from "./staff-picks";
import { CldUploadButton } from "next-cloudinary";

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export const RecommendationSection = () => {
    return (
        <>
            <StaffPicks />

            <div className="flex items-center justify-center ">
                <CldUploadButton
                    options={{
                        multiple: false,
                        singleUploadAutoClose: true,
                        sources: ["local", "google_drive"],
                    }}
                    onSuccess={(result) => {
                        if (
                            typeof result.info === "object" &&
                            "secure_url" in result.info
                        ) {
                            console.log(result.info.secure_url);
                        }
                    }}
                    uploadPreset={cloudPresetName}
                    className="mt-4"
                >
                    <span className="text-lg">Upload Images</span>
                </CldUploadButton>
            </div>
        </>
    );
};
