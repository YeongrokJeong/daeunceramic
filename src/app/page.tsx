import Image from "next/image";
import CollectionGrid from "@/components/CollectionGrid";
import { works } from "@/lib/works";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 작은 히어로 배너 + 바로 아래 전체 컬렉션. */}
      <section className="relative h-[20vh] sm:h-[23vh] w-full overflow-hidden">
        <Image
          src="/works/banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 max-w-5xl mx-auto">
          <h1 className="font-display text-white text-sm sm:text-lg leading-snug max-w-md">
            형태와 재료 사이에서,
            <br />
            우연한 흐름을 관찰하고 기록합니다.
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
