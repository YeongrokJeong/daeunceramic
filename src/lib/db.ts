import { neon } from "@neondatabase/serverless";

// DATABASE_URL은 Neon 콘솔에서 발급받은 connection string입니다.
// Vercel 프로젝트 환경변수 / 로컬 .env.local 에 설정하세요.
function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL이 설정되지 않았습니다. .env.local에 Neon connection string을 추가하세요."
    );
  }
  return neon(url);
}

let ensured = false;

// 테이블이 없으면 생성합니다. 별도 마이그레이션 도구 없이 임시 사이트용으로 단순하게 처리합니다.
async function ensureTable() {
  if (ensured) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      work_id TEXT NOT NULL,
      work_title TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      message TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  // 작품이 전부 1점 한정(원오리지널)이라, 같은 작품에 대한 예약은 딱 하나만
  // 허용한다. 마켓 당일 여러 명이 동시에 같은 작품을 신청해 생기는
  // 오버셀(중복 예약)을 DB 레벨에서 막기 위한 유니크 인덱스.
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS reservations_work_id_unique
    ON reservations (work_id)
  `;
  ensured = true;
}

export type ReservationInput = {
  name: string;
  phone: string;
  workId: string;
  workTitle: string;
  quantity: number;
  message?: string;
};

// work_id 유니크 인덱스 위반(이미 그 작품에 예약이 존재) 시 던지는 전용 에러.
// route.ts에서 이 에러를 잡아 "이미 예약된 작품입니다" 안내로 바꿔준다.
export class DuplicateReservationError extends Error {
  constructor() {
    super("이 작품은 이미 예약이 진행 중입니다.");
    this.name = "DuplicateReservationError";
  }
}

export async function insertReservation(input: ReservationInput) {
  const sql = getSql();
  await ensureTable();
  try {
    const rows = await sql`
      INSERT INTO reservations (name, phone, work_id, work_title, quantity, message)
      VALUES (${input.name}, ${input.phone}, ${input.workId}, ${input.workTitle}, ${input.quantity}, ${input.message ?? null})
      RETURNING id, created_at
    `;
    return rows[0] as { id: number; created_at: string };
  } catch (err) {
    // Postgres unique_violation
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code?: string }).code === "23505"
    ) {
      throw new DuplicateReservationError();
    }
    throw err;
  }
}
