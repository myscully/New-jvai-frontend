import { cookies } from "next/headers";

import type { Collapsible, Variant } from "@/context/layout-provider";
import { AppShell } from "@/components/layout/app-shell";

/**
 * 사이드바 상태를 서버에서 쿠키로 읽어 셸에 초기값으로 내려준다.
 * 클라이언트가 렌더 중 쿠키를 읽지 않으므로 새로고침 시 깜빡임이 없다.
 * (await cookies() 때문에 이 라우트는 동적 렌더링된다 — 의도된 동작)
 */
export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const store = await cookies();

  return (
    <AppShell
      defaultOpen={store.get("sidebar_state")?.value !== "false"}
      initialCollapsible={
        store.get("layout_collapsible")?.value as Collapsible | undefined
      }
      initialVariant={store.get("layout_variant")?.value as Variant | undefined}
    >
      {children}
    </AppShell>
  );
}
