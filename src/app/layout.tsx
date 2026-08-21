import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// 서체는 globals.css에서 Pretendard dynamic subset으로 일괄 로드한다.
export const metadata: Metadata = {
  title: "New JV AI Frontend",
  description: "New JV AI Frontend 배포 확인용 샘플 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes가 하이드레이션 전에 <html>의 class를 바꾸므로 경고를 억제한다.
    <html
      lang="ko"
      className="h-full font-sans antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 사이드바 등 Tooltip을 쓰는 컴포넌트가 앱 전역에 있으므로 루트에서 감싼다. */}
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
