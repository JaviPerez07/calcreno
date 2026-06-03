// CalcReno — institutional / legal pages (Phase 3) and the home page.
import { site, brand } from "./config.mjs";

const about = {
  route: "/about/",
  type: "page",
  title: "About",
  metaTitle: "About CalcReno | Home Improvement Calculators",
  metaDescription:
    "CalcReno builds free, easy-to-use home improvement calculators in U.S. units to help homeowners plan paint, tile, concrete, wallpaper, and renovation projects.",
  h1: "About CalcReno",
  description: "Who we are, what we build, and the standards behind our calculators and guides.",
  body: `
        <div class="prose narrow">
          <p>CalcReno is a free resource that helps homeowners in the United States plan home improvement and DIY projects with confidence. We build simple, reliable calculators — for paint, tile and flooring, concrete, wallpaper, and full room renovation costs — and pair them with clear, practical guides.</p>
          <h2>What we do</h2>
          <p>Every project starts with the same questions: <em>How much material do I need? What will it cost?</em> Getting those numbers wrong means wasted money or a frustrating mid-job trip back to the store. Our tools answer them in plain U.S. units — feet, inches, gallons, pounds, and dollars — so you can shop and budget accurately.</p>
          <h2>Our approach</h2>
          <ul>
            <li><strong>Imperial-first and U.S.-focused.</strong> Every calculator and guide uses the units and conventions American homeowners actually shop with.</li>
            <li><strong>Estimates you can sanity-check.</strong> We show the math behind each result so you understand how the number was reached.</li>
            <li><strong>No hype, no fluff.</strong> Our guides aim to be genuinely useful, not padded. Where a reliable figure does not exist, we describe the factors qualitatively rather than inventing precision.</li>
          </ul>
          <h2>Who's behind it</h2>
          <p>CalcReno is produced by our editorial team. Content is planned, written, and reviewed in-house with a focus on accuracy and clarity. Read more about our process on the <a href="/how-we-research/">How We Research</a> page.</p>
          <h2>A note on estimates</h2>
          <p>${site.disclaimer} For details, see our <a href="/disclaimer/">Disclaimer</a>.</p>
          <p>Questions or feedback? <a href="/contact/">Get in touch</a> — we read every message.</p>
        </div>`,
};

const contact = {
  route: "/contact/",
  type: "page",
  title: "Contact",
  metaTitle: "Contact CalcReno",
  metaDescription:
    "Get in touch with the CalcReno team with questions, corrections, or feedback about our home improvement calculators and guides.",
  h1: "Contact Us",
  description: "Questions, corrections, or feedback — we'd love to hear from you.",
  body: `
        <div class="prose narrow">
          <p>We genuinely like hearing from the people who use CalcReno. Whether you have a question about how a calculator works, spotted a number that looks off, or have an idea for a tool or guide we should build next, your message helps us make the site more accurate and more useful. Accuracy is the whole point of this site, so reader reports are taken seriously and often lead to real changes.</p>

          <h2>What we respond to</h2>
          <p>Here are the kinds of messages we are happy to answer:</p>
          <ul>
            <li><strong>Corrections and bug reports</strong> — if a calculator result, formula, or assumption looks wrong, tell us what you entered and what you expected.</li>
            <li><strong>Questions about a tool or guide</strong> — how a calculation is done, what an assumption means, or how to apply a result to your project.</li>
            <li><strong>Suggestions</strong> — a calculator we don't have yet, a guide topic, or a feature that would make a tool easier to use.</li>
            <li><strong>General feedback</strong> — what's working, what's confusing, and what would help you plan a project with more confidence.</li>
          </ul>

          <h2>Email us</h2>
          <p>The best way to reach us is by email. We read every message and aim to reply within a few business days:</p>
          <p class="contact-email"><a href="mailto:${site.email}">${site.email}</a></p>
          <p>To help us help you, please include a link to the page or calculator you're writing about, the numbers you entered, and the result you expected. The more specific you are, the faster we can pinpoint and fix an issue or answer your question.</p>

          <h2>What we can't do</h2>
          <p>CalcReno provides general educational tools and information for U.S. homeowners. We can't provide personalized contracting quotes, engineering sign-off, measurements for your specific property, or professional financial advice. For project-specific decisions — especially anything structural, electrical, plumbing, or budget-critical — please consult a licensed local contractor or the relevant qualified professional. Our results are planning estimates, not a substitute for an on-site expert.</p>
        </div>`,
};

