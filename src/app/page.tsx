import InfiniteGallery from "@/components/InfiniteGallery";
import WorkImage from "@/components/WorkImage";
import { works } from "@/lib/works";

export default function Home() {
  const hero = works[0];

  return (
    <main className="flex-1">
      {/* 히어로: 레퍼런스처럼 사진 위에 짧은 헤드라인을 얹는 구성.
          실제 촬영 사진이 없어 플레이스홀더 그라디언트를 대신 씀 —
          실제 사진이 생기면 WorkImage 대신 <img>로 교체하면 된다. */}
      <section className="relative">
        <WorkImage
          paletteIndex={hero.paletteIndex}
          title={hero.title}
          className="h-[62vh] sm:h-[70vh] w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 pb-8 sm:pb-12 max-w-5xl mx-auto">
          <h1 className="font-display text-white text-xl sm:text-3xl leading-[1.5] max-w-md">
            형태와 재료 사이에서
            <br />
            우연한 흐름을 관찰하고
            <br />
            기록합니다.
          </h1>
        </div>
      </section>

      <section className="px-5 sm:px-8 pt-5 pb-10 sm:pb-14 max-w-5xl mx-auto flex items-end justify-between border-b border-[var(--color-line)]">
        <div>
          <p className="font-display text-lg">{hero.title}</p>
          <p className="label-caption mt-1">2026</p>
        </div>
        <p className="label-caption">HANDMADE CERAMICS</p>
      </section>

      <section className="px-5 sm:px-8 pt-10 pb-24 max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between">
          <p className="label-caption">SELECTED WORKS</p>
          <p className="text-sm text-[var(--color-ink-soft)] max-w-[14rem] text-right leading-relaxed hidden sm:block">
            손으로 빚은 도자기 작품들. 구매하기로 신청하시면 작가가 직접
            연락드려요.
          </p>
        </div>
        <div className="mt-6">
          <InfiniteGallery works={works} />
        </div>
      </section>

      <footer className="px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-[var(--color-line)]">
        <div>
          <p className="font-logo text-sm uppercase">Daeun Lee</p>
          <p className="label-caption mt-1">CERAMICS / OBJECTS</p>
        </div>
        <p className="label-caption">© 2026 DAEUN LEE. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
