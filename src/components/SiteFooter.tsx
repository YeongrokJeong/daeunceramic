import Link from "next/link";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/contact";

// 레퍼런스 푸터: 브랜드 / 인스타그램·이메일 / 저작권 3분할.
// 연락처는 placeholder — 실제 계정/메일 생기면 lib/contact.ts만 바꾸면 된다.
// 모바일에서는 헤더 내비게이션의 CONTACT와 중복되어 숨기고 데스크톱에서만 표시.
export default function SiteFooter() {
  return (
    <footer className="hidden sm:flex px-5 sm:px-8 py-10 sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-[var(--color-line)]">
      <div>
        <p className="font-logo text-sm uppercase">Daeun Ceramic</p>
        <p className="label-caption mt-1">CERAMICS / OBJECTS</p>
      </div>
      <div className="flex gap-4">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          INSTAGRAM
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          EMAIL
        </a>
        <Link
          href="/contact"
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          CONTACT
        </Link>
      </div>
      <p className="label-caption">© 2026 DAEUN CERAMIC. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
