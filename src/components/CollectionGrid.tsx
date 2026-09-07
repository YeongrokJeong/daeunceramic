"use client";

import { useEffect, useState } from "react";
import CollectionListItem from "@/components/CollectionListItem";
import { CATEGORIES, type Work } from "@/lib/works";

// COLLECTION 페이지: 필터 탭(ALL + 카테고리) + 한 줄에 한 상품 리스트
// (왼쪽 사진, 오른쪽 이름/가격/수량). 개수가 13개라 무한스크롤 없이 한 번에
// 보여준다. 상세페이지에서 뒤로 돌아왔을 때 방금 봤던 항목 위치로 스크롤 복원.
export default function CollectionGrid({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<string>("ALL");
  const visible =
    filter === "ALL" ? works : works.filter((w) => w.category === filter);

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
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[var(--color-line)] pb-4">
        {["ALL", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`label-caption pb-1 cursor-pointer transition-colors ${
              filter === cat
                ? "text-[var(--color-ink)] border-b border-[var(--color-ink)]"
                : "hover:text-[var(--color-ink)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {visible.map((work) => (
          <CollectionListItem key={work.id} work={work} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 text-center label-caption">
          해당 카테고리에 작품이 없어요
        </p>
      )}
    </div>
  );
}
