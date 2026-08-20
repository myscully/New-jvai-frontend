"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Activity,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  ClipboardList,
  Columns3,
  Database,
  FileText,
  Folder,
  GalleryVerticalEnd,
  Home,
  LayoutDashboard,
  LoaderCircle,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* -------------------------------------------------------------------------- */
/*                                    데이터                                    */
/* -------------------------------------------------------------------------- */

const NAV_MAIN = [
  { title: "홈", icon: Home },
  { title: "대시보드", icon: LayoutDashboard, active: true },
  { title: "라이프사이클", icon: Activity },
  { title: "분석", icon: BarChart3 },
  { title: "프로젝트", icon: Folder },
  { title: "팀", icon: Users },
];

const NAV_DOCUMENTS = [
  { title: "데이터 라이브러리", icon: Database },
  { title: "리포트", icon: ClipboardList },
  { title: "워드 어시스턴트", icon: Sparkles },
];

const SUMMARY_CARDS = [
  {
    label: "총 매출",
    value: "$1,250.00",
    delta: "+12.5%",
    trend: "up" as const,
    headline: "이번 달 상승세",
    caption: "최근 6개월 방문자 기준",
  },
  {
    label: "신규 고객",
    value: "1,234",
    delta: "-20%",
    trend: "down" as const,
    headline: "이번 기간 20% 감소",
    caption: "고객 확보 전략 점검 필요",
  },
  {
    label: "활성 계정",
    value: "45,678",
    delta: "+12.5%",
    trend: "up" as const,
    headline: "높은 사용자 유지율",
    caption: "참여도가 목표를 상회",
  },
  {
    label: "성장률",
    value: "4.5%",
    delta: "+4.5%",
    trend: "up" as const,
    headline: "꾸준한 성과 증가",
    caption: "성장 목표에 부합",
  },
];

// 시드 없이 결정적으로 생성 — 서버/클라이언트 렌더 결과가 항상 일치해야 하므로
// Math.random()이나 현재 시각을 쓰지 않는다.
const CHART_BASE_DATE = new Date(Date.UTC(2026, 2, 1));

const CHART_DATA = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(CHART_BASE_DATE);
  date.setUTCDate(date.getUTCDate() + i);
  const wave = Math.sin(i / 6) * 120 + Math.sin(i / 2.3) * 60;
  return {
    date: date.toISOString().slice(0, 10),
    desktop: Math.round(430 + wave + (i % 7) * 18),
    mobile: Math.round(270 + wave * 0.6 + (i % 5) * 26),
  };
});

const CHART_CONFIG = {
  visitors: { label: "방문자" },
  desktop: { label: "데스크톱", color: "var(--chart-1)" },
  mobile: { label: "모바일", color: "var(--chart-2)" },
} satisfies ChartConfig;

const RANGES = [
  { value: "90d", label: "최근 3개월", days: 90 },
  { value: "30d", label: "최근 30일", days: 30 },
  { value: "7d", label: "최근 7일", days: 7 },
];

type SectionRow = {
  header: string;
  type: string;
  status: "완료" | "진행 중";
  target: number;
  limit: number;
  reviewer: string;
};

const SECTION_ROWS: SectionRow[] = [
  { header: "표지", type: "Cover page", status: "진행 중", target: 18, limit: 5, reviewer: "Eddie Lake" },
  { header: "목차", type: "Table of contents", status: "완료", target: 29, limit: 24, reviewer: "Eddie Lake" },
  { header: "요약", type: "Narrative", status: "완료", target: 10, limit: 13, reviewer: "Eddie Lake" },
  { header: "기술 접근", type: "Narrative", status: "완료", target: 27, limit: 23, reviewer: "Jamik Tashpulatov" },
  { header: "디자인", type: "Narrative", status: "진행 중", target: 2, limit: 16, reviewer: "Jamik Tashpulatov" },
  { header: "역량", type: "Narrative", status: "진행 중", target: 20, limit: 8, reviewer: "Jamik Tashpulatov" },
  { header: "기존 시스템 연동", type: "Narrative", status: "진행 중", target: 19, limit: 21, reviewer: "Jamik Tashpulatov" },
];

const TABS = [
  { value: "outline", label: "개요" },
  { value: "performance", label: "지난 성과" },
  { value: "personnel", label: "주요 인원" },
  { value: "documents", label: "중점 문서" },
];

/* -------------------------------------------------------------------------- */
/*                                    조각들                                    */
/* -------------------------------------------------------------------------- */

