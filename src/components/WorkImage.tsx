import { getPalette } from "@/lib/palette";

// 실제 사진이 없을 때 쓰는 플레이스홀더.
// 나중에 사진이 준비되면 이 컴포넌트를 <img src={work.image} ... /> 로 교체하면 됩니다.
export default function WorkImage({
  paletteIndex,
  title,
  className,
}: {
  paletteIndex: number;
  title: string;
  className?: string;
}) {
  const [from, to] = getPalette(paletteIndex);
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(155deg, ${from} 0%, ${to} 100%)`,
      }}
      aria-hidden={!!title}
      role="img"
      aria-label={title}
    >
      <div className="h-full w-full flex items-center justify-center">
        <svg
          width="34%"
          height="34%"
          viewBox="0 0 64 64"
          fill="none"
          className="opacity-40"
        >
          <path
            d="M18 46c0-10 4-14 14-14s14 4 14 14"
            stroke="#1c1c1c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="32" cy="46" rx="18" ry="4" stroke="#3A2E28" strokeWidth="2" />
          <path
            d="M20 32c0-9 5.4-16 12-16s12 7 12 16"
            stroke="#1c1c1c"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
