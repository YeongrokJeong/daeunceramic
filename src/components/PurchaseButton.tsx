"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import ReservationForm from "@/components/ReservationForm";
import { trackEvent } from "@/lib/analytics";

// "구매하기" 버튼. 현장 즉흥 구매를 유도해야 하는 상황이라, 테두리만 있던
// 절제된 스타일 대신 처음부터 색이 채워진 진한 버튼으로 눈에 잘 띄게 한다.
export default function PurchaseButton({
  workSlug,
  soldOut,
  fullWidth = false,
}: {
  workSlug: string;
  soldOut?: boolean;
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const width = fullWidth ? "w-full" : "w-full sm:w-auto sm:px-8";

  // 모바일 하단 고정 바와 본문 버튼이 같은 컴포넌트라 fullWidth로 위치도 구분해 남긴다.
  const handleOpen = (mode: "purchase" | "inquiry") => {
    trackEvent("purchase_click", {
      work_slug: workSlug,
      mode,
      placement: fullWidth ? "sticky_bar" : "inline",
    });
    setOpen(true);
  };

  if (soldOut) {
    return (
      <>
        <button
          type="button"
          onClick={() => handleOpen("inquiry")}
          className={`${width} border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] py-4 text-base font-medium tracking-wide transition-colors cursor-pointer`}
        >
          주문제작 문의 →
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title="제작문의">
          <ReservationForm workSlug={workSlug} mode="inquiry" />
        </Modal>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpen("purchase")}
        className={`${width} bg-[var(--color-ink)] text-[var(--color-bg)] hover:opacity-90 py-4 text-base font-medium tracking-wide transition-opacity cursor-pointer shadow-sm`}
      >
        구매하기 →
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="구매하기">
        <ReservationForm workSlug={workSlug} />
      </Modal>
    </>
  );
}