const privacy = {
  route: "/privacy-policy/",
  type: "page",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | CalcReno",
  metaDescription:
    "How CalcReno handles data, cookies, and advertising. Learn about Google AdSense cookies, analytics, and your privacy choices.",
  h1: "Privacy Policy",
  description: "How we handle data, cookies, and advertising on CalcReno.",
  body: `
        <div class="prose narrow">
          <p><strong>Last updated:</strong> June 2026</p>
          <p>This Privacy Policy explains how CalcReno ("we," "us") handles information when you visit our website. We keep things minimal: our calculators run in your browser and we do not require you to create an account or submit personal information to use them.</p>

          <h2>Information we collect</h2>
          <p>We do not ask you to register or provide personal details to use our calculators. The numbers you type into a calculator are processed in your browser to produce a result; we do not store them. If you email us, we receive the information you choose to send (such as your email address and message) so we can reply.</p>

          <h2>Cookies and similar technologies</h2>
          <p>We use cookies and similar technologies for essential site function, optional analytics, and advertising. You can accept or reject the non-essential layer using the cookie banner.</p>

          <h2>Advertising and Google AdSense</h2>
          <p>We display ads through <strong>Google AdSense</strong> to keep CalcReno free. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites.</p>
          <ul>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to our site and/or other sites on the internet.</li>
            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="nofollow noopener" target="_blank">Google Ads Settings</a>.</li>
            <li>You can learn more about cookies used in advertising and opt out of some third-party vendors at <a href="https://www.aboutads.info/choices/" rel="nofollow noopener" target="_blank">aboutads.info/choices</a>.</li>
          </ul>

          <h2>Analytics</h2>
          <p>We may use privacy-respecting analytics to understand which pages are useful and how the site performs. This data is aggregated and used to improve the site.</p>

          <h2>Affiliate links</h2>
          <p>Some guides contain affiliate links. If you click one and make a purchase, we may earn a commission at no additional cost to you. This does not influence our editorial recommendations. See our <a href="/disclaimer/">Disclaimer</a> for more.</p>

          <h2>Your choices</h2>
          <p>You can reject non-essential cookies via our banner, adjust your browser settings to block or delete cookies, and use Google's controls linked above to manage ad personalization.</p>

          <h2>Children's privacy</h2>
          <p>CalcReno is intended for a general adult audience and is not directed to children under 13. We do not knowingly collect personal information from children.</p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time. The "last updated" date above reflects the latest revision.</p>

          <h2>Contact</h2>
          <p>Questions about privacy? Email <a href="mailto:${site.email}">${site.email}</a>.</p>
        </div>`,
};

