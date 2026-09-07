import Link from "next/link";
import { notFound } from "next/navigation";
import WorkImage from "@/components/WorkImage";
import PurchaseButton from "@/components/PurchaseButton";
import { formatPrice, getWorkBySlug, works } from "@/lib/works";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: `${work.title} | 이다은 도자기`,
    description: work.shortDescription,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-8 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
      >
        ← 목록으로
      </Link>

      <div className="relative mt-4 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10]">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-base sm:text-lg tracking-[0.15em]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-8 grid sm:grid-cols-5 gap-8 sm:gap-10">
        <div className="sm:col-span-3">
          <h1 className="font-display text-2xl sm:text-3xl leading-snug">
            {work.title}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-xl font-medium">{formatPrice(work.price)}</p>
            {!work.soldOut && (
              <span className="text-xs text-[var(--color-accent)] border border-[var(--color-accent)] rounded px-1.5 py-0.5">
                1점 한정
              </span>
            )}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink)]">
            {work.description}
          </p>

          <dl className="mt-6 space-y-2 text-sm border-t border-[var(--color-line)] pt-5">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-[var(--color-ink-soft)]">크기</dt>
              <dd>{work.dimensions}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-[var(--color-ink-soft)]">유약</dt>
              <dd>{work.glaze}</dd>
            </div>
          </dl>
        </div>

        <div className="sm:col-span-2">
          <div className="sm:sticky sm:top-6">
            <div className="mb-3 rounded-lg bg-[var(--color-bg-soft)] px-4 py-3 text-xs text-[var(--color-ink-soft)] leading-relaxed">
              <p>① 구매하기 → 이름/연락처 남기기</p>
              <p>② 작가가 문자로 연락 → 결제 안내 후 택배로 배송</p>
            </div>
            <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} />
          </div>
        </div>
      </div>
    </main>
  );
}
