"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// 히어로 배경 슬라이드쇼. 모바일/PC 각각 이미지 세트를 일정 간격으로
// 크로스페이드한다. PC는 좌측 하단 "01 / 0N" 인디케이터도 함께 관리한다.
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
const INTERVAL_MS = 5500;

function useSlideIndex(count: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);
  return index;
}

export default function HeroCarousel() {
  const mobileIndex = useSlideIndex(MOBILE_SLIDES.length);
  const desktopIndex = useSlideIndex(DESKTOP_SLIDES.length);

  return (
    <>
      {MOBILE_SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover absolute inset-0 sm:hidden transition-opacity duration-1000 ease-in-out ${
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
          className={`object-cover absolute inset-0 hidden sm:block transition-opacity duration-1000 ease-in-out ${
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
    </>
  );
}
