// CalcReno — guide / article pages (Phase 2). Long-form, US English, imperial units.
import { adInArticle } from "./lib.mjs";

const guideHub = { route: "/guides/", title: "Guides" };

/* ===================== 1. HOW MUCH PAINT DO I NEED ========================= */
const paintGuide = {
  route: "/guides/how-much-paint-do-i-need/",
  type: "article",
  parent: guideHub,
  title: "How Much Paint Do I Need?",
  category: "How-To",
  breadcrumbLabel: "How Much Paint Do I Need?",
  metaTitle: "How Much Paint Do I Need? (2026 Guide) | CalcReno",
  metaDescription:
    "Figure out how much paint you need, room by room. Coverage rules, a simple formula, and real examples for bedrooms, living rooms, and whole houses.",
  h1: "How Much Paint Do I Need? A Room-by-Room Guide (2026)",
  description:
    "A clear, practical guide to estimating interior paint: the coverage rule that matters, a formula you can do in your head, and worked examples for every room.",
  heroImage: "assets/img/guide-paint.jpg",
  faqs: [
    { q: "How much paint do I need for a 12x12 room?", a: "<p>A 12 × 12 ft room with 8 ft walls has about 384 sq ft of wall area. After subtracting one door and two windows you are near 333 sq ft. For two coats that is roughly 666 sq ft of coverage, or about <strong>2 gallons</strong> at 350 sq ft per gallon.</p>" },
    { q: "Does one gallon of paint cover a room?", a: "<p>One gallon (about 350–400 sq ft) covers a small room in a single coat — think a powder room or small bedroom. For a standard bedroom with two coats, plan on closer to <strong>2 gallons</strong>.</p>" },
    { q: "How much paint for a whole house interior?", a: "<p>It depends on square footage, but a 2,000 sq ft home interior often needs roughly <strong>15–20 gallons</strong> for walls in two coats, plus trim and ceiling paint bought separately. Calculate room by room for the most accurate total.</p>" },
  ],
  body: `
        <p class="lede">"How much paint do I need?" is the first question of every painting project — and getting it wrong costs you either a second trip to the store mid-job or a shelf of half-used cans. This guide gives you a simple, reliable way to estimate interior paint, room by room, in plain U.S. units. When you are ready for an exact number, run your room through the <a href="/calculators/paint-calculator/">paint calculator</a>.</p>

        <h2>The one rule that matters: coverage</h2>
        <p>Everything starts with <strong>coverage</strong> — how much wall a gallon will paint. The industry rule of thumb is that <strong>one gallon covers about 350 to 400 square feet</strong> in a single coat on a smooth, primed, previously painted surface. At CalcReno we plan with <strong>350 sq ft per gallon</strong>, the conservative end, so you are less likely to run short.</p>
        <p>Two things eat into that number:</p>
        <ul>
          <li><strong>Porous or rough surfaces.</strong> New drywall, bare wood, and heavily textured walls soak up paint. Real-world coverage can fall to 250–300 sq ft per gallon. Priming first restores most of your coverage and saves paint overall.</li>
          <li><strong>Color and number of coats.</strong> Going from a dark wall to a light one, or covering patches and repairs, almost always needs two coats. Plan for two unless you are refreshing the exact same color on a clean wall.</li>
        </ul>

        <h2>The formula you can do in your head</h2>
        <p>Here is the whole calculation in four steps. We will use a <strong>standard 12 × 12 ft bedroom with 8 ft ceilings</strong> as the example.</p>
        <ol>
          <li><strong>Wall area = 2 × (length + width) × height.</strong><br>2 × (12 + 12) × 8 = 2 × 24 × 8 = <strong>384 sq ft</strong>.</li>
          <li><strong>Subtract openings.</strong> One door at 21 sq ft and two windows at 15 sq ft each = 51 sq ft. That leaves <strong>333 sq ft</strong> of actual wall.</li>
          <li><strong>Multiply by coats.</strong> Two coats × 333 = <strong>666 sq ft</strong> of coverage needed.</li>
          <li><strong>Divide by 350 and round up.</strong> 666 ÷ 350 = 1.9, so buy <strong>2 gallons</strong>.</li>
        </ol>
        <p>That is it. The same four steps work for any rectangular room. For odd shapes, break the room into rectangles, calculate each, and add them up.</p>

        ${adInArticle()}

        <h2>Room-by-room cheat sheet</h2>
        <p>These are quick planning estimates for walls only, two coats, 8 ft ceilings, at 350 sq ft per gallon. Always confirm with a measurement and the <a href="/calculators/paint-calculator/">calculator</a>.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Room</th><th>Typical size</th><th>Wall area (approx.)</th><th>Paint for 2 coats</th></tr></thead>
            <tbody>
              <tr><td>Powder room / half bath</td><td>5 × 5 ft</td><td>~150 sq ft</td><td>1 gallon</td></tr>
              <tr><td>Small bedroom</td><td>10 × 10 ft</td><td>~270 sq ft</td><td>2 gallons</td></tr>
              <tr><td>Standard bedroom</td><td>12 × 12 ft</td><td>~333 sq ft</td><td>2 gallons</td></tr>
              <tr><td>Living room</td><td>16 × 20 ft</td><td>~520 sq ft</td><td>3 gallons</td></tr>
              <tr><td>Open-plan great room</td><td>20 × 30 ft</td><td>~750 sq ft</td><td>4–5 gallons</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Don't forget ceilings and trim</h2>
        <p>Walls are only part of the job. Two separate products usually come into play:</p>
        <ul>
          <li><strong>Ceiling paint</strong> is a flat, spatter-resistant formula. Calculate it on the floor area (length × width). A 12 × 12 ceiling is 144 sq ft — well under a gallon for one coat, but buy a full gallon for two.</li>
          <li><strong>Trim, doors, and baseboards</strong> use a durable semi-gloss or satin. A quart goes a long way on trim; a gallon covers the trim in several rooms. Measure linear feet of trim rather than wall area.</li>
        </ul>

        <h2>How much paint for a whole house?</h2>
        <p>To estimate an entire interior, add up the wall area of every room and divide by your coverage. As a loose benchmark, a <strong>2,000 sq ft single-family home</strong> often needs in the neighborhood of <strong>15–20 gallons</strong> of wall paint for two coats, plus separate ceiling and trim paint. The only way to get an accurate total is room by room — so walk the house, measure, and total it up.</p>

        <h2>Five ways to avoid over- or under-buying</h2>
        <ul>
          <li><strong>Prime new and patched surfaces</strong> so your coverage estimate holds.</li>
          <li><strong>Buy a single extra quart</strong> for touch-ups rather than a whole extra gallon you will not use.</li>
          <li><strong>Keep the can and lot number.</strong> If you need more, the same batch guarantees a perfect match.</li>
          <li><strong>Stir, don't shake, leftover paint</strong> and store it sealed and cool — it can last for years for touch-ups.</li>
          <li><strong>Round up, not down.</strong> Running out at 90% finished is the worst outcome; a little leftover is normal and useful.</li>
        </ul>

        <p>Ready to nail down your exact number? Open the <a href="/calculators/paint-calculator/">paint calculator</a>, or make sure you have the right gear with our <a href="/guides/essential-diy-painting-tools/">essential painting tools guide</a>.</p>`,
};