const disclaimer = {
  route: "/disclaimer/",
  type: "page",
  title: "Disclaimer",
  metaTitle: "Disclaimer | CalcReno",
  metaDescription:
    "CalcReno tools and guides provide planning estimates only — not professional quotes, engineering, or financial advice. Read the full disclaimer.",
  h1: "Disclaimer",
  description: "Our calculators provide estimates for planning, not professional quotes or advice.",
  body: `
        <div class="prose narrow">
          <p><strong>Last updated:</strong> June 2026</p>

          <h2>Estimates only</h2>
          <p>All calculators, figures, and guides on CalcReno are provided for <strong>general informational and planning purposes only</strong>. Results are <strong>estimates</strong> based on standard formulas and typical assumptions. They are <strong>not professional quotes, measurements, or guarantees</strong> of the materials, quantities, or costs your specific project will require.</p>

          <h2>Verify before you buy or build</h2>
          <p>Actual requirements vary with site conditions, material specifications, product coverage, layout, local pricing, and workmanship. Always confirm quantities with your supplier's product data and confirm costs and feasibility with a licensed local contractor before purchasing materials or starting work.</p>

          <h2>No professional advice</h2>
          <p>CalcReno does not provide engineering, construction, legal, or financial advice. Cost ranges are broad educational estimates, not financial guidance or appraisals. For structural, electrical, plumbing, or code-related questions, consult a qualified licensed professional and your local building department.</p>

          <h2>Building codes and safety</h2>
          <p>Requirements such as slab thickness, reinforcement, ventilation, waterproofing, and permits are governed by local building codes that vary by jurisdiction. It is your responsibility to comply with applicable codes and to work safely. When in doubt, hire a licensed professional.</p>

          <h2>Affiliate disclosure</h2>
          <p>Some pages contain affiliate links, including to Amazon. If you purchase through these links, CalcReno may earn a commission at no extra cost to you. We only reference categories of products that are genuinely relevant to the task, and affiliate relationships do not influence our editorial guidance.</p>

          <h2>Limitation of liability</h2>
          <p>To the fullest extent permitted by law, CalcReno is not liable for any loss, cost, or damage arising from reliance on our calculators, estimates, or content. You use the site and its tools at your own discretion and risk.</p>

          <h2>Contact</h2>
          <p>Questions about this disclaimer? Email <a href="mailto:${site.email}">${site.email}</a>.</p>
        </div>`,
};

const howWeResearch = {
  route: "/how-we-research/",
  type: "page",
  title: "How We Research",
  metaTitle: "How We Research and Build Our Calculators | CalcReno",
  metaDescription:
    "The standards behind CalcReno: how we build our calculators, choose formulas and assumptions, write our guides, and keep estimates honest and useful.",
  h1: "How We Research",
  description: "The standards and process behind our calculators and guides.",
  body: `
        <div class="prose narrow">
          <p>CalcReno exists to give homeowners numbers they can trust enough to plan with. Here is how we build and maintain our calculators and guides.</p>

          <h2>How we build calculators</h2>
          <ul>
            <li><strong>Standard formulas.</strong> Each calculator uses well-established methods — wall-area math for paint, area-plus-waste for tile, volume math for concrete, and per-square-foot ranges for renovation costs.</li>
            <li><strong>Transparent assumptions.</strong> We publish the assumptions behind every tool (for example, 350 sq ft of coverage per gallon of paint, or a standard interior door at 21 sq ft) so you can adjust for your situation and check the result.</li>
            <li><strong>Conservative defaults.</strong> Where we round, we round in the direction that prevents you from running short, while keeping waste reasonable.</li>
          </ul>

          <h2>How we handle cost figures</h2>
          <p>Renovation and material costs vary enormously by region, supplier, and finish level. We present costs as <strong>ranges</strong> drawn from broad, typical figures, and we label them clearly as planning estimates rather than quotes. When a reliable, specific number does not exist, we describe the cost factors qualitatively instead of inventing false precision.</p>

          <h2>How we write guides</h2>
          <ul>
            <li><strong>Useful over long.</strong> We write to answer the question, with worked examples and practical tips — not to hit a word count.</li>
            <li><strong>Honest about uncertainty.</strong> If something "depends," we say what it depends on and how to think about it.</li>
            <li><strong>Reviewed and dated.</strong> Pages carry a review date so you know how current the information is.</li>
          </ul>

          <h2>Corrections</h2>
          <p>If you find an error or think an assumption should change, please <a href="/contact/">tell us</a>. We take reader corrections seriously and update our tools and guides when warranted.</p>

          <h2>Editorial independence</h2>
          <p>CalcReno is funded by advertising and, in some guides, affiliate links. Neither advertisers nor affiliate partners influence our formulas, assumptions, or recommendations.</p>
        </div>`,
};

export const institutionalPages = [about, contact, privacy, disclaimer, howWeResearch];

/* The home page is assembled by generate-site.mjs (it needs the calculator/guide
   card data), so we just export its meta here. */
export const homeMeta = {
  route: "/",
  type: "home",
  title: brand,
  metaTitle: "CalcReno: Free Home Improvement Calculators (2026)",
  metaDescription: site.shortDescription,
  h1: "Plan Your Project. Buy the Right Amount. Every Time.",
  description: site.tagline,
};
