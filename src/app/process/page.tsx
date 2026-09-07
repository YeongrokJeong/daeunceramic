import WorkImage from "@/components/WorkImage";

export const metadata = {
  title: "Process | Daeun Ceramic",
};

// 일반적인 핸드메이드 도자기 제작 공정(사용자 확인 완료). 작가님의 실제 방식과
// 다르면 STEPS만 수정하면 됩니다.
const STEPS = [
  { label: "SHAPING", ko: "성형", paletteIndex: 0 },
  { label: "TRIMMING", ko: "깎기", paletteIndex: 1 },
  { label: "BISQUE FIRING", ko: "초벌", paletteIndex: 2 },
  { label: "GLAZING", ko: "시유", paletteIndex: 3 },
  { label: "FIRING", ko: "재벌 소성", paletteIndex: 4 },
];

export default function ProcessPage() {
  return (
    <main className="flex-1 px-5 sm:px-8 py-8 sm:py-12 pb-24 max-w-5xl mx-auto w-full">
      <p className="font-display text-2xl sm:text-3xl">PROCESS</p>

      <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)] max-w-md">
        손물레로 형태를 잡고, 굽 깎기와 초벌·시유·재벌 소성을 거쳐 하나의
        그릇이 완성됩니다. 각 단계마다 생기는 미세한 우연이 작품마다 다른
        표정을 만듭니다.
      </p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-3">
        {STEPS.map((step) => (
          <div key={step.label}>
            <div className="aspect-square overflow-hidden">
              <WorkImage
                paletteIndex={step.paletteIndex}
                title=""
                className="h-full w-full"
              />
            </div>
            <p className="mt-2 label-caption">{step.label}</p>
            <p className="text-xs text-[var(--color-ink-soft)]">{step.ko}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