/* ===================== 2. HOW MANY TILES DO I NEED ======================== */
const tileGuide = {
  route: "/guides/how-many-tiles-do-i-need/",
  type: "article",
  parent: guideHub,
  title: "How Many Tiles Do I Need?",
  category: "How-To",
  breadcrumbLabel: "How Many Tiles Do I Need?",
  metaTitle: "How Many Tiles Do I Need? (2026) | CalcReno",
  metaDescription:
    "Learn how to calculate how many tiles or boxes you need for a floor or wall, how much waste to add for different patterns, and why you should always buy extra.",
  h1: "How Many Tiles Do I Need? Calculate Boxes + Waste",
  description:
    "A practical guide to tile math: measuring area, converting to boxes, choosing the right waste percentage for your layout, and avoiding a mid-job shortfall.",
  heroImage: "assets/img/guide-tile.jpg",
  faqs: [
    { q: "How do I calculate how many tiles I need?", a: "<p>Measure the area in square feet (length × width), add a waste allowance (usually 10%), then divide by the coverage of one box and round up. Our <a href=\"/calculators/tile-flooring-calculator/\">tile calculator</a> does all of this automatically.</p>" },
    { q: "How much extra tile should I buy?", a: "<p>Add <strong>10%</strong> for straight layouts, <strong>15%</strong> for diagonal or patterned, and up to <strong>20%</strong> for herringbone or mosaic. Then keep at least one full box after the job for future repairs.</p>" },
    { q: "How many tiles are in a box?", a: "<p>It depends on tile size — a box is sold by square footage, not a fixed tile count. Large-format tiles mean fewer pieces per box; small mosaics mean many. Always work from the <strong>square feet per box</strong> figure on the carton.</p>" },
  ],
  body: `
        <p class="lede">Buying tile is unforgiving: too little and you are hunting for a matching batch halfway through, too much and you have paid for boxes you will return (or never will). The good news is the math is straightforward once you know the steps. Here is how to figure out exactly how many tiles — or boxes — you need, and the <a href="/calculators/tile-flooring-calculator/">tile & flooring calculator</a> will do the arithmetic for you.</p>

        <h2>Step 1: Measure the area in square feet</h2>
        <p>Tile is planned by area, not by counting tiles. Measure the <strong>length and width of the floor in feet</strong> and multiply. A bathroom floor that is 8 ft by 6 ft is <strong>48 square feet</strong>. For walls or a backsplash, measure height × width of the area you are tiling.</p>
        <p>For rooms that are not a simple rectangle, split the space into rectangles, calculate each, and add them together. An L-shaped room is just two rectangles. Closets, nooks, and bump-outs each get their own little calculation.</p>

        <h2>Step 2: Add a waste allowance</h2>
        <p>You will never use 100% of what you buy. Cuts at the walls, the occasional cracked tile, and future repairs all require extra. The standard allowances are:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Layout</th><th>Waste to add</th><th>Why</th></tr></thead>
            <tbody>
              <tr><td>Straight / grid</td><td>10%</td><td>Minimal cuts, mostly at edges</td></tr>
              <tr><td>Diagonal</td><td>15%</td><td>More angled cuts at every wall</td></tr>
              <tr><td>Herringbone / chevron</td><td>20%</td><td>Two cut ends on most pieces</td></tr>
              <tr><td>Mosaic / intricate</td><td>15–20%</td><td>Lots of trimming around fixtures</td></tr>
            </tbody>
          </table>
        </div>
        <p>So our 48 sq ft bathroom in a straight layout needs 48 × 1.10 = <strong>52.8 sq ft</strong> of tile to purchase.</p>

        ${adInArticle()}

        <h2>Step 3: Convert square feet to boxes</h2>
        <p>Stores sell tile by the <strong>box</strong>, and each box lists its <strong>coverage in square feet</strong>. Divide the area (with waste) by the box coverage and round up to the next whole box.</p>
        <p>If each box covers 12 sq ft: 52.8 ÷ 12 = 4.4, so you buy <strong>5 boxes</strong>. You cannot buy 4.4 boxes, and the rounding up is exactly the buffer you want.</p>
        <p>Be careful not to confuse "tiles per box" with "square feet per box." A box of large-format 24-inch tiles might hold only three or four pieces, while a box of small mosaics holds dozens. The square-footage figure is what matters.</p>

        <h2>Why you should always buy extra — and keep it</h2>
        <p>This is the tip that saves projects years down the road. Tile is produced in <strong>batches (called dye lots or production runs)</strong>, and color can shift slightly from one run to the next. If you crack a tile in two years and go back for a single replacement, the new batch may not match the floor.</p>
        <p>The fix is simple: buy your full quantity — including waste — in one order from one batch, and <strong>keep at least one full box</strong> after the job is done. Store it flat and dry. It is the cheapest insurance in home improvement.</p>

        <h2>Don't forget the extras</h2>
        <p>Tile itself is only part of the shopping list. Budget for:</p>
        <ul>
          <li><strong>Thinset or mortar</strong> and <strong>grout</strong>, sized to your tile and joint width.</li>
          <li><strong>Trim pieces</strong> like bullnose for finished edges, and transition strips where the tile meets another floor.</li>
          <li><strong>Underlayment or backer board</strong>, especially in wet areas.</li>
          <li><strong>Spacers, a notched trowel, and a tile cutter or wet saw</strong> if you are doing it yourself.</li>
        </ul>

        <h2>Worked example, start to finish</h2>
        <p>Say you are tiling a 10 × 12 ft kitchen floor in a diagonal layout with boxes that cover 15 sq ft each:</p>
        <ol>
          <li>Area: 10 × 12 = <strong>120 sq ft</strong>.</li>
          <li>Diagonal waste at 15%: 120 × 1.15 = <strong>138 sq ft</strong>.</li>
          <li>Boxes: 138 ÷ 15 = 9.2 → <strong>10 boxes</strong>.</li>
        </ol>
        <p>Plug your own numbers into the <a href="/calculators/tile-flooring-calculator/">tile & flooring calculator</a> to get your box count in seconds, then check our <a href="/guides/cost-to-renovate-a-room/">renovation cost guide</a> if tiling is part of a bigger remodel.</p>`,
};

