# 이다은 도자기 — 판매예약 사이트

공공마켓 부스 QR코드로 유입되는 임시 판매예약 페이지입니다.
PG 결제 없이, 구매자가 이름/연락처를 남기면 작가가 직접 연락해 판매합니다.

## 기능

- 무한 스크롤 갤러리(홈) + 작품 상세 페이지
- 상세 페이지의 "예약하기" 폼 → `/api/reservations`
  - Neon(Postgres)에 예약 저장
  - Solapi로 판매자(작가) 휴대폰에 즉시 문자 발송
- 모바일 우선 반응형 (웹앱 매니페스트 포함)

## 로컬 실행

```bash
npm install
npm run dev
```

`.env.local`에 아래 값을 채워야 예약 저장/문자 발송이 동작합니다. (`.env.example` 참고)

```
DATABASE_URL=            # Neon connection string
SOLAPI_API_KEY=
SOLAPI_API_SECRET=
SOLAPI_SENDER_PHONE=     # Solapi에 등록된 발신번호
SELLER_PHONE=            # 예약 알림 받을 작가님 번호
```

값이 비어 있으면 DB 저장/문자 발송 단계에서 에러 또는 스킵 로그가 남습니다(개발 중 확인용).

## 작품 데이터 교체

`src/lib/works.ts`의 `works` 배열이 전부입니다. 실제 사진/설명이 준비되면:

1. 사진을 `public/works/`에 넣고
2. `WorkImage` 컴포넌트 대신 `<Image src={...} />`로 교체 (지금은 플레이스홀더 그라디언트)
3. `works.ts`의 title/price/description 등을 실데이터로 수정

## 배포 (Vercel)

1. GitHub 저장소 생성 후 push
2. Vercel에서 저장소 import
3. Vercel 프로젝트 Settings > Environment Variables에 위 4개 값 등록
4. Neon 프로젝트 생성 후 `DATABASE_URL` 연결 (테이블은 첫 예약 요청 시 자동 생성됩니다)
5. Solapi 콘솔에서 발신번호 사전 등록 + API Key 발급 후 등록

## 디자인

도자기 흙/유약 색을 모티브로 한 웜톤 팔레트(테라코타 · 아이보리 · 세이지), Noto Serif KR(제목) + Noto Sans KR(본문) 조합을 사용했습니다.
