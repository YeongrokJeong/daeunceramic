"use client";

import Link from "next/link";
import WorkImage from "@/components/WorkImage";
import { formatPrice, type Work } from "@/lib/works";

// COLLECTION 페이지 전용: 한 줄에 한 상품 - 왼쪽 사진, 오른쪽 이름/가격/수량.
export default function CollectionListItem({ work }: { work: Work }) {
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
      className="group flex gap-4 sm:gap-6 py-5 border-b border-[var(--color-line)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
    >
      <div className="relative w-28 sm:w-40 aspect-square shrink-0 overflow-hidden bg-[var(--color-bg-soft)]">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          image={work.image}
          sizes="(min-width: 640px) 160px, 112px"
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
            work.soldOut ? "grayscale" : ""
          }`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-[10px] tracking-[0.15em]">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex flex-col justify-center">
        <p className="label-caption">{work.category}</p>
        <p className="mt-1.5 text-sm sm:text-base text-[var(--color-ink)] leading-snug">
          {work.title}
        </p>
        <p className="mt-1.5 font-display text-base sm:text-lg">
          {formatPrice(work.price)}
        </p>
        <p className="mt-1 label-caption">
          {work.soldOut ? "SOLD OUT" : "1점 한정"}
        </p>
        <p className="mt-2 text-xs text-[var(--color-ink-soft)] leading-relaxed hidden sm:block">
          {work.shortDescription}
        </p>
      </div>
    </Link>
  );
}
