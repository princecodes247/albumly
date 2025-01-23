import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { MainNav } from "./main-nav"

export default function SideNav() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col gap-6 border-r bg-background px-4 py-6">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Kadosh Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-xl font-semibold">Kadosh</span>
        </div>
        <MainNav />
        <div className="mt-auto flex flex-col gap-1">
          <Button className="w-full bg-[#494949]" variant="outline">
            Create a Community
          </Button>
          <Button className="w-full flex gap-1 items-center" variant="default">
            Make a Post
            <Plus />
          </Button>
        </div>
        <div className="flex gap-2">
          <div>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>

          </div>
          <div className="flex-1">
            <h4 className="text-sm">Chibueze1234</h4>
            <p className="text-xs">Anonymous browsing</p>
          </div>
          <div>
            <Button variant={"ghost"} size={"icon"}>
              <Settings />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}

