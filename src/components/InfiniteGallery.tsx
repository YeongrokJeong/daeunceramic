"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorkCard from "@/components/WorkCard";
import type { Work } from "@/lib/works";

const PAGE_SIZE = 6;

export default function InfiniteGallery({ works }: { works: Work[] }) {
  const [count, setCount] = useState(Math.min(PAGE_SIZE, works.length));
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [restoreSlug, setRestoreSlug] = useState<string | null>(null);

  const visible = useMemo(() => works.slice(0, count), [works, count]);
  const hasMore = count < works.length;

  // 상세페이지에서 뒤로 돌아왔을 때, 방금 봤던 상품이 화면 가운데쯤 오도록 복원한다.
  useEffect(() => {
    let slug: string | null = null;
    try {
      slug = sessionStorage.getItem("lastViewedWorkSlug");
    } catch {
      slug = null;
    }
    if (!slug) return;

    const index = works.findIndex((w) => w.slug === slug);
    if (index === -1) return;

    setCount((c) => Math.max(c, index + 1));
    setRestoreSlug(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restoreSlug) return;
    const el = document.querySelector(
      `[data-work-slug="${restoreSlug}"]`
    );
    if (!el) return;

    el.scrollIntoView({ block: "center", behavior: "auto" });
    try {
      sessionStorage.removeItem("lastViewedWorkSlug");
    } catch {
      // 무시
    }
    setRestoreSlug(null);
  }, [restoreSlug, visible]);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => Math.min(c + PAGE_SIZE, works.length));
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, works.length]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10">
        {visible.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>

      {hasMore ? (
        <div ref={sentinelRef} className="flex justify-center py-12">
          <span className="label-caption">LOADING</span>
        </div>
      ) : (
        <div className="text-center py-16 border-t border-[var(--color-line)] mt-10">
          <p className="text-sm">모든 작품을 둘러보셨어요.</p>
          <p className="mt-2 label-caption">
            새 작품은 준비되는 대로 추가돼요
          </p>
        </div>
      )}
    </div>
  );
}
