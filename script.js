const siteLoader = document.querySelector("#site-loader");
document.body.classList.add("is-loading");
document.body.setAttribute("aria-busy", "true");

let loaderFinished = false;
function finishLoading() {
  if (loaderFinished || !siteLoader) return;
  loaderFinished = true;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => {
    siteLoader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    document.body.setAttribute("aria-busy", "false");
    window.setTimeout(() => siteLoader.remove(), prefersReducedMotion ? 0 : 650);
  }, prefersReducedMotion ? 120 : 700);
}

if (document.readyState === "complete") finishLoading();
else window.addEventListener("load", finishLoading, { once: true });
window.setTimeout(finishLoading, 2200);

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

function closeMenu() {
  if (!siteNav || !navToggle) return;
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const filterButtons = document.querySelectorAll("[data-filter]");
const publicationCards = document.querySelectorAll(".publication-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    publicationCards.forEach((card) => {
      const tags = card.dataset.tags?.split(" ") ?? [];
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter ?? ""));
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", targetId);
  });
});

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
