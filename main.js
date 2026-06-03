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
  var STORE = "calcreno-consent";
  function initCookies() {
    var banner = document.querySelector("[data-cookie-banner]");
    if (!banner) return;
    var saved;
    try { saved = localStorage.getItem(STORE); } catch (e) { saved = "accept"; }
    if (!saved) {
      banner.hidden = false;
    }
    banner.addEventListener("click", function (e) {
      var action = e.target.getAttribute("data-cookie-action");
      if (!action) return;
      try { localStorage.setItem(STORE, action); } catch (err) {}
      banner.hidden = true;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCookies();
  });
})();
