import type { Metadata, Viewport } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const serif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "이다은 도자기 | 판매예약",
  description:
    "이다은 작가의 도자기 작품을 둘러보고, 마음에 드는 작품을 예약해보세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F0E7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
