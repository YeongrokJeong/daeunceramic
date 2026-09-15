import Image from "next/image";

export const metadata = {
  title: "Works | Daeun Ceramic",
};

// SHOP(판매 상품)과 구분되는, 아직 판매하지 않는 실험/진행중 작업 아카이브.
// 정식 상품 데이터(lib/works.ts)와는 별개로 이 페이지 전용 리스트를 관리한다.
const IN_PROGRESS_WORKS = [
  {
    id: "01",
    slug: "circuit-vase",
    label: "CIRCUIT",
    title: "Circuit Vase",
    meta: "Porcelain, cobalt decoration, 2026",
    status: "In progress",
    image: "/works/circuit-vase.png",
  },
  {
    id: "02",
    slug: "keycap-mini-vase-studies",
    label: "KEYCAP",
    title: "Keycap Mini Vase",
    meta: "Porcelain, slip casting, 2026",
    status: "Prototype / ongoing",
    image: "/works/keycap-mini-vase.png",
  },
];

export default function WorksPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">WORKS</p>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)] max-w-md leading-relaxed">
        아직 판매하지 않는, 진행 중인 실험 작업들입니다.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-10 sm:gap-14">
        {IN_PROGRESS_WORKS.map((work) => (
          <div key={work.slug}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-soft)]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(min-width: 640px) 420px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="label-caption mt-4">
              {work.id} {work.label}
            </p>
            <p className="font-display text-lg mt-1">{work.title}</p>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              {work.meta}
            </p>
            <p className="mt-1 text-sm text-[var(--color-ink)]">
              {work.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
