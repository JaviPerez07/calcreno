// CalcReno — calculator pages (Phase 1). Forms are wired up by /calc.js (vanilla JS).
import { escapeHtml, adInArticle, money } from "./lib.mjs";

/* small markup helpers ------------------------------------------------------- */
function num({ id, label, value, min = "0", step = "1", suffix = "", help = "" }) {
  return `<div class="field">
            <label for="${id}">${escapeHtml(label)}</label>
            <div class="field__control">
              <input type="number" id="${id}" name="${id}" inputmode="decimal" value="${value}" min="${min}" step="${step}" required>
              ${suffix ? `<span class="field__suffix">${escapeHtml(suffix)}</span>` : ""}
            </div>
            ${help ? `<p class="field__help">${escapeHtml(help)}</p>` : ""}
          </div>`;
}
function select({ id, label, options, help = "" }) {
  return `<div class="field">
            <label for="${id}">${escapeHtml(label)}</label>
            <div class="field__control">
              <select id="${id}" name="${id}">
                ${options.map((o) => `<option value="${escapeHtml(o.value)}"${o.selected ? " selected" : ""}>${escapeHtml(o.label)}</option>`).join("\n                ")}
              </select>
            </div>
            ${help ? `<p class="field__help">${escapeHtml(help)}</p>` : ""}
          </div>`;
}
// Contextual retention links per calculator. All calculator pages share the same
// URL depth (/calculators/X/), so relative hrefs are constant.
const RETENTION = {
  paint: { rHref: "../wallpaper-calculator/", rLabel: "Wallpaper Calculator", gHref: "../../guides/cost-to-paint-a-room/", gLabel: "Cost to Paint a Room" },
  tile: { rHref: "../renovation-cost-estimator/", rLabel: "Renovation Cost Estimator", gHref: "../../guides/tile-installation-cost/", gLabel: "Tile Installation Cost" },
  concrete: { rHref: "../renovation-cost-estimator/", rLabel: "Renovation Cost Estimator", gHref: "../../guides/concrete-cost-guide/", gLabel: "Concrete Cost Guide" },
  wallpaper: { rHref: "../paint-calculator/", rLabel: "Paint Calculator", gHref: "../../guides/cost-to-renovate-a-room/", gLabel: "Cost to Renovate a Room" },
  renovation: { rHref: "../tile-flooring-calculator/", rLabel: "Tile & Flooring Calculator", gHref: "../../guides/kitchen-renovation-budget/", gLabel: "Kitchen Renovation Budget" },
};
function calcLayout(calcKey, fields, resultIntro) {
  const r = RETENTION[calcKey];
  const dataAttrs = r
    ? ` data-related-href="${r.rHref}" data-related-label="${escapeHtml(r.rLabel)}" data-guide-href="${r.gHref}" data-guide-label="${escapeHtml(r.gLabel)}"`
    : "";
  return `<div class="calc-layout">
        <form class="calc card" data-calc="${calcKey}" id="${calcKey}-form" novalidate${dataAttrs}>
          ${fields}
          <div class="calc__actions">
            <button type="submit" class="btn btn--primary btn--block">Calculate</button>
            <button type="reset" class="btn btn--ghost">Reset</button>
          </div>
        </form>
        <div class="calc-result card" id="${calcKey}-result" data-empty="true" aria-live="polite">
          <div class="calc-result__placeholder">
            <p>${escapeHtml(resultIntro)}</p>
          </div>
        </div>
      </div>`;
}
const calcHub = { route: "/calculators/", title: "Calculators" };

