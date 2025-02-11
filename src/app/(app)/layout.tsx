import { AppSidebar } from "@/components/fragments/app-sidebar"
import Header from "@/components/fragments/header"
import { MobileNav } from "@/components/fragments/mobile-nav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppLayout } from "@/layouts/app-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="h-full relative">
        <SidebarProvider className="border flex-col">

          <div className="relative flex pb-14">

            <AppSidebar />

                <AppLayout>
          <Header />

             <div className="p-6">
               {children}
             </div>
                </AppLayout>

          </div>
          <MobileNav />
        </SidebarProvider>
      </main>
    </>
  )
}
