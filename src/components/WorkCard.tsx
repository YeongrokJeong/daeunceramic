import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

// 쿠팡 검색결과 카드 레이아웃 참고: 정사각 이미지 + 2줄 상품명(볼드 X, 작은 글씨)
// + 가격(볼드 X, 상품명보다 큰 글씨) 순서. 테두리/그림자 없이 촘촘하게 배치.
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[var(--color-bg-soft)]">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className="h-full w-full"
        />
        {work.soldOut && (
          <span className="absolute top-2 left-2 rounded bg-[var(--color-ink)] text-white text-[11px] px-2 py-0.5">
            예약 마감
          </span>
        )}
      </div>
      <div className="pt-2">
        <p className="text-sm font-normal leading-snug line-clamp-2 text-[var(--color-ink)]">
          {work.title}
        </p>
        <p className="mt-1 text-base font-normal text-[var(--color-ink)]">
          {formatPrice(work.price)}
        </p>
      </div>
    </Link>
  );
}
