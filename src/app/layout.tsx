import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Playfair_Display } from "next/font/google";
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

// "DeL" 워드마크 전용. Noto Serif KR보다 획 대비가 강하고 끝이 뾰족한
// 에디토리얼 세리프라 로고 타이포에 더 잘 맞는다(한글에는 쓰지 않음).
const wordmark = Playfair_Display({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["500", "600"],
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
    <html
      lang="ko"
      className={`${sans.variable} ${serif.variable} ${wordmark.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
