#!/usr/bin/env node
// CalcReno — static site generator. All content lives in /scripts modules.
// Run:  node generate-site.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { domain, brand, site, lastmod } from "./scripts/config.mjs";
import {
  escapeHtml,
  escapeAttr,
  toFile,
  canonicalUrl,
  localPageHref,
  localAssetHref,
  pageShell,
  editorialByline,
  pageDate,
} from "./scripts/lib.mjs";
import { calculatorPages, calculatorsHub } from "./scripts/calculators.mjs";
import { guidePages, guidesHub } from "./scripts/guides.mjs";
import { institutionalPages, homeMeta } from "./scripts/institutional.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));

/* ------------------------------- shared UI bits -------------------------------- */
const ICONS = {
  paint:
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="9" y="7" width="22" height="14" rx="3" fill="currentColor" opacity=".18"/><rect x="9" y="7" width="22" height="14" rx="3" stroke="currentColor" stroke-width="2.4"/><path d="M31 14h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-7" stroke="currentColor" stroke-width="2.4"/><path d="M24 25v6" stroke="currentColor" stroke-width="2.4"/><rect x="19" y="31" width="10" height="11" rx="2.5" fill="currentColor" opacity=".18"/><rect x="19" y="31" width="10" height="11" rx="2.5" stroke="currentColor" stroke-width="2.4"/></svg>',
  tile:
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="7" y="7" width="15" height="15" rx="2.5" fill="currentColor" opacity=".18"/><rect x="26" y="7" width="15" height="15" rx="2.5" stroke="currentColor" stroke-width="2.4"/><rect x="7" y="26" width="15" height="15" rx="2.5" stroke="currentColor" stroke-width="2.4"/><rect x="26" y="26" width="15" height="15" rx="2.5" fill="currentColor" opacity=".18"/><rect x="7" y="7" width="15" height="15" rx="2.5" stroke="currentColor" stroke-width="2.4"/><rect x="26" y="26" width="15" height="15" rx="2.5" stroke="currentColor" stroke-width="2.4"/></svg>',
  concrete:
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M7 30l17-9 17 9-17 9-17-9Z" fill="currentColor" opacity=".18"/><path d="M7 30l17-9 17 9-17 9-17-9Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M7 30v6l17 9 17-9v-6" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="20" cy="29" r="1.6" fill="currentColor"/><circle cx="28" cy="32" r="1.6" fill="currentColor"/></svg>',
  wallpaper:
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="7" width="28" height="34" rx="3" fill="currentColor" opacity=".18"/><rect x="10" y="7" width="28" height="34" rx="3" stroke="currentColor" stroke-width="2.4"/><path d="M19 7v34M29 7v34" stroke="currentColor" stroke-width="2.2"/><circle cx="14.5" cy="15" r="1.6" fill="currentColor"/><circle cx="24" cy="22" r="1.6" fill="currentColor"/><circle cx="33.5" cy="15" r="1.6" fill="currentColor"/><circle cx="14.5" cy="33" r="1.6" fill="currentColor"/><circle cx="33.5" cy="33" r="1.6" fill="currentColor"/></svg>',
  renovation:
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 40V22l16-12 16 12v18" fill="currentColor" opacity=".18"/><path d="M6 23 24 9l18 14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 21v19h30V21" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M27 40V28h-6v12" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>',
};
function icon(name) {
  return ICONS[name] || ICONS.renovation;
}

