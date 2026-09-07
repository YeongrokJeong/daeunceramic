"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import ReservationForm from "@/components/ReservationForm";

// "구매하기" 버튼. 누르면 작은 창(모달)이 뜨고 그 안에서 이름/연락처를 입력한다.
export default function PurchaseButton({
  workSlug,
  soldOut,
}: {
  workSlug: string;
  soldOut?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (soldOut) {
    return (
      <button
        type="button"
        disabled
        className="w-full rounded-lg bg-[var(--color-bg-soft)] text-[var(--color-ink-soft)] font-normal py-3.5 text-base cursor-not-allowed"
      >
        품절되었습니다
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-normal py-3.5 text-base transition-colors cursor-pointer"
      >
        구매하기
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="구매하기">
        <ReservationForm workSlug={workSlug} />
      </Modal>
    </>
  );
}
