import Image from "next/image";
import Link from "next/link";
import CollectionGrid from "@/components/CollectionGrid";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 모바일: 풀스크린 히어로(헤더가 위에 투명하게 겹쳐짐) + 하단 문구/버튼.
          sm 이상: 기존의 작은 배너 스트립. */}
      <section className="relative h-[100svh] sm:h-[23vh] w-full overflow-hidden">
        <Image
          src="/works/banner-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover sm:hidden"
        />
        <Image
          src="/works/banner.jpg"
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

        {/* sm 이상 기존 오버레이 */}
        <div className="absolute inset-0 bg-black/35 hidden sm:block" />
        <div className="absolute inset-0 hidden sm:flex items-center px-5 sm:px-8 max-w-5xl mx-auto">
          <h1 className="font-display text-white text-sm sm:text-lg leading-snug max-w-md">
            형태와 재료 사이에서,
            <br />
            우연한 흐름을 관찰하고 기록합니다.
          </h1>
        </div>
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
