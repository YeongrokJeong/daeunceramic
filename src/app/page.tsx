import CollectionGrid from "@/components/CollectionGrid";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollToCollectionButton from "@/components/ScrollToCollectionButton";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 모바일: 풀스크린 히어로(헤더가 위에 투명하게 겹쳐짐) + 하단 문구/버튼.
          sm 이상: 대형 풀스크린 히어로 + 중앙 워드마크/카피, 좌측·하단 코너 캡션. */}
      <section className="relative h-[100svh] sm:h-[92vh] w-full overflow-hidden">
        <HeroCarousel />

        {/* 모바일 오버레이: 하단쪽 좌측에 캡션 + 버튼(어두운 톤) */}
        <div className="absolute left-6 bottom-4 flex flex-col items-start gap-4 max-w-[70%] sm:hidden">
          <ScrollToCollectionButton className="inline-flex items-center gap-2 border border-[var(--color-ink)]/60 text-[var(--color-ink)] label-caption !text-[var(--color-ink)] px-4 py-2.5">
            VIEW SHOP <span aria-hidden>→</span>
          </ScrollToCollectionButton>
          <p className="label-caption !text-[var(--color-ink)]">
            Ceramic objects by Daeun Lee
          </p>
        </div>

        {/* sm 이상 오버레이: 은은한 다크 톤 + 중앙 워드마크/카피 */}
        <div className="absolute inset-0 bg-black/20 hidden sm:block" />

        <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center text-center px-8 gap-4 sm:-translate-y-16 lg:-translate-y-20">
          <h1 className="font-display text-white text-7xl lg:text-8xl tracking-wide">
            DeL
          </h1>
          <p className="label-caption !text-white/85">
            CERAMIC OBJECTS BY DAEUN LEE
          </p>
          <div className="w-10 border-t border-white/50 my-1" />
          <ScrollToCollectionButton className="label-caption !text-white hover:!text-white/80 transition-colors">
            EXPLORE OBJECTS <span aria-hidden>→</span>
          </ScrollToCollectionButton>
        </div>

        <p className="hidden sm:block absolute left-8 lg:left-14 top-1/2 -translate-y-1/2 font-display text-white text-base leading-relaxed">
          Clay,
          <br />
          Form,
          <br />
          and Chance.
        </p>

        <span className="hidden sm:block label-caption !text-white/80 absolute right-8 lg:right-14 bottom-8">
          SEOUL, KOREA
        </span>
      </section>

      <section id="collection" className="scroll-mt-20 px-5 sm:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl">SHOP</p>
        <div className="mt-8">
          <CollectionGrid works={works} />
        </div>
      </section>
    </main>
  );
}
