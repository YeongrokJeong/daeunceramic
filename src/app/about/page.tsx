import ExhibitionPhotoGrid from "@/components/ExhibitionPhotoGrid";

export const metadata = {
  title: "About | DeL Objects",
};

// 전시 현장/작업 사진(사용자 제공, 실제 사진).
const EXHIBITION_PHOTOS = [
  "/about/exhibition-01.jpg",
  "/about/exhibition-02.jpg",
  "/about/exhibition-03.jpg",
];

// 작가 소개 문구(작가님 제공, 실제 텍스트).

// 전시 이력(사용자 제공, 실제 정보). 연도별로 묶고, 장소는 옅은 톤으로
// 제목 옆에 붙여 담백하게 보여준다.
const EXHIBITIONS = [
  {
    year: "2026",
    items: [
      {
        title: "성신여자대학교 대학원 단체전 '여름조각'",
        venue: "인사1010, 인사동",
      },
    ],
  },
  {
    year: "2019",
    items: [
      { title: "'일상도예' 판매전 작가 참가", venue: "얀앤홉 갤러리, 위례신도시" },
    ],
  },
  {
    year: "2018",
    items: [
      {
        title: "도자 공예 졸업 전시",
        venue: "성신여자대학교 공예과, B.A.",
      },
      { title: "전국 여류 도예 공모전 '특선'" },
      { title: "공예트렌드페어 부스 'DAMI' 참가", venue: "COEX, 삼성동" },
    ],
  },
  {
    year: "2017",
    items: [
      { title: "공예트렌드페어 부스 'DAMI' 참가", venue: "COEX, 삼성동" },
      {
        title: "서울 유니브 엑스포 Seoul Univ Expo 참가",
        venue: "광화문",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">ABOUT</p>

      <div className="mt-8 max-w-md">
        <p className="font-display text-lg">이다은 | Daeun Lee</p>
        <p className="label-caption mt-1">CERAMIC ARTIST</p>

        <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)]">
          디지털 기술과 흙이 만나는 지점을 탐구합니다. 정밀하게 설계한
          형태에 흙과 색이 만들어내는 우연한 흐름, 손으로 그린 선을
          더하며 기술과 수공예가 어우러지는 방식을 찾아갑니다.
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
                    <p
                      key={item.title}
                      className="text-[var(--color-ink)] leading-relaxed"
                    >
                      {item.title}
                      {item.venue && (
                        <span className="text-[var(--color-ink-soft)]">
                          {" "}
                          · {item.venue}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ExhibitionPhotoGrid photos={EXHIBITION_PHOTOS} />
    </main>
  );
}
