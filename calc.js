/* CalcReno — vanilla calculator logic. Imperial units, USD.
   Each <form data-calc="KEY"> is paired with #KEY-result.
   Features: real-time results, count-up animation, glow result panel,
   visual stat tiles, and contextual retention CTAs. No libraries. */
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments, ctx = this;
      t = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  }

  var usd = function (n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));
  };
  var num = function (n, d) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: d == null ? 1 : d, minimumFractionDigits: 0 }).format(n);
  };
  var val = function (form, name) { var el = form.elements[name]; return el ? el.value : ""; };
  var fnum = function (form, name) { var v = parseFloat(val(form, name)); return isFinite(v) ? v : NaN; };

  var FMT = {
    int: function (n) { return num(Math.round(n), 0); },
    num1: function (n) { return num(n, 1); },
    num2: function (n) { return num(n, 2); },
    money: function (n) { return usd(n); },
  };

  /* ------------------------------ result builders --------------------------- */
  // Wrap every numeric token in the headline so it can count up.
  function lead(big, label) {
    var marked = String(big).replace(/(\d[\d,]*\.?\d*)/g, function (m) {
      return '<span data-count="' + m.replace(/,/g, "") + '">' + m + "</span>";
    });
    return '<div class="result__lead"><span class="result__num">' + marked + "</span>" +
      (label ? '<span class="result__label">' + label + "</span>" : "") + "</div>";
  }
  function countSpan(value, fmt) {
    var initial = FMT[fmt] ? FMT[fmt](value) : String(value);
    return '<span data-count="' + value + '" data-fmt="' + fmt + '">' + initial + "</span>";
  }
  function statTile(icon, valueHtml, label) {
    return '<div class="stat"><span class="stat__ic" aria-hidden="true">' + icon + "</span>" +
      '<strong class="stat__val">' + valueHtml + "</strong>" +
      '<span class="stat__lbl">' + label + "</span></div>";
  }
  function stats(tiles) { return '<div class="result__stats">' + tiles.join("") + "</div>"; }
  function bar(pct, label) {
    pct = Math.max(2, Math.min(100, pct));
    return '<div class="result__bar"><div class="result__bar-track"><div class="result__bar-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="result__bar-label">' + label + "</span></div>";
  }
  function rows(items) {
    return '<ul class="result__rows">' + items.map(function (it) {
      return "<li><span>" + it[0] + "</span><strong>" + it[1] + "</strong></li>";
    }).join("") + "</ul>";
  }
  function cost(label, value) { return '<p class="result__cost">' + label + " <strong>" + value + "</strong></p>"; }
  function note(text) { return '<p class="result__note">' + text + "</p>"; }
  function invalid(msg) {
    return '<div class="result__placeholder"><p>' + (msg || "Please enter valid numbers for every field.") + "</p></div>";
  }

  /* ---------------------------------- PAINT ---------------------------------- */
  function calcPaint(form) {
    var L = fnum(form, "paint-length"), W = fnum(form, "paint-width"), H = fnum(form, "paint-height");
    var doors = fnum(form, "paint-doors"), windows = fnum(form, "paint-windows");
    var coats = fnum(form, "paint-coats"), price = fnum(form, "paint-price");
    var ceiling = val(form, "paint-ceiling") === "yes";
    if ([L, W, H, doors, windows, coats].some(isNaN) || L <= 0 || W <= 0 || H <= 0 || coats < 1) return invalid();
    var wallArea = 2 * (L + W) * H;
    var openings = doors * 21 + windows * 15;
    var paintable = Math.max(wallArea - openings, 0);
    if (ceiling) paintable += L * W;
    var needed = paintable * coats;
    var COVER = 350;
    var gallons = Math.max(1, Math.ceil(needed / COVER));
    var purchased = gallons * COVER;
    var util = needed / purchased * 100;
    var spare = Math.max(0, Math.round(purchased - needed));

    var html = lead(gallons + (gallons === 1 ? " gallon" : " gallons"), "of paint to buy");
    var tiles = [statTile("🪣", countSpan(gallons, "int"), gallons === 1 ? "gallon" : "gallons")];
    if (!isNaN(price) && price > 0) tiles.push(statTile("💵", countSpan(gallons * price, "money"), "est. cost"));
    tiles.push(statTile("🎨", countSpan(coats, "int"), coats === 1 ? "coat" : "coats"));
    tiles.push(statTile("📐", countSpan(Math.round(paintable), "int"), "sq ft of wall"));
    html += stats(tiles);
    html += bar(util, "Covers ~" + num(Math.round(needed), 0) + " of " + num(purchased, 0) + " sq ft you'll buy — about " + num(spare, 0) + " sq ft spare for touch-ups.");
    html += note("Based on 350 sq ft coverage per gallon. New drywall or bare wood may need more; buy a quart extra for touch-ups.");
    return html;
  }

  /* ------------------------------ TILE / FLOORING ---------------------------- */
  function calcTile(form) {
    var mode = val(form, "tile-mode");
    var area;
    if (mode === "area") {
      area = fnum(form, "tile-sqft");
    } else {
      var L = fnum(form, "tile-length"), W = fnum(form, "tile-width");
      if ([L, W].some(isNaN) || L <= 0 || W <= 0) return invalid();
      area = L * W;
    }
    var coverage = fnum(form, "tile-coverage"), waste = fnum(form, "tile-waste"), price = fnum(form, "tile-price");
    if ([area, coverage, waste].some(isNaN) || area <= 0 || coverage <= 0) return invalid();
    var withWaste = area * (1 + waste / 100);
    var boxes = Math.ceil(withWaste / coverage);
    var purchased = boxes * coverage;

    var html = lead(boxes + (boxes === 1 ? " box" : " boxes"), "to buy");
    var tiles = [
      statTile("📦", countSpan(boxes, "int"), boxes === 1 ? "box" : "boxes"),
      statTile("📐", countSpan(area, "num1"), "sq ft area"),
      statTile("♻️", countSpan(waste, "int") + "%", "waste added"),
    ];
    if (!isNaN(price) && price > 0) tiles.push(statTile("💵", countSpan(boxes * price, "money"), "est. cost"));
    html += stats(tiles);
    html += bar(area / purchased * 100, "Covers " + num(area, 1) + " of " + num(purchased, 1) + " sq ft you'll buy — extra is for cuts and repairs.");
    html += note("Keep at least one full box after the job — production batches vary, so a future repair from a new lot may not match.");
    return html;
  }

  /* ---------------------------------- CONCRETE ------------------------------- */
  function calcConcrete(form) {
    var L = fnum(form, "concrete-length"), W = fnum(form, "concrete-width"), T = fnum(form, "concrete-thickness");
    var waste = fnum(form, "concrete-waste"), price = fnum(form, "concrete-price");
    if ([L, W, T, waste].some(isNaN) || L <= 0 || W <= 0 || T <= 0) return invalid();
    var cf = L * W * (T / 12);
    var cy = cf / 27;
    var factor = 1 + waste / 100;
    var bags80 = Math.ceil((cf / 0.6) * factor);
    var bags60 = Math.ceil((cf / 0.45) * factor);
    var bags40 = Math.ceil((cf / 0.3) * factor);

    var html = lead(num(cy, 2) + " cu yd", "of concrete");
    var tiles = [
      statTile("📦", countSpan(bags80, "int"), "80 lb bags"),
      statTile("📦", countSpan(bags60, "int"), "60 lb bags"),
      statTile("📐", countSpan(cf, "num1"), "cu ft volume"),
    ];
    if (!isNaN(price) && price > 0) tiles.push(statTile("💵", countSpan(bags80 * price, "money"), "cost (80 lb)"));
    html += stats(tiles);
    html += note("Includes " + waste + "% waste. For more than ~1 cubic yard, ready-mix delivery is usually cheaper and easier than mixing bags. Confirm thickness and reinforcement with local code.");
    return html;
  }

  /* ---------------------------------- WALLPAPER ------------------------------ */
  function calcWallpaper(form) {
    var width = fnum(form, "wallpaper-width"), height = fnum(form, "wallpaper-height");
    var doors = fnum(form, "wallpaper-doors"), windows = fnum(form, "wallpaper-windows");
    var coverage = fnum(form, "wallpaper-coverage"), waste = fnum(form, "wallpaper-waste"), price = fnum(form, "wallpaper-price");
    if ([width, height, doors, windows, coverage, waste].some(isNaN) || width <= 0 || height <= 0 || coverage <= 0) return invalid();
    var gross = width * height;
    var openings = doors * 21 + windows * 15;
    var area = Math.max(gross - openings, 0);
    var withWaste = area * (1 + waste / 100);
    var rollsN = Math.ceil(withWaste / coverage);

    var html = lead(rollsN + (rollsN === 1 ? " roll" : " rolls"), "of wallpaper");
    var tiles = [
      statTile("🧻", countSpan(rollsN, "int"), rollsN === 1 ? "roll" : "rolls"),
      statTile("📐", countSpan(area, "num1"), "sq ft to cover"),
      statTile("♻️", countSpan(waste, "int") + "%", "pattern waste"),
    ];
    if (!isNaN(price) && price > 0) tiles.push(statTile("💵", countSpan(rollsN * price, "money"), "est. cost"));
    html += stats(tiles);
    html += note("Doors and windows subtracted. Buy one extra roll from the same batch number for mistakes and future repairs; large pattern repeats need more waste.");
    return html;
  }

  /* ------------------------------ RENOVATION COST ---------------------------- */
  var RENO = {
    kitchen: { budget: [75, 150], mid: [150, 300], high: [300, 550], label: "kitchen" },
    bathroom: { budget: [100, 200], mid: [200, 375], high: [375, 650], label: "bathroom" },
    bedroom: { budget: [25, 60], mid: [60, 125], high: [125, 250], label: "bedroom" },
    living: { budget: [25, 60], mid: [60, 125], high: [125, 250], label: "living room" },
    basement: { budget: [30, 55], mid: [55, 90], high: [90, 160], label: "basement" },
  };
  function calcReno(form) {
    var room = val(form, "renovation-room"), tier = val(form, "renovation-tier");
    var size = fnum(form, "renovation-size");
    var data = RENO[room];
    if (!data || !data[tier] || isNaN(size) || size <= 0) return invalid();
    var r = data[tier];
    var low = size * r[0], high = size * r[1];
    var tierLabel = tier === "budget" ? "Budget" : tier === "high" ? "High-end" : "Mid-range";

    var html = lead(usd(low) + " – " + usd(high), "estimated " + data.label + " remodel");
    var tiles = [
      statTile("💵", countSpan(low, "money"), "low estimate"),
      statTile("💰", countSpan(high, "money"), "high estimate"),
      statTile("📐", countSpan(size, "int"), "sq ft"),
      statTile("⭐", tierLabel, "quality level"),
    ];
    html += stats(tiles);
    html += note("Broad 2026 planning range — not a quote. Kitchens and baths cost more per sq ft because of plumbing, electrical, and cabinetry. Get 2–3 written quotes from licensed local contractors, and hold a 10–20% contingency.");
    return html;
  }

  var CALCS = { paint: calcPaint, tile: calcTile, concrete: calcConcrete, wallpaper: calcWallpaper, renovation: calcReno };

  /* ------------------------------- retention CTA ----------------------------- */
  function retention(form) {
    var gh = form.getAttribute("data-guide-href"), gl = form.getAttribute("data-guide-label");
    var rh = form.getAttribute("data-related-href"), rl = form.getAttribute("data-related-label");
    if (!gh && !rh) return "";
    var pills = "";
    if (rh) pills += '<a class="result-cta__pill" href="' + rh + '"><span aria-hidden="true">➡️</span> Try the ' + rl + "</a>";
    if (gh) pills += '<a class="result-cta__pill" href="' + gh + '"><span aria-hidden="true">📖</span> Read: ' + gl + "</a>";
    return '<div class="result-cta"><span class="result-cta__title">Keep going</span><div class="result-cta__pills">' + pills + "</div></div>";
  }

  /* ------------------------------- number animation -------------------------- */
  function setNumbers(scope, animate) {
    var els = scope.querySelectorAll("[data-count]");
    Array.prototype.forEach.call(els, function (el) {
      var ds = el.getAttribute("data-count");
      var to = parseFloat(ds);
      if (!isFinite(to)) return;
      var fmtName = el.getAttribute("data-fmt");
      var f;
      if (fmtName && FMT[fmtName]) {
        f = FMT[fmtName];
      } else {
        var decimals = ds.indexOf(".") >= 0 ? ds.split(".")[1].length : 0;
        f = function (n) { return num(n, decimals); };
      }
      if (!animate || reduceMotion) { el.textContent = f(to); return; }
      var start = performance.now(), dur = 450;
      (function step(t) {
        var k = Math.min((t - start) / dur, 1);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = f(to * e);
        if (k < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  function render(form, animate) {
    var key = form.getAttribute("data-calc");
    var fn = CALCS[key];
    if (!fn) return;
    var out = document.getElementById(key + "-result");
    if (!out) return;
    var html = fn(form);
    var empty = html.indexOf("result__placeholder") >= 0;
    out.innerHTML = '<div class="result__inner">' + html + (empty ? "" : retention(form)) + "</div>";
    out.setAttribute("data-empty", empty ? "true" : "false");
    if (!empty) {
      setNumbers(out, animate);
      if (animate && !reduceMotion) {
        out.classList.remove("is-updated");
        void out.offsetWidth; // restart animation
        out.classList.add("is-updated");
      }
    }
  }

  /* ---------------------------------- tile mode ------------------------------ */
  function wireTileModeToggle(form) {
    var modeSel = form.elements["tile-mode"];
    if (!modeSel) return;
    var dims = form.querySelector("[data-tile-dims]");
    var areaBox = form.querySelector("[data-tile-area]");
    var apply = function () {
      var isArea = modeSel.value === "area";
      if (dims) dims.hidden = isArea;
      if (areaBox) areaBox.hidden = !isArea;
    };
    modeSel.addEventListener("change", apply);
    apply();
  }

  /* ---------------------------------- wiring --------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll("form[data-calc]");
    Array.prototype.forEach.call(forms, function (form) {
      var key = form.getAttribute("data-calc");
      if (key === "tile") wireTileModeToggle(form);

      // Live, instant updates while typing (no count-up to avoid jitter).
      form.addEventListener("input", debounce(function () { render(form, false); }, 120));
      form.addEventListener("change", function () { render(form, false); });

      // Explicit calculate = animated.
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        render(form, true);
        var out = document.getElementById(key + "-result");
        if (out && window.matchMedia("(max-width: 800px)").matches) {
          out.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        }
      });

      // Reset returns to the default (still valid) result.
      form.addEventListener("reset", function () { setTimeout(function () { render(form, true); }, 0); });

      // Auto-calculate on load so a real result is visible immediately.
      render(form, true);
    });
  });
})();
