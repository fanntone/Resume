/* Fann Wu — portfolio interactions */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Preloader: wait for the 3D model, then lift the curtain ---- */
  let revealed = false;
  const preloaderEl = document.getElementById("preloader");
  function reveal() {
    if (revealed) return;
    revealed = true;
    document.body.classList.remove("is-loading");
    // stop the preloader's 3D render loop shortly after it slides away
    setTimeout(() => { if (preloaderEl) preloaderEl.style.display = "none"; }, 1000);
  }
  const preModel = document.getElementById("preloadModel");
  if (preModel) {
    preModel.addEventListener("load", () => setTimeout(reveal, reduceMotion ? 0 : 900));
    preModel.addEventListener("error", () => setTimeout(reveal, 300));
    setTimeout(reveal, 9000); // hard fallback if the model never loads
  } else {
    window.addEventListener("load", () => setTimeout(reveal, reduceMotion ? 0 : 1600));
    setTimeout(reveal, 5000);
  }

  /* ---- Current year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Language toggle (zh default / en) ---- */
  const root = document.documentElement;
  const langSwitch = document.getElementById("langSwitch");
  const applyLang = (lang) => {
    const en = lang === "en";
    root.classList.toggle("lang-en", en);
    root.lang = en ? "en" : "zh-Hant";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    // make sure language-swapped content is never stuck hidden by reveal()
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  };
  // sync attribute with the class already set by the inline head script
  root.lang = root.classList.contains("lang-en") ? "en" : "zh-Hant";
  if (langSwitch) {
    langSwitch.addEventListener("click", () => {
      applyLang(root.classList.contains("lang-en") ? "zh" : "en");
    });
  }

  /* ---- Header: compact state on scroll ---- */
  const header = document.getElementById("header");
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("is-stuck");
    else header.classList.remove("is-stuck");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    const close = () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    // stagger items that share a parent for a nicer cascade
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = (i % 6) * 60 + "ms";
      io.observe(el);
    });
  }
})();
