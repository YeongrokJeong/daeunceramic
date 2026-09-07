import Link from "next/link";

// 레퍼런스의 헤더(로고 + 서브타이틀 + 우측 내비게이션)를 따름.
// ABOUT/PROCESS/CONTACT는 실제 페이지가 생겨서 내비게이션에 포함.
const NAV_LINKS = [
  { href: "/collection", label: "COLLECTION" },
  { href: "/about", label: "ABOUT" },
  { href: "/process", label: "PROCESS" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  return (
    <header className="px-5 sm:px-8 py-5 sm:py-6 max-w-5xl mx-auto w-full border-b border-[var(--color-line)]">
      <div className="flex items-start justify-between">
        <Link href="/" className="leading-none">
          <span className="font-logo text-sm sm:text-base uppercase">
            Daeun Lee
          </span>
          <span className="block label-caption mt-1">CERAMICS / OBJECTS</span>
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-4 gap-y-1 pt-0.5 max-w-[9rem] sm:max-w-none">
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
