"use client";

import { useEffect, useState } from "react";

// 일정 이상 스크롤하면 나타나는 최상단 이동 버튼.
// 상세페이지의 모바일 고정 구매 바(하단)와 겹치지 않도록 넉넉히 띄운다.
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로 이동"
      className="fixed bottom-20 sm:bottom-6 right-5 sm:right-8 z-40 h-11 w-11 flex items-center justify-center border border-[var(--color-ink)] bg-[var(--color-bg)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors cursor-pointer"
    >
      <span className="text-sm">↑</span>
    </button>
  );
}
