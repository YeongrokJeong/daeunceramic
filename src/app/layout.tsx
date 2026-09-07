import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "./globals.css";

const sans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const serif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Daeun Ceramic",
  description: "사소한 일상에 특별함을 더하는 핸드메이드 도자기. 다은 세라믹입니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
