import Image from "next/image";
import { getPalette } from "@/lib/palette";

// 실제 사진(work.image)이 있으면 그 사진을, 없으면 그라디언트 플레이스홀더를 보여준다.
export default function WorkImage({
  paletteIndex,
  title,
  image,
  fit = "contain",
  sizes = "(min-width: 640px) 33vw, 50vw",
  className,
}: {
  paletteIndex: number;
  title: string;
  image?: string;
  fit?: "contain" | "cover";
  sizes?: string;
  className?: string;
}) {
  if (image) {
    // 상품 사진은 비율이 제각각이라 object-cover로 채우면 좌우/상하가 잘린다.
    // 카드/상세페이지는 object-contain으로 전체 제품이 보이게 하고, 남는
    // 여백은 배경색으로 채운다(레터박스). 히어로 배너처럼 잘려도 괜찮은
    // 곳만 fit="cover"로 넘긴다.
    // sizes는 실제 화면에 표시되는 폭에 맞게 호출하는 쪽에서 넘겨야
    // next/image가 꼭 맞는 크기의 이미지를 받아온다(안 맞으면 필요 이상
    // 큰 원본을 받아와 느려짐 - Collection 리스트처럼 작게 보이는 곳에서 중요).
    return (
      <div
        className={`relative overflow-hidden bg-[var(--color-bg-soft)] ${className ?? ""}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes}
          className={fit === "cover" ? "object-cover" : "object-contain"}
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
