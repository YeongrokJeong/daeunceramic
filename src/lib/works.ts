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
  capacity?: string; // 용량 (있는 상품만 표시)
  glaze?: string; // 유약/색감 (있는 상품만 표시)
  technique?: string; // 성형/제작 기법 (있는 상품만 표시)
  firing?: string; // 소성 방식/온도 (있는 상품만 표시)
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
    title: "블루레인 라떼컵",
    titleEn: "Blue Rain Latte Cup",
    price: 35000,
    shortDescription: "크리스탈 글레이즈 라떼컵",
    description:
      "따뜻한 라떼 한 잔 하기 좋은 작은 라떼컵입니다. 투명유 위에 크리스탈 글레이즈를 더해 결정이 흐르듯 번지는 무늬를 냈어요. 무늬는 제품마다 조금씩 달라요.",
    dimensions: "Ø 80 × H 80 mm",
    capacity: "약 200 ml",
    glaze: "Clear glaze + crystal glaze",
    material: "Porcelain",
    technique: "Slip casting",
    firing: "Oxidation firing",
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
      "따뜻한 라떼 한 잔 하기 좋은 작은 라떼컵입니다. 손으로 한 줄씩 그려 넣은 '핸드드로잉' 무늬를 더했어요. 무늬는 제품마다 조금씩 달라요.",
    dimensions: "Ø 80 × H 80 mm",
    capacity: "약 200 ml",
    glaze: "Clear matte glaze",
    material: "Porcelain",
    technique: "Slip casting",
    firing: "Oxidation firing",
    paletteIndex: 4,
    image: "/works/blue-line-latte-cup.png",
    images: ["/works/blue-line-latte-cup.png"],
    category: "CUPS & MUGS",
  },
  {
    id: "2a",
    slug: "nebula-cup-s-lavender",
    title: "성운 컵 S - 라벤더",
    titleEn: "Nebula Cup S - Lavender",
    price: 30000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (S, 50ml)",
    description:
      "백자 위에 서로 다른 색의 슬립을 흘려 만든 성운 시리즈의 작은 잔입니다.\n흐르는 재료가 자연스럽게 만나며 만들어지는 무늬를 그대로 남겨, 모든 잔이 서로 다른 표정을 가집니다.",
    dimensions: "Ø 55 × H 60–65 mm",
    capacity: "약 50 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    firing: "Oxidation firing, 1250°C",
    paletteIndex: 1,
    // TODO: 라벤더 색상 전용 사진 받으면 교체 (지금은 기존 성운컵 사진 1장만 임시 사용)
    image: "/works/product-17.jpg",
    images: ["/works/product-17.jpg"],
    category: "CUPS & MUGS",
  },
  {
    id: "2b",
    slug: "nebula-cup-s-blue",
    title: "성운 컵 S - 블루",
    titleEn: "Nebula Cup S - Blue",
    price: 30000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (S, 50ml)",
    description:
      "백자 위에 서로 다른 색의 슬립을 흘려 만든 성운 시리즈의 작은 잔입니다.\n흐르는 재료가 자연스럽게 만나며 만들어지는 무늬를 그대로 남겨, 모든 잔이 서로 다른 표정을 가집니다.",
    dimensions: "Ø 55 × H 60–65 mm",
    capacity: "약 50 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    firing: "Reduction firing, 1250°C",
    paletteIndex: 1,
    image: "/works/nebula-cup-s-blue.png",
    images: ["/works/nebula-cup-s-blue.png"],
    category: "CUPS & MUGS",
    soldOut: true,
  },
  {
    id: "2c",
    slug: "nebula-cup-s-black",
    title: "성운 컵 S - 퍼플블랙",
    titleEn: "Nebula Cup S - Purple Black",
    price: 30000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (S, 50ml)",
    description:
      "백자 위에 서로 다른 색의 슬립을 흘려 만든 성운 시리즈의 작은 잔입니다.\n흐르는 재료가 자연스럽게 만나며 만들어지는 무늬를 그대로 남겨, 모든 잔이 서로 다른 표정을 가집니다.",
    dimensions: "Ø 55 × H 60–65 mm",
    capacity: "약 50 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    firing: "Oxidation firing, 1250°C",
    paletteIndex: 1,
    image: "/works/nebula-cup-s-black.png",
    images: ["/works/nebula-cup-s-black.png"],
    category: "CUPS & MUGS",
    soldOut: true,
  },
  {
    id: "2d",
    slug: "nebula-cup-s-black-gray",
    title: "성운 컵 S - 블랙",
    titleEn: "Nebula Cup S - Black",
    price: 30000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵 (S, 50ml)",
    description:
      "백자 위에 서로 다른 색의 슬립을 흘려 만든 성운 시리즈의 작은 잔입니다.\n흐르는 재료가 자연스럽게 만나며 만들어지는 무늬를 그대로 남겨, 모든 잔이 서로 다른 표정을 가집니다.",
    dimensions: "Ø 55 × H 60–65 mm",
    capacity: "약 50 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    firing: "Oxidation firing, 1250°C",
    paletteIndex: 3,
    image: "/works/nebula-cup-s-black-gray.png",
    images: ["/works/nebula-cup-s-black-gray.png"],
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
    dimensions: "Ø 70 × H 90 mm",
    capacity: "약 200 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    glaze: "라벤더 마블 유약",
    firing: "Oxidation firing, 1250°C",
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
    dimensions: "Ø 70 × H 90 mm",
    capacity: "약 200 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    glaze: "블루 마블 유약",
    firing: "Reduction firing, 1250°C",
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
    dimensions: "Ø 70 × H 90 mm",
    capacity: "약 200 ml",
    material: "Porcelain",
    technique: "Colored slip, drain casting",
    glaze: "블랙 마블 유약",
    firing: "Oxidation firing, 1250°C",
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