/* ===================== 3. COST TO RENOVATE A ROOM ========================= */
const renovationGuide = {
  route: "/guides/cost-to-renovate-a-room/",
  type: "article",
  parent: guideHub,
  title: "Cost to Renovate a Room (2026)",
  category: "Cost Guide",
  breadcrumbLabel: "Cost to Renovate a Room",
  metaTitle: "How Much Does It Cost to Renovate a Room in 2026? | CalcReno",
  metaDescription:
    "What does it cost to renovate a kitchen, bathroom, or bedroom in 2026? See the factors that drive price and typical ranges by room.",
  h1: "How Much Does It Cost to Renovate a Room in 2026?",
  description:
    "A realistic look at what drives remodeling costs in 2026, room by room, plus how to budget, where money goes, and how to read a contractor's bid.",
  heroImage: "assets/img/guide-renovation.jpg",
  faqs: [
    { q: "How much does it cost to renovate a kitchen in 2026?", a: "<p>Kitchens are among the most expensive rooms to remodel because of cabinetry, countertops, appliances, plumbing, and electrical. Costs span a very wide range depending on size, finishes, and whether the layout changes. Use the <a href=\"/calculators/renovation-cost-estimator/\">renovation cost estimator</a> for a ballpark, then get local quotes.</p>" },
    { q: "What is the most expensive part of a renovation?", a: "<p>Labor is typically the single largest line item, often 30–50% of a project. After that, kitchens are dominated by cabinetry and countertops, and bathrooms by tile, fixtures, and any plumbing relocation.</p>" },
    { q: "How much should I budget for surprises?", a: "<p>Set aside a <strong>contingency of 10–20%</strong> of your project budget. Older homes routinely reveal hidden issues — outdated wiring, water damage, or code upgrades — once walls are opened.</p>" },
  ],
  body: `
        <p class="lede">"What will it cost to renovate this room?" has no single answer — and anyone who gives you one without seeing your space is guessing. But you can absolutely build a realistic budget by understanding what drives the price. This guide explains the cost factors room by room for 2026, so you can plan before you ever call a contractor. For a quick ballpark, start with the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a>.</p>

        <h2>What actually drives renovation cost</h2>
        <p>Two rooms of identical size can differ in price by a factor of three or more. Here is where the money goes:</p>
        <ul>
          <li><strong>Labor.</strong> Usually the biggest single cost — often 30–50% of a remodel. Skilled trades (plumbers, electricians, tile setters) command higher rates, and rates vary a lot by region.</li>
          <li><strong>Scope and layout changes.</strong> A cosmetic refresh (paint, fixtures, flooring) is far cheaper than moving plumbing, relocating walls, or changing the footprint. The moment you move a sink or a wall, costs climb.</li>
          <li><strong>Finishes.</strong> Stock cabinets vs. custom, laminate vs. stone, builder-grade vs. designer fixtures — finishes can double a budget on their own.</li>
          <li><strong>The trades involved.</strong> Kitchens and bathrooms touch plumbing, electrical, cabinetry, and tile, which is why they cost more per square foot than bedrooms.</li>
          <li><strong>Permits and code.</strong> Structural, electrical, and plumbing work usually requires permits and inspections, and older homes may trigger code upgrades.</li>
          <li><strong>The unexpected.</strong> Water damage, rot, outdated wiring, and asbestos turn up once walls are open. This is why a contingency is non-negotiable.</li>
        </ul>

        <h2>Why we show ranges, not a single price</h2>
        <p>Because finishes and site conditions swing the number so widely, the only honest figure is a <strong>range</strong>. CalcReno's estimator uses three tiers:</p>
        <ul>
          <li><strong>Budget:</strong> a refresh with stock materials, keeping the existing layout. Think new paint, mid-grade flooring, stock cabinets, and updated fixtures.</li>
          <li><strong>Mid-range:</strong> quality materials and some upgrades — semi-custom cabinets, stone or quartz surfaces, better tile, possibly minor layout tweaks.</li>
          <li><strong>High-end:</strong> premium and custom finishes, higher-end appliances and fixtures, and layout changes that move plumbing or walls.</li>
        </ul>

        ${adInArticle()}

        <h2>Room by room: where the money goes</h2>
        <h3>Kitchen</h3>
        <p>The most complex room in the house. Cabinetry and countertops typically dominate the budget, followed by appliances, then plumbing and electrical. Keeping the existing layout — sink, stove, and refrigerator in place — is the single biggest way to control cost. Moving them means new plumbing and wiring runs.</p>
        <h3>Bathroom</h3>
        <p>Small in square footage but expensive per square foot because of waterproofing, tile, and plumbing fixtures packed into a tight space. A "like-for-like" update (new vanity, toilet, tile, fixtures in the same spots) is moderate; relocating the shower or toilet is where bathrooms get expensive.</p>
        <h3>Bedroom</h3>
        <p>Usually the most affordable room to renovate, since it is mostly drywall, paint, flooring, trim, and lighting — no plumbing and limited electrical. Closet build-outs and new windows are the main upgrades that add cost.</p>
        <h3>Living room</h3>
        <p>Like bedrooms, living rooms are typically finish-driven: flooring, paint, lighting, and trim. Costs rise with features like built-ins, a fireplace, accent walls, or new windows and doors.</p>
        <h3>Basement finishing</h3>
        <p>Finishing an unfinished basement is priced by what you add: framing, insulation, drywall, flooring, lighting, and especially any bathroom or wet bar. Moisture control and egress requirements can add cost but are not optional for a safe, code-compliant space.</p>

        <h2>How to build your budget</h2>
        <ol>
          <li><strong>Start with the estimator</strong> for a planning range, then treat the high end as your working number.</li>
          <li><strong>Get 2–3 written quotes</strong> from licensed local contractors. Bids should be itemized so you can compare like for like.</li>
          <li><strong>Add a 10–20% contingency</strong> on top, especially in homes more than 30 years old.</li>
          <li><strong>Separate must-haves from nice-to-haves</strong> so you know what to cut if bids come in high.</li>
          <li><strong>Confirm what's included</strong> — permits, cleanup, disposal, and finish materials are sometimes excluded from a headline price.</li>
        </ol>

        <p class="note"><strong>A note on numbers:</strong> CalcReno provides planning estimates and educational ranges, not quotes or financial advice. Actual costs depend on your location, contractor, and choices. Always confirm with licensed local professionals before committing to a budget.</p>

        <p>Get your room's ballpark with the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a>, then price out the materials with our <a href="/calculators/">project calculators</a>.</p>`,
};

