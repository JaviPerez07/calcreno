/* CalcReno — site chrome: mobile nav + cookie banner. No tracking by default. */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  function initNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Cookie banner (essential vs. non-essential) */
  var STORE = "calcreno-cookie-consent";

  function hideBanner(banner) {
    // Hide effectively: the .cookie-banner author rule (display:flex) overrides
    // the [hidden] attribute, so we also force display:none inline.
    banner.hidden = true;
    banner.style.display = "none";
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(status) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ status: status, date: new Date().toISOString() }));
    } catch (e) {}
  }

  function initCookies() {
    var banner = document.querySelector("[data-cookie-banner]");
    if (!banner) return;

    var consent = readConsent();
    if (consent && consent.status) {
      // Already decided in a previous visit — never show the banner again.
      hideBanner(banner);
      return;
    }

    // First visit: show the banner.
    banner.hidden = false;
    banner.style.display = "";

    banner.addEventListener("click", function (e) {
      var action = e.target.getAttribute("data-cookie-action");
      if (action !== "accept" && action !== "reject") return;
      var status = action === "accept" ? "accepted" : "rejected";
      saveConsent(status);
      hideBanner(banner);
      // Accept enables the optional analytics/ad-measurement layer; reject leaves
      // only essential cookies. (No conditional analytics script is loaded today;
      // AdSense's loader is static per site policy. The stored choice is available
      // for any future gated measurement to read.)
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCookies();
  });
})();
