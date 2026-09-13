import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adeola Olude Portfolio",
    short_name: "Adeola Olude",
    description:
      "Backend-heavy full-stack engineer portfolio: systems that cannot be gamed.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#a855f7",
    icons: [],
  };
}
