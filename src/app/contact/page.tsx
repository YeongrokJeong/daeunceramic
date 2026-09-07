import WorkImage from "@/components/WorkImage";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/contact";

export const metadata = {
  title: "Contact | 이다은 도자기",
};

export default function ContactPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">CONTACT</p>

      <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
        작품 구매, 전시 및 기타 문의는 아래 연락처를 통해 받고 있습니다.
      </p>

      <div className="mt-8 space-y-4 border-t border-[var(--color-line)] pt-6">
        <div>
          <p className="label-caption">EMAIL</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm hover:text-[var(--color-ink-soft)] transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div>
          <p className="label-caption">INSTAGRAM</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm hover:text-[var(--color-ink-soft)] transition-colors"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>

      <div className="mt-10 aspect-[16/10] overflow-hidden">
        <WorkImage paletteIndex={5} title="" className="h-full w-full" />
      </div>
    </main>
  );
}
