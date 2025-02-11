"use client"
import { Button } from "@/components/ui/button";
import { Bell, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Icons } from "../icons";
import { Input } from "../ui/input";
import { SIDEBAR_WIDTH, SidebarTrigger } from "../ui/sidebar";
import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [isSpinning, setIsSpinning] = useState(false)

  return (
    <header className="sticky top-0 z-50 flex py-4 items-center gap-0 border-b bg-white px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex ml-2 sm:ml-0 items-center gap-2"

        style={{
          width: SIDEBAR_WIDTH
          // SIDEBAR_WIDTH_MOBILE
        }}>
        {/* <Icons.logo
          className="h-8 hidden sm:block"
        />
        <Icons.smallLogo
          className="size-10 block sm:hidden"
        /> */}
      </div>
      <div className="hidden md:flex flex-[3] pr-8 items-center gap-4">
        
      </div>
      <div className="flex-1 flex gap-2 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              authClient.signOut()
              router.push("/")
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

