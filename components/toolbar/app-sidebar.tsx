"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BookOpen,
    Home,
    PenTool,
    User,
    Settings,
    LogOut,
    PlusCircle,
    CircleUser,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "My Publications", href: "/profile/publications", icon: PenTool },
    { name: "Reading List", href: "/profile/reading-list", icon: BookOpen },
    { name: "Create Post", href: "/create-new-blog", icon: PlusCircle },
];

export const AppSidebar = () => {
    const pathname = usePathname();
    const { isAuthenticated, getUser } = useKindeBrowserClient();
    const user = getUser();

    return (
        <Sidebar collapsible="icon" className="pt-[56px]">
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.picture || ""} alt="User" />

                        <AvatarFallback className="rounded-lg">
                            {isAuthenticated
                                ? user?.given_name?.charAt(0)
                                : "G"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            {isAuthenticated
                                ? user?.given_name + " " + user?.family_name
                                : "Guest"}
                        </span>
                        <span className="truncate text-xs">
                            {isAuthenticated ? user?.username : "Not Signed In"}
                        </span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="pl-2 pr-4">
                <SidebarMenu>
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.name}
                                isActive={pathname === item.href}
                                className="hover:bg-gray-200 data-[active=true]:text-black data-[active=true]:bg-gray-200"
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center"
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <CircleUser className="ml-2 h-4 w-4" />
                            <span>Account</span>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