function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-background lg:flex">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        <span className="text-sm font-semibold">JV AI</span>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-3">
        <div className="flex flex-col gap-1">
          {NAV_MAIN.map((item) => (
            <button
              key={item.title}
              type="button"
              className={cn(
                "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                item.active
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.title}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="px-2 text-xs font-medium text-muted-foreground">문서</span>
          {NAV_DOCUMENTS.map((item) => (
            <button
              key={item.title}
              type="button"
              className="flex h-8 items-center gap-2 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.title}
            </button>
          ))}
        </div>
      </nav>
      <Separator />
      <div className="flex items-center gap-2 p-3">
        <Avatar className="size-8">
          <AvatarFallback>JV</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium">JV Admin</span>
          <span className="truncate text-xs text-muted-foreground">admin@jvai.co</span>
        </div>
        <Button variant="ghost" size="icon-xs" aria-label="계정 메뉴">
          <MoreHorizontal />
        </Button>
      </div>
    </aside>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 md:px-6">
      <h1 className="text-base font-medium">문서</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="검색" className="h-8 w-40 pl-8 md:w-56" />
        </div>
        <Button variant="ghost" size="icon" aria-label="알림">
          <Bell />
        </Button>
        <Avatar className="size-8 lg:hidden">
          <AvatarFallback>JV</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {SUMMARY_CARDS.map((card) => {
        const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <Card key={card.label}>
            <CardHeader>
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="size-3" />
                  {card.delta}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="flex items-center gap-1.5 font-medium">
                {card.headline}
                <TrendIcon className="size-4" />
              </div>
              <span className="text-muted-foreground">{card.caption}</span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

/** "2026-03-05" → "3월 5일" (locale API를 쓰지 않아 하이드레이션 불일치가 없다) */
function formatDate(value: string) {
  const [, month, day] = value.split("-");
  return `${Number(month)}월 ${Number(day)}일`;
}

function VisitorsChart() {
  const [range, setRange] = React.useState("90d");

  const data = React.useMemo(() => {
    const days = RANGES.find((r) => r.value === range)?.days ?? 90;
    return CHART_DATA.slice(-days);
  }, [range]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 방문자</CardTitle>
        <CardDescription>
          {RANGES.find((r) => r.value === range)?.label} 방문자 추이
        </CardDescription>
        <CardAction>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-36" size="sm" aria-label="기간 선택">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CHART_CONFIG} className="aspect-auto h-[250px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDate}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(label) => formatDate(String(label))}
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              stackId="a"
              stroke="var(--color-mobile)"
              fill="url(#fillMobile)"
            />
            <Area
              dataKey="desktop"
              type="natural"
              stackId="a"
              stroke="var(--color-desktop)"
              fill="url(#fillDesktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: SectionRow["status"] }) {
  const done = status === "완료";
  return (
    <Badge variant="outline" className="gap-1.5">
      {done ? (
        <CircleCheck className="size-3 text-emerald-500" />
      ) : (
        <LoaderCircle className="size-3 text-muted-foreground" />
      )}
      {status}
    </Badge>
  );
}

function SectionsTable() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">목표</TableHead>
            <TableHead className="text-right">한도</TableHead>
            <TableHead>검토자</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {SECTION_ROWS.map((row) => (
            <TableRow key={row.header}>
              <TableCell className="font-medium">{row.header}</TableCell>
              <TableCell>
                <Badge variant="ghost">{row.type}</Badge>
              </TableCell>
              <TableCell>
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="text-right tabular-nums">{row.target}</TableCell>
              <TableCell className="text-right tabular-nums">{row.limit}</TableCell>
              <TableCell className="text-muted-foreground">{row.reviewer}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs" aria-label={`${row.header} 메뉴`}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>수정</DropdownMenuItem>
                    <DropdownMenuItem>복제</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyTab({ label }: { label: string }) {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-center">
      <FileText className="size-6 text-muted-foreground" />
      <p className="text-sm font-medium">{label} 데이터가 없습니다</p>
      <p className="text-sm text-muted-foreground">
        연동이 완료되면 이 영역에 표시됩니다.
      </p>
    </div>
  );
}

function SectionsPanel() {
  return (
    <Tabs defaultValue="outline" className="gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Columns3 />
            <span className="hidden sm:inline">열 표시</span>
          </Button>
          <Button size="sm">
            <Plus />
            <span className="hidden sm:inline">섹션 추가</span>
          </Button>
        </div>
      </div>

      <TabsContent value="outline" className="flex flex-col gap-3">
        <SectionsTable />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>총 {SECTION_ROWS.length}개 행</span>
          <div className="flex items-center gap-2">
            <span>1 / 1 페이지</span>
            <Button variant="outline" size="icon-xs" disabled aria-label="첫 페이지">
              <ChevronsLeft />
            </Button>
            <Button variant="outline" size="icon-xs" disabled aria-label="이전 페이지">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon-xs" disabled aria-label="다음 페이지">
              <ChevronRight />
            </Button>
            <Button variant="outline" size="icon-xs" disabled aria-label="마지막 페이지">
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </TabsContent>

      {TABS.filter((tab) => tab.value !== "outline").map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <EmptyTab label={tab.label} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   대시보드                                   */
/* -------------------------------------------------------------------------- */

export function Dashboard() {
  return (
    <div className="flex flex-1 bg-muted/30">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <SectionCards />
          <VisitorsChart />
          <SectionsPanel />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
