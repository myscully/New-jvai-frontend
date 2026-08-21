"use client"

import { cn } from "@/lib/utils"
import {
  LayoutProvider,
  type Collapsible,
  type Variant,
} from "@/context/layout-provider"
import { SearchProvider } from "@/context/search-provider"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SkipToMain } from "@/components/skip-to-main"

import { AppSidebar } from "./app-sidebar"

type AppShellProps = {
  children: React.ReactNode
  /** 서버에서 쿠키로 읽어 넘긴 초기값 — 새로고침 시 깜빡임 방지 */
  defaultOpen?: boolean
  initialCollapsible?: Collapsible
  initialVariant?: Variant
}

export function AppShell({
  children,
  defaultOpen = true,
  initialCollapsible,
  initialVariant,
}: AppShellProps) {
  return (
    <SearchProvider>
      <LayoutProvider
        initialCollapsible={initialCollapsible}
        initialVariant={initialVariant}
      >
        <SidebarProvider
          defaultOpen={defaultOpen}
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
            } as React.CSSProperties
          }
        >
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // 컨테이너 쿼리 기준점 — Main의 @7xl/content와 한 쌍
              "@container/content",

              // fixed 레이아웃이면 오버플로우 방지를 위해 높이를 100svh로 고정
              "has-data-[layout=fixed]:h-svh",

              // inset variant는 바깥 여백만큼 빼줘야 한다
              "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]"
            )}
          >
            {children}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