function calcCard(fromFile, card) {
  const media = card.image
    ? `<span class="mag-card__media">
              <img src="${escapeAttr(localAssetHref(fromFile, card.image))}" alt="${escapeAttr(card.title)}" width="400" height="250" loading="lazy">
              <span class="mag-card__chip" aria-hidden="true">${icon(card.icon)}</span>
            </span>`
    : "";
  return `<a class="mag-card mag-card--tool" href="${escapeAttr(localPageHref(fromFile, card.route))}">
            ${media}
            <span class="mag-card__body">
              <span class="mag-card__cat">${escapeHtml(card.category || "Calculator")}</span>
              <strong>${escapeHtml(card.title)}</strong>
              <span class="mag-card__excerpt">${escapeHtml(card.description)}</span>
              <span class="mag-card__cta" aria-hidden="true">Open calculator &rarr;</span>
            </span>
          </a>`;
}
function guideCard(fromFile, card) {
  return `<a class="guide-card" href="${escapeAttr(localPageHref(fromFile, card.route))}">
            <strong>${escapeHtml(card.title)}</strong>
            <span>${escapeHtml(card.description)}</span>
            <span class="guide-card__cta" aria-hidden="true">Read guide &rarr;</span>
          </a>`;
}
function magazineCard(fromFile, card) {
  const img = card.image
    ? `<span class="mag-card__media"><img src="${escapeAttr(localAssetHref(fromFile, card.image))}" alt="${escapeAttr(card.title)}" width="400" height="240" loading="lazy"></span>`
    : "";
  return `<a class="mag-card" href="${escapeAttr(localPageHref(fromFile, card.route))}">
            ${img}
            <span class="mag-card__body">
              <span class="mag-card__cat">${escapeHtml(card.category || "Guide")}</span>
              <strong>${escapeHtml(card.title)}</strong>
              <span class="mag-card__excerpt">${escapeHtml(card.description)}</span>
              <span class="mag-card__cta" aria-hidden="true">Read guide &rarr;</span>
            </span>
          </a>`;
}

/* ------------------------------- page renderers -------------------------------- */
function renderHome(page) {
  const fromFile = toFile(page.route);
  const heroImg = localAssetHref(fromFile, "assets/img/hero-home.jpg");
  return `
      <section class="hero">
        <div class="wrap hero__inner">
          <div class="hero__copy">
            <span class="eyebrow">Free · No sign-up · U.S. units</span>
            <h1>${escapeHtml(page.h1)}</h1>
            <p class="lede">${escapeHtml(site.description)}</p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="${escapeAttr(localPageHref(fromFile, "/calculators/"))}">Browse calculators</a>
              <a class="btn btn--ghost" href="${escapeAttr(localPageHref(fromFile, "/guides/"))}">Read the guides</a>
            </div>
            <ul class="hero__trust">
              <li>Imperial units (ft, in, gallons)</li>
              <li>Costs in USD</li>
              <li>Built-in waste allowances</li>
            </ul>
          </div>
          <div class="hero__visual">
            <img src="${escapeAttr(heroImg)}" alt="Homeowner planning a renovation project with material calculations" width="640" height="520" fetchpriority="high">
          </div>
        </div>
      </section>

      <section class="wrap section">
        <header class="section__head">
          <span class="eyebrow">The Tools</span>
          <h2>Project calculators</h2>
          <p>Know exactly how much to buy before you head to the store — paint, tile, concrete, wallpaper, and full renovation costs.</p>
        </header>
        <div class="mag-grid">
          ${calculatorsHub.cards.map((c) => calcCard(fromFile, c)).join("\n          ")}
        </div>
      </section>

      <section class="wrap section section--mag">
        <header class="section__head section__head--left section__head--row">
          <div>
            <span class="eyebrow">The Magazine</span>
            <h2>Latest guides</h2>
            <p>Cost breakdowns and how-tos that pair with every calculator.</p>
          </div>
          <a class="btn btn--ghost" href="${escapeAttr(localPageHref(fromFile, "/guides/"))}">All guides &rarr;</a>
        </header>
        <div class="mag-grid">
          ${guidesHub.cards.slice(0, 6).map((c) => magazineCard(fromFile, c)).join("\n          ")}
        </div>
      </section>

      <section class="band">
        <div class="wrap band__inner">
          <div class="value">
            <h3>Imperial-first, U.S.-focused</h3>
            <p>Every tool works in feet, inches, gallons, and pounds — the way American homeowners actually shop. Costs are in dollars.</p>
          </div>
          <div class="value">
            <h3>Estimates you can trust</h3>
            <p>We show the math behind every result and use conservative defaults, so you understand the number and don't run short mid-job.</p>
          </div>
          <div class="value">
            <h3>Waste built in</h3>
            <p>Tile, flooring, wallpaper, and concrete tools include sensible waste allowances so your shopping list reflects the real world.</p>
          </div>
        </div>
      </section>

      <section class="wrap section">
        <div class="cta-panel">
          <h2>Start with the right number</h2>
          <p>Pick a calculator, enter your room, and get an instant, shoppable estimate — free.</p>
          <a class="btn btn--primary" href="${escapeAttr(localPageHref(fromFile, "/calculators/"))}">Open the calculators</a>
        </div>
      </section>`;
}

