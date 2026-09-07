import Link from "next/link";

// 레퍼런스의 헤더(로고 + 서브타이틀)를 따름. WORK/COLLECTION/ABOUT/CONTACT 같은
// 내비게이션은 실제 콘텐츠(작가 소개, 연락처 등)가 없는 상태라 지어내지 않고 뺐다.
// 실제 소개/연락처 정보가 생기면 여기에 내비게이션을 추가하면 된다.
export default function SiteHeader() {
  return (
    <header className="px-5 sm:px-8 py-4 sm:py-5 flex items-baseline justify-between max-w-5xl mx-auto w-full">
      <Link href="/" className="leading-none">
        <span className="font-display text-base sm:text-lg tracking-wide">
          이다은
        </span>
        <span className="block label-caption mt-0.5">CERAMICS / OBJECTS</span>
      </Link>
    </header>
  );
}
