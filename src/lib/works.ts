// 작가의 작품 데이터.
// 지금은 더미 데이터이며, 실제 사진/설명이 준비되면 이 배열만 교체하면 됩니다.
// image는 placeholder.ts의 팔레트를 이용한 그라디언트 플레이스홀더입니다.
// 실제 사진이 생기면 image 값을 "/works/파일명.jpg" (public/works 폴더) 형태로 바꾸세요.

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
  paletteIndex: number; // 플레이스홀더 그라디언트 선택용
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
    slug: "moon-jar-01",
    title: "달항아리 소",
    price: 68000,
    shortDescription: "은은한 유백색의 작은 달항아리",
    description:
      "손물레로 성형한 작은 달항아리입니다. 굽는 과정에서 생기는 자연스러운 비대칭이 매력이며, 은은한 유백색 유약이 공간을 밝게 채워줍니다.",
    dimensions: "지름 11cm x 높이 10cm",
    glaze: "백자유",
    paletteIndex: 0,
    category: "VASES & JARS",
    soldOut: true, // 데모: 품절 표시 확인용. 실제로 팔리기 전이면 지워주세요.
  },
  {
    id: "2",
    slug: "tumbler-sand",
    title: "샌드 텀블러",
    price: 32000,
    shortDescription: "모래빛 무광 텀블러",
    description:
      "매일 사용하기 좋은 무광 텀블러입니다. 손에 잡히는 곡선을 신경 써서 성형했고, 모래를 연상시키는 따뜻한 색감으로 마감했습니다.",
    dimensions: "지름 8cm x 높이 11cm",
    glaze: "무광 샌드베이지",
    paletteIndex: 1,
    category: "CUPS & MUGS",
  },
  {
    id: "3",
    slug: "plate-oat",
    title: "오트밀 접시",
    price: 28000,
    shortDescription: "일상에 스며드는 뉴트럴 접시",
    description:
      "어떤 음식과도 잘 어울리는 뉴트럴한 색감의 접시입니다. 살짝 올라온 테두리가 실용성을 더합니다.",
    dimensions: "지름 20cm x 높이 2.5cm",
    glaze: "오트밀 매트",
    paletteIndex: 2,
    category: "BOWLS & PLATES",
  },
  {
    id: "4",
    slug: "vase-terracotta",
    title: "테라코타 화병",
    price: 54000,
    shortDescription: "흙의 질감을 살린 화병",
    description:
      "유약을 최소화해 흙 본연의 질감과 색을 살린 화병입니다. 마른 꽃, 생화 모두 잘 어울립니다.",
    dimensions: "지름 10cm x 높이 18cm",
    glaze: "무유 소성",
    paletteIndex: 3,
    category: "VASES & JARS",
  },
  {
    id: "5",
    slug: "bowl-sage-set",
    title: "세이지 밥그릇",
    price: 24000,
    shortDescription: "차분한 세이지 톤 밥그릇",
    description:
      "매일 쓰는 밥그릇이기에 손에 편안하게 잡히는 곡률로 만들었습니다. 차분한 세이지 컬러가 포인트입니다.",
    dimensions: "지름 12cm x 높이 6.5cm",
    glaze: "세이지 그린",
    paletteIndex: 4,
    category: "BOWLS & PLATES",
  },
  {
    id: "6",
    slug: "mug-cream",
    title: "크림 머그컵",
    price: 30000,
    shortDescription: "손잡이가 편안한 머그컵",
    description:
      "매일 커피, 차를 즐기는 분들을 위한 머그컵입니다. 손잡이 각도를 여러 번 조정해 편안하게 잡히도록 만들었습니다.",
    dimensions: "지름 8.5cm x 높이 9cm",
    glaze: "크림 화이트",
    paletteIndex: 5,
    category: "CUPS & MUGS",
  },
  {
    id: "7",
    slug: "incense-holder",
    title: "인센스 홀더",
    price: 18000,
    shortDescription: "미니멀한 향꽂이",
    description:
      "군더더기 없는 형태의 향꽂이입니다. 향이 타고 남은 재가 자연스럽게 담기도록 설계했습니다.",
    dimensions: "가로 14cm x 폭 3cm",
    glaze: "차콜 매트",
    paletteIndex: 6,
    category: "OBJECTS",
  },
  {
    id: "8",
    slug: "plate-rust-small",
    title: "러스트 소접시",
    price: 16000,
    shortDescription: "포인트로 좋은 러스트 컬러",
    description:
      "디저트, 소품 등 다용도로 쓰기 좋은 소접시입니다. 러스트 컬러가 은은하게 발색되었습니다.",
    dimensions: "지름 14cm x 높이 2cm",
    glaze: "러스트 브라운",
    paletteIndex: 7,
    category: "BOWLS & PLATES",
  },
  {
    id: "9",
    slug: "vase-bud-small",
    title: "미니 꽃병",
    price: 22000,
    shortDescription: "한 송이를 위한 작은 꽃병",
    description:
      "꽃 한두 송이만 꽂아도 분위기가 사는 미니 꽃병입니다. 책상, 협탁 위 어디에나 잘 어울립니다.",
    dimensions: "지름 6cm x 높이 12cm",
    glaze: "백자유",
    paletteIndex: 0,
    category: "VASES & JARS",
  },
  {
    id: "10",
    slug: "bowl-noodle",
    title: "면 대접",
    price: 26000,
    shortDescription: "국수, 라멘에 좋은 넉넉한 대접",
    description:
      "국물 요리를 넉넉하게 담을 수 있는 대접입니다. 두께감을 살려 보온성도 챙겼습니다.",
    dimensions: "지름 16cm x 높이 8cm",
    glaze: "모래빛 무광",
    paletteIndex: 1,
    category: "BOWLS & PLATES",
  },
  {
    id: "11",
    slug: "cup-espresso-pair",
    title: "에스프레소 잔 (2인조)",
    price: 36000,
    shortDescription: "소중한 사람과 나누는 잔",
    description:
      "작은 사이즈지만 존재감 있는 에스프레소 잔입니다. 2개가 한 쌍으로 구성되어 선물용으로도 좋습니다.",
    dimensions: "지름 6cm x 높이 5.5cm (2개)",
    glaze: "오트밀 매트",
    paletteIndex: 2,
    category: "CUPS & MUGS",
  },
  {
    id: "12",
    slug: "tray-terracotta",
    title: "테라코타 트레이",
    price: 40000,
    shortDescription: "소품 정리에 좋은 트레이",
    description:
      "열쇠, 액세서리 등을 올려두기 좋은 트레이입니다. 낮은 테두리로 안정감 있게 담깁니다.",
    dimensions: "가로 18cm x 세로 12cm x 높이 2cm",
    glaze: "무유 소성",
    paletteIndex: 3,
    category: "OBJECTS",
  },
  {
    id: "13",
    slug: "candle-holder-sage",
    title: "세이지 캔들홀더",
    price: 20000,
    shortDescription: "은은한 조도를 위한 캔들홀더",
    description:
      "티라이트 캔들을 올려두기 좋은 사이즈입니다. 은은하게 퍼지는 빛이 공간을 따뜻하게 만들어줍니다.",
    dimensions: "지름 7cm x 높이 6cm",
    glaze: "세이지 그린",
    paletteIndex: 4,
    category: "OBJECTS",
  },
  {
    id: "14",
    slug: "mug-charcoal",
    title: "차콜 머그컵",
    price: 30000,
    shortDescription: "깊은 색감의 데일리 머그",
    description:
      "차분하고 깊은 차콜 컬러의 머그컵입니다. 무게감이 있어 안정적으로 잡힙니다.",
    dimensions: "지름 8.5cm x 높이 9.5cm",
    glaze: "차콜 매트",
    paletteIndex: 6,
    category: "CUPS & MUGS",
  },
  {
    id: "15",
    slug: "moon-jar-02",
    title: "달항아리 중",
    price: 92000,
    shortDescription: "존재감 있는 중형 달항아리",
    description:
      "이다은 작가의 시그니처인 달항아리 시리즈 중형 사이즈입니다. 공간의 중심이 되어주는 작품입니다.",
    dimensions: "지름 16cm x 높이 15cm",
    glaze: "백자유",
    paletteIndex: 7,
    category: "VASES & JARS",
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