function guideCallout(fromFile, guide) {
  if (!guide) return "";
  const href = escapeAttr(localPageHref(fromFile, guide.route));
  return `<aside class="guide-callout">
          <span class="guide-callout__icon" aria-hidden="true">📖</span>
          <div class="guide-callout__text">
            <strong>Read the full guide:</strong> <a href="${href}">${escapeHtml(guide.label)}</a>
            <span>${escapeHtml(guide.blurb)}</span>
          </div>
          <a class="btn btn--ghost" href="${href}">Read guide &rarr;</a>
        </aside>`;
}
function costBlock(cost) {
  if (!cost) return "";
  return `<section class="prose calc-extra">
          <h2>${escapeHtml(cost.heading)}</h2>
          <p>${escapeHtml(cost.intro)}</p>
          <div class="table-wrap">
            <table>
              <thead><tr>${cost.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead>
              <tbody>${cost.rows
                .map((r) => `<tr>${r.map((td) => `<td>${escapeHtml(td)}</td>`).join("")}</tr>`)
                .join("")}</tbody>
            </table>
          </div>
          ${cost.note ? `<p class="note">${escapeHtml(cost.note)}</p>` : ""}
        </section>`;
}
function mistakesBlock(items) {
  if (!items || !items.length) return "";
  return `<section class="prose calc-extra">
          <h2>Common mistakes to avoid</h2>
          <ul class="mistakes">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
        </section>`;
}
function renderCalcPage(page) {
  const fromFile = toFile(page.route);
  return `
      <article class="wrap article calc-article">
        <header class="article__head">
          <span class="eyebrow">Calculator</span>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.description)}</p>
          ${editorialByline(page)}
        </header>
        ${guideCallout(fromFile, page.guide)}
        ${page.body}
        ${costBlock(page.cost)}
        ${mistakesBlock(page.mistakes)}
        ${relatedStrip(page)}
      </article>`;
}

function renderArticle(page) {
  const fromFile = toFile(page.route);
  const headerImg = page.heroImage
    ? `<figure class="article__hero"><img src="${escapeAttr(localAssetHref(fromFile, page.heroImage))}" alt="${escapeAttr(page.h1)}" width="1000" height="563" loading="eager"></figure>`
    : "";
  return `
      <article class="wrap article">
        <header class="article__head">
          <span class="eyebrow">Guide</span>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.description)}</p>
          ${editorialByline(page)}
        </header>
        ${headerImg}
        <div class="prose">
          ${page.body}
        </div>
        ${relatedStrip(page)}
      </article>`;
}

function renderHub(page) {
  const fromFile = toFile(page.route);
  const isCalc = page.route === "/calculators/";
  const cards = isCalc
    ? page.cards.map((c) => calcCard(fromFile, c)).join("\n          ")
    : page.cards.map((c) => magazineCard(fromFile, c)).join("\n          ");
  return `
      <section class="wrap section section--hub">
        <header class="section__head section__head--left">
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lede">${escapeHtml(page.description)}</p>
        </header>
        ${page.intro ? `<div class="prose narrow hub-intro" style="margin-bottom:36px">${page.intro}</div>` : ""}
        <div class="mag-grid">
          ${cards}
        </div>
        ${isCalc ? `<div class="hub-aside"><h2>New to this?</h2><p>Start with a guide: <a href="${escapeAttr(localPageHref(fromFile, "/guides/how-much-paint-do-i-need/"))}">how much paint do I need</a>, or <a href="${escapeAttr(localPageHref(fromFile, "/guides/how-many-tiles-do-i-need/"))}">how many tiles do I need</a>.</p></div>` : `<div class="hub-aside"><h2>Ready to crunch numbers?</h2><p>Jump to the <a href="${escapeAttr(localPageHref(fromFile, "/calculators/"))}">free calculators</a>.</p></div>`}
      </section>`;
}

