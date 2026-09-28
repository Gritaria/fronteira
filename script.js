(() => {
  "use strict";

  const config = window.FRONTEIRA_CONFIG || {};
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initLinks() {
    const labels = {
      discord: "Entrar no Discord", instagram: "Seguir no Instagram",
      donations: "Ir para doações", wiki: "Ler wiki",
      register: "Abrir registradora", memory: "Jogar",
    };
    document.querySelectorAll("[data-site-link]").forEach((link) => {
      const key = link.dataset.siteLink;
      const value = config.links?.[key]?.trim();
      if (!value) return;
      try {
        const url = new URL(value);
        if (url.protocol !== "https:") return;
        link.href = url.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.removeAttribute("aria-disabled");
        link.textContent = labels[key] || "Acessar";
      } catch {
        // Invalid or incomplete destinations keep the safe HTML fallback.
      }
    });
  }

  function initReveals() {
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".card, .rule, .panel, .contact-card").forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${(index % 4) * 60}ms`);
      observer.observe(el);
    });
    document.documentElement.classList.add("js");
  }

  function initBackgrounds() {
    const layers = [...document.querySelectorAll(".bg-layer")];
    if (layers.length < 2) return;
    const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      .map((n) => `assets/backgrounds/${String(n).padStart(2, "0")}.webp`);
    let current = 0;
    let last = 0;
    let pending = false;
    layers[0].style.backgroundImage = `url("${images[0]}")`;
    layers[0].style.opacity = "0.22";
    const interval = Number(config.backgroundIntervalMs);
    window.setInterval(() => {
      if (document.hidden || motion.matches || pending) return;
      const next = (last + 1 + Math.floor(Math.random() * (images.length - 1))) % images.length;
      const image = new Image();
      pending = true;
      image.onload = () => {
        pending = false;
        if (document.hidden || motion.matches) return;
        const target = 1 - current;
        layers[target].style.backgroundImage = `url("${images[next]}")`;
        layers[target].style.opacity = "0.22";
        layers[current].style.opacity = "0";
        current = target;
        last = next;
      };
      image.onerror = () => { pending = false; };
      image.src = images[next];
    }, Number.isFinite(interval) ? Math.max(interval, 10000) : 30000);
  }

  function initModal(kind) {
    const modal = document.querySelector(`[data-${kind}-modal]`);
    if (!modal) return;
    const dialog = modal.querySelector('[role="dialog"]');
    const image = modal.querySelector("[data-image-modal-img]");
    const closeButton = modal.querySelector(`button[data-${kind}-modal-close]`);
    let trigger = null;
    let inertElements = [];

    function close() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      inertElements.forEach((el) => { el.inert = false; });
      inertElements = [];
      if (image) { image.removeAttribute("src"); image.alt = ""; }
      trigger?.focus();
      trigger = null;
    }

    document.querySelectorAll(`[data-${kind}-modal-trigger]`).forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        trigger = link;
        if (image) {
          image.src = link.href;
          image.alt = link.dataset.imageModalAlt || "Imagem de exemplo";
        }
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        inertElements = [...document.body.children].filter((el) => el !== modal && !el.inert && !["SCRIPT", "STYLE"].includes(el.tagName));
        inertElements.forEach((el) => { el.inert = true; });
        requestAnimationFrame(() => {
          if (modal.classList.contains("is-open")) closeButton.focus();
        });
      });
    });
    modal.querySelectorAll(`[data-${kind}-modal-close]`).forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      const items = [...dialog.querySelectorAll('a[href], button, [tabindex="0"]')].filter((el) => !el.disabled && el.getClientRects().length);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
  }

  initLinks();
  initReveals();
  initBackgrounds();
  initModal("image");
  initModal("text");
})();
