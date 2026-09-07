import WorkImage from "@/components/WorkImage";

export const metadata = {
  title: "About | 이다은 도자기",
};

// 작가 소개 문구/키워드는 placeholder — 형식만 잡아둔 상태.
// 작가님께 실제 소개글을 받으면 아래 텍스트만 교체하면 됩니다.
const KEYWORDS = ["Ceramics", "Objects", "Editions"];

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

          <div className="mt-6 flex flex-wrap gap-3">
            {KEYWORDS.map((k) => (
              <span key={k} className="label-caption">
                {k}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-2 border-t border-[var(--color-line)] pt-6">
            {["CV", "EXHIBITIONS", "PRESS", "STATEMENT"].map((item) => (
              <p key={item} className="label-caption">
                {item}
                <span className="text-[var(--color-ink-soft)]"> · 준비 중</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
