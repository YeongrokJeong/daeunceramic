"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice, type Work } from "@/lib/works";

// 상품별 사진을 그리드로 모아 미리 볼 수 있게 한다. 모바일은 2열(칸이
// 좁으면 영문+국문 제품명이 다 잘려서), PC는 3열. 사진 아래 영문/국문
// 제품명을 위아래로 쌓고 가격도 함께 보여줘서, 하나씩 눌러보지 않아도
// 그리드에서 바로 비교할 수 있게 한다.
// 상품마다 대표 사진(work.image) 딱 1장으로 타일 1개씩만 보여준다 — 상세
// 갤러리 사진이 여러 장이어도(예: 손에 든 컷 추가) 그리드에 중복으로 여러
// 칸이 생기지 않게. 나머지 사진들은 상세페이지에서 넘겨볼 수 있다.
// 사진을 탭하면 해당 상품의 상세페이지로 이동한다.
// 상세페이지에서 뒤로 돌아왔을 때 방금 봤던 상품의 타일 위치로 스크롤을
// 복원한다.
export default function CollectionPhotoGrid({ works }: { works: Work[] }) {
  const tiles = works
    .map((work) => ({ work, src: work.image ?? work.images?.[0] }))
    .filter(
      (t): t is { work: Work; src: string } => typeof t.src === "string"
    );

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 bg-[var(--color-bg)]">
      {tiles.map(({ work, src }, i) => (
        <Link
          key={work.id}
          href={`/works/${work.slug}`}
          data-work-slug={work.slug}
          onClick={() => {
            try {
              sessionStorage.setItem("lastViewedWorkSlug", work.slug);
            } catch {
              // 무시
            }
          }}
          className="group block"
        >
          <div className="relative aspect-square overflow-hidden bg-[var(--color-bg)]">
            <Image
              src={src}
              alt={work.title}
              fill
              sizes="(min-width: 640px) 220px, 50vw"
              priority={i < 6}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {work.soldOut && (
              <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] tracking-wide text-white bg-black/70 px-2 py-1">
                주문제작
              </span>
            )}
          </div>
          <div className="bg-[var(--color-bg)] pt-2 sm:pt-2.5">
            <p className="text-black text-[11px] sm:text-xs leading-snug truncate">
              {work.titleEn}
            </p>
            <p className="text-black text-[11px] sm:text-xs leading-snug truncate mt-0.5">
              {work.title}
            </p>
            <p className="text-[var(--color-ink-soft)] text-[11px] sm:text-xs leading-snug mt-1">
              {formatPrice(work.price)}
              {work.soldOut && " · 주문제작"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
