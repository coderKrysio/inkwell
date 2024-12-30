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

interface TagSelectorProps {
    dataTags: {
        name: string;
        id: string;
    }[];
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
}

export default function TagSelector({
    dataTags,
    selectedTags,
    onTagsChange,
}: TagSelectorProps) {
    const [selectedTag, setSelectedTag] = useState<string>("");

    const handleAddTag = (tag: string) => {
        if (tag && !selectedTags.includes(tag)) {
            onTagsChange([...selectedTags, tag]);
        }
        setSelectedTag("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
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
                    handleAddTag(value);
                }}
                name="tags"
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                    {dataTags
                        .filter((tag) => !selectedTags.includes(tag.name))
                        .map((tag) => (
                            <SelectItem key={tag.id} value={tag.name}>
                                {tag.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map(
                    (tag) =>
                        tag !== "" && (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-sm py-1 px-2"
                            >
                                {tag}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-1 h-auto p-0"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            </Badge>
                        )
                )}
            </div>
        </div>
    );
}
