import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { CartProvider } from "@/hooks/use-cart";

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
        <LanguageProvider>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
