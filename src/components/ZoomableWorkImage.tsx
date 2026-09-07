"use client";

import { useEffect, useState } from "react";
import WorkImage from "@/components/WorkImage";
import type { Work } from "@/lib/works";

// 상세페이지 메인 사진 전용: 클릭하면 전체화면으로 확대해서 볼 수 있다.
export default function ZoomableWorkImage({ work }: { work: Work }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="사진 확대해서 보기"
        className="relative mt-5 aspect-square w-full overflow-hidden cursor-zoom-in block"
      >
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          image={work.image}
          className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
        />
        {work.soldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <span className="text-white text-sm tracking-[0.2em]">
              SOLD OUT
            </span>
          </div>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="닫기"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white text-sm tracking-[0.2em] cursor-pointer"
          >
            CLOSE ✕
          </button>
          <div
            className="relative w-full h-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <WorkImage
              paletteIndex={work.paletteIndex}
              title={work.title}
              image={work.image}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
