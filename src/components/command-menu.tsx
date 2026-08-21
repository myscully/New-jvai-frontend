"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from "lucide-react"

import { useSearch } from "@/context/search-provider"
import { useTheme } from "@/hooks/use-theme"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { sidebarData } from "./layout/data/sidebar-data"

export function CommandMenu() {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    // radix-vega의 CommandDialog는 children을 <Command>로 감싸지 않으므로 직접 감싼다.
    <CommandDialog
      modal
      open={open}
      onOpenChange={setOpen}
      title="명령 팔레트"
      description="실행할 명령을 검색하세요"
    >
      <Command>
        <CommandInput placeholder="명령어 또는 검색어를 입력하세요..." />
        <CommandList>
          <CommandEmpty>결과가 없습니다.</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url) {
                  // 아직 라우트가 없는 항목은 팔레트에서 제외한다
                  if (navItem.disabled) return null

                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => router.push(navItem.url))
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )
                }

                return navItem.items?.map((subItem, j) => {
                  if (subItem.disabled) return null

                  return (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${j}`}
                      value={`${navItem.title}-${subItem.title}`}
                      onSelect={() => {
                        runCommand(() => router.push(subItem.url))
                      }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title} <ChevronRight /> {subItem.title}
                    </CommandItem>
                  )
                })
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading="테마">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun /> <span>라이트</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="scale-90" />
              <span>다크</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop />
              <span>시스템</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
