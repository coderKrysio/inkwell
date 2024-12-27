"use client";

import * as React from "react";
import Link from "next/link";
import { Pen, Search, Bell, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
    useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const notifications = [
    {
        id: 1,
        title: "Your post was featured!",
        description:
            'Your article "10 Tips for Better Writing" is now featured on the homepage.',
        time: "2 hours ago",
    },
    {
        id: 2,
        title: "New comment",
        description: 'John Doe commented on your post "The Future of AI".',
        time: "5 hours ago",
    },
    {
        id: 3,
        title: "New follower",
        description: "Jane Smith started following you.",
        time: "1 day ago",
    },
];

export const Navbar = () => {
    const { isAuthenticated, getUser } = useKindeBrowserClient();
    const user = getUser();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b">
            <div className="h-14 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="border-none">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </SidebarTrigger>
                    <Separator
                        orientation="vertical"
                        className="w-[1.5px] rounded-full bg-gray-600 h-6"
                    />
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold sm:inline-block">
                            Inkwell
                        </span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                        aria-label="Notifications"
                                    >
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80" align="end">
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <h4 className="font-semibold text-sm">
                                            Notifications
                                        </h4>
                                        <Button variant="ghost" size="sm">
                                            Mark all as read
                                        </Button>
                                    </div>
                                    <ScrollArea className="h-80">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="flex items-start gap-4 p-4 hover:bg-accent"
                                            >
                                                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            notification.description
                                                        }
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                    <div className="border-t pt-2 text-center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href="/notifications">
                                                View all notifications
                                            </Link>
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage
                                                src={
                                                    user?.picture ||
                                                    "https://github.com/shadcn.png"
                                                }
                                                alt="User"
                                            />
                                            <AvatarFallback>
                                                {user?.given_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56 mr-8"
                                    align="end"
                                    forceMount
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user?.given_name +
                                                    " " +
                                                    user?.family_name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/create">New Post</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogoutLink>Log out</LogoutLink>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <LoginLink>
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button size="sm">Sign up</Button>
                            </RegisterLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
