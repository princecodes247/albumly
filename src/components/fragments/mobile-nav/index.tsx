"use client";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/config/navigation";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { MobileNavItem } from "./mobile-nav-item";

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex bg-background md:hidden">
            <div className="flex flex-1 items-center justify-evenly h-16 px-4">
                {navigationItems.slice(0, 2).map((item) => (
                    <MobileNavItem
                        key={item.href}
                        {...item}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>
            <div className="flex items-center justify-evenly h-16">
                {navigationItems.slice(2, 3).map((_, index) => (
                    <div key={index}>
                        <Button variant={"default"}>
                            <Plus />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center flex-1 justify-evenly h-16 px-4">
                {navigationItems.slice(3).map((item) => (
                    <MobileNavItem
                        key={item.href}
                        {...item}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>
        </nav>
    );
}