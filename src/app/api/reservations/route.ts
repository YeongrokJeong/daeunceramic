import { NextResponse } from "next/server";
import { z } from "zod";
import { insertReservation } from "@/lib/db";
import { sendReservationSms } from "@/lib/solapi";
import { getWorkBySlug } from "@/lib/works";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요.").max(50),
  phone: z
    .string()
    .trim()
    .regex(/^01[0-9]-?\d{3,4}-?\d{4}$/, "휴대폰 번호 형식을 확인해주세요."),
  workSlug: z.string().min(1),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." },
      { status: 400 }
    );
  }

  const work = getWorkBySlug(parsed.data.workSlug);
  if (!work) {
    return NextResponse.json({ error: "존재하지 않는 작품입니다." }, { status: 404 });
  }

  const phone = parsed.data.phone.replace(/-/g, "");

  const reservationInput = {
    name: parsed.data.name,
    phone,
    workId: work.id,
    workTitle: work.title,
    quantity: 1,
  };

  try {
    await insertReservation(reservationInput);
  } catch (err) {
    console.error("[reservations] DB insert failed", err);
    return NextResponse.json(
      { error: "예약 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }

  try {
    await sendReservationSms(reservationInput);
  } catch (err) {
    // 문자 발송 실패는 예약 저장 자체를 막지 않는다. 로그만 남긴다.
    console.error("[reservations] SMS send failed", err);
  }

  return NextResponse.json({ ok: true });
}
