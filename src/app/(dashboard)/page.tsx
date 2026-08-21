import type { Metadata } from "next";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ConfigDrawer } from "@/components/config-drawer";
import { DataTable } from "@/components/data-table";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { Search } from "@/components/search";
import { SectionCards } from "@/components/section-cards";
import { ThemeSwitch } from "@/components/theme-switch";

import data from "./data.json";

export const metadata: Metadata = {
  title: "대시보드 | New JV AI",
  description: "New JV AI Frontend 대시보드",
};

export default function Home() {
  return (
    <>
      <Header fixed>
        <h1 className="text-base font-medium">대시보드</h1>
        <div className="ms-auto flex items-center gap-2">
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
        </div>
      </Header>
      {/*
        id="content"는 SkipToMain의 앵커 대상이다.
        SectionCards가 @xl/main·@5xl/main 컨테이너 쿼리를 쓰므로 @container/main을 유지한다.
        SectionCards와 DataTable이 자체 px-4 lg:px-6을 갖고 있어 Main의 px-4는 끈다.
      */}
      <Main
        id="content"
        fluid
        className="@container/main flex flex-col gap-4 px-0 md:gap-6"
      >
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </Main>
    </>
  );
}
