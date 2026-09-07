// 실제 작품 사진이 준비되기 전까지 사용하는 플레이스홀더 그라디언트 팔레트.
// DAEUN LEE 레퍼런스가 색을 거의 안 쓰고 무채색+청화백자 사진 톤만 쓰길래,
// 예전의 테라코타 웜톤 대신 그레이스케일 중심 8단계로 바꿈.
// 실제 사진으로 교체할 때는 WorkImage 컴포넌트의 img 태그만 살리면 됩니다.

export const placeholderPalettes = [
  ["#EFEFEF", "#D6D6D6"],
  ["#E6E6E6", "#C9C9C9"],
  ["#DDDDDD", "#BCBCBC"],
  ["#D4D4D4", "#AFAFAF"],
  ["#EAEAEA", "#CFCFCF"],
  ["#E0E0E0", "#C2C2C2"],
  ["#D8D8D8", "#B5B5B5"],
  ["#E3E3E3", "#C5C5C5"],
] as const;

export function getPalette(index: number) {
  return placeholderPalettes[index % placeholderPalettes.length];
}
