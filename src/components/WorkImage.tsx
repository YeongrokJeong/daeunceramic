import Image from "next/image";
import { getPalette } from "@/lib/palette";

// 실제 사진(work.image)이 있으면 그 사진을, 없으면 그라디언트 플레이스홀더를 보여준다.
export default function WorkImage({
  paletteIndex,
  title,
  image,
  className,
}: {
  paletteIndex: number;
  title: string;
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

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
