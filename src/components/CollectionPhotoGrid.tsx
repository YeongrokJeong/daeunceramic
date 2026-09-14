"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/lib/works";

// 인스타그램 프로필 그리드처럼, 상품별 사진을 한 화면에서 3열로 모아
// 미리 볼 수 있게 한다. 쇼핑몰 그리드이므로 사진마다 이름/가격을 항상
// 보여준다(일부 타일에만 있으면 판매 페이지처럼 안 보여서 전부 표시).
// 사진을 탭하면 해당 상품의 상세페이지로 이동하는데, 방금 누른 그 사진이
// 상세페이지 맨 위에 먼저 보이도록 몇 번째 사진인지(photo 쿼리)를 함께 넘긴다.
// 상세페이지에서 뒤로 돌아왔을 때 방금 봤던 상품의 첫 번째 사진 위치로
// 스크롤을 복원한다.
export default function CollectionPhotoGrid({ works }: { works: Work[] }) {
  const tiles = works.flatMap((work) => {
    const photos =
      work.images && work.images.length > 0
        ? work.images
        : work.image
          ? [work.image]
          : [];
    return photos.map((src, photoIndex) => ({
      work,
      src,
      photoIndex,
      isFirst: photoIndex === 0,
    }));
  });

  useEffect(() => {
    let slug: string | null = null;
    try {
      slug = sessionStorage.getItem("lastViewedWorkSlug");
    } catch {
      slug = null;
    }
    if (!slug) return;

    const el = document.querySelector(`[data-work-slug="${slug}"]`);
    if (!el) return;

    el.scrollIntoView({ block: "center", behavior: "auto" });
    try {
      sessionStorage.removeItem("lastViewedWorkSlug");
    } catch {
      // 무시
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
      {tiles.map(({ work, src, photoIndex, isFirst }, i) => (
        <Link
          key={`${work.id}-${src}`}
          href={`/works/${work.slug}?photo=${photoIndex}`}
          data-work-slug={isFirst ? work.slug : undefined}
          onClick={() => {
            try {
              sessionStorage.setItem("lastViewedWorkSlug", work.slug);
            } catch {
              // 무시
            }
          }}
          className="group relative aspect-square overflow-hidden bg-[var(--color-bg-soft)] block"
        >
          <Image
            src={src}
            alt={work.title}
            fill
            sizes="(min-width: 640px) 220px, 33vw"
            priority={i < 6}
            className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              work.soldOut ? "grayscale" : ""
            }`}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-2 sm:px-3 sm:py-2.5">
            <p className="text-white text-[11px] sm:text-xs leading-snug truncate">
              {work.title}
            </p>
            <p className="text-white/85 text-[10px] sm:text-[11px] mt-0.5">
              {work.soldOut
                ? "SOLD OUT"
                : `${work.price.toLocaleString("ko-KR")}원`}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
