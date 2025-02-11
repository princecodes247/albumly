
import { cn } from "@/lib/utils";

export function AppLayout({ children, className = "", isFullscreen = false }: { children: React.ReactNode; className?: string; isFullscreen?: boolean }) {
    return (
        <div className={cn("min-h-screen w-full flex-1 flex gap-8", className)}>

            <section className="flex-1">
                {children}
            </section>

        </div>
    )
}
