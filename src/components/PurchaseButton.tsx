"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import ReservationForm from "@/components/ReservationForm";

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

  if (soldOut) {
    return (
      <button
        type="button"
        disabled
        className={`${width} border border-[var(--color-line)] text-[var(--color-ink-soft)] py-3.5 text-sm tracking-wide cursor-not-allowed`}
      >
        SOLD OUT
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
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
