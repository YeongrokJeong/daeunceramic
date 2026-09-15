"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import WorkImage from "@/components/WorkImage";
import type { Work } from "@/lib/works";

// 상세페이지 사진 갤러리: 여백 없는 원본 비율 사진(images)을 여러 장 넘겨볼 수
// 있고, 클릭하면 전체화면으로 확대해서 자세히 들여다볼 수 있다.
// Collection 그리드에서 특정 사진을 눌러 들어온 경우, ?photo=N 쿼리로 넘어온
// 사진이 맨 위에 먼저 보이도록 초기 인덱스로 사용한다.
// 모바일 하드웨어 뒤로가기를 누르면 상세페이지를 벗어나지 않고 라이트박스만
// 닫히도록, 열 때 히스토리에 같은 URL의 더미 엔트리를 하나 쌓아둔다.
// (예전 버그: 닫기 버튼을 눌렀을 때도 우리가 직접 history.back()을 호출했더니
// Next.js 라우터와 충돌해서 실제로 페이지를 벗어나버렸다. 그래서 지금은
// "열 때 pushState" + "popstate 감지해서 닫기"만 하고, 닫기 버튼/바깥
// 클릭/ESC로 닫을 땐 history.back()을 절대 호출하지 않는다 — 남는 더미
// 엔트리는 다음 실제 뒤로가기 때 조용히 소비될 뿐 아무 화면 변화가 없다.)
export default function ZoomableWorkImage({ work }: { work: Work }) {
  const photos =
    work.images && work.images.length > 0
      ? work.images
      : work.image
        ? [work.image]
        : [];

  const searchParams = useSearchParams();
  const initialIndex = (() => {
    const raw = Number(searchParams.get("photo"));
    return Number.isInteger(raw) && raw >= 0 && raw < photos.length ? raw : 0;
  })();

  const [index, setIndex] = useState(initialIndex);
  const [open, setOpen] = useState(false);

  const openLightbox = (i: number) => {
    setIndex(i);
    window.history.pushState({ lightbox: true }, "");
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);

  const showPrev = () =>
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  const showNext = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    const onPopState = () => setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPopState);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="relative mt-5 aspect-square w-full">
        <WorkImage
          paletteIndex={work.paletteIndex}
          title={work.title}
          className={`h-full w-full ${work.soldOut ? "grayscale" : ""}`}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openLightbox(index)}
        aria-label="사진 확대해서 보기"
        className="relative mt-5 w-full overflow-hidden cursor-zoom-in block bg-[var(--color-bg-soft)]"
      >
        <Image
          key={photos[index]}
          src={photos[index]}
          alt={work.title}
          width={1600}
          height={1600}
          sizes="(min-width: 640px) 640px, 100vw"
          className="w-full h-auto"
        />
        {work.soldOut && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[10px] sm:text-xs tracking-[0.15em] text-white bg-black/70 px-2.5 py-1.5">
            주문제작
          </span>
        )}
      </button>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-2">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`사진 ${i + 1}번 보기`}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden bg-[var(--color-bg-soft)] cursor-pointer ${
                i === index
                  ? "ring-1 ring-[var(--color-ink)]"
                  : "opacity-60 hover:opacity-100"
              } transition-opacity`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {open &&
        createPortal(
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

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="이전 사진"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white/90 hover:text-white hover:bg-black/85 text-xs tracking-[0.2em] px-3 py-2 cursor-pointer transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="다음 사진"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white/90 hover:text-white hover:bg-black/85 text-xs tracking-[0.2em] px-3 py-2 cursor-pointer transition-colors"
              >
                ›
              </button>
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white/90 text-xs tracking-[0.2em] px-3 py-1.5">
                {index + 1} / {photos.length}
              </div>
            </>
          )}

          <div
            className="w-full h-full max-w-3xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* fill 기반 WorkImage 대신 실제 크기로 렌더링해서, 부모의 높이 계산이
                꼬여도(flex 안에서 h-full이 과하게 커지는 문제) 이미지 자체가
                max-h/max-w로 항상 화면 안에 딱 맞게 줄어들도록 한다. */}
            <Image
              src={photos[index]}
              alt={work.title}
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
