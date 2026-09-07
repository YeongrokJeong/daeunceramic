// 실제 작품 사진이 준비되기 전까지 사용하는 플레이스홀더 그라디언트 팔레트.
// 도자기의 흙, 유약 색을 모티브로 한 8가지 웜톤 조합입니다.
// 실제 사진으로 교체할 때는 WorkImage 컴포넌트의 img 태그만 살리면 됩니다.

export const placeholderPalettes = [
  ["#F3E6D8", "#D8B08C"], // 백자유 / 아이보리-샌드
  ["#E8D9C5", "#C9A788"], // 모래빛 무광
  ["#EFE6D8", "#CBB89A"], // 오트밀 매트
  ["#D9A98A", "#B5714A"], // 무유 소성 / 테라코타
  ["#C9D3C0", "#8FA189"], // 세이지 그린
  ["#F3EAE0", "#E0CBB0"], // 크림 화이트
  ["#B9AFA6", "#6E645B"], // 차콜 매트
  ["#D3A98F", "#A66647"], // 러스트 브라운
] as const;

export function getPalette(index: number) {
  return placeholderPalettes[index % placeholderPalettes.length];
}
