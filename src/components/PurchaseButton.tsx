"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import ReservationForm from "@/components/ReservationForm";

// "구매하기" 버튼. 레퍼런스의 "INQUIRE ABOUT THIS PIECE" 버튼처럼 색 채움 없이
// 테두리만 있다가 hover 시 반전(채움)되는 절제된 스타일.
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
        className={`${width} border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] py-3.5 text-sm tracking-wide transition-colors cursor-pointer`}
      >
        구매하기 →
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="구매하기">
        <ReservationForm workSlug={workSlug} />
      </Modal>
    </>
  );
}
