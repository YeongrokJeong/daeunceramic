"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorkCard from "@/components/WorkCard";
import type { Work } from "@/lib/works";

const PAGE_SIZE = 6;

export default function InfiniteGallery({ works }: { works: Work[] }) {
  const [count, setCount] = useState(Math.min(PAGE_SIZE, works.length));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(() => works.slice(0, count), [works, count]);
  const hasMore = count < works.length;

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
        <p className="text-center text-sm text-[var(--color-ink-soft)] py-10">
          모든 작품을 보셨어요 🏺
        </p>
      )}
    </div>
  );
}
