// 작가의 작품 데이터.
// 공공마켓 현장 판매용 실제 상품으로 구성했습니다. 대량생산이 가능해서
// 여러 명이 같은 디자인을 주문할 수 있습니다. 일시적으로 품절되면
// soldOut 값을 true로 바꿔주세요(정적 데이터라 수동으로 코드를 고쳐서
// 재배포해야 반영됩니다).

export const CATEGORIES = ["CUPS & MUGS"] as const;

export type Category = (typeof CATEGORIES)[number];

export type Work = {
  id: string;
  slug: string;
  title: string;
  titleEn: string; // SHOP 그리드에 좌측(영문)으로 표시
  price: number; // KRW
  shortDescription: string;
  description: string;
  dimensions: string; // e.g. "지름 12cm x 높이 8cm"
  glaze: string; // 유약/색감
  paletteIndex: number; // image가 없을 때 쓰는 플레이스홀더 그라디언트 선택용
  image?: string; // public/ 기준 실제 상품 사진 경로 (카드/리스트용 정사각 패딩 버전)
  images?: string[]; // 상세페이지 갤러리용 원본 비율 사진 목록(여백 없음). 1장 이상.
  category: Category; // 형태 기준 자동 분류 (COLLECTION 페이지 필터용)
  soldOut?: boolean;
  material: string; // 재질
  microwaveSafe: boolean; // 전자레인지 사용 가능 여부
  dishwasherSafe: boolean; // 식기세척기 사용 가능 여부
  careNote: string; // 사용/관리 주의사항
  customOrderNote?: string; // 색 조합 등 주문제작 관련 안내(있는 경우만 표시)
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
    slug: "blue-dot-glaze-latte-cup",
    title: "블루닷글레이즈 라떼컵",
    titleEn: "Blue Dot Glaze Latte Cup",
    price: 35000,
    shortDescription: "흐름유 무늬 라떼컵",
    description:
      "슬립캐스팅으로 성형해 산화소성한 라떼컵입니다. 유약이 흐르듯 번지는 '흐름유' 무늬를 넣었어요. 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 8cm x 높이 8cm",
    glaze: "흐름유",
    material: "도자기 (슬립캐스팅, 산화소성)",
    microwaveSafe: false,
    paletteIndex: 0,
    image: "/works/product-16.jpg",
    images: ["/works/product-16-detail.jpg"],
    category: "CUPS & MUGS",
  },
  {
    id: "1b",
    slug: "blue-line-latte-cup",
    title: "블루라인 라떼컵",
    titleEn: "Blue Line Latte Cup",
    price: 35000,
    shortDescription: "핸드드로잉 무늬 라떼컵",
    description:
      "슬립캐스팅으로 성형해 산화소성한 라떼컵입니다. 손으로 한 줄씩 그려 넣은 '핸드드로잉' 무늬를 넣었어요. 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 8cm x 높이 8cm",
    glaze: "핸드드로잉",
    material: "도자기 (슬립캐스팅, 산화소성)",
    paletteIndex: 4,
    image: "/works/blue-line-latte-cup.jpg",
    images: ["/works/blue-line-latte-cup.jpg"],
    category: "CUPS & MUGS",
  },
  {
    id: "2",
    slug: "nebula-cup",
    title: "성운 컵 S",
    titleEn: "Nebula Cup S",
    price: 30000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (S, 50ml)",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 별과 성운을 닮은 마블(대리석) 무늬를 채워 넣은 작품입니다. 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm (50ml)",
    glaze: "마블 유약",
    paletteIndex: 1,
    image: "/works/product-17.jpg",
    images: [
      "/works/product-17-detail.jpg",
      "/works/product-18-detail.jpg",
      "/works/product-19-detail.jpg",
    ],
    category: "CUPS & MUGS",
  },
  {
    id: "3a",
    slug: "nebula-cup-l-lavender",
    title: "성운 컵 L - 라벤더",
    titleEn: "Nebula Cup L - Lavender",
    price: 50000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (L, 200ml)",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 마블(대리석) 무늬를 채워 넣은 작품입니다. 라벤더 톤 마블 무늬이며, 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm (200ml)",
    glaze: "라벤더 마블 유약",
    paletteIndex: 2,
    image: "/works/nebula-cup-l-lavender.png",
    images: ["/works/nebula-cup-l-lavender.png"],
    category: "CUPS & MUGS",
  },
  {
    id: "3b",
    slug: "nebula-cup-l-blue",
    title: "성운 컵 L - 블루",
    titleEn: "Nebula Cup L - Blue",
    price: 50000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (L, 200ml)",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 마블(대리석) 무늬를 채워 넣은 작품입니다. 블루 톤 마블 무늬이며, 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm (200ml)",
    glaze: "블루 마블 유약",
    paletteIndex: 1,
    image: "/works/nebula-cup-l-blue.png",
    images: ["/works/nebula-cup-l-blue.png"],
    category: "CUPS & MUGS",
  },
  {
    id: "3c",
    slug: "nebula-cup-l-black",
    title: "성운 컵 L - 블랙",
    titleEn: "Nebula Cup L - Black",
    price: 50000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (L, 200ml)",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 마블(대리석) 무늬를 채워 넣은 작품입니다. 블랙 톤 마블 무늬이며, 무늬는 제품마다 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm (200ml)",
    glaze: "블랙 마블 유약",
    paletteIndex: 3,
    image: "/works/nebula-cup-l-black.png",
    images: ["/works/nebula-cup-l-black.png"],
    category: "CUPS & MUGS",
  },
];

export const works: Work[] = rawWorks.map((w) => ({
  material: DEFAULT_MATERIAL,
  microwaveSafe: true, // 블루닷글레이즈 라떼컵만 예외로 false 지정됨
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
