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

export async function insertReservation(input: ReservationInput) {
  const sql = getSql();
  await ensureTable();
  const rows = await sql`
    INSERT INTO reservations (name, phone, work_id, work_title, quantity, message)
    VALUES (${input.name}, ${input.phone}, ${input.workId}, ${input.workTitle}, ${input.quantity}, ${input.message ?? null})
    RETURNING id, created_at
  `;
  return rows[0] as { id: number; created_at: string };
}
