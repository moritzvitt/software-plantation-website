const revealBlocks = document.querySelectorAll(".reveal-block");
const sectionLinks = document.querySelectorAll('a[href^="#"]');
const siteHeader = document.querySelector(".site-header");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");

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
