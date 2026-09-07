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
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 sm:px-8 py-6 sm:py-10 pb-28 sm:pb-10">
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

          {/* 잔여 수량: 커머스 페이지의 핵심 정보 중 하나라 눈에 띄게 강조 */}
          <p
            className={`mt-2 text-sm font-medium ${
              work.soldOut ? "text-[var(--color-ink-soft)]" : "text-[var(--color-accent)]"
            }`}
          >
            {work.soldOut ? "재고 0개 · 품절" : "재고 1개 · 마지막 남은 한 점이에요"}
          </p>

          <div className="mt-4 rounded-lg bg-[var(--color-bg-soft)] px-4 py-3 text-xs text-[var(--color-ink-soft)] leading-relaxed">
            <p>① 구매하기 → 이름/연락처 남기기</p>
            <p>② 작가가 문자로 연락 → 결제 안내 후 택배로 배송</p>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink)]">
            {work.description}
          </p>

          <dl className="mt-6 space-y-2 text-sm border-t border-[var(--color-line)] pt-5">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[var(--color-ink-soft)]">크기</dt>
              <dd>{work.dimensions}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[var(--color-ink-soft)]">유약</dt>
              <dd>{work.glaze}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[var(--color-ink-soft)]">재질</dt>
              <dd>{work.material}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[var(--color-ink-soft)]">전자레인지</dt>
              <dd>{work.microwaveSafe ? "사용 가능" : "사용 불가"}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 text-[var(--color-ink-soft)]">식기세척기</dt>
              <dd>{work.dishwasherSafe ? "사용 가능" : "사용 불가"}</dd>
            </div>
          </dl>

          {/* 사용/관리 주의사항: 도자기 특성상 구매 후 파손 클레임으로 이어지기
              쉬운 정보라 박스로 강조해서 눈에 띄게 안내 */}
          <div className="mt-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 text-xs text-[var(--color-ink-soft)] leading-relaxed">
            ⚠ {work.careNote}
          </div>

          {/* 배송/교환·반품: 아직 정책이 확정되지 않아 자리만 만들어두고
              추정 정보를 채워 넣지 않음. 정책 정해지면 이 블록만 채우면 됨. */}
          <div className="mt-6 border-t border-[var(--color-line)] pt-5 text-sm">
            <p className="font-medium">배송 · 교환/반품</p>
            <p className="mt-1.5 text-[var(--color-ink-soft)] leading-relaxed">
              결제 확인 후 택배로 발송돼요. 배송비·발송 기간·교환/반품 규정은
              작가와 연락 시 함께 안내드려요.
            </p>
          </div>

          {/* 판매자 정보: 낯선 QR로 처음 유입된 방문객에게 필요한 최소한의 신뢰 신호 */}
          <div className="mt-4 text-xs text-[var(--color-ink-soft)]">
            판매자: 이다은 (개인 작가) · 문의는 구매하기 신청 후 남겨주신
            연락처로 받아요.
          </div>
        </div>

        {/* sm 이상: 사이드바에 고정 버튼. 모바일: 아래 fixed 바로 대체(다음 블록) */}
        <div className="hidden sm:block sm:col-span-2">
          <div className="sm:sticky sm:top-6">
            <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} />
          </div>
        </div>
      </div>

      {/* 모바일 전용: 정보가 길어져도 구매 버튼은 항상 화면 하단에 고정 */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 bg-[var(--color-card)] border-t border-[var(--color-line)] p-3">
        <PurchaseButton workSlug={work.slug} soldOut={work.soldOut} />
      </div>
    </main>
  );
}
