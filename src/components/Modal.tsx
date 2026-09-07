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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl bg-[var(--color-card)] p-5 sm:p-6 animate-in"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">{title}</h2>
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
