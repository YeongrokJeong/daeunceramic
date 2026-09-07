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
      <div className="flex flex-col divide-y divide-[var(--color-line)] sm:grid sm:grid-cols-3 md:grid-cols-4 sm:divide-y-0 gap-x-4 sm:gap-y-6">
        {visible.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>

      {hasMore ? (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <span className="text-sm text-[var(--color-ink-soft)]">
            작품을 불러오는 중...
          </span>
        </div>
      ) : (
        <div className="text-center py-14 border-t border-[var(--color-line)] mt-6">
          <p className="text-sm text-[var(--color-ink)]">
            모든 작품을 둘러보셨어요.
          </p>
          <p className="mt-1.5 text-xs text-[var(--color-ink-soft)] leading-relaxed">
            새 작품은 준비되는 대로 이 페이지에 추가돼요.
          </p>
        </div>
      )}
    </div>
  );
}
