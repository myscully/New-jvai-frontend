"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "대시보드",
      url: "#",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "라이프사이클",
      url: "#",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "분석",
      url: "#",
      icon: (
        <ChartBarIcon
        />
      ),
    },
    {
      title: "프로젝트",
      url: "#",
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: "팀",
      url: "#",
      icon: (
        <UsersIcon
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "캡처",
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "진행 중 제안서",
          url: "#",
        },
        {
          title: "보관함",
          url: "#",
        },
      ],
    },
    {
      title: "제안서",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "진행 중 제안서",
          url: "#",
        },
        {
          title: "보관함",
          url: "#",
        },
      ],
    },
    {
      title: "프롬프트",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "진행 중 제안서",
          url: "#",
        },
        {
          title: "보관함",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "설정",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "도움말",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "검색",
      url: "#",
      icon: (
        <SearchIcon
        />
      ),
    },
  ],
  documents: [
    {
      name: "데이터 라이브러리",
      url: "#",
      icon: (
        <DatabaseIcon
        />
      ),
    },
    {
      name: "리포트",
      url: "#",
      icon: (
        <FileChartColumnIcon
        />
      ),
    },
    {
      name: "워드 어시스턴트",
      url: "#",
      icon: (
        <FileIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">JV AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
