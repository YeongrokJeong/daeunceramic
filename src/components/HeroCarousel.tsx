"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// 히어로 배경 슬라이드쇼. 모바일/PC 각각 이미지 세트를 일정 간격으로
// 크로스페이드한다. PC는 좌측 하단 "01 / 0N" 인디케이터도 함께 관리한다.
// 화면(사진 영역)을 탭/클릭하면 바로 다음 사진으로 넘어간다.
const MOBILE_SLIDES = [
  "/works/banner-mobile.png",
  "/works/banner-mobile-02.jpg",
  "/works/banner-mobile-03.png",
];
const DESKTOP_SLIDES = [
  "/works/background-03.png",
  "/works/background-01.png",
  "/works/background-02.png",
];
const INTERVAL_MS = 3200;

function useSlideIndex(count: number) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
  }, [count]);

  useEffect(() => {
    restart();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restart]);

  // 수동으로 다음 사진으로 넘길 때는 타이머도 다시 시작해서, 넘기자마자
  // 자동으로 또 넘어가버리는 일이 없게 한다.
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
    restart();
  }, [count, restart]);

  return [index, next] as const;
}

export default function HeroCarousel() {
  const [mobileIndex, nextMobile] = useSlideIndex(MOBILE_SLIDES.length);
  const [desktopIndex, nextDesktop] = useSlideIndex(DESKTOP_SLIDES.length);

  return (
    // display:contents라 레이아웃에 영향 없이, 탭하면 현재 화면에 맞는
    // 슬라이드만 다음으로 넘긴다(모바일/PC 중 안 보이는 쪽도 같이 넘어가지만
    // 화면엔 안 보이니 문제 없음).
    <div
      className="contents"
      onClick={() => {
        nextMobile();
        nextDesktop();
      }}
    >
      {MOBILE_SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover absolute inset-0 sm:hidden transition-opacity duration-700 ease-in-out cursor-pointer ${
            i === mobileIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {DESKTOP_SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover absolute inset-0 hidden sm:block transition-opacity duration-700 ease-in-out cursor-pointer ${
            i === desktopIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="hidden sm:flex items-center gap-3 absolute left-8 lg:left-14 bottom-8">
        <span className="label-caption !text-white/80">
          {String(desktopIndex + 1).padStart(2, "0")} /{" "}
          {String(DESKTOP_SLIDES.length).padStart(2, "0")}
        </span>
        <span className="w-8 border-t border-white/50" />
      </div>
    </div>
  );
}
