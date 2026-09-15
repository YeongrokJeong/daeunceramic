"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 레퍼런스의 헤더(로고 + 우측 내비게이션)를 따름.
// 로고 크기/위치는 모든 페이지에서 동일(항상 full-bleed 좌측 정렬, 큰 사이즈).
// 홈 화면에서는(모바일/PC 모두) 풀스크린 히어로 위에 겹쳐지는 투명 헤더로 동작:
//   - 모바일: 히어로 상단이 밝아서 로고/텍스트를 어두운 톤 그대로 사용
//   - PC: 헤더 뒤에 은은한 어두운 그라디언트를 깔고 로고/텍스트를 흰색으로 반전
// 그 외 페이지에서는 항상 고정된 흰 배경 헤더(로고/텍스트는 어두운 톤 고정).
const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/works", label: "WORKS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={
        isHome
          ? "z-40 absolute top-0 inset-x-0 bg-transparent border-none sm:bg-gradient-to-b sm:from-black/40 sm:to-transparent"
          : "z-40 sticky top-0 bg-[var(--color-bg)] border-b border-[var(--color-line)]"
      }
    >
      <div className="px-5 sm:px-8 lg:px-14 py-5 sm:py-6 w-full flex items-center justify-between">
        <Link href="/" className="leading-none">
          <Image
            src="/logo.png"
            alt="DeL"
            width={96}
            height={96}
            priority
            className={
              isHome
                ? "h-8 w-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain sm:invert"
                : "h-8 w-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16 object-contain"
            }
          />
        </Link>
        <nav className="flex gap-x-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isHome
                  ? "label-caption transition-colors !text-[var(--color-ink)] hover:opacity-70 sm:!text-white/85 sm:hover:!text-white"
                  : "label-caption transition-colors !text-[var(--color-ink)] hover:opacity-70"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
