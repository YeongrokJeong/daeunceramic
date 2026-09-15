"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// PC 히어로 배경 슬라이드쇼. 이미지 2장을 일정 간격으로 크로스페이드하고,
// 좌측 하단 "01 / 02" 인디케이터도 함께 관리한다.
const SLIDES = ["/works/background-01.png", "/works/background-02.png"];
const INTERVAL_MS = 5500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover absolute inset-0 hidden sm:block transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="hidden sm:flex items-center gap-3 absolute left-8 lg:left-14 bottom-8">
        <span className="label-caption !text-white/80">
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <span className="w-8 border-t border-white/50" />
      </div>
    </>
  );
}
