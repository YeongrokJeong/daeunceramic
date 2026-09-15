"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 레퍼런스의 헤더(로고 + 우측 내비게이션)를 따름.
// 데스크톱/태블릿(sm 이상)에서는 항상 고정된 흰 배경 헤더.
// 모바일 홈 화면에서는 풀스크린 히어로 위에 겹쳐지는 투명 헤더로 동작.
const NAV_LINKS = [
  { href: "/", label: "SHOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={[
        "z-40",
        isHome
          ? "absolute top-0 inset-x-0 bg-transparent border-none"
          : "sticky top-0 bg-[var(--color-bg)] border-b border-[var(--color-line)]",
        "sm:sticky sm:top-0 sm:bg-[var(--color-bg)] sm:border-b sm:border-[var(--color-line)]",
      ].join(" ")}
    >
      <div className="px-5 sm:px-8 py-5 sm:py-6 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="leading-none">
          <Image
            src="/logo.png"
            alt="DeL"
            width={72}
            height={72}
            priority
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
          />
        </Link>
        <nav className="flex gap-x-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-caption hover:text-[var(--color-ink)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
