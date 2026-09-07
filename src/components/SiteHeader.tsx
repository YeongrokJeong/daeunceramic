import Link from "next/link";

// 레퍼런스의 헤더(로고 + 우측 내비게이션)를 따름.
const NAV_LINKS = [
  { href: "/collection", label: "COLLECTION" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  return (
    <header className="px-5 sm:px-8 py-5 sm:py-6 max-w-5xl mx-auto w-full border-b border-[var(--color-line)]">
      <div className="flex items-center justify-between">
        <Link href="/" className="leading-none">
          <span className="font-logo text-sm sm:text-base uppercase">
            Daeun Ceramic
          </span>
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
