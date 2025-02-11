import { Icons } from "@/components/icons";
import { Home, PlusSquare, LayoutGrid, UserCircle, Settings } from "lucide-react";
import { IconHome, IconHome2, IconLayoutGrid, IconSettings, IconUserCircle } from '@tabler/icons-react';

export const sidebarNavigationItems = [
  {
    title: "Overview",
    url: "/user",
    icon: <IconHome className="size-5" />,
  },
  {
    title: "Albums",
    url: "/user/albums",
    icon: <IconLayoutGrid className="size-5" />,
  },
  {
    title: "Billing",
    url: "/user/billing",
    icon: <IconUserCircle className="size-5" />,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: <IconSettings className="size-5" />,
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