import Image from "next/image";
import Link from "next/link";
import CollectionGrid from "@/components/CollectionGrid";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 모바일: 풀스크린 히어로(헤더가 위에 투명하게 겹쳐짐) + 하단 문구/버튼.
          sm 이상: 대형 풀스크린 히어로 + 중앙 워드마크/카피, 좌측·하단 코너 캡션. */}
      <section className="relative h-[100svh] sm:h-[92vh] w-full overflow-hidden">
        <Image
          src="/works/banner-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src="/works/banner-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover hidden sm:block"
        />

        {/* 모바일 오버레이: 하단이 어두워지는 그라디언트 + 문구/버튼 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent sm:hidden" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 sm:hidden">
          <p className="label-caption !text-white/80 mb-3">
            Ceramic objects by Daeun Lee
          </p>
          <h1 className="font-display text-white text-2xl leading-snug max-w-xs mb-6">
            형태와 재료 사이에서,
            <br />
            우연한 흐름을 관찰하고 기록합니다.
          </h1>
          <Link
            href="#collection"
            className="inline-flex items-center gap-2 self-start border border-white/70 text-white label-caption !text-white px-4 py-2.5"
          >
            VIEW WORKS <span aria-hidden>→</span>
          </Link>
        </div>

        {/* sm 이상 오버레이: 은은한 다크 톤 + 중앙 워드마크/카피 */}
        <div className="absolute inset-0 bg-black/20 hidden sm:block" />

        <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center text-center px-8 gap-4">
          <h1 className="font-display text-white text-7xl lg:text-8xl tracking-wide">
            DeL
          </h1>
          <p className="label-caption !text-white/85">
            CERAMIC OBJECTS BY DAEUN LEE
          </p>
          <div className="w-10 border-t border-white/50 my-1" />
          <Link
            href="#collection"
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

        <div className="hidden sm:flex items-center gap-3 absolute left-8 lg:left-14 bottom-8">
          <span className="label-caption !text-white/80">01 / 03</span>
          <span className="w-8 border-t border-white/50" />
        </div>
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
