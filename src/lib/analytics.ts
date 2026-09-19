// GA4 커스텀 이벤트 전송. gtag가 없으면(로컬 개발, 광고차단 등) 조용히 무시한다.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
