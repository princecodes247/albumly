import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"


export function RecentsSkeleton() {
  return (
    <SidebarMenu>
    {Array.from({ length: 2 }).map((_, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuSkeleton />
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
  )
}
