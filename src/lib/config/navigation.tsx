import { Icons } from "@/components/icons";
import { Home, PlusSquare } from "lucide-react";
// sideMenu items.
export const sidebarNavigationItems = [
  {
    title: "Overview",
    url: "/user",
    icon: <Home/>,
  },
  {
    title: "Albums",
    url: "/user/albums",
    icon: <Home/>,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: <Home/>,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: <Home/>,
  },

]

export const navigationItems = [
  {
    href: "/home",
    label: "Home",
    icon: Icons.chat,
  },
  {
    href: "/community",
    label: "Community",
    icon: Icons.chat,
  },
  {
    href: "/create",
    label: "Create",
    icon: PlusSquare,
  },
  {
    href: "/coming-soon",
    label: "Gems",
    icon: Icons.chat,
  },
  // {
  //   href: "/coming-soon",
  //   label: "On Air",
  //   icon: Icons.onAir,
  // },
] as const;