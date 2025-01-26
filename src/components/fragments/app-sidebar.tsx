import { ChevronDown, Plus, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Icons } from "../icons"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { AppSidebarItem } from "./app-sidebar-item"
import { RecentsSkeleton } from "./recents-skeleton"
import { sidebarNavigationItems } from "@/lib/config/navigation"
import LogoutButton from "./logout-button"

export function AppSidebar() {
  

  return (
    <Sidebar className="">
      <SidebarHeader className="bg-white">

      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">

              {sidebarNavigationItems.map((item) => (
                <AppSidebarItem title={item.title} url={item.url} icon={item.icon} key={item.title} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      
      </SidebarContent>
      <SidebarFooter>
      <LogoutButton/>
      </SidebarFooter>
    </Sidebar>
  )
}