/* ============================== 1. PAINT ==================================== */
const paint = {
  route: "/calculators/paint-calculator/",
  type: "calculator",
  parent: calcHub,
  title: "Paint Calculator",
  metaTitle: "Paint Calculator: How Many Gallons Do I Need? | CalcReno",
  metaDescription:
    "Free paint calculator for U.S. rooms. Enter room size in feet, doors, windows, and coats to estimate gallons of paint and approximate cost in dollars.",
  h1: "Paint Calculator",
  description:
    "Enter your room dimensions in feet, subtract doors and windows, and get an instant estimate of how many gallons of paint you need — plus a rough cost.",
  icon: "paint",
  guide: { route: "/guides/cost-to-paint-a-room/", label: "How Much Does It Cost to Paint a Room in 2026?", blurb: "DIY vs. hiring a pro, and how to budget the whole job." },
  cost: {
    heading: "Paint costs in 2026",
    intro: "What you'll spend depends mostly on DIY vs. hiring out and the paint tier you choose. Here's where the money goes:",
    columns: ["Cost item", "What it covers"],
    rows: [
      ["Wall paint", "~2 gallons for a standard room, 2 coats"],
      ["Primer", "New drywall, bare wood, or big color changes"],
      ["Trim & ceiling paint", "Bought separately — different finishes"],
      ["Supplies / tools", "Roller, brush, tray, tape, drop cloth (one-time)"],
      ["Pro labor (if hiring)", "Usually the largest part of a painter's quote"],
    ],
    note: "Paint and labor prices vary by brand and region — these are planning factors, not a quote.",
  },
  mistakes: [
    "Skipping primer on new drywall or patches, which kills coverage and shows through.",
    "Not measuring first — you end up over-buying or running short mid-wall.",
    "Forgetting that trim and ceilings use different paint, bought separately.",
    "Trying to cover dark-to-light in a single coat; plan for two.",
    "Skimping on tape and prep, then losing the time back on touch-ups.",
  ],
  faqs: [
    { q: "How many square feet does a gallon of paint cover?", a: "<p>One gallon of interior wall paint typically covers about <strong>350–400 square feet</strong> in a single coat on a smooth, primed surface. CalcReno uses 350 sq ft per gallon as a conservative default so you are less likely to run short. Rough or porous surfaces (new drywall, textured walls, bare wood) absorb more and can drop coverage toward 250–300 sq ft per gallon.</p>" },
    { q: "Do I need one coat or two?", a: "<p>Most repaints need <strong>two coats</strong> for an even, durable finish — especially when changing colors, going from dark to light, or painting over patches. A single coat may be enough only when refreshing the exact same color on a clean, previously painted wall. When in doubt, plan for two coats.</p>" },
    { q: "Should I subtract doors and windows?", a: "<p>Yes. CalcReno subtracts a standard interior door at about <strong>21 sq ft</strong> (3 ft × 7 ft) and a standard window at about <strong>15 sq ft</strong> (3 ft × 5 ft). This keeps your estimate realistic so you do not badly over-buy, while still leaving a small buffer for touch-ups.</p>" },
    { q: "Does this include the ceiling?", a: "<p>You can choose to include the ceiling. When enabled, CalcReno adds the floor area (length × width) to the paintable surface. Ceilings are usually painted with flat ceiling paint, so if you are buying a separate ceiling product, calculate it on its own.</p>" },
  ],
  body: `
        <p>This calculator estimates how many <strong>gallons of paint</strong> you need for a room and gives you a rough dollar cost. Everything is in U.S. units — <strong>feet, inches, gallons, and dollars</strong>. Measure the length and width of the room, the wall height (8 ft is standard for most U.S. homes), and count the doors and windows you will not be painting.</p>
        ${calcLayout(
          "paint",
          `${num({ id: "paint-length", label: "Room length", value: "12", suffix: "ft", min: "1", step: "0.5" })}
          ${num({ id: "paint-width", label: "Room width", value: "12", suffix: "ft", min: "1", step: "0.5" })}
          ${num({ id: "paint-height", label: "Wall height", value: "8", suffix: "ft", min: "6", step: "0.5", help: "Standard U.S. ceiling is 8 ft; many newer homes are 9 ft." })}
          ${num({ id: "paint-doors", label: "Doors", value: "1", min: "0", step: "1", help: "Counted at 21 sq ft each (3 × 7 ft)." })}
          ${num({ id: "paint-windows", label: "Windows", value: "2", min: "0", step: "1", help: "Counted at 15 sq ft each (3 × 5 ft)." })}
          ${num({ id: "paint-coats", label: "Number of coats", value: "2", min: "1", step: "1" })}
          ${select({ id: "paint-ceiling", label: "Include ceiling?", options: [ { value: "no", label: "No — walls only", selected: true }, { value: "yes", label: "Yes — add the ceiling" } ] })}
          ${num({ id: "paint-price", label: "Price per gallon", value: "35", min: "0", step: "1", suffix: "$", help: "Typical interior paint runs about $25–$60 a gallon." })}`,
          "Fill in the room details and press Calculate to see gallons of paint and an estimated cost."
        )}
        ${adInArticle()}
        <div class="prose">
          <h2>How the paint calculator works</h2>
          <p>The math is simple, and it helps to see it so you can sanity-check the result:</p>
          <ol>
            <li><strong>Wall area</strong> = 2 × (length + width) × wall height. For a 12 × 12 ft room with 8 ft walls that is 2 × 24 × 8 = <strong>384 sq ft</strong>.</li>
            <li><strong>Subtract openings</strong> you are not painting: 21 sq ft per door, 15 sq ft per window.</li>
            <li><strong>Multiply by coats</strong>, then divide by <strong>350 sq ft per gallon</strong>.</li>
            <li><strong>Round up</strong> to the next whole or half gallon, because you cannot buy a partial can and you want a little left over for touch-ups.</li>
          </ol>
          <h2>Tips for a more accurate estimate</h2>
          <ul>
            <li><strong>New drywall and bare wood drink paint.</strong> Prime first, or expect coverage closer to 250–300 sq ft per gallon.</li>
            <li><strong>Dark-to-light color changes</strong> almost always need two coats, sometimes three.</li>
            <li><strong>Buy trim and ceiling paint separately</strong> — they use different finishes (semi-gloss for trim, flat for ceilings).</li>
            <li><strong>Keep the lot number.</strong> If you have to return for more, matching the same batch avoids subtle color shifts.</li>
          </ul>
          <p>Want a deeper walkthrough with room-by-room examples? Read our guide on <a href="/guides/how-much-paint-do-i-need/">how much paint you need</a>, or grab the right gear with our <a href="/guides/essential-diy-painting-tools/">essential painting tools list</a>.</p>
        </div>`,
};

