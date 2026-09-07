import InfiniteGallery from "@/components/InfiniteGallery";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      <header className="px-5 sm:px-8 pt-12 pb-8 sm:pt-20 sm:pb-12 max-w-5xl mx-auto text-center">
        <p className="text-sm tracking-[0.2em] text-[var(--color-ink-soft)] uppercase">
          Da-eun Ceramic
        </p>
        <h1 className="font-display text-3xl sm:text-5xl mt-3 leading-tight">
          이다은 도자기
        </h1>
        <p className="mt-4 text-[var(--color-ink-soft)] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          손으로 빚은 그릇과 화병들입니다. 마음에 드는 작품을 둘러보고
          <br className="hidden sm:block" />
          &lsquo;예약하기&rsquo;로 신청해주시면 직접 연락드릴게요.
        </p>
      </header>

      <section className="px-5 sm:px-8 pb-24 max-w-5xl mx-auto">
        <InfiniteGallery works={works} />
      </section>

      <footer className="px-5 sm:px-8 py-8 text-center text-xs text-[var(--color-ink-soft)] border-t border-[var(--color-line)]">
        <p>이다은 도자기 · 판매예약 페이지</p>
        <p className="mt-1">예약 신청 후 순차적으로 연락드립니다.</p>
      </footer>
    </main>
  );
}
