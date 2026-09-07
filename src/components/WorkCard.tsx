"use client";

import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

// 레퍼런스(DAEUN LEE)의 "SELECTED WORKS" 카드 스타일: 이미지 위 + 아래 텍스트,
// 테두리/그림자 없이 여백만으로 구분. 색 강조 대신 타이포그래피 크기/자간으로
// 위계를 만든다.
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      data-work-slug={work.slug}
      onClick={() => {
        try {
          sessionStorage.setItem("lastViewedWorkSlug", work.slug);
        } catch {
          // 무시
        }
      }}
      className="group block cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bg-soft)]">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          image={work.image}
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
            work.soldOut ? "grayscale" : ""
          }`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-xs tracking-[0.2em]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>
      <div className="pt-3">
        <p className="text-sm text-[var(--color-ink)] leading-snug">
          {work.title}
        </p>
        <p className="mt-1 label-caption">
          {formatPrice(work.price)}
          {!work.soldOut && " · 1점 한정"}
        </p>
        <p className="mt-1.5 text-xs text-[var(--color-ink-soft)] leading-relaxed hidden sm:block">
          {work.shortDescription}
        </p>
      </div>
    </Link>
  );
}
