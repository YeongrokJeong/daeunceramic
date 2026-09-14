"use client";

import { useEffect } from "react";
import CollectionListItem from "@/components/CollectionListItem";
import type { Work } from "@/lib/works";

// COLLECTION 페이지: 한 줄에 한 상품 리스트(왼쪽 사진, 오른쪽 이름/가격/수량).
// 개수가 적어 카테고리 필터 없이 전체를 그대로 보여준다. 상세페이지에서
// 뒤로 돌아왔을 때 방금 봤던 항목 위치로 스크롤 복원.
export default function CollectionGrid({ works }: { works: Work[] }) {
  const visible = works;

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
      <div className="border-t border-[var(--color-line)]">
        {visible.map((work) => (
          <CollectionListItem key={work.id} work={work} />
        ))}
      </div>
    </div>
  );
}
