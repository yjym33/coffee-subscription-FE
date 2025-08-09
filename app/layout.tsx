import type React from "react";
/**
 * 앱 전역 레이아웃(App Shell)
 * - 전역 스타일(`app/globals.css`), 폰트, 헤더/푸터, 테마/쿼리 프로바이더를 구성합니다.
 * - 모든 페이지는 여기서 제공하는 컨텍스트(React Query, Theme)를 공유합니다.
 */
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/common/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bean Bliss - Personalized Coffee Subscriptions",
  description:
    "Discover coffee beans tailored to your taste preferences with our personalized subscription service.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
