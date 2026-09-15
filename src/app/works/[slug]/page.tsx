import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ZoomableWorkImage from "@/components/ZoomableWorkImage";
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
    title: `${work.title} | DeL Objects`,
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
          href="/shop"
          className="label-caption hover:text-[var(--color-ink)] transition-colors"
        >
          ← BACK TO SHOP
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

      <div className="mt-6">
        <h1 className="font-display text-2xl sm:text-3xl leading-snug">
          {work.title}
        </h1>
        <p className="label-caption mt-1">{work.titleEn}</p>
      </div>

      <Suspense fallback={<div className="mt-5 aspect-square w-full bg-[var(--color-bg-soft)]" />}>
        <ZoomableWorkImage work={work} />
      </Suspense>

      {/* 사진 바로 아래: 가격 + 구매 버튼(모바일/PC 공통, 스크롤 없이 바로 보임) */}
      <div className="mt-6 max-w-md">
        {work.soldOut && <p className="label-caption mb-2">주문제작</p>}
        <p className="font-display text-xl sm:text-2xl">
          {formatPrice(work.price)}
        </p>
        <div className="mt-4">
          <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} />
        </div>
        <p className="mt-3 text-xs text-[var(--color-ink-soft)] leading-relaxed">
          {work.soldOut
            ? "1점 한정 제작품이라 품절되었어요. 같은 스타일로 제작 가능한지 문의를 남겨주시면 작가님이 연락드려요. 제작 기간은 약 2주 소요됩니다."
            : "구매하기 → 이름/연락처 남기기 → 작가가 문자로 연락드려 결제·배송을 안내해드려요."}
        </p>
      </div>

      <div className="mt-10 sm:mt-12 max-w-md">
        <p className="text-sm leading-relaxed text-[var(--color-ink)] whitespace-pre-line">
          {work.description}
        </p>

        <table className="mt-8 w-full text-sm border-t border-[var(--color-line)]">
          <tbody>
            <SpecRow label="Size" value={work.dimensions} />
            <SpecRow label="Capacity" value={work.capacity} />
            <SpecRow label="Material" value={work.material} />
            <SpecRow label="Glaze" value={work.glaze} />
            <SpecRow label="Technique" value={work.technique} />
            <SpecRow label="Firing" value={work.firing} />
          </tbody>
        </table>

        {/* 전자레인지/식기세척기 안내는 아래 케어 문구에 이미 포함되어 중복 표시하지 않음 */}
        <p className="mt-6 text-xs text-[var(--color-ink-soft)] leading-relaxed">
          {work.careNote}
        </p>

        {work.customOrderNote && (
          <div className="mt-6 text-xs leading-relaxed border-t border-[var(--color-line)] pt-6">
            <p className="text-[var(--color-ink)]">주문제작</p>
            <p className="mt-1.5 text-[var(--color-ink-soft)]">
              {work.customOrderNote}
            </p>
          </div>
        )}

        <div className="mt-6 text-xs text-[var(--color-ink-soft)] leading-relaxed border-t border-[var(--color-line)] pt-6">
          <p className="text-[var(--color-ink)]">배송 · 교환/반품</p>
          <p className="mt-1.5">
            결제 확인 후 택배로 발송돼요. 배송비·발송 기간·교환/반품
            규정은 작가와 연락 시 함께 안내드려요.
          </p>
        </div>
      </div>

      {/* 모바일 전용: 정보가 길어져도 구매 버튼은 항상 화면 하단에 고정 */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--color-bg)] border-t border-[var(--color-line)] p-3">
        <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} fullWidth />
      </div>
    </main>
  );
}

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <tr className="border-b border-[var(--color-line)]">
      <th
        scope="row"
        className="label-caption text-left font-normal align-top w-24 sm:w-28 py-2.5 pr-4"
      >
        {label}
      </th>
      <td className="align-top py-2.5">{value}</td>
    </tr>
  );
}