/* ============================== 2. TILE / FLOORING ========================== */
const tile = {
  route: "/calculators/tile-flooring-calculator/",
  type: "calculator",
  parent: calcHub,
  title: "Tile & Flooring Calculator",
  metaTitle: "Tile and Flooring Calculator (Boxes) | CalcReno",
  metaDescription:
    "Free tile and flooring calculator. Enter room size in feet and box coverage to estimate how many boxes of tile, laminate, or vinyl plank you need.",
  h1: "Tile & Flooring Calculator",
  description:
    "Estimate how many boxes of tile, laminate, or vinyl plank flooring you need for a room — with a built-in waste allowance so you do not run short mid-job.",
  icon: "tile",
  guide: { route: "/guides/tile-installation-cost/", label: "Tile Installation Cost Guide (2026)", blurb: "Materials vs. labor and what pushes the price up." },
  cost: {
    heading: "Tile costs in 2026",
    intro: "A tile budget has two halves — materials and labor. For most everyday installs, labor is the larger share.",
    columns: ["Cost item", "Notes"],
    rows: [
      ["Tile", "Ceramic (lower) → porcelain → natural stone (higher)"],
      ["Thinset, grout, sealant", "Modest, sized to your tile and area"],
      ["Backer board / underlayment", "Essential in wet areas; adds up on big floors"],
      ["Trim & transitions", "Edges and doorways — often forgotten"],
      ["Labor (if hiring)", "More for diagonal, herringbone, mosaics, wet areas"],
    ],
    note: "Tile and labor prices vary by material grade and region — these are planning factors, not a quote.",
  },
  mistakes: [
    "Forgetting the waste allowance — diagonal and herringbone need more.",
    "Not keeping a spare box; a repair from a new batch may not match.",
    "Skipping backer board or proper prep in wet areas.",
    "Leaving trim, transition strips, and underlayment out of the budget.",
    "Confusing 'tiles per box' with 'square feet per box' when buying.",
  ],
  faqs: [
    { q: "How much waste should I add for tile or flooring?", a: "<p>A <strong>10% waste allowance</strong> is the standard rule for straight, rectangular rooms. Bump it to <strong>15%</strong> for diagonal layouts, busy patterns, or rooms with lots of corners and cuts, and <strong>20%</strong> for herringbone or intricate mosaics. Waste covers cuts, breakage, and future repairs.</p>" },
    { q: "Why should I keep a few extra tiles?", a: "<p>Always keep at least a full box of extras after the job. Tile production runs vary slightly in shade, so a future repair from a new batch may not match. Leftover planks or tiles from the original lot are the easiest way to fix a damaged spot years later.</p>" },
    { q: "How do I find the coverage of one box?", a: "<p>It is printed on the box and the product page — usually as <strong>square feet per box</strong> (or per carton). Vinyl plank boxes are often 18–24 sq ft, ceramic tile 10–15 sq ft, and large-format porcelain can be more. Enter that number and the calculator does the rest.</p>" },
    { q: "Can I use this for backsplash or wall tile?", a: "<p>Yes. Measure the wall area you are tiling in square feet (height × width), subtract any large openings, and enter it as the area. For small mosaic-sheet backsplashes, add a slightly higher waste percentage because of the extra cuts around outlets and edges.</p>" },
  ],
  body: `
        <p>This calculator tells you how many <strong>boxes</strong> of tile or flooring to buy for a room, in U.S. units. You can enter the room as length × width in feet, or type the total square footage directly. Add a waste percentage and the calculator rounds up to full boxes — because suppliers sell boxes, not loose square feet.</p>
        ${calcLayout(
          "tile",
          `${select({ id: "tile-mode", label: "How will you enter the area?", options: [ { value: "dims", label: "Room length × width", selected: true }, { value: "area", label: "Total square footage" } ] })}
          <div data-tile-dims>
            ${num({ id: "tile-length", label: "Room length", value: "12", suffix: "ft", min: "1", step: "0.5" })}
            ${num({ id: "tile-width", label: "Room width", value: "10", suffix: "ft", min: "1", step: "0.5" })}
          </div>
          <div data-tile-area hidden>
            ${num({ id: "tile-sqft", label: "Total area", value: "120", suffix: "sq ft", min: "1", step: "1" })}
          </div>
          ${num({ id: "tile-coverage", label: "Coverage per box", value: "20", suffix: "sq ft", min: "0.5", step: "0.5", help: "Check the box or product page. Vinyl plank is often ~20 sq ft per box." })}
          ${select({ id: "tile-waste", label: "Waste allowance", options: [ { value: "10", label: "10% — straight / standard layout", selected: true }, { value: "15", label: "15% — diagonal or patterned" }, { value: "20", label: "20% — herringbone / mosaic" } ] })}
          ${num({ id: "tile-price", label: "Price per box (optional)", value: "45", min: "0", step: "1", suffix: "$" })}`,
          "Enter your room size and box coverage to see how many boxes you need, including waste."
        )}
        ${adInArticle()}
        <div class="prose">
          <h2>How the tile & flooring calculator works</h2>
          <ol>
            <li><strong>Find the area.</strong> Length × width gives square feet. A 12 × 10 ft room is 120 sq ft.</li>
            <li><strong>Add waste.</strong> Multiply by 1 + waste%. At 10%, 120 sq ft becomes 132 sq ft of material to buy.</li>
            <li><strong>Divide by box coverage</strong> and round up. At 20 sq ft per box, 132 ÷ 20 = 6.6, so you buy <strong>7 boxes</strong>.</li>
          </ol>
          <h2>Buying tips that save money and headaches</h2>
          <ul>
            <li><strong>Measure twice.</strong> For irregular rooms, split the floor into rectangles, calculate each, and add them together.</li>
            <li><strong>Order extra up front.</strong> Buying all your material from the same production lot avoids shade mismatches later.</li>
            <li><strong>Account for the pattern.</strong> Diagonal and herringbone layouts cut more pieces — that is why higher waste percentages exist.</li>
            <li><strong>Don't forget trim pieces</strong> like bullnose, transition strips, and underlayment — they are priced separately.</li>
          </ul>
          <h2>Two worked examples</h2>
          <p><strong>Example 1 — a standard bathroom floor.</strong> A 5 × 8 ft bathroom is 40 sq ft. In a straight layout you add 10% waste: 40 × 1.10 = 44 sq ft. With boxes that cover 12 sq ft each, 44 ÷ 12 = 3.7, so you buy <strong>4 boxes</strong> and keep the leftover tiles for future repairs.</p>
          <p><strong>Example 2 — a diagonal kitchen floor.</strong> A 12 × 14 ft kitchen is 168 sq ft. Diagonal layouts cut more pieces, so step the waste up to 15%: 168 × 1.15 = 193 sq ft. With 15 sq ft boxes, 193 ÷ 15 = 12.9, which rounds up to <strong>13 boxes</strong>. The same floor laid in herringbone would use a 20% allowance and likely push you to 14 boxes — proof that the pattern, not just the room size, drives how much you buy.</p>
          <h2>Cost and planning factors</h2>
          <p>The box count is only part of the budget. Plan for thinset or mortar and grout sized to your tile and joint width, plus backer board or underlayment in wet areas like bathrooms and laundry rooms. Trim pieces — bullnose, transition strips, and edge profiles — are priced separately and easy to forget. Tile grade swings the total the most: budget ceramic sits at the low end, large-format porcelain in the middle, and natural stone such as marble or travertine at the premium end, where it may also need sealing. Labor is usually the larger half of an installed price, and it climbs with pattern complexity and the number of cuts around fixtures.</p>
          <p>New to tiling math? Our guide on <a href="/guides/how-many-tiles-do-i-need/">how many tiles you need</a> walks through boxes, waste, and patterns with worked examples, and our <a href="/guides/tile-installation-cost/">tile installation cost guide</a> breaks down materials versus labor.</p>
        </div>`,
};

