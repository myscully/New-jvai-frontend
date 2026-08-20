import type { Metadata } from "next";
import "./globals.css";

// 서체는 globals.css에서 Pretendard dynamic subset으로 일괄 로드한다.
export const metadata: Metadata = {
  title: "New JV AI Frontend",
  description: "New JV AI Frontend 배포 확인용 샘플 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full font-sans antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
