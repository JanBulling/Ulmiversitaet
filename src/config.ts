export const siteConfig = {
  title: "Ulmiversität",
  description: "Übersicht über die Uni Web-Infrastruktur",
  keywords: ["Uni", "Ulm", "Ulm University", "Web-Infrastruktur"],
  url: "https://ulmiversität.de",
  ogImage: "https://ulmiversität.de/og",
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const headerLinks = [
  { text: "Home", href: "/" },
  { text: "Politik", href: "/uni-politik" },
  { text: "Navigation", href: "/navigation" },
];
