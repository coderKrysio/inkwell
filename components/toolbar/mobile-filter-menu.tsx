import { Clock, Filter, Hash, SlidersHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { FC, useState } from "react";
import { TagsProps } from "@/types";
import { useTags } from "@/lib/hooks/useTags";
import { readTimes } from "@/lib/search";

const tags = [
    "Web Dev",
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
];

export const MobileFilterMenu: FC<TagsProps> = ({
    handleReadTimeToggle,
    handleTagToggle,
}) => {
    const { handleReadTimeChange, handleTagsChange } = useTags({
        handleReadTimeToggle,
        handleTagToggle,
    });
    const [openSub, setOpenSub] = useState<string | null>(null);

    return (
        <div className="hidden max-[640px]:block relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-background/50"
                    >
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Open filter menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                        Filters
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub
                            open={openSub === "sort"}
                            onOpenChange={(open) =>
                                setOpenSub(open ? "sort" : null)
                            }
                        >
                            <DropdownMenuSubTrigger className="cursor-pointer">
                                <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Sort by</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent
                                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                                    alignOffset={100}
                                    sideOffset={-180}
                                >
                                    <DropdownMenuItem className="cursor-pointer">
                                        Most Recent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Most Popular
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Most Discussed
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub
                            open={openSub === "read"}
                            onOpenChange={(open) =>
                                setOpenSub(open ? "read" : null)
                            }
                        >
                            <DropdownMenuSubTrigger className="cursor-pointer">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Read Time</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent
                                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                                    alignOffset={100}
                                    sideOffset={-180}
                                >
                                    {readTimes.map(({ name, value }, id) => (
                                        <DropdownMenuItem
                                            key={id}
                                            textValue={value}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleReadTimeChange(value)
                                            }
                                            defaultChecked={value == "10"}
                                        >
                                            {name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSub
                            open={openSub === "tags"}
                            onOpenChange={(open) =>
                                setOpenSub(open ? "tags" : null)
                            }
                        >
                            <DropdownMenuSubTrigger className="cursor-pointer">
                                <Hash className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>Tags</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent
                                    className="w-[var(--radix-dropdown-menu-trigger-width)]"
                                    alignOffset={100}
                                    sideOffset={-180}
                                >
                                    {tags.map((tag, id) => (
                                        <DropdownMenuItem
                                            key={id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleTagsChange(tag)
                                            }
                                        >
                                            {tag}
                                        </DropdownMenuItem>
                                    ))}

                                    <DropdownMenuItem className="cursor-pointer">
                                        Design
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Development
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        Business
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