/* ============================== 3. CONCRETE ================================= */
const concrete = {
  route: "/calculators/concrete-calculator/",
  type: "calculator",
  parent: calcHub,
  title: "Concrete Calculator",
  metaTitle: "Concrete Calculator: How Many Bags? | CalcReno",
  metaDescription:
    "Free concrete calculator for slabs. Enter length and width in feet and thickness in inches to estimate cubic yards and how many 40, 60, or 80 lb bags you need.",
  h1: "Concrete Slab Calculator",
  description:
    "Estimate the cubic yards of concrete for a slab and how many 40, 60, or 80 lb bags it takes — perfect for patios, walkways, shed pads, and footings.",
  icon: "concrete",
  guide: { route: "/guides/concrete-cost-guide/", label: "Concrete Cost Guide: Slabs, Patios & Driveways (2026)", blurb: "Bags vs. ready-mix and the prep costs people miss." },
  cost: {
    heading: "Concrete costs in 2026",
    intro: "The concrete itself is only part of the bill — the base and finishing work drive much of the cost.",
    columns: ["Cost item", "Why it matters"],
    rows: [
      ["Concrete (bags or ready-mix)", "Bags for small jobs; ready-mix past ~1 cu yd"],
      ["Gravel sub-base", "Drainage and a stable, crack-resistant base"],
      ["Forms & reinforcement", "Rebar or wire mesh, often required by code"],
      ["Excavation & grading", "More for slopes or hard-to-reach areas"],
      ["Finish", "Broom finish (basic) → stamped/colored (premium)"],
    ],
    note: "Concrete and labor prices vary by region, finish, and site conditions — planning factors, not a quote.",
  },
  mistakes: [
    "Skimping on the compacted gravel base — the top cause of cracking.",
    "Under-ordering; running short creates a weak cold joint mid-pour.",
    "Ignoring local code on thickness, rebar, and frost-line footings.",
    "Hand-mixing far more than ~1 cubic yard instead of ordering ready-mix.",
    "Pouring without enough help — concrete sets on its own schedule.",
  ],
  faqs: [
    { q: "How many 80 lb bags make a cubic yard?", a: "<p>It takes about <strong>45 bags of 80 lb</strong> concrete mix to make one cubic yard, <strong>60 bags of 60 lb</strong>, or <strong>90 bags of 40 lb</strong>. Each 80 lb bag yields roughly 0.6 cubic feet, a 60 lb bag about 0.45 cubic feet, and a 40 lb bag about 0.3 cubic feet. For anything more than about a cubic yard, ready-mix delivery is usually cheaper and far less work than mixing bags.</p>" },
    { q: "How thick should my slab be?", a: "<p>A typical patio or walkway is <strong>4 inches</strong> thick. Driveways and slabs that carry vehicles are usually <strong>5–6 inches</strong>. Always confirm thickness and any rebar or wire mesh requirements with your local building code, since these vary by region and load.</p>" },
    { q: "Should I add extra for waste?", a: "<p>Yes. Add about <strong>5–10% extra</strong> to your concrete order. Subgrade is never perfectly level, forms flex, and you do not want to stop a pour halfway because you ran short. CalcReno lets you add a waste percentage to the bag count.</p>" },
    { q: "When should I order ready-mix instead of bags?", a: "<p>Mixing bags by hand is reasonable up to roughly <strong>½ to 1 cubic yard</strong>. Beyond that, the number of bags, water, and labor add up fast. A ready-mix truck delivers consistent concrete and saves hours, though most suppliers have a minimum order and short-load fees.</p>" },
  ],
  body: `
        <p>This calculator estimates the <strong>volume of concrete</strong> for a rectangular slab and converts it to <strong>cubic yards</strong> and the number of <strong>40, 60, and 80 lb bags</strong>. Enter the length and width in feet and the thickness in inches. Great for patios, walkways, shed pads, and small footings.</p>
        ${calcLayout(
          "concrete",
          `${num({ id: "concrete-length", label: "Slab length", value: "10", suffix: "ft", min: "0.5", step: "0.5" })}
          ${num({ id: "concrete-width", label: "Slab width", value: "10", suffix: "ft", min: "0.5", step: "0.5" })}
          ${num({ id: "concrete-thickness", label: "Thickness", value: "4", suffix: "in", min: "1", step: "0.5", help: "Patios/walkways are usually 4 in; vehicle slabs 5–6 in." })}
          ${select({ id: "concrete-waste", label: "Waste allowance", options: [ { value: "0", label: "0% — exact" }, { value: "5", label: "5% — recommended", selected: true }, { value: "10", label: "10% — uneven subgrade" } ] })}
          ${num({ id: "concrete-price", label: "Price per bag (optional)", value: "6", min: "0", step: "0.5", suffix: "$", help: "Used to estimate bag cost for the 80 lb option." })}`,
          "Enter slab dimensions to see cubic yards and the number of 40, 60, and 80 lb bags."
        )}
        ${adInArticle()}
        <div class="prose">
          <h2>How the concrete calculator works</h2>
          <ol>
            <li><strong>Convert thickness to feet:</strong> 4 in ÷ 12 = 0.333 ft.</li>
            <li><strong>Volume in cubic feet</strong> = length × width × thickness. A 10 × 10 ft, 4 in slab = 10 × 10 × 0.333 = <strong>33.3 cu ft</strong>.</li>
            <li><strong>Cubic yards</strong> = cubic feet ÷ 27 = about <strong>1.23 cu yd</strong>.</li>
            <li><strong>Bags</strong> = cubic feet ÷ bag yield (0.6 for 80 lb, 0.45 for 60 lb, 0.3 for 40 lb), then add waste and round up.</li>
          </ol>
          <h2>Before you pour</h2>
          <ul>
            <li><strong>Prepare the base.</strong> A compacted gravel sub-base and proper forms matter as much as the concrete itself.</li>
            <li><strong>Check local code</strong> for thickness, reinforcement (rebar or wire mesh), and footing depth in freeze-prone areas.</li>
            <li><strong>Have help ready.</strong> Concrete sets on its own schedule — line up tools and hands before you start mixing.</li>
            <li><strong>Round up your order.</strong> Running short mid-pour creates a cold joint; a little extra is cheap insurance.</li>
          </ul>
          <h2>Two worked examples</h2>
          <p><strong>Example 1 — a small shed pad.</strong> A 10 × 12 ft pad at 4 inches thick is 10 × 12 × (4 ÷ 12) = 40 cubic feet, or 40 ÷ 27 = about 1.5 cubic yards. At roughly 0.6 cubic feet per 80 lb bag, that is 40 ÷ 0.6 = 67 bags before waste — already past the point where a ready-mix delivery is easier and usually cheaper.</p>
          <p><strong>Example 2 — a small walkway.</strong> A 3 × 20 ft walkway at 4 inches is 3 × 20 × 0.333 = 20 cubic feet, about 0.74 cubic yards. That is 20 ÷ 0.6 = 34 bags of 80 lb, or 20 ÷ 0.45 = 45 bags of 60 lb. Add 5–10% so an uneven subgrade does not leave you short, and you can reasonably mix this by hand over a session.</p>
          <h2>Cost and planning factors</h2>
          <p>The concrete itself is only part of the spend. A durable slab needs excavation, a compacted gravel sub-base for drainage, forms to hold the shape, and often rebar or wire mesh for strength — steps that are easy to leave out of a quick budget but not optional for a slab that lasts. In freeze-prone regions, footings must reach below the frost line, and thicker, reinforced slabs are required wherever vehicles will park. The finish matters too: a basic broom finish is economical, while stamped, colored, or polished concrete costs more. For the full bags-versus-ready-mix breakdown and the prep costs people miss, see our <a href="/guides/concrete-cost-guide/">concrete cost guide</a>.</p>
        </div>`,
};