/* ===================== 4. ESSENTIAL DIY PAINTING TOOLS ==================== */
const toolsGuide = {
  route: "/guides/essential-diy-painting-tools/",
  type: "article",
  parent: guideHub,
  title: "Essential DIY Painting Tools",
  category: "Buying Guide",
  breadcrumbLabel: "Essential DIY Painting Tools",
  metaTitle: "12 Essential DIY Painting Tools (2026) | CalcReno",
  metaDescription:
    "The painting tools that actually matter for a clean, professional DIY finish — rollers, brushes, tape, drop cloths, and prep gear — and how to choose each one.",
  h1: "12 Essential DIY Painting Tools for a Pro Finish",
  description:
    "Skip the gimmicks. These are the painting tools that genuinely make a DIY paint job faster, cleaner, and more professional — with tips on choosing each.",
  heroImage: "assets/img/guide-tools.jpg",
  faqs: [
    { q: "What tools do I need to paint a room?", a: "<p>At minimum: a quality roller frame and covers, an angled sash brush, a paint tray or bucket grid, painter's tape, drop cloths, a putty knife and spackle for prep, sandpaper, and an extension pole. A few small extras make the job noticeably cleaner.</p>" },
    { q: "What roller nap should I use?", a: "<p>Match nap (the thickness of the cover) to your surface: a <strong>3/8-inch nap</strong> for smooth-to-light-texture walls, <strong>1/2-inch</strong> for medium texture, and <strong>3/4-inch or more</strong> for heavy texture, brick, or masonry.</p>" },
    { q: "Is expensive painter's tape worth it?", a: "<p>Often, yes. Better tapes seal more reliably and remove cleanly without lifting paint or leaving residue, which means crisper lines and less touch-up. For delicate or freshly painted surfaces, choose a tape rated for that use and don't leave it on too long.</p>" },
  ],
  body: `
        <p class="lede">A great paint job is 90% preparation and the right tools — not expensive paint or special talent. Buy a handful of quality basics and your walls will look like a pro did them. Here are the twelve tools worth owning, why each matters, and how to choose. Once you know your quantities from the <a href="/calculators/paint-calculator/">paint calculator</a>, this is your shopping list.</p>

        <h2>The core kit</h2>

        <h3>1. A quality roller frame and covers</h3>
        <p>The roller does most of the work on walls and ceilings. A sturdy 9-inch frame with a comfortable grip plus the right <strong>nap</strong> (cover thickness) for your surface makes the difference between an even coat and a streaky one. Use 3/8-inch nap for smooth walls, 1/2-inch for light texture, and 3/4-inch for heavy texture.</p>
        <p><!-- AMAZON AFFILIATE LINK: 9-inch roller frame and cover set --></p>

        <h3>2. An angled sash brush</h3>
        <p>A 2 to 2.5-inch angled brush is what you cut in with — painting the clean line where the wall meets the ceiling, trim, and corners. A good brush holds more paint and releases it evenly. This is the one place not to buy the cheapest option.</p>
        <p><!-- AMAZON AFFILIATE LINK: 2.5-inch angled sash brush --></p>

        <h3>3. An extension pole</h3>
        <p>Threads onto your roller frame so you can reach ceilings and the tops of walls without a ladder, and paint with your whole arm instead of your wrist. It is faster and far less tiring. A telescoping pole that extends to a few feet covers most rooms.</p>
        <p><!-- AMAZON AFFILIATE LINK: telescoping paint extension pole --></p>

        <h3>4. Paint tray or a bucket and grid</h3>
        <p>For one room, a sturdy tray with disposable liners works fine. For bigger jobs, pros load from a 5-gallon bucket with a roller grid — it holds more paint and is harder to tip over. Either way, liners make cleanup trivial.</p>
        <p><!-- AMAZON AFFILIATE LINK: paint tray with liners / bucket grid --></p>

        ${adInArticle()}

        <h2>Prep and protection</h2>

        <h3>5. Painter's tape</h3>
        <p>The secret to crisp lines. Press it down firmly along the edge for a clean seal, and remove it before the paint fully cures. Better tapes resist bleed-through and come off without lifting your finish.</p>
        <p><!-- AMAZON AFFILIATE LINK: painter's tape --></p>

        <h3>6. Drop cloths</h3>
        <p>Canvas drop cloths lie flat, absorb drips, and last for years — far better than slippery plastic sheeting on floors. Use them on the floor and over furniture you cannot move out.</p>
        <p><!-- AMAZON AFFILIATE LINK: canvas drop cloth --></p>

        <h3>7. Putty knife and spackle</h3>
        <p>Fill nail holes, dents, and small cracks before you paint. A flexible putty knife and a tub of lightweight spackle take ten minutes and make the finished wall look seamless.</p>
        <p><!-- AMAZON AFFILIATE LINK: putty knife and spackle --></p>

        <h3>8. Sanding block or sandpaper</h3>
        <p>Lightly sand patched spots and glossy surfaces so the new paint bonds. A medium-grit sanding sponge is easy to control and reaches corners.</p>
        <p><!-- AMAZON AFFILIATE LINK: sanding sponge / sandpaper --></p>

        <h2>The finishing touches</h2>

        <h3>9. A paint can opener and stir sticks</h3>
        <p>Tiny tools, big convenience. A proper opener saves your screwdriver and your fingers, and stirring thoroughly before and during the job keeps color and sheen consistent.</p>

        <h3>10. Tack cloth or microfiber</h3>
        <p>Wipe down sanded and dusty surfaces before painting. Paint will not adhere well to a dusty wall, and trapped grit shows in the finish.</p>

        <h3>11. A sturdy step stool or ladder</h3>
        <p>Even with an extension pole, you need safe height for cutting in at the ceiling. A stable step stool beats balancing on furniture every time.</p>

        <h3>12. Cleanup supplies</h3>
        <p>Have rags, a bucket of warm soapy water (for latex paint), and a brush comb on hand. Cleaning quality brushes and rollers properly means they last for many projects.</p>

        <h2>What you can skip</h2>
        <p>Gadgets like edging tools and paint pads promise speedier cutting-in but rarely beat a good brush in practiced hands. Save your money for better brushes, rollers, and tape — the tools you will actually feel the difference from.</p>

        <p>With your kit ready, lock in your quantities using the <a href="/calculators/paint-calculator/">paint calculator</a>, and if you are not sure how much to buy, read <a href="/guides/how-much-paint-do-i-need/">how much paint do I need</a>.</p>

        <p class="note"><em>CalcReno may include affiliate links to products we mention. If you buy through them, we may earn a small commission at no extra cost to you. We only suggest categories of tools that are genuinely useful for the job.</em></p>`,
};

