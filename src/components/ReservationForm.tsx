"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

// mode="purchase": 구매 신청(재고 있는 상품). mode="inquiry": 품절된
// 1점 한정 제작품의 "같은 스타일로 제작 가능한지" 문의. 같은 폼/DB/문자
// 발송 로직을 재사용하되, 문구만 다르게 보여주고 message 필드로 구분한다.
export default function ReservationForm({
  workSlug,
  mode = "purchase",
}: {
  workSlug: string;
  mode?: "purchase" | "inquiry";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isInquiry = mode === "inquiry";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          workSlug,
          message: isInquiry ? "제작 문의(품절 상품)" : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error ??
            (isInquiry ? "문의 접수에 실패했습니다." : "예약 신청에 실패했습니다.")
        );
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isInquiry
            ? "문의 접수에 실패했습니다."
            : "예약 신청에 실패했습니다."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="font-display text-lg">
          {isInquiry ? "제작 문의가 접수되었어요" : "구매 신청이 완료되었어요"}
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
          작가님이 남겨주신 연락처로 곧 연락드릴게요.
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isInquiry && (
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
          품절된 1점 한정 제작품이에요. 같은 스타일로 제작이 가능한지
          작가님께 문의를 남겨주세요.
        </p>
      )}

      <div>
        <label htmlFor="name" className="block label-caption mb-2">
          이름
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={50}
          autoComplete="name"
          placeholder="홍길동"
          className="w-full border-b border-[var(--color-line)] bg-transparent py-2 text-base outline-none focus:border-[var(--color-ink)] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block label-caption mb-2">
          휴대폰 번호
        </label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="010-1234-5678"
          pattern="^01[0-9]-?\d{3,4}-?\d{4}$"
          title="휴대폰 번호 형식으로 입력해주세요. 예) 010-1234-5678"
          className="w-full border-b border-[var(--color-line)] bg-transparent py-2 text-base outline-none focus:border-[var(--color-ink)] transition-colors"
        />
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] disabled:opacity-50 py-3.5 text-sm tracking-wide transition-colors cursor-pointer mt-2"
      >
        {status === "submitting"
          ? isInquiry
            ? "접수 중..."
            : "신청 중..."
          : isInquiry
            ? "문의하기"
            : "신청하기"}
      </button>

      <p className="text-xs text-[var(--color-ink-soft)] text-center leading-relaxed">
        남겨주신 이름과 연락처는 {isInquiry ? "제작 문의" : "판매 안내"}{" "}
        목적으로만 사용됩니다.
      </p>
    </form>
  );
}
