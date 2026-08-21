"use client"

import { createContext, useContext, useState } from "react"

import { setCookie } from "@/lib/cookies"

export type Collapsible = "offcanvas" | "icon" | "none"
export type Variant = "inset" | "sidebar" | "floating"

export const LAYOUT_COLLAPSIBLE_COOKIE_NAME = "layout_collapsible"
export const LAYOUT_VARIANT_COOKIE_NAME = "layout_variant"
const LAYOUT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7일

const DEFAULT_VARIANT: Variant = "inset"
const DEFAULT_COLLAPSIBLE: Collapsible = "icon"

type LayoutContextType = {
  resetLayout: () => void

  defaultCollapsible: Collapsible
  collapsible: Collapsible
  setCollapsible: (collapsible: Collapsible) => void

  defaultVariant: Variant
  variant: Variant
  setVariant: (variant: Variant) => void
}

const LayoutContext = createContext<LayoutContextType | null>(null)

type LayoutProviderProps = {
  children: React.ReactNode
  /**
   * 서버(layout.tsx)에서 쿠키로 읽어 넘긴 초기값.
   * 클라이언트가 렌더 중 쿠키를 읽지 않으므로 새로고침 시 깜빡임이 없다.
   * defaultCollapsible/defaultVariant(리셋 기준값)와는 별개다.
   */
  initialCollapsible?: Collapsible
  initialVariant?: Variant
}

export function LayoutProvider({
  children,
  initialCollapsible,
  initialVariant,
}: LayoutProviderProps) {
  const [collapsible, _setCollapsible] = useState<Collapsible>(
    initialCollapsible ?? DEFAULT_COLLAPSIBLE
  )
  const [variant, _setVariant] = useState<Variant>(
    initialVariant ?? DEFAULT_VARIANT
  )

  const setCollapsible = (newCollapsible: Collapsible) => {
    _setCollapsible(newCollapsible)
    setCookie(
      LAYOUT_COLLAPSIBLE_COOKIE_NAME,
      newCollapsible,
      LAYOUT_COOKIE_MAX_AGE
    )
  }

  const setVariant = (newVariant: Variant) => {
    _setVariant(newVariant)
    setCookie(LAYOUT_VARIANT_COOKIE_NAME, newVariant, LAYOUT_COOKIE_MAX_AGE)
  }

  const resetLayout = () => {
    setCollapsible(DEFAULT_COLLAPSIBLE)
    setVariant(DEFAULT_VARIANT)
  }

  return (
    <LayoutContext
      value={{
        resetLayout,
        defaultCollapsible: DEFAULT_COLLAPSIBLE,
        collapsible,
        setCollapsible,
        defaultVariant: DEFAULT_VARIANT,
        variant,
        setVariant,
      }}
    >
      {children}
    </LayoutContext>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider")
  }
  return context
}
