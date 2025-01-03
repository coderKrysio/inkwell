"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Tag } from "@prisma/client";

interface TagSelectorProps {
    dataTags: {
        name: string;
        id: string;
    }[];
    selectedTags: Tag[];
    onTagsChange: React.Dispatch<
        React.SetStateAction<
            {
                name: string;
                id: string;
            }[]
        >
    >;
}

export default function TagSelector({
    dataTags,
    selectedTags,
    onTagsChange,
}: TagSelectorProps) {
    const [selectedTag, setSelectedTag] = useState<string>("");

    const handleAddTag = (tag: string, tagId: string) => {
        if (tag && !selectedTags.includes({ name: tag, id: tagId })) {
            onTagsChange([...selectedTags, { name: tag, id: tagId }]);
        }
        setSelectedTag("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onTagsChange(selectedTags.filter((tag) => tag.name !== tagToRemove));
    };

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="tags" className="text-lg">
                Tags
            </Label>
            <Select
                value={selectedTag}
                onValueChange={(value) => {
                    console.log(selectedTag, "selectedTag");
                    setSelectedTag(value);
                    handleAddTag(
                        value,
                        dataTags.find((tag) => tag.name === value)?.id as string
                    );
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                    {dataTags
                        .filter(
                            (tag) =>
                                !selectedTags.includes({
                                    name: tag.name,
                                    id: tag.id,
                                })
                        )
                        .map((tag) => (
                            <SelectItem key={tag.id} value={tag.name}>
                                {tag.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                    <Badge
                        key={tag.id}
                        variant="secondary"
                        className="text-sm py-1 px-2"
                    >
                        {tag.name}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0"
                            onClick={() => handleRemoveTag(tag.name)}
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                        </Button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}
