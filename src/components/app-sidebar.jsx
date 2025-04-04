"use client";

import * as React from "react";
import { Command } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    getAdminNavigation,
    getUserNavigation,
    routes,
    USER_TYPES,
} from "@/utils/app.constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth.slice";

export function AppSidebar({ ...props }) {
    const data = useSelector(selectUser);
    const isAdmin = data.userType.name === USER_TYPES.ADMIN;

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to={routes.CORE.path}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        RapidCircuitry
                                    </span>
                                    <span className="truncate text-xs">
                                        Solutions
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain
                    items={isAdmin ? getAdminNavigation() : getUserNavigation()}
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data} />
            </SidebarFooter>
        </Sidebar>
    );
}
