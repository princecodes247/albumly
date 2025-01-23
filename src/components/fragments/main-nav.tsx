import Link from "next/link"
import { Home, Users, Gem, Radio } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex flex-col space-y-4", className)} {...props}>
      <Link href="/">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Homepage
        </Button>
      </Link>
      <Link href="/communities">
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Communities
        </Button>
      </Link>
      <Link href="/gems">
        <Button variant="ghost" className="w-full justify-start">
          <Gem className="mr-2 h-4 w-4" />
          Gems
        </Button>
      </Link>
      <Link href="/on-air">
        <Button variant="ghost" className="w-full justify-start">
          <Radio className="mr-2 h-4 w-4" />
          On Air
        </Button>
      </Link>
    </nav>
  )
}