function renderInstitutional(page) {
  return `
      <article class="wrap article">
        <header class="article__head">
          <h1>${escapeHtml(page.h1)}</h1>
          ${page.description ? `<p class="lede">${escapeHtml(page.description)}</p>` : ""}
        </header>
        ${page.body}
      </article>`;
}

function relatedStrip(page) {
  // Cross-link calculators <-> guides.
  const pairs = {
    "/calculators/paint-calculator/": ["/guides/cost-to-paint-a-room/", "/guides/how-much-paint-do-i-need/", "/guides/essential-diy-painting-tools/"],
    "/calculators/tile-flooring-calculator/": ["/guides/tile-installation-cost/", "/guides/how-many-tiles-do-i-need/"],
    "/calculators/concrete-calculator/": ["/guides/concrete-cost-guide/", "/calculators/renovation-cost-estimator/"],
    "/calculators/wallpaper-calculator/": ["/guides/cost-to-renovate-a-room/", "/calculators/paint-calculator/", "/guides/how-much-paint-do-i-need/"],
    "/calculators/renovation-cost-estimator/": ["/guides/kitchen-renovation-budget/", "/guides/cost-to-renovate-a-room/"],
    "/guides/cost-to-paint-a-room/": ["/calculators/paint-calculator/", "/guides/how-much-paint-do-i-need/"],
    "/guides/tile-installation-cost/": ["/calculators/tile-flooring-calculator/", "/guides/how-many-tiles-do-i-need/"],
    "/guides/kitchen-renovation-budget/": ["/calculators/renovation-cost-estimator/", "/guides/cost-to-renovate-a-room/"],
    "/guides/concrete-cost-guide/": ["/calculators/concrete-calculator/", "/guides/cost-to-renovate-a-room/"],
    "/guides/how-much-paint-do-i-need/": ["/calculators/paint-calculator/", "/guides/cost-to-paint-a-room/", "/guides/essential-diy-painting-tools/"],
    "/guides/how-many-tiles-do-i-need/": ["/calculators/tile-flooring-calculator/", "/guides/tile-installation-cost/"],
    "/guides/cost-to-renovate-a-room/": ["/calculators/renovation-cost-estimator/", "/guides/kitchen-renovation-budget/"],
    "/guides/essential-diy-painting-tools/": ["/calculators/paint-calculator/", "/guides/cost-to-paint-a-room/"],
  };
  const routes = pairs[page.route];
  if (!routes) return "";
  const fromFile = toFile(page.route);
  const lookup = labelLookup();
  return `<section class="related">
          <h2>Keep going</h2>
          <div class="related__links">
            ${routes
              .map((r) => `<a href="${escapeAttr(localPageHref(fromFile, r))}">${escapeHtml(lookup[r] || r)} &rarr;</a>`)
              .join("\n            ")}
          </div>
        </section>`;
}
function labelLookup() {
  const map = {};
  [...calculatorPages, ...guidePages, calculatorsHub, guidesHub].forEach((p) => {
    map[p.route] = p.title;
  });
  return map;
}

/* ------------------------------- assemble pages -------------------------------- */
function buildAllPages() {
  const pages = [];
  pages.push({ ...homeMeta, render: renderHome });
  pages.push({ ...calculatorsHub, render: renderHub });
  pages.push({ ...guidesHub, render: renderHub });
  calculatorPages.forEach((p) => pages.push({ ...p, render: renderCalcPage }));
  guidePages.forEach((p) => pages.push({ ...p, render: renderArticle }));
  institutionalPages.forEach((p) => pages.push({ ...p, render: renderInstitutional }));
  return pages;
}