/* ============================== 4. WALLPAPER =============================== */
const wallpaper = {
  route: "/calculators/wallpaper-calculator/",
  type: "calculator",
  parent: calcHub,
  title: "Wallpaper Calculator",
  metaTitle: "Wallpaper Calculator: How Many Rolls? | CalcReno",
  metaDescription:
    "Free wallpaper calculator. Enter wall dimensions in feet and roll coverage to estimate how many rolls you need, including pattern waste.",
  h1: "Wallpaper Calculator",
  description:
    "Estimate how many rolls of wallpaper you need for a wall or whole room, with an allowance for pattern repeat and trimming waste.",
  icon: "wallpaper",
  guide: { route: "/guides/cost-to-renovate-a-room/", label: "Cost to Renovate a Room (2026)", blurb: "Budget a full room makeover, walls and finishes included." },
  cost: {
    heading: "Wallpaper costs in 2026",
    intro: "Wallpaper cost depends on the paper you choose and whether you hang it yourself.",
    columns: ["Cost item", "Notes"],
    rows: [
      ["Wallpaper rolls", "Prepasted (lower) → designer / grasscloth (higher)"],
      ["Primer / wallpaper size", "Helps adhesion and future removal"],
      ["Adhesive (if unpasted)", "Some papers need separate paste"],
      ["Tools", "Smoother, seam roller, sharp blade, level"],
      ["Labor (if hiring)", "Rises with large pattern repeats"],
    ],
    note: "Wallpaper and labor prices vary by product and region — these are planning factors, not a quote.",
  },
  mistakes: [
    "Under-ordering — large pattern repeats waste more paper per strip.",
    "Mixing rolls from different batch numbers, so colors don't match.",
    "Hanging over unprimed or dirty walls, so seams lift later.",
    "Forgetting to subtract big openings, or over-trusting a low roll count.",
    "Starting the first seam in a visible spot instead of a hidden corner.",
  ],
  faqs: [
    { q: "How many square feet does a roll of wallpaper cover?", a: "<p>It varies a lot by product. In the U.S., a single roll commonly covers about <strong>25–28 usable square feet</strong> after trimming, and a double roll about <strong>56 sq ft</strong> (often around 50 sq ft usable). Always use the <strong>usable</strong> coverage printed on the roll, not the raw area, and enter that figure in the calculator.</p>" },
    { q: "How does pattern repeat affect how much I need?", a: "<p>A large pattern repeat means more waste, because you trim each strip so the pattern lines up. CalcReno adds a waste allowance you can raise for big repeats. As a rule of thumb, a small or random match needs ~10–15% extra, while a large repeat can need 20–30%.</p>" },
    { q: "Should I buy all rolls from the same batch?", a: "<p>Yes — match the <strong>batch or run number</strong> on every roll. Different print runs can vary slightly in color. Buying one extra roll from the same batch is smart insurance for mistakes and future repairs.</p>" },
    { q: "Do I subtract doors and windows?", a: "<p>For large openings you can subtract them, but many pros do not, treating the extra as built-in waste for matching and trimming. CalcReno keeps the estimate simple and slightly conservative so you are unlikely to run short.</p>" },
  ],
  body: `
        <p>This calculator estimates how many <strong>rolls of wallpaper</strong> you need. Measure each wall's width and the wall height in feet, tell the calculator the roll's <strong>usable coverage</strong>, and choose a waste level based on your pattern. The result rounds up to whole rolls.</p>
        ${calcLayout(
          "wallpaper",
          `${num({ id: "wallpaper-width", label: "Total wall width", value: "40", suffix: "ft", min: "1", step: "0.5", help: "Add up the width of every wall you're papering. For a 12×12 room that's about 48 ft." })}
          ${num({ id: "wallpaper-height", label: "Wall height", value: "8", suffix: "ft", min: "6", step: "0.5" })}
          ${num({ id: "wallpaper-doors", label: "Doors", value: "1", min: "0", step: "1", help: "Subtracted at 21 sq ft each (3 × 7 ft)." })}
          ${num({ id: "wallpaper-windows", label: "Windows", value: "1", min: "0", step: "1", help: "Subtracted at 15 sq ft each (3 × 5 ft)." })}
          ${num({ id: "wallpaper-coverage", label: "Usable coverage per roll", value: "56", suffix: "sq ft", min: "5", step: "1", help: "From the roll label. U.S. double rolls are often ~56 sq ft." })}
          ${select({ id: "wallpaper-waste", label: "Pattern waste", options: [ { value: "10", label: "10% — random / no match" }, { value: "15", label: "15% — small repeat", selected: true }, { value: "25", label: "25% — large repeat" } ] })}
          ${num({ id: "wallpaper-price", label: "Price per roll (optional)", value: "40", min: "0", step: "1", suffix: "$" })}`,
          "Enter your wall measurements and roll coverage to see how many rolls you need."
        )}
        ${adInArticle()}
        <div class="prose">
          <h2>How the wallpaper calculator works</h2>
          <ol>
            <li><strong>Wall area</strong> = total wall width × wall height. 40 ft × 8 ft = <strong>320 sq ft</strong>.</li>
            <li><strong>Add pattern waste.</strong> At 15%, that becomes 368 sq ft of paper to buy.</li>
            <li><strong>Divide by usable coverage per roll</strong> and round up. 368 ÷ 56 = 6.6, so buy <strong>7 rolls</strong>.</li>
          </ol>
          <h2>Hanging tips</h2>
          <ul>
            <li><strong>Read the label first</strong> for usable coverage, repeat size, and match type (straight vs. drop match).</li>
            <li><strong>Buy one extra roll</strong> from the same batch for mistakes and repairs.</li>
            <li><strong>Prep the wall</strong> — clean, smooth, and primed surfaces hold paper far better.</li>
            <li><strong>Plan your starting seam</strong> in an inconspicuous corner so the inevitable pattern mismatch is hidden.</li>
          </ul>
          <h2>Two worked examples</h2>
          <p><strong>Example 1 — a feature wall.</strong> A single 12 ft wide wall at 8 ft tall is 96 sq ft. Subtract nothing if it is solid, add 15% for a small repeat: 96 × 1.15 = 110 sq ft. With double rolls that cover about 56 usable sq ft, 110 ÷ 56 = 1.97, so you buy <strong>2 rolls</strong> — and a third if the pattern repeat is large.</p>
          <p><strong>Example 2 — a full bedroom.</strong> Four walls totaling 48 ft of width at 8 ft tall is 384 sq ft gross. Subtract one door (21 sq ft) and two windows (15 sq ft each) for 51 sq ft, leaving 333 sq ft. Add 15% pattern waste: 333 × 1.15 = 383 sq ft. At 56 sq ft per roll, 383 ÷ 56 = 6.8, which rounds up to <strong>7 rolls</strong>. A large repeat at 25% waste would push the same room toward 8 rolls.</p>
          <h2>Cost and planning factors</h2>
          <p>Roll count is only half the budget. The paper itself spans a wide range — prepasted standard papers sit at the low end, while designer prints and textured grasscloth cost considerably more per roll. Beyond the rolls, plan for primer or wallpaper sizing to help adhesion and future removal, separate paste if your paper is unpasted, and a basic tool kit (a smoother, a seam roller, a sharp blade, and a level). Pattern repeat is the quiet cost driver: the larger the repeat, the more you trim from each strip to line it up, which is why big repeats carry higher waste percentages. Always buy from one batch number and keep a spare roll for repairs.</p>
        </div>`,
};

