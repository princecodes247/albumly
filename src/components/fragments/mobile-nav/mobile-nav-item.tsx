"use client";


import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface MobileNavItemProps {
    href: string;
    label: string;
    icon: (props: any) => ReactNode;
    isActive?: boolean;
}

export function MobileNavItem({
    href,
    label,
    icon: Icon,
    isActive,
}: MobileNavItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex-col h-auto py-2 px-1 hover:bg-transparent [&_svg]:size-6",
                isActive ? "text-primary" : "text-gray-500"
            )}
        >
            <Icon className="" />
            <span className="text-xs">{label}</span>
        </Link>
    );
}