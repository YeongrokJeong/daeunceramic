import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

// 모바일: 가로 리스트형(왼쪽 큰 사진 + 오른쪽 이름/가격, 1줄에 1개).
// sm 이상: 쿠팡 검색결과 그리드형(정사각 이미지 위 + 아래 이름/가격, 여러 열).
// 상품명 2줄(볼드 X, 작은 글씨) + 가격(볼드 X, 큰 글씨) 순서는 공통.
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group flex items-stretch gap-3 py-3 sm:block sm:gap-0 sm:py-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="relative w-28 h-28 shrink-0 sm:w-full sm:h-auto sm:aspect-square overflow-hidden rounded-md bg-[var(--color-bg-soft)]">
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
      <div className="min-w-0 flex flex-col justify-center sm:block sm:pt-2">
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
