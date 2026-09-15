"use client";

import { useEffect, useRef, type ReactNode } from "react";

// 작은 팝업창(모달). ESC/바깥 클릭으로 닫히고, 열리면 스크롤을 막는다.
export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 모바일에서 키보드가 올라오면 브라우저 주소창/키보드 때문에 실제로
    // 보이는 화면(visualViewport)이 레이아웃 전체 높이(100vh)보다 작아진다.
    // position:fixed 요소는 기본적으로 레이아웃 뷰포트 기준이라 이 상태에서
    // 팝업 위쪽이 화면 밖(주소창 뒤)으로 밀려 가려지는 문제가 생긴다.
    // visualViewport의 실제 크기/오프셋을 계속 읽어와 오버레이에 그대로
    // 반영해서, 항상 지금 실제로 보이는 영역에 딱 맞게 따라다니게 한다.
    const vv = window.visualViewport;
    const el = overlayRef.current;
    const syncViewport = () => {
      if (!el || !vv) return;
      el.style.height = `${vv.height}px`;
      el.style.top = `${vv.offsetTop}px`;
    };
    syncViewport();
    vv?.addEventListener("resize", syncViewport);
    vv?.addEventListener("scroll", syncViewport);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      vv?.removeEventListener("resize", syncViewport);
      vv?.removeEventListener("scroll", syncViewport);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-x-0 top-0 h-[100dvh] z-50 overflow-y-auto flex items-start sm:items-center justify-center bg-black/50 px-4 py-8 sm:py-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-sm max-h-full overflow-y-auto bg-[var(--color-bg)] p-6 sm:p-8 animate-in mt-8 sm:mt-0"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] text-xl leading-none cursor-pointer px-1"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
