"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import WorkImage from "@/components/WorkImage";
import type { Work } from "@/lib/works";

// 상세페이지 메인 사진 전용: 클릭하면 전체화면으로 확대해서 볼 수 있다.
// 카드/리스트용 정사각 패딩 사진 대신, 여백 없는 원본 비율 detailImage를
// 써서 사진 위아래(또는 좌우)에 불필요한 흰 여백이 생기지 않도록 한다.
// 모바일 뒤로가기(popstate)를 눌렀을 때 상세페이지 자체를 벗어나지 않고
// 라이트박스만 닫히도록 히스토리에 상태를 하나 쌓아둔다.
export default function ZoomableWorkImage({ work }: { work: Work }) {
  const [open, setOpen] = useState(false);
  // 뒤로가기로 닫힌 경우엔 history.back()을 다시 부르면 안 되므로 구분한다.
  const closedByPopRef = useRef(false);

  const openLightbox = () => {
    closedByPopRef.current = false;
    window.history.pushState({ lightbox: true }, "");
    setOpen(true);
  };

  const closeLightbox = () => {
    setOpen(false);
    if (!closedByPopRef.current) {
      // 열 때 쌓아둔 히스토리 엔트리를 되돌려 popstate와 실제 URL을 맞춘다.
      window.history.back();
    }
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    const onPopState = () => {
      closedByPopRef.current = true;
      setOpen(false);
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
  }, [open]);

  const hasDetailImage =
    work.detailImage && work.detailWidth && work.detailHeight;

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        aria-label="사진 확대해서 보기"
        className="relative mt-5 w-full overflow-hidden cursor-zoom-in block"
      >
        {hasDetailImage ? (
          <Image
            src={work.detailImage!}
            alt={work.title}
            width={work.detailWidth}
            height={work.detailHeight}
            sizes="(min-width: 640px) 640px, 100vw"
            className={`w-full h-auto ${work.soldOut ? "grayscale" : ""}`}
          />
        ) : (
          <div className="relative aspect-square w-full">
            <WorkImage
              paletteIndex={work.paletteIndex}
              title={work.title}
              image={work.image}
              className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
            />
          </div>
        )}
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
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="닫기"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 bg-black/70 text-white/90 hover:text-white hover:bg-black/85 text-xs tracking-[0.2em] px-3 py-2 cursor-pointer transition-colors"
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
              image={work.detailImage ?? work.image}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
