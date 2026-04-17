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

const imageSources = [
  "./assets/images/blurred-flower-art.jpg",
  "./assets/images/abstract-flower-blur.jpg",
  "./assets/images/dreamy-abstract-floral.jpg",
  "./assets/images/minimalist-floral-art.jpg",
];

const shuffleButton = document.querySelector("#shuffle-button");
const shufflableImages = document.querySelectorAll(
  ".art-card img, .feature-image img, .moment-card img"
);

shuffleButton?.addEventListener("click", () => {
  shufflableImages.forEach((image) => {
    const availableSources = imageSources.filter(
      (source) => !image.src.endsWith(source.replace("./", ""))
    );
    const nextSource =
      availableSources[Math.floor(Math.random() * availableSources.length)];

    image.src = nextSource;
  });
});