/* ------------------------------- technical files ------------------------------- */
function buildSitemapPage(pages) {
  const fromFile = toFile("/sitemap/");
  const group = (title, items) => `<section class="sitemap-group">
          <h2>${escapeHtml(title)}</h2>
          <ul>${items
            .map((p) => `<li><a href="${escapeAttr(localPageHref(fromFile, p.route))}">${escapeHtml(p.title)}</a></li>`)
            .join("")}</ul>
        </section>`;
  return {
    route: "/sitemap/",
    type: "page",
    title: "HTML Sitemap",
    metaTitle: "Sitemap | CalcReno",
    metaDescription: "Browse every calculator, guide, and page on CalcReno.",
    h1: "Sitemap",
    description: "Every page on CalcReno in one place.",
    render: (page) => `
      <article class="wrap article">
        <header class="article__head"><h1>${escapeHtml(page.h1)}</h1></header>
        <div class="sitemap">
          ${group("Calculators", [calculatorsHub, ...calculatorPages])}
          ${group("Guides", [guidesHub, ...guidePages])}
          ${group("Company", institutionalPages)}
        </div>
      </article>`,
  };
}

function build404() {
  return {
    route: "/404/",
    type: "page",
    title: "Page Not Found",
    metaTitle: "404 — Page Not Found | CalcReno",
    metaDescription: "The page you were looking for could not be found.",
    robots: "noindex, follow",
    h1: "We couldn't find that page",
    description: "The page you're looking for may have moved or never existed.",
    render: (page) => `
      <article class="wrap article" style="text-align:center">
        <header class="article__head"><h1>${escapeHtml(page.h1)}</h1>
        <p class="lede">${escapeHtml(page.description)}</p></header>
        <p><a class="btn btn--primary" href="/">Back to home</a> <a class="btn btn--ghost" href="/calculators/">All calculators</a></p>
      </article>`,
  };
}

async function writeTechnicalFiles(pages) {
  // ads.txt
  await fs.writeFile(path.join(ROOT, "ads.txt"), "google.com, pub-3733223915347669, DIRECT, f08c47fec0942fa0\n");

  // robots.txt
  await fs.writeFile(
    path.join(ROOT, "robots.txt"),
    `User-agent: *\nAllow: /\nDisallow: /*?q=*\nDisallow: /*?s=*\n\nSitemap: ${domain}/sitemap.xml\n`
  );

  // _redirects (Cloudflare). 301! forced. www -> non-www handled in dashboard too.
  await fs.writeFile(
    path.join(ROOT, "_redirects"),
    `# Force HTTPS on the apex domain. (Subdomain redirect is handled by a Cloudflare dashboard Redirect Rule.)\nhttp://calcreno.com/* https://calcreno.com/:splat 301!\n# Strip .html and trailing index\n/index.html / 301!\n/*.html /:splat 301!\n`
  );

  // _headers
  await fs.writeFile(
    path.join(ROOT, "_headers"),
    `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`
  );

  // sitemap.xml
  const urls = pages
    .filter((p) => p.route !== "/404/")
    .map(
      (p) =>
        `  <url>\n    <loc>${canonicalUrl(p.route)}</loc>\n    <lastmod>${pageDate(p)}</lastmod>\n    <changefreq>${p.route === "/" ? "weekly" : "monthly"}</changefreq>\n    <priority>${p.route === "/" ? "1.0" : p.type === "calculator" || p.type === "hub" ? "0.8" : "0.6"}</priority>\n  </url>`
    )
    .join("\n");
  await fs.writeFile(
    path.join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

/* ------------------------------- main build ------------------------------------ */
async function main() {
  const corePages = buildAllPages();
  const sitemapPage = buildSitemapPage(corePages);
  const notFound = build404();
  const allPages = [...corePages, sitemapPage, notFound];

  let written = 0;
  for (const page of allPages) {
    const inner = page.render(page);
    const html = pageShell(page, inner);
    const outFile = page.route === "/404/" ? "404.html" : toFile(page.route);
    const outPath = path.join(ROOT, outFile);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, html);
    written += 1;
  }

  await writeTechnicalFiles(corePages.concat(sitemapPage));

  console.log(`✓ CalcReno build complete — ${written} pages written.`);
  console.log(`  Domain: ${domain}`);
  console.log(`  Routes: ${allPages.map((p) => p.route).join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
