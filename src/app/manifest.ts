import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "이다은 도자기 판매예약",
    short_name: "이다은 도자기",
    description: "이다은 작가의 도자기 작품 판매예약 페이지",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F5F1",
    theme_color: "#F6F5F1",
    icons: [],
  };
}