/* ============================== 5. RENOVATION COST ========================= */
const renovation = {
  route: "/calculators/renovation-cost-estimator/",
  type: "calculator",
  parent: calcHub,
  title: "Renovation Cost Estimator",
  metaTitle: "Renovation Cost Estimator (2026) | CalcReno",
  metaDescription:
    "Free room renovation cost estimator. Pick a room type, enter the size in square feet, and choose a quality tier to see a ballpark remodel cost range for 2026.",
  h1: "Room Renovation Cost Estimator",
  description:
    "Get a ballpark cost range for remodeling a kitchen, bathroom, bedroom, living room, or basement based on room size and the quality level you're targeting.",
  icon: "renovation",
  guide: { route: "/guides/kitchen-renovation-budget/", label: "Kitchen Renovation Budget Breakdown (2026)", blurb: "Where the money goes and how to keep it under control." },
  cost: {
    heading: "Where renovation money goes",
    intro: "Per square foot, kitchens and bathrooms cost the most because of plumbing, electrical, and cabinetry. Here's the rough split:",
    columns: ["Category", "Why it matters"],
    rows: [
      ["Cabinetry", "Usually the largest single share in a kitchen"],
      ["Countertops", "Laminate → quartz → natural stone"],
      ["Appliances & fixtures", "Easy to scale up or down by tier"],
      ["Labor & installation", "Rises sharply if the layout changes"],
      ["Flooring, lighting, paint", "Smaller pieces that add up"],
    ],
    note: "Costs vary widely by location and finishes — this is a planning range, not a quote.",
  },
  mistakes: [
    "Moving plumbing or walls when the budget is tight.",
    "Forgetting a 10–20% contingency for hidden surprises.",
    "Budgeting with the low end of a range instead of the high end.",
    "Splurging everywhere instead of picking one or two priorities.",
    "Skipping written, itemized quotes from licensed contractors.",
  ],
  faqs: [
    { q: "How accurate is a renovation cost estimator?", a: "<p>An online estimator gives you a <strong>planning ballpark, not a quote</strong>. Real costs depend heavily on your location, the contractor, material choices, structural surprises, permits, and labor rates. Use this range to budget and to sanity-check bids — then get at least two or three written quotes from licensed local contractors before committing.</p>" },
    { q: "Why is the cost shown as a wide range?", a: "<p>Because finishes drive the price as much as size. The same 100 sq ft bathroom can be a modest refresh or a fully reconfigured spa with moved plumbing. The <strong>budget, mid-range, and high-end</strong> tiers reflect that span. Your final number lands inside the range based on the choices you make.</p>" },
    { q: "Which rooms cost the most to renovate?", a: "<p>Per square foot, <strong>kitchens and bathrooms</strong> are usually the most expensive because of plumbing, electrical, cabinetry, tile, and appliances. Bedrooms, living rooms, and basic basement finishing typically cost less per square foot since they involve fewer trades.</p>" },
    { q: "What's not included in this estimate?", a: "<p>Treat the figure as construction and finishes only. It does not account for <strong>permits, design fees, structural changes, hazardous-material removal (like asbestos or knob-and-tube wiring), or major layout reconfiguration</strong>. Those can add meaningfully to a project and vary widely by home and region.</p>" },
  ],
  body: `
        <p>This estimator gives you a <strong>ballpark remodel cost range</strong> for a single room. Choose the room type, enter its size in square feet, and pick a quality tier. The result is a planning range in dollars — useful for budgeting and for sanity-checking contractor bids. It is <strong>not a quote</strong>; real prices vary widely by location, contractor, and finishes.</p>
        ${calcLayout(
          "renovation",
          `${select({ id: "renovation-room", label: "Room type", options: [ { value: "kitchen", label: "Kitchen", selected: true }, { value: "bathroom", label: "Bathroom" }, { value: "bedroom", label: "Bedroom" }, { value: "living", label: "Living room" }, { value: "basement", label: "Basement (finishing)" } ] })}
          ${num({ id: "renovation-size", label: "Room size", value: "200", suffix: "sq ft", min: "10", step: "5", help: "A typical U.S. kitchen is ~150–250 sq ft; a full bath ~40–100 sq ft." })}
          ${select({ id: "renovation-tier", label: "Quality level", options: [ { value: "budget", label: "Budget — refresh, stock materials" }, { value: "mid", label: "Mid-range — quality materials", selected: true }, { value: "high", label: "High-end — premium / custom" } ] })}`,
          "Pick a room, size, and quality level to see an estimated 2026 cost range."
        )}
        ${adInArticle()}
        <div class="prose">
          <h2>How the estimator works</h2>
          <p>CalcReno multiplies your room size by a <strong>cost-per-square-foot range</strong> for that room type and quality tier, drawn from broad national remodeling cost ranges. Kitchens and bathrooms carry higher per-square-foot ranges because they involve plumbing, electrical, cabinetry, and tile; bedrooms, living rooms, and basement finishing are typically lower. The output is a low-to-high range, because finishes and site conditions move the final price substantially.</p>
          <h2>How to use the number</h2>
          <ul>
            <li><strong>Budget with the high end.</strong> Surprises in renovation almost always cost money, not save it.</li>
            <li><strong>Get 2–3 written quotes</strong> from licensed local contractors before you commit.</li>
            <li><strong>Hold a contingency</strong> of 10–20% for the unexpected — old wiring, water damage, or code upgrades.</li>
            <li><strong>Separate "wants" from "needs."</strong> Layout changes that move plumbing or walls are where budgets blow up.</li>
          </ul>
          <h2>Two worked examples</h2>
          <p><strong>Example 1 — a mid-range bathroom.</strong> A 60 sq ft full bathroom at a mid-range per-square-foot range lands in a broad planning band — say the low and high ends of that tier multiplied by 60. Bathrooms read expensive per square foot because waterproofing, tile, and several plumbing fixtures are packed into a tight space. Keeping the toilet, tub, and vanity in their existing spots is the single biggest way to stay near the low end.</p>
          <p><strong>Example 2 — a budget bedroom refresh.</strong> A 150 sq ft bedroom at the budget tier sits much lower per square foot, because the work is mostly drywall, paint, flooring, trim, and lighting with no plumbing. Add cost only if you build out a closet, replace windows, or upgrade to premium flooring. This is why the same square footage can cost three times more as a kitchen than as a bedroom.</p>
          <h2>What moves your number inside the range</h2>
          <p>The estimate is a band, not a point, because finishes and scope swing the total. The biggest lever is whether you change the layout: moving plumbing, gas, or walls adds trades, permits, and time. After that, finish level dominates — stock versus custom cabinets, laminate versus stone counters, builder-grade versus designer fixtures. Older homes also tend to reveal hidden work once walls open, from outdated wiring to water damage, which is why a contingency is essential rather than optional.</p>
          <p>For a detailed breakdown by room, read our guide on the <a href="/guides/cost-to-renovate-a-room/">cost to renovate a room in 2026</a> and our <a href="/guides/kitchen-renovation-budget/">kitchen renovation budget breakdown</a>.</p>
          <p class="note"><strong>Important:</strong> These figures are rough estimates for planning only, not professional quotes or financial advice. Always confirm with licensed local contractors.</p>
        </div>`,
};

