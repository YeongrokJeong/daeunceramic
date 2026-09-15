"use client";

import type { ReactNode } from "react";

// next/link의 해시 링크는 같은 페이지에서 같은 해시로 두 번째 클릭할 때
// URL이 안 바뀌었다고 판단해 스크롤을 다시 실행하지 않는 경우가 있다.
// 그래서 일반 앵커 + 수동 scrollIntoView로 몇 번을 눌러도 항상 동작하게 한다.
export default function ScrollToCollectionButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#collection"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById("collection")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
