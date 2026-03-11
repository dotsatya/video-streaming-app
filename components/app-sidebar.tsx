"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  ListVideo,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  app: {
    name: "Dot Streaming",
    logo: <ListVideo />,
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [],
    },
    // {
    //   title: "Documentation",
    //   url: "/dashboard/documentation",
    //   icon: <BookOpenIcon />,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "/dashboard/documentation#introduction",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "/dashboard/documentation#get-started",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "/dashboard/documentation#tutorials",
    //     },
    //     {
    //       title: "Api Reference",
    //       url: "/dashboard/documentation#api-reference",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "/dashboard/documentation#changelog",
    //     },
    //   ],
    // },
    {
      title: "Upload here",
      url: "/dashboard/upload",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const userData = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {data.app.logo}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{data.app.name}</span>
            {/* <span className="truncate text-xs">{data.app.plan}</span> */}
          </div>
          {/* <ChevronsUpDownIcon className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
