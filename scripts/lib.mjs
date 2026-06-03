// CalcReno — helpers, JSON-LD schema builders, and the page layout shell.
import path from "node:path";
import {
  domain,
  brand,
  site,
  lastmod,
  datePublished,
  adsenseScript,
  adsenseClient,
  navGroups,
  footerCalculatorLinks,
  footerGuideLinks,
  legalLinks,
  socialImage,
} from "./config.mjs";

/* ---------------------------------- text utils --------------------------------- */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
export function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
export function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function wordCount(html) {
  const text = stripTags(html);
  return text ? text.split(/\s+/).length : 0;
}
export function readingTime(words) {
  return Math.max(1, Math.round(words / 220));
}
export function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ---------------------------------- routing ------------------------------------ */
export function ensureTrailingSlash(route) {
  if (route === "/") return route;
  return route.endsWith("/") ? route : `${route}/`;
}
export function toFile(route) {
  if (route === "/") return "index.html";
  return `${ensureTrailingSlash(route).replace(/^\//, "")}index.html`;
}
export function canonicalUrl(route) {
  if (route === "/") return `${domain}/`;
  return `${domain}${ensureTrailingSlash(route)}`;
}
export function pageCanonical(page) {
  return page.canonical || canonicalUrl(page.route);
}
export function pageDate(page) {
  return page.dateModified || lastmod;
}
// Relative href from one output file to a route's output file (correct by depth).
export function localPageHref(fromFile, route) {
  const targetFile = toFile(route);
  const fromDir = fromFile.includes("/") ? path.posix.dirname(fromFile) : ".";
  let rel = path.posix.relative(fromDir, targetFile).replace(/\\/g, "/");
  if (!rel) return "./";
  if (rel === "index.html") return "./";
  if (rel.endsWith("/index.html")) rel = rel.slice(0, -"/index.html".length) + "/";
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}
// Relative href from one output file to a static asset at the site root.
export function localAssetHref(fromFile, assetPath) {
  const fromDir = fromFile.includes("/") ? path.posix.dirname(fromFile) : ".";
  let rel = path.posix.relative(fromDir, assetPath).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

/* ---------------------------------- breadcrumbs -------------------------------- */
export function breadcrumbsFor(page) {
  const crumbs = [{ label: "Home", route: "/" }];
  if (page.parent) crumbs.push({ label: page.parent.title, route: page.parent.route });
  if (page.route !== "/") crumbs.push({ label: page.breadcrumbLabel || page.title, route: page.route });
  return crumbs;
}
function renderBreadcrumbs(fromFile, crumbs) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      if (isLast) return `<li aria-current="page">${escapeHtml(c.label)}</li>`;
      return `<li><a href="${escapeAttr(localPageHref(fromFile, c.route))}">${escapeHtml(c.label)}</a></li>`;
    })
    .join("")}</ol></nav>`;
}

/* ---------------------------------- JSON-LD ------------------------------------ */
function buildArticleSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": page.schemaType || "Article",
    headline: page.h1,
    description: page.metaDescription || page.description,
    editor: { "@type": "Person", name: site.editor.name, url: site.editor.url, sameAs: [site.editor.url] },
    publisher: {
      "@type": "Organization",
      name: brand,
      logo: { "@type": "ImageObject", url: site.organization.logo },
    },
    mainEntityOfPage: pageCanonical(page),
    image: socialImage,
    url: pageCanonical(page),
    datePublished,
    dateModified: pageDate(page),
  };
}
function buildBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: canonicalUrl(c.route),
    })),
  };
}
function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) },
    })),
  };
}
function buildSoftwareSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web browser)",
    url: pageCanonical(page),
    description: page.metaDescription || page.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: brand, url: domain },
  };
}
function buildHomeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: `${domain}/`,
        name: brand,
        description: site.shortDescription,
        publisher: { "@id": `${domain}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        name: brand,
        url: `${domain}/`,
        email: site.email,
        logo: site.organization.logo,
        founder: { "@type": "Person", name: site.editor.name, url: site.editor.url, sameAs: [site.editor.url] },
      },
    ],
  };
}
function headSchemas(page, faqData, crumbs) {
  const blocks = [];
  if (page.route === "/") {
    blocks.push(buildHomeSchema());
  } else {
    if (page.type === "calculator") blocks.push(buildSoftwareSchema(page));
    else blocks.push(buildArticleSchema(page));
    blocks.push(buildBreadcrumbSchema(crumbs));
  }
  if (faqData && faqData.length) blocks.push(buildFaqSchema(faqData));
  return blocks
    .map((s) => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
    .join("\n    ");
}

/* ---------------------------------- shared blocks ------------------------------ */
export function adInArticle(slot = "") {
  // Static AdSense in-article unit. Placed right below calculator results / inside content.
  return `<div class="ad-slot ad-slot--in-article" aria-label="Advertisement">
        <ins class="adsbygoogle"
          style="display:block;text-align:center"
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="${adsenseClient}"${slot ? `\n          data-ad-slot="${escapeAttr(slot)}"` : ""}></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </div>`;
}
export function editorialByline(page) {
  return `<div class="byline">
          <span class="byline__avatar" aria-hidden="true">CR</span>
          <p class="byline__text"><strong>CalcReno Editorial Team</strong><br>
          <small>Reviewed ${escapeHtml(pageDate(page))} · <a href="${escapeAttr(localPageHref(toFile(page.route), "/how-we-research/"))}">How we research</a></small></p>
        </div>`;
}
function faqSection(faqData) {
  if (!faqData || !faqData.length) return "";
  return `<section class="faq panel" aria-labelledby="faq-h">
        <h2 id="faq-h">Frequently asked questions</h2>
        <div class="faq__list">
          ${faqData
            .map(
              (f) => `<details class="faq__item">
            <summary>${escapeHtml(f.q)}</summary>
            <div class="faq__answer">${f.a}</div>
          </details>`
            )
            .join("\n          ")}
        </div>
      </section>`;
}

/* ---------------------------------- layout ------------------------------------- */
export function pageShell(page, innerHtml) {
  const fromFile = toFile(page.route);
  const crumbs = breadcrumbsFor(page);
  const title = page.metaTitle || `${page.title} | ${brand}`;
  const metaDescription = page.metaDescription || page.description;
  const faqData = Array.isArray(page.faqs) ? page.faqs : [];
  // The 404 page is written to /404.html (root) but served at arbitrary URL depths,
  // so it must use absolute root paths for all assets and links.
  const useAbs = page.route === "/404/";
  const A = (asset) => (useAbs ? `/${asset}` : localAssetHref(fromFile, asset));
  const L = (route) => (useAbs ? (route === "/" ? "/" : ensureTrailingSlash(route)) : localPageHref(fromFile, route));
  const cssHref = A("styles.css");
  const mainJsHref = A("main.js");
  const faviconSvg = A("assets/icons/favicon.svg");
  const logoHref = A("assets/icons/logo.svg");
  const canonical = pageCanonical(page);
  const words = wordCount(innerHtml);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttr(metaDescription)}">
    <link rel="canonical" href="${escapeAttr(canonical)}">
    <meta name="robots" content="${escapeAttr(page.robots || "index, follow")}">
    <link rel="icon" type="image/svg+xml" href="${escapeAttr(faviconSvg)}">
    <link rel="mask-icon" href="${escapeAttr(faviconSvg)}" color="#17120b">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&display=swap">
    <link rel="stylesheet" href="${escapeAttr(cssHref)}">
    ${adsenseScript}
    ${headSchemas(page, faqData, crumbs)}
    <meta property="og:type" content="${escapeAttr(page.route === "/" ? "website" : "article")}">
    <meta property="og:site_name" content="${escapeAttr(brand)}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(metaDescription)}">
    <meta property="og:url" content="${escapeAttr(canonical)}">
    <meta property="og:image" content="${escapeAttr(socialImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(title)}">
    <meta name="twitter:description" content="${escapeAttr(metaDescription)}">
    <meta name="twitter:image" content="${escapeAttr(socialImage)}">
    <meta name="theme-color" content="#17120b">
    <script src="${escapeAttr(mainJsHref)}" defer></script>
    ${page.type === "calculator" ? `<script src="${escapeAttr(A("calc.js"))}" defer></script>` : ""}
  </head>
  <body data-page-type="${escapeAttr(page.type || "page")}">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap site-header__inner">
        <a class="brand" href="${escapeAttr(L("/"))}" aria-label="${escapeAttr(brand)} home">
          <img src="${escapeAttr(logoHref)}" alt="" width="34" height="34" aria-hidden="true">
          <span class="brand__name">Calc<strong>Reno</strong></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
        <nav class="site-nav" id="primary-nav" aria-label="Primary">
          ${navGroups
            .map(([label, route]) => `<a href="${escapeAttr(L(route))}"${page.route === route ? ' aria-current="page"' : ""}>${escapeHtml(label)}</a>`)
            .join("\n          ")}
        </nav>
      </div>
    </header>
    <main id="main">
      ${page.route !== "/" && !useAbs ? `<div class="wrap">${renderBreadcrumbs(fromFile, crumbs)}</div>` : ""}
      ${innerHtml}
      ${faqSection(faqData)}
    </main>
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <section class="footer-about">
          <a class="brand brand--footer" href="${escapeAttr(L("/"))}">
            <img src="${escapeAttr(logoHref)}" alt="" width="30" height="30" aria-hidden="true">
            <span class="brand__name">Calc<strong>Reno</strong></span>
          </a>
          <p>${escapeHtml(site.description)}</p>
          <p class="footer-disclaimer">${escapeHtml(site.disclaimer)}</p>
        </section>
        <section>
          <h2>Calculators</h2>
          <ul>${footerCalculatorLinks
            .map(([label, route]) => `<li><a href="${escapeAttr(L(route))}">${escapeHtml(label)}</a></li>`)
            .join("")}</ul>
        </section>
        <section>
          <h2>Guides</h2>
          <ul>${footerGuideLinks
            .map(([label, route]) => `<li><a href="${escapeAttr(L(route))}">${escapeHtml(label)}</a></li>`)
            .join("")}</ul>
        </section>
        <section>
          <h2>CalcReno</h2>
          <ul>${legalLinks
            .map(([label, route]) => `<li><a href="${escapeAttr(L(route))}">${escapeHtml(label)}</a></li>`)
            .join("")}
            <li><a href="mailto:${escapeAttr(site.email)}">${escapeHtml(site.email)}</a></li>
          </ul>
        </section>
      </div>
      <div class="wrap footer-legal">
        <p>&copy; ${new Date().getFullYear()} ${escapeHtml(brand)}. Calculator results are estimates for planning only, not professional quotes. Made for U.S. homeowners.</p>
      </div>
    </footer>
    <div class="cookie-banner" data-cookie-banner hidden>
      <p>We use only essential cookies plus optional analytics and ad measurement. You can accept or reject the non-essential layer.</p>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn--ghost" data-cookie-action="reject">Reject non-essential</button>
        <button type="button" class="btn btn--primary" data-cookie-action="accept">Accept</button>
      </div>
    </div>
  </body>
</html>`;
}

export { faqSection };