/* ===================== 5. COST TO PAINT A ROOM (2026) ===================== */
const paintCostGuide = {
  route: "/guides/cost-to-paint-a-room/",
  type: "article",
  category: "Cost Guide",
  parent: guideHub,
  title: "Cost to Paint a Room (2026)",
  breadcrumbLabel: "Cost to Paint a Room",
  metaTitle: "How Much Does It Cost to Paint a Room in 2026? | CalcReno",
  metaDescription:
    "What does it cost to paint a room in 2026 — DIY vs. a pro? See the price factors, typical ranges, and how to budget paint, supplies, and labor.",
  h1: "How Much Does It Cost to Paint a Room in 2026?",
  description:
    "A clear breakdown of what painting a room really costs in 2026 — DIY materials vs. hiring a painter, the factors that move the price, and how to budget.",
  heroImage: "assets/img/guide-paint-cost.jpg",
  faqs: [
    { q: "Is it cheaper to paint a room yourself?", a: "<p>Almost always, yes. DIY painting removes labor, which is usually the largest part of a professional quote. Your main costs become paint, primer, and supplies. The trade-offs are your time, the learning curve for a clean finish, and the cost of any tools you do not already own. For a single standard bedroom, a careful DIYer can often complete the job for the cost of materials alone.</p>" },
    { q: "How much does a painter charge per square foot?", a: "<p>Professional interior painting is frequently quoted by the square foot of wall area or floor area, with rates that vary widely by region, prep work, ceiling height, and number of coats. Because labor markets differ so much across the U.S., treat any single number as a rough planning figure and get itemized local quotes for an accurate price.</p>" },
    { q: "What makes a paint job cost more?", a: "<p>The big drivers are prep work (patching, sanding, priming bare or repaired surfaces), high or vaulted ceilings, dark-to-light color changes that need extra coats, detailed trim and built-ins, and the quality tier of paint you choose. Moving furniture and protecting floors add time too.</p>" },
    { q: "How much paint will I need to buy?", a: "<p>For a standard 12 × 12 ft room with two coats, plan on roughly 2 gallons of wall paint, plus separate trim and ceiling paint. Use the <a href=\"/calculators/paint-calculator/\">paint calculator</a> for your exact room, and read <a href=\"/guides/how-much-paint-do-i-need/\">how much paint do I need</a> for the method.</p>" },
  ],
  body: `
        <p class="lede">Painting is one of the highest-impact, lowest-cost upgrades you can make to a room — but "low cost" still covers a wide range depending on whether you DIY or hire out, how much prep is involved, and the finishes you choose. Here is how the cost of painting a room breaks down in 2026, and how to budget it honestly. To price the paint itself for your exact room, use the <a href="/calculators/paint-calculator/">paint calculator</a>.</p>

        <h2>The two big cost paths: DIY vs. hiring a pro</h2>
        <p>Every painting budget starts with one decision: are you doing it yourself or paying someone? The gap between the two is almost entirely <strong>labor</strong>, which typically makes up the largest share of a professional quote.</p>
        <ul>
          <li><strong>DIY</strong> — your cost is essentially materials: paint, primer, and supplies. You trade money for time and a bit of a learning curve.</li>
          <li><strong>Hiring a pro</strong> — you add labor, but you get speed, a reliably clean finish, and someone else handling prep, cutting in, and cleanup.</li>
        </ul>
        <p>Neither is "right" — it depends on your budget, your time, and how comfortable you are on a ladder with a brush.</p>

        <h2>What goes into a DIY paint budget</h2>
        <p>If you paint it yourself, your shopping list looks like this:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Item</th><th>What it covers</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>Wall paint</td><td>~2 gallons for a standard room, 2 coats</td><td>Quality tiers vary widely per gallon</td></tr>
              <tr><td>Primer</td><td>New drywall, bare wood, big color changes</td><td>Skip on clean, same-color repaints</td></tr>
              <tr><td>Trim &amp; ceiling paint</td><td>Bought separately (different finishes)</td><td>A quart of trim paint goes a long way</td></tr>
              <tr><td>Supplies</td><td>Roller, brush, tray, tape, drop cloth, spackle</td><td>One-time cost; reuse on future jobs</td></tr>
            </tbody>
          </table>
        </div>
        <p>The single biggest variable is paint quality. A premium paint costs more per gallon but often covers better and lasts longer, which can mean fewer coats and less repainting down the road. See our <a href="/guides/essential-diy-painting-tools/">essential painting tools guide</a> for the supplies that actually matter.</p>

        ${adInArticle()}

        <h2>What drives a professional quote</h2>
        <p>If you hire a painter, the quote reflects far more than paint. The main cost factors are:</p>
        <ul>
          <li><strong>Prep work.</strong> Patching holes, sanding, caulking, and priming are labor-intensive. A room that needs a lot of repair costs more than a clean one.</li>
          <li><strong>Ceiling height.</strong> Tall, vaulted, or stairwell walls need more equipment and time.</li>
          <li><strong>Number of coats.</strong> Dark-to-light changes and bold colors often need an extra coat.</li>
          <li><strong>Trim and detail.</strong> Crown molding, wainscoting, doors, and built-ins are slow, precise work.</li>
          <li><strong>Condition and color.</strong> Switching from a dark to a light color, or covering stains, adds coats and primer.</li>
          <li><strong>Your region.</strong> Labor rates differ dramatically across the country — the same job can vary a lot city to city.</li>
        </ul>
        <p>Because these factors swing the total so much, the only reliable price is an itemized written quote from a local painter who has seen the room.</p>

        <h2>How to budget without a quote in hand</h2>
        <ol>
          <li><strong>Price the paint first.</strong> Run your room through the <a href="/calculators/paint-calculator/">paint calculator</a> to get gallons and a material cost.</li>
          <li><strong>Add supplies</strong> if you do not already own them — this is a one-time cost you will reuse.</li>
          <li><strong>Decide DIY vs. pro.</strong> If hiring, get two or three local quotes and compare what each includes (prep, trim, ceilings, cleanup).</li>
          <li><strong>Budget for prep.</strong> Old or damaged walls cost more in either path — do not skip patching and priming.</li>
        </ol>

        <h2>Where people overspend (and underspend)</h2>
        <ul>
          <li><strong>Overspend:</strong> buying too much paint by not measuring, or hiring out a small, simple room that is a very doable DIY.</li>
          <li><strong>Underspend:</strong> skimping on prep or primer, which shows in the finish and means repainting sooner — the most expensive outcome of all.</li>
        </ul>

        <p class="note"><strong>On the numbers:</strong> Paint and labor prices vary widely by product, region, and contractor. CalcReno gives planning estimates, not quotes. Always confirm current paint prices with your supplier and get written bids from licensed local painters.</p>

        <p>Ready to price your room? Start with the <a href="/calculators/paint-calculator/">paint calculator</a>, then read <a href="/guides/how-much-paint-do-i-need/">how much paint do I need</a> to nail the quantity.</p>`,
};

