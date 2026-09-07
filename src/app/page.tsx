import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import WorkImage from "@/components/WorkImage";
import { works } from "@/lib/works";

const SELECTED_COUNT = 4;

export default function Home() {
  const hero = works[0];
  const selected = works.slice(0, SELECTED_COUNT);
  const objectsWork =
    works.find((w) => w.category === "OBJECTS") ?? works[works.length - 1];

  return (
    <main className="flex-1">
      {/* 히어로: 레퍼런스처럼 사진 위에 짧은 헤드라인을 얹는 구성. */}
      <section className="relative">
        <WorkImage
          paletteIndex={hero.paletteIndex}
          title={hero.title}
          image={hero.image}
          fit="cover"
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
        <Link
          href={`/works/${hero.slug}`}
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          VIEW PROJECT →
        </Link>
      </section>

      <section className="px-5 sm:px-8 pt-10 pb-16 max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between">
          <p className="label-caption">SELECTED WORKS</p>
          <Link
            href="/collection"
            className="label-caption hover:text-[var(--color-ink)] transition-colors"
          >
            SEE ALL →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8 sm:gap-x-6">
          {selected.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 max-w-5xl mx-auto border-t border-[var(--color-line)] grid sm:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="relative aspect-square overflow-hidden order-2 sm:order-1">
          <WorkImage
            paletteIndex={objectsWork.paletteIndex}
            title={objectsWork.title}
            image={objectsWork.image}
            className="h-full w-full"
          />
        </div>
        <div className="order-1 sm:order-2">
          <p className="label-caption">OBJECTS</p>
          <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed max-w-sm">
            컵, 잔, 접시가 한데 어우러진 세트 구성. 함께 두면 더 완성도
            있는 테이블을 만들어주는 작품들을 모았습니다.
          </p>
          <Link
            href="/collection"
            className="mt-4 inline-block label-caption hover:text-[var(--color-ink)] transition-colors"
          >
            VIEW COLLECTION →
          </Link>
        </div>
      </section>
    </main>
  );
}
