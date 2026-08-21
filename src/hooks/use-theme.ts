"use client"

import { useTheme as useNextTheme } from "next-themes"

export type Theme = "light" | "dark" | "system"

const DEFAULT_THEME: Theme = "system"

/**
 * next-themes를 감싸 shadcn-admin의 useTheme 시그니처
 * (defaultTheme / resetTheme 포함)로 맞춰주는 shim.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme()

  return {
    theme: (theme ?? DEFAULT_THEME) as Theme,
    setTheme: setTheme as (theme: Theme) => void,
    resolvedTheme: (resolvedTheme ?? systemTheme ?? "light") as "light" | "dark",
    defaultTheme: DEFAULT_THEME,
    resetTheme: () => setTheme(DEFAULT_THEME),
  }
}
