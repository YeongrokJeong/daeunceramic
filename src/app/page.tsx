import InfiniteGallery from "@/components/InfiniteGallery";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      <header className="px-3 sm:px-8 pt-4 pb-3 sm:pt-10 sm:pb-6 max-w-5xl mx-auto">
        <h1 className="text-base sm:text-2xl font-normal">이다은 도자기</h1>
        <p className="mt-0.5 text-xs sm:text-sm text-[var(--color-ink-soft)]">
          구매하기로 신청하시면 작가가 직접 연락드려요.
        </p>
      </header>

      <section className="px-3 sm:px-8 pb-24 max-w-5xl mx-auto">
        <InfiniteGallery works={works} />
      </section>

      <footer className="px-5 sm:px-8 py-8 text-center text-xs text-[var(--color-ink-soft)] border-t border-[var(--color-line)]">
        <p>이다은 도자기 · 판매예약 페이지</p>
        <p className="mt-1">예약 신청 후 순차적으로 연락드립니다.</p>
      </footer>
    </main>
  );
}
