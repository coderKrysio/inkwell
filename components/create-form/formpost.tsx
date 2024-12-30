"use client";
import { FormInputPost } from "@/types";
import { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "./image-upload";
import TagSelector from "./tag-selector";
import { BlogValidations } from "@/validators/blog-validations";
import { formatErrorMessages } from "@/services/formatErrorMessages";
import { db } from "@/lib/db";

interface FormPostProps {
    submit: SubmitHandler<FormInputPost>;
    isEditing: boolean;
    isPending?: boolean;
    initialValue?: FormInputPost;
}

export const FormPost: FC<FormPostProps> = ({
    submit,
    isEditing,
    isPending,
    initialValue,
}) => {
    const { register, handleSubmit } = useForm<FormInputPost>({
        defaultValues: initialValue,
    });

    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[] | []>({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await axios
                .get("/api/tags")
                .then((res) => res.data);
            return response;
        },
    });

    const [bannerImage, setBannerImage] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([""]);
    const [errorMessages, setErrorMessages] = useState("");

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("bannerUrl", bannerImage);
        const fields = Object.fromEntries(formData);
        console.log(fields);

        const validation = BlogValidations.safeParse(fields);
        if (!validation.success) {
            // console.log(validation.error.flatten().fieldErrors);
            console.log(
                formatErrorMessages(validation.error.flatten().fieldErrors)
            );
            // await createBlogPost({
            //     title,
            //     description,
            //     bannerImage,
            //     tags: selectedTags,
            // });
            // router.push("/blog"); // Redirect to blog list page after successful creation
        } else {
        }
    };

    return (
        // <form
        //     onSubmit={handleSubmit(submit)}
        //     className="w-full flex flex-col items-center gap-5 my-3"
        // >
        //     <input
        //         type="text"
        //         {...register("title", { required: true })}
        //         placeholder="Blog Title"
        //         className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
        //     />

        //     <textarea
        //         {...register("content", { required: true })}
        //         placeholder="Blog Content"
        //         className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
        //     ></textarea>
        //     {isLoadingTags ? (
        //         "loading..."
        //     ) : (
        //         <select
        //             {...register("tagId", { required: true })}
        //             defaultValue={""}
        //             className="max-w-lg w-full p-3 border border-slate-300 rounded-xl focus:outline-2 focus:outline-slate-300 focus:outline-offset-4"
        //         >
        //             <option disabled value={""}>
        //                 Select tags
        //             </option>
        //             {dataTags?.map((item: Tag) => (
        //                 <option key={item.id} value={item.id}>
        //                     {item.name}
        //                 </option>
        //             ))}
        //         </select>
        //     )}

        //     <button
        //         type="submit"
        //         className="py-2 px-7 w-full max-w-lg font-semibold text-lg text-center rounded-xl bg-green-200 hover:text-white hover:bg-green-700 transition-colors"
        //     >
        //         {isPending
        //             ? "loading..."
        //             : (isEditing ? "Update" : "Create") + " Post"}
        //     </button>
        // </form>
        <form
            // onSubmit={handleSubmit(submit)}
            onSubmit={handleFormSubmit}
            className="max-w-6xl w-full min-h-full mx-auto flex flex-col gap-6"
        >
            <ImageUpload onImageUpload={setBannerImage} />

            <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-lg">
                    Blog Title
                </Label>
                <Textarea
                    id="title"
                    name="title"
                    placeholder="Enter your blog title"
                    required
                    className="h-16 placeholder:text-lg !text-lg resize-none outline-none !ring-0"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="text-lg">
                    Blog Description
                </Label>
                <Textarea
                    id="content"
                    name="content"
                    placeholder="Enter your blog content"
                    required
                    className="h-24 placeholder:text-lg !text-lg resize-none outline-none !ring-0"
                />
            </div>

            {isLoadingTags ? (
                "loading..."
            ) : (
                <TagSelector
                    dataTags={dataTags as Tag[]}
                    selectedTags={selectedTags}
                    onTagsChange={setSelectedTags}
                />
            )}

            <div className="flex gap-4">
                {/* <Button variant={"outline"}>Save in Draft</Button> */}

                <Button>Create Blog Post</Button>
            </div>
        </form>
    );
};
