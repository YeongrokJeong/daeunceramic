import Image from "next/image";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/contact";

export const metadata = {
  title: "Contact | Daeun Ceramic",
};

export default function ContactPage() {
  const instagramName = INSTAGRAM_HANDLE.replace(/^@/, "");

  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">CONTACT</p>

      <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
        작품 문의, 전시 문의 등은 아래 연락처를 통해 받고 있습니다.
      </p>

      <div className="mt-10 border-t border-[var(--color-line)]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group flex items-center gap-4 py-6 border-b border-[var(--color-line)]"
        >
          <Image
            src="/icons/email.png"
            alt=""
            width={32}
            height={32}
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="label-caption">EMAIL</p>
            <p className="font-display text-base sm:text-lg mt-1 group-hover:text-[var(--color-ink-soft)] transition-colors">
              {CONTACT_EMAIL}
            </p>
          </div>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 py-6 border-b border-[var(--color-line)]"
        >
          <Image
            src="/icons/instagram.png"
            alt=""
            width={32}
            height={32}
            className="shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="label-caption">INSTAGRAM</p>
            <p className="font-display text-base sm:text-lg mt-1 underline underline-offset-4 decoration-[var(--color-line)] group-hover:text-[var(--color-ink-soft)] transition-colors">
              {instagramName}
            </p>
          </div>
          <span className="label-caption shrink-0">인스타그램 방문하기 →</span>
        </a>
      </div>
    </main>
  );
}
