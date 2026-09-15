import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeL Objects",
    short_name: "DeL Objects",
    description: "사소한 일상에 특별함을 더하는 핸드메이드 도자기, DeL Objects입니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#cdcac4",
    theme_color: "#cdcac4",
    icons: [],
  };
}
