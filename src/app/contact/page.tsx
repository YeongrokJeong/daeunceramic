import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/contact";

export const metadata = {
  title: "Contact | Daeun Ceramic",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">CONTACT</p>

      <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
        작품 구매, 전시 및 기타 문의는 아래 연락처를 통해 받고 있습니다.
      </p>

      <div className="mt-10 border-t border-[var(--color-line)]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group flex items-center justify-between py-6 border-b border-[var(--color-line)]"
        >
          <div>
            <p className="label-caption">EMAIL</p>
            <p className="font-display text-xl sm:text-2xl mt-1 group-hover:text-[var(--color-ink-soft)] transition-colors">
              {CONTACT_EMAIL}
            </p>
          </div>
          <span className="label-caption shrink-0 ml-4">→</span>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between py-6 border-b border-[var(--color-line)]"
        >
          <div>
            <p className="label-caption">INSTAGRAM</p>
            <p className="font-display text-xl sm:text-2xl mt-1 group-hover:text-[var(--color-ink-soft)] transition-colors">
              {INSTAGRAM_HANDLE}
            </p>
          </div>
          <span className="label-caption shrink-0 ml-4">→</span>
        </a>
      </div>

      <p className="mt-6 text-xs text-[var(--color-ink-soft)] leading-relaxed max-w-md">
        문의 시 원하시는 작품명을 함께 남겨주시면 더 빠르게 답변드려요.
        보통 1~2일 안에 답변드리고 있습니다.
      </p>
    </main>
  );
}
