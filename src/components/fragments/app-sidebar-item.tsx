"use client"
import {
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { cn, compareRoutes } from "@/lib/utils";
import { Dot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebarItem({ title, url, icon }: { title: string; url: string; icon: React.ReactNode }) {
    const currentUrl = usePathname()
    return (

        <SidebarMenuItem key={title} className={cn(
            "flex items-center gap-3 px-3 py-1 rounded-lg",
            compareRoutes(url, currentUrl) ? "bg-secondary" : "hover:bg-secondary"
        )}>
            <SidebarMenuButton asChild>
                <Link href={url} className={
                    cn(
                        "font-medium text-lg",
                        compareRoutes(url, currentUrl) ? "text-black" : "text-gray-500"
                    )
                }>
                    {icon}
                    <span>{title}</span>
                </Link>

            </SidebarMenuButton>
            {compareRoutes(url, currentUrl) && <span className="ml-auto -mr-3 text-4xl">
                <Dot className="size-8"/>
                </span>}
        </SidebarMenuItem>
    )
}