/* ===================== 6. TILE INSTALLATION COST (2026) =================== */
const tileCostGuide = {
  route: "/guides/tile-installation-cost/",
  type: "article",
  category: "Cost Guide",
  parent: guideHub,
  title: "Tile Installation Cost Guide (2026)",
  breadcrumbLabel: "Tile Installation Cost",
  metaTitle: "Tile Installation Cost Guide (2026) | CalcReno",
  metaDescription:
    "What does tile installation cost in 2026? Break down materials vs. labor, what drives the price up, DIY vs. pro, and the hidden extras people forget to budget.",
  h1: "Tile Installation Cost Guide (2026): Labor + Materials",
  description:
    "A practical breakdown of what tiling a floor or wall costs in 2026 — materials, labor, the factors that raise the price, and the extras people forget.",
  heroImage: "assets/img/guide-tile-cost.jpg",
  faqs: [
    { q: "Is tile installation expensive?", a: "<p>Tile is typically more expensive to install than vinyl or laminate because it is labor-intensive: the surface must be prepped, tiles set in mortar, then grouted and sealed. The material itself ranges from budget ceramic to premium natural stone, and labor is usually the larger share of the total. Larger, simpler layouts cost less per square foot than small, intricate ones.</p>" },
    { q: "What costs more — the tile or the labor?", a: "<p>For most standard installations, <strong>labor is the larger cost</strong>, especially for patterns like herringbone, diagonal layouts, mosaics, or areas with lots of cuts around fixtures. Premium natural stone can flip that balance, but for everyday ceramic and porcelain, the install work usually dominates.</p>" },
    { q: "Can I save money installing tile myself?", a: "<p>Yes — DIY removes labor, the biggest line item. The trade-offs are tool rental (a wet saw), a real learning curve for a flat, even result, and more risk of waste from mistakes. Floors are more forgiving than walls and wet areas; showers and backsplashes are less beginner-friendly.</p>" },
    { q: "How much extra tile should I order?", a: "<p>Add 10% waste for straight layouts, 15% for diagonal or patterned, and up to 20% for herringbone or mosaic — then keep a full box for repairs. Use the <a href=\"/calculators/tile-flooring-calculator/\">tile calculator</a> to get your box count, and read <a href=\"/guides/how-many-tiles-do-i-need/\">how many tiles do I need</a>.</p>" },
  ],
  body: `
        <p class="lede">Tile is one of the most durable, beautiful finishes you can install — and also one of the more expensive, because it is labor-intensive. Whether you are tiling a bathroom floor, a kitchen backsplash, or a whole open-plan space, here is how the cost breaks down in 2026 and where the money actually goes. To estimate your materials, start with the <a href="/calculators/tile-flooring-calculator/">tile &amp; flooring calculator</a>.</p>

        <h2>The two halves of a tile budget: materials and labor</h2>
        <p>Every tile project has two cost halves, and understanding the split helps you control the total.</p>
        <ul>
          <li><strong>Materials:</strong> the tile itself, plus thinset/mortar, grout, backer board or underlayment, spacers, sealant, and trim pieces.</li>
          <li><strong>Labor:</strong> surface prep, layout, cutting, setting, grouting, and sealing. For most everyday installations, this is the larger share.</li>
        </ul>

        <h2>What you pay for in materials</h2>
        <p>The tile is only part of the materials bill. A complete list usually includes:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Material</th><th>Role</th><th>Budget impact</th></tr></thead>
            <tbody>
              <tr><td>Tile</td><td>The finish surface</td><td>Ceramic (lower) → porcelain → natural stone (higher)</td></tr>
              <tr><td>Thinset / mortar</td><td>Bonds tile to substrate</td><td>Modest, but sized to your tile and area</td></tr>
              <tr><td>Grout &amp; sealant</td><td>Fills and protects joints</td><td>Modest; epoxy grout costs more than cement</td></tr>
              <tr><td>Backer board / underlayment</td><td>Stable, waterproof base</td><td>Essential in wet areas; adds up over large floors</td></tr>
              <tr><td>Trim &amp; transitions</td><td>Finished edges, doorways</td><td>Often forgotten in budgets</td></tr>
            </tbody>
          </table>
        </div>
        <p>The biggest material swing is the tile grade. Budget ceramic is the most affordable; large-format porcelain and especially natural stone (marble, travertine) sit at the premium end and may also require more careful handling.</p>

        ${adInArticle()}

        <h2>What drives the labor cost up</h2>
        <p>Two identical-size rooms can cost very differently to tile. The main labor multipliers are:</p>
        <ul>
          <li><strong>Pattern complexity.</strong> Straight grid is fastest. Diagonal, herringbone, chevron, and mosaics require far more cuts and layout time.</li>
          <li><strong>Lots of cuts and obstacles.</strong> Toilets, vanities, outlets, niches, and tight corners slow the work.</li>
          <li><strong>Surface prep.</strong> Leveling an uneven subfloor or installing backer board adds hours before a single tile is set.</li>
          <li><strong>Wet areas.</strong> Showers and tub surrounds need waterproofing and precision — they cost more than a simple floor.</li>
          <li><strong>Tile size and material.</strong> Very large format tiles need flatness and care; natural stone needs extra handling and sealing.</li>
        </ul>

        <h2>DIY vs. hiring a tile setter</h2>
        <p>Tiling is a popular DIY project, but it rewards patience and the right tools. Doing it yourself removes labor — the biggest cost — but adds:</p>
        <ul>
          <li><strong>Tool needs:</strong> a wet saw (often rented), notched trowel, spacers, level, and a grout float.</li>
          <li><strong>A learning curve:</strong> flat, evenly spaced, fully bonded tile takes practice. Mistakes mean wasted tile and time.</li>
          <li><strong>Risk by area:</strong> a simple floor is beginner-friendly; a waterproofed shower is best left to a pro unless you are experienced.</li>
        </ul>

        <h2>The extras people forget to budget</h2>
        <ul>
          <li><strong>Demolition and disposal</strong> of old flooring or tile.</li>
          <li><strong>Subfloor repair or leveling</strong> discovered once the old surface comes up.</li>
          <li><strong>Trim, transition strips, and sealant.</strong></li>
          <li><strong>Waste tile</strong> — always order extra and keep a box for repairs.</li>
        </ul>

        <p class="note"><strong>On the numbers:</strong> Tile and labor prices vary widely by material grade, region, and installer. These are planning factors, not a quote. Confirm material prices with your supplier and get itemized bids from licensed local installers.</p>

        <p>Estimate your tile and boxes with the <a href="/calculators/tile-flooring-calculator/">tile &amp; flooring calculator</a>, and learn the waste math in <a href="/guides/how-many-tiles-do-i-need/">how many tiles do I need</a>.</p>`,
};

