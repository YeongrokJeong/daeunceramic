"use client";

import { useEffect, useState } from "react";
import WorkCard from "@/components/WorkCard";
import { CATEGORIES, type Work } from "@/lib/works";

// 레퍼런스의 COLLECTION 페이지: 필터 탭(ALL + 카테고리) + 3열 그리드.
// 개수가 15개라 무한스크롤 없이 한 번에 보여준다. 가격 대신 제목/연도만 노출.
// 상세페이지에서 뒤로 돌아왔을 때 방금 봤던 카드 위치로 스크롤 복원한다.
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

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10">
        {visible.map((work) => (
          <WorkCard key={work.id} work={work} />
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
