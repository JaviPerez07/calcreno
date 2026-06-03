// CalcReno — central site configuration.
// All content lives in the generator. Never edit the HTML output directly.

export const domain = "https://calcreno.com";
export const brand = "CalcReno";
export const lastmod = "2026-06-01";
export const datePublished = "2026-06-01";

export const adsenseClient = "ca-pub-3733223915347669";
export const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}" crossorigin="anonymous"></script>`;

export const site = {
  brand,
  domain,
  email: "javiperezguides@gmail.com",
  tagline: "Free home renovation & DIY material calculators for U.S. homeowners.",
  description:
    "CalcReno gives U.S. homeowners free, easy-to-use calculators for paint, tile, flooring, concrete, wallpaper, and full room renovation costs — all in feet, inches, gallons, and dollars.",
  shortDescription:
    "Free home improvement calculators in imperial units: paint, tile, flooring, concrete, wallpaper, and renovation cost estimates for U.S. projects.",
  organization: {
    name: "CalcReno Editorial Team",
    url: domain,
    logo: `${domain}/assets/icons/logo.svg`,
  },
  // Real editor — not an invented persona. Article byline stays "Editorial Team".
  editor: {
    name: "Javi Pérez",
    url: "https://www.linkedin.com/in/javi-perez-guides",
  },
  disclaimer:
    "CalcReno publishes free calculators and educational content for informational purposes only. All results are estimates to help you plan a project; they are not professional quotes. Always confirm quantities and costs with a licensed contractor or supplier before buying materials.",
};

export const navGroups = [
  ["Calculators", "/calculators/"],
  ["Paint", "/calculators/paint-calculator/"],
  ["Tile & Flooring", "/calculators/tile-flooring-calculator/"],
  ["Renovation Cost", "/calculators/renovation-cost-estimator/"],
  ["Guides", "/guides/"],
];

export const footerCalculatorLinks = [
  ["Paint Calculator", "/calculators/paint-calculator/"],
  ["Tile & Flooring Calculator", "/calculators/tile-flooring-calculator/"],
  ["Concrete Calculator", "/calculators/concrete-calculator/"],
  ["Wallpaper Calculator", "/calculators/wallpaper-calculator/"],
  ["Renovation Cost Estimator", "/calculators/renovation-cost-estimator/"],
];

export const footerGuideLinks = [
  ["How Much Paint Do I Need?", "/guides/how-much-paint-do-i-need/"],
  ["How Many Tiles Do I Need?", "/guides/how-many-tiles-do-i-need/"],
  ["Cost to Renovate a Room (2026)", "/guides/cost-to-renovate-a-room/"],
  ["Essential DIY Painting Tools", "/guides/essential-diy-painting-tools/"],
];

export const legalLinks = [
  ["About", "/about/"],
  ["Contact", "/contact/"],
  ["How We Research", "/how-we-research/"],
  ["Privacy Policy", "/privacy-policy/"],
  ["Disclaimer", "/disclaimer/"],
  ["HTML Sitemap", "/sitemap/"],
];

export const socialImage = `${domain}/assets/img/hero-home.jpg`;