/* ===================== 7. KITCHEN RENOVATION BUDGET (2026) ================ */
const kitchenBudgetGuide = {
  route: "/guides/kitchen-renovation-budget/",
  type: "article",
  category: "Cost Guide",
  parent: guideHub,
  title: "Kitchen Renovation Budget Breakdown (2026)",
  breadcrumbLabel: "Kitchen Renovation Budget",
  metaTitle: "Kitchen Renovation Budget Breakdown (2026) | CalcReno",
  metaDescription:
    "A realistic kitchen renovation budget breakdown for 2026: how costs split across cabinets, countertops, appliances, and labor, plus where to save and splurge.",
  h1: "Kitchen Renovation Budget Breakdown (2026)",
  description:
    "Where the money actually goes in a kitchen remodel — cabinets, countertops, appliances, labor — and how to build a budget that survives contact with reality.",
  heroImage: "assets/img/guide-kitchen-budget.jpg",
  faqs: [
    { q: "What is the most expensive part of a kitchen remodel?", a: "<p><strong>Cabinetry is usually the single largest line item</strong> in a kitchen budget, often followed by countertops, appliances, and labor. Because cabinets drive so much of the total, the stock-vs-semi-custom-vs-custom decision is one of the biggest levers you have over the final price.</p>" },
    { q: "How can I save money on a kitchen renovation?", a: "<p>The biggest savings come from <strong>keeping the existing layout</strong> (so plumbing and electrical stay put), choosing stock or semi-custom cabinets, and selecting durable mid-range materials over premium ones. Refacing or repainting cabinets instead of replacing them can also cut costs dramatically.</p>" },
    { q: "Should I budget a contingency?", a: "<p>Yes — set aside <strong>10–20%</strong> for surprises, especially in older homes. Once cabinets and walls come out, hidden issues like outdated wiring, plumbing problems, or water damage often appear, and they are not optional to fix.</p>" },
    { q: "How big should my kitchen budget be?", a: "<p>That depends on your kitchen's size, the quality tier you want, and whether the layout changes. Use the <a href=\"/calculators/renovation-cost-estimator/\">renovation cost estimator</a> for a planning range, then refine it with quotes. Read the <a href=\"/guides/cost-to-renovate-a-room/\">cost to renovate a room</a> guide for the full picture.</p>" },
  ],
  body: `
        <p class="lede">The kitchen is the most complex — and usually the most expensive — room to renovate, because it brings together cabinetry, countertops, appliances, plumbing, and electrical in one space. The good news: once you understand how the budget splits, you can steer it. Here is where the money goes in a 2026 kitchen remodel and how to plan it. For a quick ballpark on your kitchen, use the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a>.</p>

        <h2>How a kitchen budget typically splits</h2>
        <p>Every kitchen is different, but the budget tends to concentrate in a handful of categories. Understanding the rough proportions helps you see where to focus your decisions.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Category</th><th>Typical share of budget</th><th>Why it matters</th></tr></thead>
            <tbody>
              <tr><td>Cabinetry</td><td>Largest single share</td><td>Stock vs. semi-custom vs. custom is the biggest lever</td></tr>
              <tr><td>Countertops</td><td>Significant</td><td>Laminate → quartz → natural stone spans a wide range</td></tr>
              <tr><td>Appliances</td><td>Significant</td><td>Easy to scale up or down by brand and tier</td></tr>
              <tr><td>Labor &amp; installation</td><td>Large</td><td>Rises sharply if the layout changes</td></tr>
              <tr><td>Flooring, lighting, plumbing, paint</td><td>Smaller pieces that add up</td><td>Where details and finishes live</td></tr>
            </tbody>
          </table>
        </div>
        <p>These proportions shift with your choices — a high-end appliance package or custom cabinets can quickly dominate the total. Treat the shares as a map, not a rule.</p>

        <h2>The single biggest decision: layout</h2>
        <p>If there is one factor that separates a moderate kitchen budget from a runaway one, it is whether you <strong>move the plumbing, gas, or walls</strong>. Keeping the sink, range, and refrigerator roughly where they are means no new plumbing or electrical runs and no structural work. The moment you relocate them — or take down a wall — you add trades, permits, and cost. If budget is tight, design within the existing footprint.</p>

        ${adInArticle()}

        <h2>Cabinets: the biggest lever you control</h2>
        <p>Because cabinetry is usually the largest line item, your cabinet choice shapes the whole budget:</p>
        <ul>
          <li><strong>Stock cabinets</strong> — pre-made, limited sizes and finishes, most affordable.</li>
          <li><strong>Semi-custom</strong> — more sizes, styles, and finishes; a middle path many remodels choose.</li>
          <li><strong>Custom</strong> — built to your exact space and spec; the premium tier.</li>
          <li><strong>Refacing or repainting</strong> — if the boxes are sound, new doors or a quality repaint can transform the look for a fraction of replacement.</li>
        </ul>

        <h2>Countertops and appliances: scalable choices</h2>
        <p>These two categories give you the most flexibility to dial cost up or down:</p>
        <ul>
          <li><strong>Countertops:</strong> laminate sits at the budget end, quartz in the popular middle, and natural stone like granite or marble at the premium end.</li>
          <li><strong>Appliances:</strong> a builder-grade package costs far less than a pro-style suite. Decide which appliances you truly want to splurge on and save on the rest.</li>
        </ul>

        <h2>Building a kitchen budget that survives</h2>
        <ol>
          <li><strong>Get a ballpark</strong> from the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a> using your kitchen's size and target quality.</li>
          <li><strong>Decide layout early</strong> — keeping it fixed is the biggest cost control you have.</li>
          <li><strong>Pick your splurges.</strong> Choose one or two categories to invest in and economize on the rest.</li>
          <li><strong>Get 2–3 itemized quotes</strong> from licensed local contractors and compare what is included.</li>
          <li><strong>Hold a 10–20% contingency</strong> for the surprises older homes love to reveal.</li>
        </ol>

        <p class="note"><strong>On the numbers:</strong> Kitchen costs vary enormously by location, finishes, and contractor. CalcReno provides planning ranges and educational breakdowns, not quotes or financial advice. Always confirm with licensed local professionals before setting a budget.</p>

        <p>Start with a ballpark from the <a href="/calculators/renovation-cost-estimator/">renovation cost estimator</a>, then read the broader <a href="/guides/cost-to-renovate-a-room/">cost to renovate a room</a> guide.</p>`,
};

