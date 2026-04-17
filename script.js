const revealElements = document.querySelectorAll(
  ".feature-card, .story-list article, .moment-card, .intro-strip"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

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
    threshold: 0.18,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

const patternClasses = [
  "pattern-dawn",
  "pattern-ripple",
  "pattern-paper",
  "pattern-mist",
  "pattern-tiles",
  "pattern-wave",
];

const shuffleButton = document.querySelector("#shuffle-button");
const shufflableCards = document.querySelectorAll(
  ".art-card, .feature-image, .moment-card"
);

shuffleButton?.addEventListener("click", () => {
  shufflableCards.forEach((card) => {
    const currentPattern = patternClasses.find((patternClass) =>
      card.classList.contains(patternClass)
    );

    const availablePatterns = patternClasses.filter(
      (patternClass) => patternClass !== currentPattern
    );
    const nextPattern =
      availablePatterns[Math.floor(Math.random() * availablePatterns.length)];

    if (currentPattern) {
      card.classList.remove(currentPattern);
    }

    card.classList.add(nextPattern);
  });
});
