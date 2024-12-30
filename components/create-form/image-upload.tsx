"use client";

import { useState } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
}

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // const deleteImage = ()=>{
    //     cloudinary.v2.uploader.destroy(public_id, options).then(callback);
    // }

    // const handleUpload = async (e) => {
    //     e.preventDefault()

    //     const formData = new FormData()
    //     formData.append('file', file)
    //     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

    //     try {
    //         const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
    //         const responseData = await response.data

    //         setImageSrc(responseData.secure_url)
    //         setUploadData(responseData)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const onDrop = useCallback(
    //     (acceptedFiles: File[]) => {
    //         const file = acceptedFiles[0];
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewUrl(reader.result as string);
    //             onImageUpload(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     },
    //     [onImageUpload]
    // );

    return (
        <div
            className={`w-full h-[40vh] border-2  rounded-lg flex items-center justify-center cursor-pointer overflow-hidden ${
                previewUrl ? "border-spacing-0" : "border-dashed border-primary"
            }`}
        >
            {previewUrl ? (
                <img
                    src={previewUrl}
                    className="w-full h-full object-cover object-center"
                />
            ) : (
                <CldUploadButton
                    options={{
                        multiple: false,
                        singleUploadAutoClose: true,
                        sources: ["local", "google_drive"],
                    }}
                    onSuccess={(result, { close }) => {
                        if (
                            typeof result.info === "object" &&
                            "secure_url" in result.info
                        ) {
                            setPreviewUrl(result.info.secure_url);
                            onImageUpload(result.info.secure_url);
                        }
                        close();
                    }}
                    uploadPreset={cloudPresetName}
                    className="w-full flex flex-col items-center justify-center text-center gap-2"
                >
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-xl text-gray-600 font-semibold">
                        Drag and drop an image here
                    </p>
                    <p className="font-medium text-gray-400">or</p>
                    <p className="text-xl text-gray-600 flex items-center gap-1 font-semibold">
                        <ImageIcon className="w-6 h-6 mr-2" />
                        Select a file
                    </p>
                </CldUploadButton>
            )}
        </div>
    );
};
