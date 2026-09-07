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

// 레퍼런스(DAEUN LEE)의 상세페이지 톤을 따름: 박스/배경색 없이 얇은 구분선과
// 트래킹된 작은 라벨(dt)만으로 정보를 나열. 구매 버튼도 색 채움 없이
// 테두리 버튼으로 절제.
export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const index = works.findIndex((w) => w.slug === slug);
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-8 py-6 sm:py-10 pb-28 sm:pb-16">
      <div className="flex items-center justify-between">
        <Link
          href="/collection"
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          ← BACK TO COLLECTION
        </Link>
        <div className="flex gap-4">
          <Link
            href={`/works/${prev.slug}`}
            className="label-caption hover:text-[var(--color-ink)] transition-colors"
          >
            PREV
          </Link>
          <Link
            href={`/works/${next.slug}`}
            className="label-caption hover:text-[var(--color-ink)] transition-colors"
          >
            NEXT
          </Link>
        </div>
      </div>

      <div className="mt-6 flex items-baseline justify-between">
        <h1 className="font-display text-2xl sm:text-3xl leading-snug">
          {work.title}
        </h1>
        <p className="label-caption shrink-0 ml-4">2026</p>
      </div>

      <div className="relative mt-5 aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-sm tracking-[0.2em]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mt-12 grid sm:grid-cols-5 gap-10 sm:gap-16">
        <div className="sm:col-span-3">
          <p className="label-caption">
            {work.soldOut ? "SOLD OUT" : "AVAILABLE · 1점 한정"}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
            {work.description}
          </p>

          <dl className="mt-8 space-y-2.5 text-sm border-t border-[var(--color-line)] pt-6">
            <Spec label="가격" value={formatPrice(work.price)} />
            <Spec label="크기" value={work.dimensions} />
            <Spec label="유약" value={work.glaze} />
            <Spec label="재질" value={work.material} />
            <Spec
              label="전자레인지"
              value={work.microwaveSafe ? "사용 가능" : "사용 불가"}
            />
            <Spec
              label="식기세척기"
              value={work.dishwasherSafe ? "사용 가능" : "사용 불가"}
            />
          </dl>

          <p className="mt-6 text-xs text-[var(--color-ink-soft)] leading-relaxed border-t border-[var(--color-line)] pt-6">
            {work.careNote}
          </p>

          <div className="mt-6 text-xs text-[var(--color-ink-soft)] leading-relaxed border-t border-[var(--color-line)] pt-6">
            <p className="text-[var(--color-ink)]">배송 · 교환/반품</p>
            <p className="mt-1.5">
              결제 확인 후 택배로 발송돼요. 배송비·발송 기간·교환/반품
              규정은 작가와 연락 시 함께 안내드려요.
            </p>
          </div>

          <p className="mt-6 label-caption">
            판매자: 이다은 (개인 작가)
          </p>
        </div>

        {/* sm 이상: 사이드바에 고정 버튼. 모바일: 아래 fixed 바로 대체(다음 블록) */}
        <div className="hidden sm:block sm:col-span-2">
          <div className="sm:sticky sm:top-6">
            <p className="text-xs text-[var(--color-ink-soft)] leading-relaxed mb-4">
              구매하기 → 이름/연락처 남기기 → 작가가 문자로 연락드려
              결제·배송을 안내해드려요.
            </p>
            <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} />
          </div>
        </div>
      </div>

      {/* 모바일 전용: 정보가 길어져도 구매 버튼은 항상 화면 하단에 고정 */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--color-bg)] border-t border-[var(--color-line)] p-3">
        <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} fullWidth />
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-24 shrink-0 label-caption">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
