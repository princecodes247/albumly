"use client"
import { Button } from "@/components/ui/button";
import { Bell, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { SIDEBAR_WIDTH, SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex py-4 items-center gap-0 border-b bg-white px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex ml-2 sm:ml-0 items-center gap-2"

        style={{
          width: SIDEBAR_WIDTH
          // SIDEBAR_WIDTH_MOBILE
        }}>
        <Icons.logo
          className="h-8 hidden sm:block"
        />
        <Icons.smallLogo
          className="size-10 block sm:hidden"
        />
        {/* <span className="text-xl font-semibold">Kadosh</span> */}
      </div>
      <div className="hidden md:flex flex-[3] pr-8 items-center gap-4">
        
      </div>
      <div className="flex-1 flex gap-2 justify-end">
        <Button
          variant="outline"
          className="hidden md:flex [&_svg]:size-5 md:[&_svg]:size-4"
          size="icon"
          onClick={() => setIsSpinning(prev => !prev)}
        >
          <RotateCcw className={`h-5 w-5 ${isSpinning ? 'animate-spin' : ''}`} />
        </Button>
        <Button variant="outline" className="[&_svg]:size-5 md:[&_svg]:size-4" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
      {/* <UserNav /> */}
    </header>

  )
}

