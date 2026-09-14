// 작가의 작품 데이터.
// 공공마켓 현장 판매용 실제 재고 기준으로 구성했습니다. 각 작품은 1점 한정
// 원오리지널이며, 판매되면 soldOut 값을 true로 바꿔주세요(정적 데이터라
// 수동으로 코드를 고쳐서 재배포해야 반영됩니다).

export const CATEGORIES = ["CUPS & MUGS"] as const;

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
    slug: "blue-line-latte-cup",
    title: "블루라인 라떼컵",
    price: 32000,
    shortDescription: "블루 무늬 라떼컵",
    description:
      "슬립캐스팅으로 성형해 산화소성한 라떼컵입니다. 유약이 흐르듯 번지는 '흐름유'와, 손으로 한 줄씩 그려 넣은 '핸드드로잉' 두 가지 방식의 무늬를 사진에 담았어요. 무늬는 한 점씩 조금씩 달라요.",
    dimensions: "지름 8cm x 높이 8cm",
    glaze: "흐름유 / 핸드드로잉",
    material: "도자기 (슬립캐스팅, 산화소성)",
    paletteIndex: 0,
    image: "/works/product-16.jpg",
    images: ["/works/product-16-detail.jpg", "/works/product-16b-detail.jpg"],
    category: "CUPS & MUGS",
  },
  {
    id: "2",
    slug: "nebula-cup",
    title: "성운컵",
    price: 26000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 별과 성운을 닮은 마블(대리석) 무늬를 채워 넣은 작품입니다. 무늬는 한 점씩 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm (200ml)",
    glaze: "마블 유약",
    paletteIndex: 1,
    image: "/works/product-17.jpg",
    images: [
      "/works/product-17-detail.jpg",
      "/works/product-18-detail.jpg",
      "/works/product-19-detail.jpg",
    ],
    category: "CUPS & MUGS",
    customOrderNote:
      "미니 사이즈(50ml)는 원하시는 색 조합으로 주문제작도 가능해요 · 30,000원",
  },
  {
    id: "3",
    slug: "marble-cup",
    title: "마블컵",
    price: 26000,
    shortDescription: "다이아몬드 창에 마블 무늬를 넣은 컵",
    description:
      "컵 표면에 다이아몬드 모양 창을 내고, 그 안에 마블(대리석) 무늬를 채워 넣은 작품입니다. 무늬는 한 점씩 조금씩 달라요.",
    dimensions: "지름 7cm x 높이 9cm",
    glaze: "마블 유약",
    paletteIndex: 2,
    image: "/works/product-22.jpg",
    images: [
      "/works/product-22-detail.jpg",
      "/works/product-20-detail.jpg",
      "/works/product-21-detail.jpg",
    ],
    category: "CUPS & MUGS",
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
