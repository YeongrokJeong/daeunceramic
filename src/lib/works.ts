// 작가의 작품 데이터.
// 실제 사진(public/works/product-XX.jpg)을 기준으로 구성했습니다. 상품명/가격/
// 사이즈/설명 문구는 정확한 정보를 몰라 사진에 맞춰 임의로 채운 값이니, 작가님이
// 확인한 실제 정보로 자유롭게 고쳐도 됩니다.

export const CATEGORIES = [
  "CUPS & MUGS",
  "BOWLS & PLATES",
  "VASES & JARS",
  "OBJECTS",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Work = {
  id: string;
  slug: string;
  title: string;
  price: number; // KRW
  shortDescription: string;
  description: string;
  dimensions: string; // e.g. "지름 12cm x 높이 8cm"
  glaze: string; // 유약/색감
  paletteIndex: number; // image가 없을 때 쓰는 플레이스홀더 그라디언트 선택용
  image?: string; // public/ 기준 실제 상품 사진 경로
  category: Category; // 형태 기준 자동 분류 (COLLECTION 페이지 필터용)
  soldOut?: boolean;
  material: string; // 재질
  microwaveSafe: boolean; // 전자레인지 사용 가능 여부
  dishwasherSafe: boolean; // 식기세척기 사용 가능 여부
  careNote: string; // 사용/관리 주의사항
};

// 핸드메이드 도자기 전반에 적용되는 보수적인 기본값.
// 작가님이 특정 작품에 대해 실제로 확인한 내용이 있으면 아래 works 배열에서
// 해당 작품에 material/microwaveSafe/dishwasherSafe/careNote를 직접 덮어써주세요.
const DEFAULT_MATERIAL = "도자기 (핸드메이드)";
const DEFAULT_CARE_NOTE =
  "급격한 온도 변화에 약해요. 전자레인지·식기세척기 사용은 권장하지 않으며, 중성세제로 부드럽게 손세척해주세요.";

type WorkInput = Omit<
  Work,
  "material" | "microwaveSafe" | "dishwasherSafe" | "careNote"
> &
  Partial<
    Pick<Work, "material" | "microwaveSafe" | "dishwasherSafe" | "careNote">
  >;

const rawWorks: WorkInput[] = [
  {
    id: "1",
    slug: "marble-diamond-tumbler-01",
    title: "마블 다이아몬드 텀블러",
    price: 34000,
    shortDescription: "마블 유약 다이아몬드 컷 텀블러",
    description:
      "손으로 성형한 텀블러에 다이아몬드 모양으로 마블(대리석 무늬) 유약을 넣어 포인트를 준 작품입니다. 흐르는 무늬는 한 점씩 조금씩 달라요.",
    dimensions: "지름 8cm x 높이 11cm",
    glaze: "마블 유약 (라벤더 톤)",
    paletteIndex: 0,
    image: "/works/product-01.jpg",
    category: "CUPS & MUGS",
  },
  {
    id: "2",
    slug: "marble-diamond-tumbler-02",
    title: "마블 다이아몬드 텀블러 (그레이)",
    price: 34000,
    shortDescription: "그레이 톤 마블 다이아몬드 텀블러",
    description:
      "같은 시리즈의 텀블러로, 다이아몬드 모양 창 안에 짙은 그레이·네이비 톤 마블 유약을 넣었습니다.",
    dimensions: "지름 8cm x 높이 11cm",
    glaze: "마블 유약 (그레이 톤)",
    paletteIndex: 1,
    image: "/works/product-02.jpg",
    category: "CUPS & MUGS",
  },
  {
    id: "3",
    slug: "marble-diamond-set",
    title: "마블 다이아몬드 컵&접시 세트",
    price: 68000,
    shortDescription: "텀블러 1개 + 컵 2개 + 타원 접시 세트",
    description:
      "같은 마블 다이아몬드 라인의 텀블러, 컵 2개, 타원형 접시로 구성된 세트입니다. 선물용으로도 좋아요.",
    dimensions: "텀블러 지름 8cm x 높이 11cm 외 세트 구성",
    glaze: "마블 유약 (그레이 톤)",
    paletteIndex: 2,
    image: "/works/product-03.jpg",
    category: "OBJECTS",
  },
  {
    id: "4",
    slug: "blue-white-vine-plate",
    title: "청화 넝쿨무늬 접시",
    price: 48000,
    shortDescription: "손으로 그린 넝쿨무늬 청화 접시",
    description:
      "코발트 안료로 넝쿨무늬를 그려 넣은 청화백자 접시입니다. 크고 작은 두 사이즈가 세트로 구성되어 있습니다.",
    dimensions: "지름 25cm / 15cm (2장 세트)",
    glaze: "청화 (코발트 안료)",
    paletteIndex: 3,
    image: "/works/product-04.jpg",
    category: "BOWLS & PLATES",
  },
  {
    id: "5",
    slug: "blue-white-geometric-plate",
    title: "청화 기하학무늬 접시",
    price: 44000,
    shortDescription: "기하학 패턴이 촘촘한 청화 접시",
    description:
      "별 모양 패턴을 촘촘하게 반복해 그린 청화백자 접시입니다.",
    dimensions: "지름 25cm",
    glaze: "청화 (코발트 안료)",
    paletteIndex: 4,
    image: "/works/product-05.jpg",
    category: "BOWLS & PLATES",
  },
  {
    id: "6",
    slug: "marble-faceted-vase",
    title: "마블 각병",
    price: 58000,
    shortDescription: "각진 실루엣의 마블 무늬 병",
    description:
      "각진 면을 살려 성형한 병에 파도처럼 흐르는 마블 유약을 입혔습니다. 흙이 만들어내는 우연한 흐름이 그대로 담겨 있습니다.",
    dimensions: "지름 10cm x 높이 13cm",
    glaze: "마블 유약 (블루 톤)",
    paletteIndex: 5,
    image: "/works/product-07.jpg",
    category: "VASES & JARS",
  },
  {
    id: "7",
    slug: "blue-white-crane-plate",
    title: "청화 학 무늬 접시",
    price: 52000,
    shortDescription: "학과 연꽃을 그린 청화 접시",
    description:
      "마주 보는 학 두 마리와 연꽃, 잎을 세밀하게 그려 넣은 청화백자 접시입니다.",
    dimensions: "지름 27cm",
    glaze: "청화 (코발트 안료)",
    paletteIndex: 6,
    image: "/works/product-08.jpg",
    category: "BOWLS & PLATES",
  },
  {
    id: "8",
    slug: "marble-mini-cup",
    title: "마블 미니컵",
    price: 22000,
    shortDescription: "파스텔 톤 마블 미니컵",
    description:
      "작은 사이즈의 미니컵으로, 하나하나 다른 파스텔 톤 마블 유약이 발색되었습니다.",
    dimensions: "지름 5.5cm x 높이 5cm",
    glaze: "마블 유약 (파스텔 톤)",
    paletteIndex: 7,
    image: "/works/product-09.jpg",
    category: "CUPS & MUGS",
  },
  {
    id: "9",
    slug: "marble-swirl-bowl",
    title: "마블 스월 볼",
    price: 30000,
    shortDescription: "소용돌이 무늬 마블 볼",
    description:
      "그릇 안쪽 바닥까지 소용돌이 치듯 마블 유약이 흘러들어간 볼입니다. 테두리에는 블루 라인을 둘렀습니다.",
    dimensions: "지름 13cm x 높이 7cm",
    glaze: "마블 유약 + 블루 라인",
    paletteIndex: 0,
    image: "/works/product-10.jpg",
    category: "BOWLS & PLATES",
  },
  {
    id: "10",
    slug: "marble-saucer-set",
    title: "마블 잔받침 세트",
    price: 38000,
    shortDescription: "낮고 넓은 마블 잔받침 세트",
    description:
      "낮고 넓은 실루엣의 잔받침과, 그 위에 마블 무늬 테두리를 두른 작은 잔이 함께 구성된 세트입니다.",
    dimensions: "받침 지름 16cm, 잔 지름 6cm",
    glaze: "마블 유약",
    paletteIndex: 1,
    image: "/works/product-11.jpg",
    category: "OBJECTS",
  },
  {
    id: "11",
    slug: "marble-tea-bowl",
    title: "마블 찻잔",
    price: 28000,
    shortDescription: "둥근 실루엣의 마블 찻잔",
    description:
      "둥글게 감싸는 실루엣의 찻잔으로, 은은한 그레이 마블 라인이 표면을 감쌉니다.",
    dimensions: "지름 9cm x 높이 7cm",
    glaze: "마블 유약 (라이트 그레이)",
    paletteIndex: 2,
    image: "/works/product-13.jpg",
    category: "CUPS & MUGS",
  },
  {
    id: "12",
    slug: "marble-stripe-tumbler",
    title: "마블 스트라이프 텀블러",
    price: 32000,
    shortDescription: "틸·차콜 스트라이프 마블 텀블러",
    description: "세로로 흐르는 틸·차콜 톤 스트라이프가 매력적인 텀블러입니다.",
    dimensions: "지름 8cm x 높이 10cm",
    glaze: "마블 유약 (틸·차콜 톤)",
    paletteIndex: 3,
    image: "/works/product-14.jpg",
    category: "CUPS & MUGS",
  },
  {
    id: "13",
    slug: "blue-white-paisley-plate",
    title: "청화 페이즐리 접시",
    price: 50000,
    shortDescription: "페이즐리 문양의 청화 접시",
    description:
      "페이즐리와 꽃무늬를 대칭으로 배치해 그린 청화백자 접시입니다.",
    dimensions: "지름 27cm",
    glaze: "청화 (코발트 안료)",
    paletteIndex: 4,
    image: "/works/product-15.jpg",
    category: "BOWLS & PLATES",
  },
];

export const works: Work[] = rawWorks.map((w) => ({
  material: DEFAULT_MATERIAL,
  microwaveSafe: false,
  dishwasherSafe: false,
  careNote: DEFAULT_CARE_NOTE,
  ...w,
}));

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}
