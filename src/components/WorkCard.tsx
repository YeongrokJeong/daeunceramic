import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

// 모바일: 가로 리스트형(왼쪽 큰 사진 + 오른쪽 이름/가격, 1줄에 1개).
// sm 이상: 쿠팡 검색결과 그리드형(정사각 이미지 위 + 아래 이름/가격, 여러 열).
// 상품명 2줄(볼드 X, 작은 글씨) + 가격(볼드 X, 큰 글씨) 순서는 공통.
// 품절(soldOut) 표시는 무신사/29cm류 커머스의 관례를 따름:
// 사진은 흑백+어둡게, 사진 위에 "SOLD OUT" 텍스트를 중앙에 얹고
// 상품명/가격은 옅게 처리해 더 이상 구매 불가함을 한눈에 알림.
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      data-work-slug={work.slug}
      onClick={() => {
        try {
          sessionStorage.setItem("lastViewedWorkSlug", work.slug);
        } catch {
          // 세션 스토리지 접근 불가(프라이빗 모드 등)해도 무시하고 진행
        }
      }}
      className="group flex items-stretch gap-3 py-3 sm:block sm:gap-0 sm:py-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <div className="relative w-28 h-28 shrink-0 sm:w-full sm:h-auto sm:aspect-square overflow-hidden rounded-md bg-[var(--color-bg-soft)]">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm tracking-[0.15em]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex flex-col justify-center sm:block sm:pt-2">
        <p
          className={`text-sm font-normal leading-snug line-clamp-2 ${
            work.soldOut
              ? "text-[var(--color-ink-soft)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          {work.title}
        </p>
        <p
          className={`mt-1 text-base font-normal ${
            work.soldOut
              ? "text-[var(--color-ink-soft)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          {formatPrice(work.price)}
        </p>
      </div>
    </Link>
  );
}