export const calculatorPages = [paint, tile, concrete, wallpaper, renovation];

export const calculatorsHub = {
  route: "/calculators/",
  type: "hub",
  title: "Calculators",
  metaTitle: "Free Home Improvement Calculators | CalcReno",
  metaDescription:
    "Free home improvement calculators in U.S. units: estimate paint, tile, flooring, concrete, wallpaper, and renovation costs. No sign-up, instant results.",
  h1: "Free Home & DIY Calculators",
  description:
    "Plan any project with confidence. Our calculators work in feet, inches, gallons, and dollars — estimate exactly how much material you need and what it should cost.",
  hero: true,
  heroImage: "assets/img/hero-home.webp",
  intro: `
          <p>Every home improvement project starts with the same two questions: <em>how much material do I need, and what will it cost?</em> Guess too low and you are making a second trip to the store mid-job; guess too high and you have paid for boxes, gallons, and bags you will never use. CalcReno's calculators answer both questions in seconds, using the units American homeowners actually shop with — feet, inches, square feet, gallons, pounds, and dollars.</p>
          <p>Each tool is built around the same standards: clear inputs with sensible defaults, the math shown so you can sanity-check the result, and conservative rounding so you are unlikely to run short. The material tools build in a waste allowance — 10% for a straight tile layout, more for diagonal or herringbone — and every calculator returns an estimated cost alongside the quantity, so you can budget and shop in one place.</p>
          <p>Start with the <a href="/calculators/paint-calculator/">paint calculator</a> for a room repaint, the <a href="/calculators/tile-flooring-calculator/">tile and flooring calculator</a> for a floor or backsplash, the <a href="/calculators/concrete-calculator/">concrete calculator</a> for a patio or slab, the <a href="/calculators/wallpaper-calculator/">wallpaper calculator</a> for a feature wall, or the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a> for a whole-room budget. Every result is a planning estimate, not a professional quote — always confirm quantities with your supplier and costs with a licensed local contractor before you buy.</p>`,
  cards: calculatorPages.map((p) => ({
    route: p.route,
    title: p.title,
    description: p.description,
    icon: p.icon,
    image: `assets/img/calc-${p.icon}.jpg`,
    category: "Calculator",
  })),
};
