import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 홈은 풀스크린 히어로 한 화면으로만 구성(스크롤 없음).
          실제 상품 목록은 /shop 페이지. */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        <HeroCarousel />

        {/* 모바일 오버레이: 캡션은 좌측 하단, 버튼은 엄지가 자연스럽게 닿는
            우측 하단에 따로 배치(어두운 톤) */}
        <p className="absolute left-6 bottom-4 max-w-[60%] label-caption !text-[var(--color-ink)] sm:hidden">
          Ceramic objects by Daeun Lee
        </p>
        <Link
          href="/shop"
          className="absolute right-6 bottom-5 inline-flex items-center gap-2 bg-[var(--color-ink)] label-caption !text-[var(--color-bg)] px-4 py-2.5 shadow-sm sm:hidden"
        >
          VIEW SHOP <span aria-hidden>→</span>
        </Link>

        {/* sm 이상 오버레이: 은은한 다크 톤 + 중앙 워드마크/카피 */}
        <div className="absolute inset-0 bg-black/20 hidden sm:block" />

        <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center text-center px-8 gap-4 sm:-translate-y-16 lg:-translate-y-20">
          <h1 className="font-wordmark text-white text-7xl lg:text-8xl">
            DeL
          </h1>
          <p className="label-caption !text-white/85">
            CERAMIC OBJECTS BY DAEUN LEE
          </p>
          <div className="w-10 border-t border-white/50 my-1" />
          <Link
            href="/shop"
            className="label-caption !text-white hover:!text-white/80 transition-colors"
          >
            EXPLORE OBJECTS <span aria-hidden>→</span>
          </Link>
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
    </main>
  );
}
