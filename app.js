import { initApp } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  window.addEventListener("hashchange", () => {
    window.scrollTo(0, 0);
  });
  const navLinks = document.querySelectorAll(".nav_links");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = event.currentTarget.getAttribute("href");
      if (target.startsWith("#")) {
        event.preventDefault();
        window.location.hash = target;
      }
      window.scrollTo(0, 0);
    });
  });
});
