import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daeun Ceramic",
    short_name: "Daeun Ceramic",
    description: "사소한 일상에 특별함을 더하는 핸드메이드 도자기. 다은 세라믹입니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FFFFFF",
    icons: [],
  };
}
