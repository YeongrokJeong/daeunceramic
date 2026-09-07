import WorkImage from "@/components/WorkImage";

export const metadata = {
  title: "About | Daeun Ceramic",
};

// 작가 소개 문구는 placeholder — 형식만 잡아둔 상태.
// 작가님께 실제 소개글을 받으면 아래 텍스트만 교체하면 됩니다.

// 전시 이력(사용자 제공, 실제 정보). 연도별로 묶어서 표시.
const EXHIBITIONS = [
  { year: "2026", items: ["성신여자대학교 대학원 단체전 '여름조각'"] },
  { year: "2019", items: ["'일상도예' 판매전 작가 참가"] },
  {
    year: "2018",
    items: ["도자 공예 졸업 전시", "전국 여류 도예 공모전 '특선'"],
  },
  {
    year: "2017",
    items: ["공예트렌드페어 부스 참가", "서울 유니브 엑스포 SeoulUnivExpo 참가"],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">ABOUT</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-8 sm:gap-16 items-start">
        <div className="aspect-[4/5] overflow-hidden">
          <WorkImage paletteIndex={2} title="" className="h-full w-full" />
        </div>

        <div>
          <p className="font-display text-lg">이다은</p>
          <p className="label-caption mt-1">CERAMIC ARTIST</p>

          <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
            흙이 만들어내는 우연한 형태와 흐름에 관심을 두고 작업하는 도자
            작가입니다. 손물레로 성형한 그릇과 오브제를 통해, 정형화되지
            않은 자연스러운 아름다움을 일상 속에 담고자 합니다.
          </p>

          <div className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="label-caption">EXHIBITIONS</p>
            <div className="mt-4 space-y-4">
              {EXHIBITIONS.map((ex) => (
                <div key={ex.year} className="flex gap-4 text-sm">
                  <span className="w-12 shrink-0 text-[var(--color-ink-soft)]">
                    {ex.year}
                  </span>
                  <div className="space-y-1">
                    {ex.items.map((item) => (
                      <p key={item} className="text-[var(--color-ink)] leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="label-caption">
              CV
              <span className="text-[var(--color-ink-soft)]"> · 준비 중</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
