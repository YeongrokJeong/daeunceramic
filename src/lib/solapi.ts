import { SolapiMessageService } from "solapi";
import type { ReservationInput } from "@/lib/db";

// Solapi 발신 설정
// - SOLAPI_API_KEY / SOLAPI_API_SECRET: Solapi 콘솔 > API Key 관리에서 발급
// - SOLAPI_SENDER_PHONE: Solapi에 사전 등록(070/휴대폰 등)된 발신번호
// - SELLER_PHONE: 예약 알림을 받을 판매자(이다은 작가님) 휴대폰 번호
export async function sendReservationSms(input: ReservationInput) {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const senderPhone = process.env.SOLAPI_SENDER_PHONE;
  const sellerPhone = process.env.SELLER_PHONE;

  if (!apiKey || !apiSecret || !senderPhone || !sellerPhone) {
    console.warn(
      "[solapi] 환경변수가 설정되지 않아 문자 발송을 건너뜁니다. (.env.local 확인)"
    );
    return { skipped: true as const };
  }

  const messageService = new SolapiMessageService(apiKey, apiSecret);

  const text = buildMessageText(input);

  const result = await messageService.send({
    to: sellerPhone,
    from: senderPhone,
    text,
  });

  return { skipped: false as const, result };
}

function buildMessageText(input: ReservationInput) {
  return [
    "[이다은 도자기 판매예약]",
    `상품: ${input.workTitle}`,
    `수량: ${input.quantity}개`,
    `이름: ${input.name}`,
    `연락처: ${input.phone}`,
    input.message ? `메모: ${input.message}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}
