import CollectionPhotoGrid from "@/components/CollectionPhotoGrid";
import type { Work } from "@/lib/works";

// COLLECTION 화면: 인스타그램 프로필처럼 사진을 3열 그리드로 모아 미리 볼 수
// 있게 한다(실제 렌더링/스크롤 복원 로직은 CollectionPhotoGrid 참고).
export default function CollectionGrid({ works }: { works: Work[] }) {
  return <CollectionPhotoGrid works={works} />;
}
