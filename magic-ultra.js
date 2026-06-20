/* magic-ultra.js — premium interactive layer (self-contained, edits nothing) */
(function () {
  "use strict";
  const isTouch = window.matchMedia("(pointer:coarse)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- 0. inject styles ---------- */
  const css = `
  .mu-spotlight{position:fixed;inset:0;pointer-events:none;z-index:9990;
    background:radial-gradient(420px circle at var(--mx,-999px) var(--my,-999px),
    rgba(255,215,128,.10),transparent 60%);transition:background .12s;mix-blend-mode:screen}
  .mu-card-tilt{transform-style:preserve-3d;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}
  .mu-card-tilt .mu-shine{position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:radial-gradient(160px circle at var(--sx,50%) var(--sy,0%),rgba(255,255,255,.22),transparent 55%);
    opacity:0;transition:opacity .25s;z-index:5}
  .mu-card-tilt:hover .mu-shine{opacity:1}
  .mu-mag{position:fixed;left:0;top:0;z-index:9992;pointer-events:none;
    padding:6px 12px;border-radius:999px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.04em;
    color:#1a1207;background:linear-gradient(135deg,#ffe7a3,#d4af37);box-shadow:0 8px 26px rgba(0,0,0,.4);
    transform:translate(-50%,-160%) scale(.6);opacity:0;transition:opacity .18s,transform .18s;white-space:nowrap}
  .mu-mag.show{opacity:1;transform:translate(-50%,-160%) scale(1)}
  .mu-bar{position:fixed;left:0;top:0;height:3px;z-index:9995;width:0;
    background:linear-gradient(90deg,#d4af37,#ffe7a3,#7fd6a6);box-shadow:0 0 14px rgba(212,175,55,.8)}
  .mu-top{position:fixed;right:22px;bottom:22px;z-index:9993;width:48px;height:48px;border:none;
    border-radius:50%;cursor:pointer;display:grid;place-items:center;font-size:18px;color:#1a1207;
    background:linear-gradient(135deg,#ffe7a3,#d4af37);box-shadow:0 10px 30px rgba(0,0,0,.45);
    opacity:0;transform:translateY(20px) scale(.7);transition:.3s;pointer-events:none}
  .mu-top.show{opacity:1;transform:none;pointer-events:auto}
  .mu-top:hover{transform:translateY(-3px) scale(1.06)}
  .mu-reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}
  .mu-reveal.in{opacity:1;transform:none}
  .mu-orb{position:fixed;border-radius:50%;pointer-events:none;z-index:-1;filter:blur(38px);opacity:.5;
    background:radial-gradient(circle at 30% 30%,rgba(212,175,55,.6),transparent 70%)}
  @media (max-width:760px){.mu-spotlight,.mu-mag{display:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  /* ---------- 1. scroll progress bar ---------- */
  const bar = document.createElement("div"); bar.className = "mu-bar"; document.body.appendChild(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = (p * 100) + "%";
    top.classList.toggle("show", h.scrollTop > 600);
  };

  /* ---------- 2. cursor spotlight ---------- */
  if (!isTouch && !reduce) {
    const sp = document.createElement("div"); sp.className = "mu-spotlight"; document.body.appendChild(sp);
    window.addEventListener("pointermove", e => {
      sp.style.setProperty("--mx", e.clientX + "px");
      sp.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
  }

  /* ---------- 3. floating ambient orbs ---------- */
  if (!reduce) {
    const mk = (s, x, y, hue) => {
      const o = document.createElement("div"); o.className = "mu-orb";
      o.style.cssText += `width:${s}px;height:${s}px;left:${x};top:${y};` +
        (hue ? "background:radial-gradient(circle at 30% 30%,rgba(127,214,166,.55),transparent 70%)" : "");
      document.body.appendChild(o);
      let t = Math.random() * 6.28;
      (function f() { t += .004; o.style.transform = `translate(${Math.cos(t) * 26}px,${Math.sin(t * 1.3) * 30}px)`; requestAnimationFrame(f); })();
    };
    mk(300, "6%", "18%", 0); mk(240, "82%", "60%", 1); mk(200, "70%", "12%", 0);
  }

  /* ---------- 4. 3D tilt + shine on player cards ---------- */
  function findCards() {
    let c = $$(".player-card,.squad-card,.card,[data-player]");
    if (!c.length) {
      const grid = $("#squad,.squad,.players,[id*='squad']");
      if (grid) c = [...grid.children].filter(el => el.offsetWidth > 80 && el.offsetHeight > 80);
    }
    return c;
  }
  function tiltCard(card) {
    if (card.__mu) return; card.__mu = 1;
    if (getComputedStyle(card).position === "static") card.style.position = "relative";
    card.classList.add("mu-card-tilt");
    const shine = document.createElement("div"); shine.className = "mu-shine"; card.appendChild(shine);
    if (isTouch || reduce) return;
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(py - .5) * -10}deg) rotateY(${(px - .5) * 12}deg) translateZ(8px)`;
      card.style.boxShadow = "0 30px 60px rgba(0,0,0,.5)";
      shine.style.setProperty("--sx", px * 100 + "%");
      shine.style.setProperty("--sy", py * 100 + "%");
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; card.style.boxShadow = ""; });
  }

  /* ---------- 5. scroll reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });

  /* ---------- 6. magnetic buttons ---------- */
  function magnetize(btn) {
    if (btn.__mug || isTouch || reduce) return; btn.__mug = 1;
    btn.style.transition = "transform .2s cubic-bezier(.2,.8,.2,1)";
    btn.addEventListener("pointermove", e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    btn.addEventListener("pointerleave", () => btn.style.transform = "");
  }

  /* ---------- 7. label cursor over photos ---------- */
  const mag = document.createElement("div"); mag.className = "mu-mag"; mag.textContent = "View ★";
  if (!isTouch) document.body.appendChild(mag);

  /* ---------- scroll-to-top ---------- */
  const top = document.createElement("button"); top.className = "mu-top"; top.innerHTML = "↑";
  top.title = "Back to top"; top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(top);

  /* ---------- 8. wire everything (re-runs as squad renders) ---------- */
  function enhance() {
    findCards().forEach(c => {
      tiltCard(c);
      if (!c.classList.contains("mu-reveal")) { c.classList.add("mu-reveal"); io.observe(c); }
      if (!isTouch) {
        c.addEventListener("pointerenter", () => mag.classList.add("show"));
        c.addEventListener("pointerleave", () => mag.classList.remove("show"));
        c.addEventListener("pointermove", e => { mag.style.left = e.clientX + "px"; mag.style.top = e.clientY + "px"; });
      }
    });
    $$("section,.section,#story,#squad,[class*='highlight']").forEach(s => {
      if (!s.classList.contains("mu-reveal") && !s.querySelector("#squad")) { s.classList.add("mu-reveal"); io.observe(s); }
    });
    $$("button,.btn,a.btn,[class*='filter'],[class*='toggle']").forEach(magnetize);
  }

  /* observe DOM for dynamically rendered squad */
  const mo = new MutationObserver(() => { clearTimeout(window.__muT); window.__muT = setTimeout(enhance, 120); });
  mo.observe(document.body, { childList: true, subtree: true });
  // The squad is rendered once at load; stop observing after a few seconds so the
  // live clock (which mutates the DOM every second) doesn't keep re-running enhance()
  // and bogging down lower-end mobile devices.
  setTimeout(() => mo.disconnect(), 4000);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", () => { enhance(); onScroll(); });
  document.addEventListener("DOMContentLoaded", enhance);
  setTimeout(enhance, 400); setTimeout(enhance, 1200);
})();