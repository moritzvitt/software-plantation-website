const revealBlocks = document.querySelectorAll(".reveal-block");
const sectionLinks = document.querySelectorAll('a[href^="#"]');
const siteHeader = document.querySelector(".site-header");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const heroSection = document.querySelector(".hero");
const backgroundButtons = document.querySelectorAll("[data-bg-option]");
const widthButtons = document.querySelectorAll("[data-width-option]");
const themeButtons = document.querySelectorAll("[data-theme-option]");
const typeButtons = document.querySelectorAll("[data-type-option]");

function setActiveButton(buttons, attr, value) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.getAttribute(attr) === value);
  });
}

function applyDisplaySetting(type, value) {
  document.body.dataset[type] = value;

  if (value) {
    localStorage.setItem(`sp-${type}`, value);
  } else {
    localStorage.removeItem(`sp-${type}`);
  }

  if (type === "bg") {
    setActiveButton(backgroundButtons, "data-bg-option", value);
  }

  if (type === "width") {
    setActiveButton(widthButtons, "data-width-option", value);
  }

  if (type === "theme") {
    setActiveButton(themeButtons, "data-theme-option", value);
  }

  if (type === "type") {
    setActiveButton(typeButtons, "data-type-option", value);
  }
}

function initDisplaySettings() {
  const savedBackground = localStorage.getItem("sp-bg");
  const savedWidth = localStorage.getItem("sp-width");
  const savedTheme = localStorage.getItem("sp-theme");
  const savedType = localStorage.getItem("sp-type");
  const initialBackground = savedBackground || document.body.dataset.bg || "warm";
  const initialWidth = savedWidth || document.body.dataset.width || "normal";
  const initialTheme = savedTheme || document.body.dataset.theme || "";
  const initialType = savedType || document.body.dataset.type || "classic";

  applyDisplaySetting("bg", initialBackground);
  applyDisplaySetting("width", initialWidth);
  applyDisplaySetting("theme", initialTheme);
  applyDisplaySetting("type", initialType);
}

function isMobileHeaderMode() {
  return window.matchMedia("(max-width: 780px)").matches;
}

function setMobileHeaderOpen(isOpen) {
  if (!siteHeader || !mobileNavToggle) {
    return;
  }

  siteHeader.classList.toggle("is-open", isOpen);
  mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
}

function updateCompactHeader() {
  if (!siteHeader || !heroSection) {
    return;
  }

  const heroBottom = heroSection.getBoundingClientRect().bottom;
  siteHeader.classList.toggle("is-compact", heroBottom < 120);
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function smoothScrollToElement(target, duration = 900) {
  if (!target) {
    return;
  }

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY - 12;
  const distance = targetY - startY;

  if (Math.abs(distance) < 4) {
    return;
  }

  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealBlocks.forEach((block) => {
  observer.observe(block);
});

if (mobileNavToggle && siteHeader) {
  mobileNavToggle.addEventListener("click", () => {
    setMobileHeaderOpen(!siteHeader.classList.contains("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!isMobileHeaderMode() || !siteHeader.classList.contains("is-open")) {
      return;
    }

    if (!siteHeader.contains(event.target)) {
      setMobileHeaderOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobileHeaderMode()) {
      setMobileHeaderOpen(false);
    }
  });
}

backgroundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyDisplaySetting("bg", button.getAttribute("data-bg-option"));
  });
});

widthButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyDisplaySetting("width", button.getAttribute("data-width-option"));
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-theme-option");
    const nextValue = document.body.dataset.theme === value ? "" : value;
    applyDisplaySetting("theme", nextValue);
  });
});

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyDisplaySetting("type", button.getAttribute("data-type-option"));
  });
});

initDisplaySettings();

updateCompactHeader();
window.addEventListener("scroll", updateCompactHeader, { passive: true });
window.addEventListener("resize", updateCompactHeader);

sectionLinks.forEach((link) => {
  const targetId = link.getAttribute("href");

  if (!targetId || targetId === "#") {
    return;
  }

  const target = document.querySelector(targetId);

  if (!target) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();
    smoothScrollToElement(target);

    if (isMobileHeaderMode()) {
      setMobileHeaderOpen(false);
    }
  });
});
