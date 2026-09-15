"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// 페이지가 바뀔 때마다(pathname이 key로 바뀌면서) 새로 마운트되는 콘텐츠에
// 살짝 페이드인 애니메이션을 줘서, 순간적으로 툭 끊기는 전환 대신 부드럽게
// 넘어가는 느낌을 준다. prefers-reduced-motion이면 globals.css에서 전역으로
// 애니메이션 지속시간을 0에 가깝게 줄여 자동으로 꺼진다.
export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-fade flex-1 flex flex-col">
      {children}
    </div>
  );
}