/* ===================== 8. CONCRETE COST GUIDE (2026) ====================== */
const concreteCostGuide = {
  route: "/guides/concrete-cost-guide/",
  type: "article",
  category: "Cost Guide",
  parent: guideHub,
  title: "Concrete Cost Guide: Slabs, Patios & Driveways (2026)",
  breadcrumbLabel: "Concrete Cost Guide",
  metaTitle: "Concrete Cost Guide 2026: Slabs and Patios | CalcReno",
  metaDescription:
    "What does a concrete slab, patio, or driveway cost in 2026? Bags vs. ready-mix, what drives the price, and the prep and finishing costs people miss.",
  h1: "Concrete Cost Guide: Slabs, Patios & Driveways (2026)",
  description:
    "How concrete projects are priced in 2026 — bags vs. ready-mix, what raises the cost, DIY vs. hiring out, and the base and finishing work that budgets often miss.",
  heroImage: "assets/img/guide-concrete-cost.jpg",
  faqs: [
    { q: "Is it cheaper to mix concrete bags or order ready-mix?", a: "<p>For small jobs — up to roughly half a cubic yard to a cubic yard — bagged concrete mixed on site is usually the practical choice. Beyond that, the number of bags, water, and labor add up fast, and <strong>ready-mix delivery becomes cheaper and far easier</strong>. Most suppliers have a minimum load and short-load fees, so very small ready-mix orders can carry extra charges.</p>" },
    { q: "What's the most overlooked concrete cost?", a: "<p>Site prep. A proper project needs <strong>excavation, a compacted gravel sub-base, forms, and often rebar or wire mesh</strong> before any concrete is poured. In freeze-prone regions, footings must reach below the frost line. These base steps are essential and frequently left out of rough budgets.</p>" },
    { q: "How thick should a slab be?", a: "<p>Patios and walkways are usually 4 inches thick; slabs that carry vehicles, like driveways, are typically 5–6 inches with reinforcement. Always confirm thickness, reinforcement, and footing requirements with your local building code, since they vary by region and load.</p>" },
    { q: "How much concrete do I need?", a: "<p>Use the <a href=\"/calculators/concrete-calculator/\">concrete calculator</a> to convert your slab dimensions into cubic yards and the number of 40, 60, and 80 lb bags, including a waste allowance.</p>" },
  ],
  body: `
        <p class="lede">Concrete projects — a patio, a shed pad, a walkway, or a driveway — look simple but hide real cost in the prep and finishing work. Whether you mix bags yourself or order a ready-mix truck, here is how concrete is priced in 2026 and where budgets go wrong. To size your pour, start with the <a href="/calculators/concrete-calculator/">concrete calculator</a>.</p>

        <h2>Two ways to buy concrete</h2>
        <p>The first cost decision is how you source the concrete itself:</p>
        <ul>
          <li><strong>Bagged mix</strong> — 40, 60, or 80 lb bags you mix on site. Best for small jobs where hauling and mixing by hand is manageable.</li>
          <li><strong>Ready-mix delivery</strong> — a truck delivers wet, consistent concrete. Best for larger pours, where mixing dozens of bags becomes impractical.</li>
        </ul>
        <p>The crossover is roughly <strong>half a cubic yard to a cubic yard</strong>. Below that, bags usually win on cost and convenience; above it, ready-mix saves hours and gives a more uniform result. Remember that ready-mix suppliers often have minimum orders and short-load fees, so tiny deliveries can be surprisingly pricey per yard.</p>

        <h2>The cost most people forget: site prep</h2>
        <p>The concrete is only part of the bill. A durable slab needs a proper base, and that base is real work:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Step</th><th>Why it matters</th></tr></thead>
            <tbody>
              <tr><td>Excavation &amp; grading</td><td>Removes sod/soil and levels the area</td></tr>
              <tr><td>Compacted gravel sub-base</td><td>Drainage and a stable foundation that resists cracking</td></tr>
              <tr><td>Forms</td><td>Hold the shape and edges during the pour</td></tr>
              <tr><td>Rebar or wire mesh</td><td>Reinforcement for strength, often required by code</td></tr>
              <tr><td>Footings (where required)</td><td>Below frost line in cold climates</td></tr>
            </tbody>
          </table>
        </div>
        <p>Skipping or skimping on the base is the most common way a cheap slab turns into an expensive crack repair later.</p>

        ${adInArticle()}

        <h2>What drives concrete cost up</h2>
        <ul>
          <li><strong>Thickness and reinforcement.</strong> A 6-inch reinforced driveway uses far more material than a 4-inch patio.</li>
          <li><strong>Site access and excavation.</strong> Hard-to-reach areas, slopes, or heavy digging add labor.</li>
          <li><strong>Finish.</strong> A basic broom finish is economical; stamped, colored, or polished concrete costs more.</li>
          <li><strong>Climate requirements.</strong> Frost-line footings and proper drainage add work in cold or wet regions.</li>
          <li><strong>Order size.</strong> Very small ready-mix loads carry minimums and fees; very large jobs need more labor and finishing time.</li>
        </ul>

        <h2>DIY vs. hiring a concrete contractor</h2>
        <p>Small slabs — a shed pad, a short walkway, a compact patio — are achievable DIY projects if you are prepared for the physical work and the fact that <strong>concrete sets on its own schedule</strong>. Bigger or load-bearing pours (driveways, garage slabs, anything structural) are usually better left to a contractor, who brings the crew, tools, and finishing skill to place and level it before it cures. Whichever path you choose, get the base right and round your order up — running short mid-pour creates a weak cold joint.</p>

        <h2>Budgeting your project</h2>
        <ol>
          <li><strong>Size the pour</strong> with the <a href="/calculators/concrete-calculator/">concrete calculator</a> to get cubic yards and bag counts.</li>
          <li><strong>Add 5–10% waste</strong> so an uneven subgrade or form flex does not leave you short.</li>
          <li><strong>Budget the base</strong> — gravel, forms, and reinforcement are not optional.</li>
          <li><strong>Decide bags vs. ready-mix</strong> based on your total volume.</li>
          <li><strong>Check local code</strong> for thickness, reinforcement, and footing depth before you start.</li>
        </ol>

        <p class="note"><strong>On the numbers:</strong> Concrete material and labor prices vary by region, supplier, finish, and site conditions. These are planning factors, not a quote. Confirm current pricing with local suppliers and licensed contractors.</p>

        <p>Size your slab with the <a href="/calculators/concrete-calculator/">concrete calculator</a> and plan the pour with confidence.</p>`,
};

export const guidePages = [
  paintCostGuide,
  tileCostGuide,
  kitchenBudgetGuide,
  concreteCostGuide,
  paintGuide,
  tileGuide,
  renovationGuide,
  toolsGuide,
];

export const guidesHub = {
  route: "/guides/",
  type: "hub",
  title: "Guides",
  metaTitle: "Home Improvement and DIY Guides (2026) | CalcReno",
  metaDescription:
    "Practical, no-fluff home improvement guides for U.S. homeowners: paint quantities, tile math, renovation costs, and the DIY tools that actually matter.",
  h1: "Home Improvement Guides",
  description:
    "Clear, practical guides that pair with our calculators — so you not only know how much to buy, but why, and how to get a professional result.",
  intro: `
          <p>A calculator tells you <em>how much</em>; a good guide tells you <em>why</em> — and how to get a professional result. Our guides are written for U.S. homeowners planning a real project, not to pad a word count. Each one answers a specific question with worked examples, honest ranges instead of made-up precision, and the practical tips that separate a clean job from a frustrating one.</p>
          <p>They fall into two groups. The <strong>how-to guides</strong> explain the math and method behind a task: <a href="/guides/how-much-paint-do-i-need/">how much paint you need</a>, <a href="/guides/how-many-tiles-do-i-need/">how many tiles and boxes to buy</a>, and the <a href="/guides/essential-diy-painting-tools/">tools that actually matter</a> for a pro finish. The <strong>cost guides</strong> break down what a project really costs in 2026 and where the money goes — from the <a href="/guides/cost-to-paint-a-room/">cost to paint a room</a> and <a href="/guides/tile-installation-cost/">tile installation</a> to a full <a href="/guides/kitchen-renovation-budget/">kitchen renovation budget</a>, a <a href="/guides/concrete-cost-guide/">concrete cost guide</a>, and the broader <a href="/guides/cost-to-renovate-a-room/">cost to renovate a room</a>.</p>
          <p>Every guide links back to the calculator it pairs with, so you can read the context and then run your own numbers in seconds. Wherever costs appear, they are broad planning ranges — not quotes — because real prices depend on your region, your contractor, and the finishes you choose. Always confirm with a licensed local professional before you commit a budget.</p>`,
  cards: guidePages.map((p) => ({
    route: p.route,
    title: p.title,
    description: p.description,
    category: p.category || "Guide",
    image: p.heroImage || null,
  })),
};
