import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Lora } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import PageTransition from "@/components/PageTransition";
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

// "DeL" 워드마크 전용(Lora, Regular 400 Italic). 한글에는 쓰지 않음.
const wordmark = Lora({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const SITE_URL = "https://daeunceramic.vercel.app";
const SITE_DESCRIPTION =
  "사소한 일상에 특별함을 더하는 핸드메이드 도자기. 다은 세라믹입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daeun Ceramic",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Daeun Ceramic",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Daeun Ceramic",
    // src/app/opengraph-image.jpg 파일을 두면 Next.js가 자동으로 인식해서
    // 아래 images 없이도 og:image를 만들어주지만, 명시적으로 한 번 더
    // 지정해서 카카오톡/문자 미리보기 등에서도 확실히 잡히게 한다.
    images: ["/opengraph-image.jpg"],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daeun Ceramic",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#cdcac4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${sans.variable} ${serif.variable} ${wordmark.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
