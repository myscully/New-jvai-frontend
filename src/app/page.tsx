import type { Metadata } from "next";

import { Dashboard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "대시보드 | New JV AI",
  description: "New JV AI Frontend 대시보드",
};

export default function Home() {
  return <Dashboard />;
}
