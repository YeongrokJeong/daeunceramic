"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// About 페이지 전시/작업 사진 그리드. 탭하면 전체화면으로 크게 볼 수 있다.
// 상세페이지의 ZoomableWorkImage와 같은 방식으로, 모바일 뒤로가기를 누르면
// 페이지를 벗어나지 않고 라이트박스만 닫히도록 히스토리를 하나 쌓아둔다.
export default function ExhibitionPhotoGrid({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closedByPopRef = useRef(false);

  const open = (i: number) => {
    closedByPopRef.current = false;
    window.history.pushState({ lightbox: true }, "");
    setIndex(i);
  };

  const close = () => {
    setIndex(null);
    if (!closedByPopRef.current) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPopState = () => {
      closedByPopRef.current = true;
      setIndex(null);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPopState);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => open(i)}
            aria-label="사진 확대해서 보기"
            className="relative aspect-square overflow-hidden bg-[var(--color-bg-soft)] cursor-zoom-in"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 200px, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {index !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={close}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 bg-black/70 text-white/90 hover:text-white hover:bg-black/85 text-xs tracking-[0.2em] px-3 py-2 cursor-pointer transition-colors"
            >
              CLOSE ✕
            </button>
            <div
              className="w-full h-full max-w-3xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[index]}
                alt=""
                width={1600}
                height={1600}
                sizes="100vw"
                className="max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
