// 실제 작품 사진이 준비되기 전까지 사용하는 플레이스홀더 그라디언트 팔레트.
// DAEUN LEE 레퍼런스가 색을 거의 안 쓰고 무채색+청화백자 사진 톤만 쓰길래,
// 예전의 테라코타 웜톤 대신 그레이스케일 중심 8단계로 바꿈.
// 실제 사진으로 교체할 때는 WorkImage 컴포넌트의 img 태그만 살리면 됩니다.

export const placeholderPalettes = [
  ["#EDECE8", "#D6D4CD"],
  ["#E3E2DD", "#C7C5BD"],
  ["#DAD9D3", "#BAB8AF"],
  ["#D1D0C9", "#ADABA1"],
  ["#E7E6E1", "#CECCC4"],
  ["#DCDBD5", "#C1BFB6"],
  ["#D6D5CF", "#B4B2A8"],
  ["#E0DFD9", "#C4C2B9"],
] as const;

export function getPalette(index: number) {
  return placeholderPalettes[index % placeholderPalettes.length];
}
