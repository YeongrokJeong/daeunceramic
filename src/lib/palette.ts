// 실제 작품 사진이 준비되기 전까지 사용하는 플레이스홀더 그라디언트 팔레트.
// DAEUN LEE 레퍼런스가 색을 거의 안 쓰고 무채색+청화백자 사진 톤만 쓰길래,
// 예전의 테라코타 웜톤 대신 그레이스케일 중심 8단계로 바꿈.
// 실제 사진으로 교체할 때는 WorkImage 컴포넌트의 img 태그만 살리면 됩니다.

// 살짝 쿨톤(블루그레이)을 섞어 화면에 따라 누렇게 보이는 걸 방지.
export const placeholderPalettes = [
  ["#F1F2F3", "#DCDEE1"],
  ["#EBECEE", "#D2D4D8"],
  ["#E5E6E9", "#C8CACF"],
  ["#DFE1E4", "#BEC0C6"],
  ["#EEEFF1", "#D7D9DC"],
  ["#E8E9EB", "#CDCFD3"],
  ["#E2E3E6", "#C3C5CA"],
  ["#ECEDEF", "#D4D6D9"],
] as const;

export function getPalette(index: number) {
  return placeholderPalettes[index % placeholderPalettes.length];
}
