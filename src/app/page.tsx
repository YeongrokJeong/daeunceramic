import CollectionGrid from "@/components/CollectionGrid";
import WorkImage from "@/components/WorkImage";
import { works } from "@/lib/works";

export default function Home() {
  const hero = works[0];

  return (
    <main className="flex-1">
      {/* 작은 히어로 배너 + 바로 아래 전체 컬렉션. */}
      <section className="relative">
        <WorkImage
          paletteIndex={hero.paletteIndex}
          title={hero.title}
          image={hero.image}
          fit="cover"
          className="h-[20vh] sm:h-[23vh] w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 pb-4 sm:pb-5 max-w-5xl mx-auto">
          <h1 className="font-display text-white text-sm sm:text-lg leading-snug max-w-md">
            형태와 재료 사이에서 우연한 흐름을 관찰하고 기록합니다.
          </h1>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
        <p className="font-display text-2xl sm:text-3xl">COLLECTION</p>
        <div className="mt-8">
          <CollectionGrid works={works} />
        </div>
      </section>
    </main>
  );
}
