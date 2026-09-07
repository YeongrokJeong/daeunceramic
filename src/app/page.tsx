import InfiniteGallery from "@/components/InfiniteGallery";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 히어로: 레퍼런스처럼 큰 세리프 스테이트먼트 + 여백. 실제 촬영 사진이
          없어 이미지 히어로 대신 타이포그래피만으로 구성 */}
      <section className="px-5 sm:px-8 pt-8 pb-12 sm:pt-16 sm:pb-20 max-w-5xl mx-auto">
        <p className="label-caption">HANDMADE CERAMICS</p>
        <h1 className="font-display text-3xl sm:text-5xl mt-3 leading-[1.3]">
          형태와 재료 사이에서
          <br />
          우연한 흐름을 관찰하고
          <br />
          기록합니다.
        </h1>
        <p className="mt-5 text-sm text-[var(--color-ink-soft)] max-w-sm leading-relaxed">
          손으로 빚은 도자기 작품들입니다. 마음에 드는 작품을 둘러보고
          구매하기로 신청하시면 작가가 직접 연락드려요.
        </p>
      </section>

      <section className="px-5 sm:px-8 pb-24 max-w-5xl mx-auto">
        <p className="label-caption border-t border-[var(--color-line)] pt-4">
          SELECTED WORKS
        </p>
        <div className="mt-6">
          <InfiniteGallery works={works} />
        </div>
      </section>

      <footer className="px-5 sm:px-8 py-10 text-center border-t border-[var(--color-line)]">
        <p className="font-display text-sm">이다은</p>
        <p className="mt-2 label-caption">
          CERAMICS / OBJECTS · © 2026 DAEUN LEE
        </p>
      </footer>
    </main>
  );
}
