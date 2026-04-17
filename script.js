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

const themes = {
  floral: {
    bodyClass: "",
    hero: [
      {
        src: "./assets/images/dreamy-abstract-floral.jpg",
        alt: "Dreamy abstract floral artwork",
        label: "Dreamy Abstract Floral",
      },
      {
        src: "./assets/images/abstract-flower-blur.jpg",
        alt: "Abstract flower blur artwork",
        label: "Abstract Flower Blur",
      },
    ],
    gallery: [
      {
        src: "./assets/images/blurred-flower-art.jpg",
        alt: "Blurred flower art",
      },
      {
        src: "./assets/images/abstract-flower-blur.jpg",
        alt: "Abstract flower blur",
      },
      {
        src: "./assets/images/dreamy-abstract-floral.jpg",
        alt: "Dreamy abstract floral",
      },
    ],
    moments: [
      {
        src: "./assets/images/blurred-flower-art.jpg",
        alt: "Blurred flower art in warm tones",
      },
      {
        src: "./assets/images/minimalist-floral-art.jpg",
        alt: "Minimalist floral illustration",
      },
      {
        src: "./assets/images/abstract-flower-blur.jpg",
        alt: "Abstract flower blur in soft red and yellow hues",
      },
      {
        src: "./assets/images/dreamy-abstract-floral.jpg",
        alt: "Dreamy abstract floral composition",
      },
    ],
  },
  tea: {
    bodyClass: "theme-green-tea",
    hero: [
      {
        src: "./assets/images/green-tea/lush-green-tea-landscape.jpg",
        alt: "Japanese green tea fields and landscape",
        label: "Tea Fields",
      },
      {
        src: "./assets/images/green-tea/ceremonial-matcha-preparation.jpg",
        alt: "Ceremonial matcha preparation",
        label: "Matcha Ceremony",
      },
    ],
    gallery: [
      {
        src: "./assets/images/green-tea/traditional-matcha-setup.jpg",
        alt: "Traditional matcha setup",
      },
      {
        src: "./assets/images/green-tea/serene-tea-moment.jpg",
        alt: "Serene Japanese tea moment",
      },
      {
        src: "./assets/images/green-tea/lush-green-tea-landscape.jpg",
        alt: "Green tea landscape",
      },
    ],
    moments: [
      {
        src: "./assets/images/green-tea/ceremonial-matcha-preparation.jpg",
        alt: "Ceremonial matcha whisk and bowl",
      },
      {
        src: "./assets/images/green-tea/traditional-matcha-setup.jpg",
        alt: "Matcha powder and tea tools",
      },
      {
        src: "./assets/images/green-tea/serene-tea-moment.jpg",
        alt: "Japanese tea room moment",
      },
      {
        src: "./assets/images/green-tea/lush-green-tea-landscape.jpg",
        alt: "Tea fields in soft light",
      },
    ],
  },
};

const heroCards = document.querySelectorAll(".hero-art .art-card");
const galleryImages = document.querySelectorAll(".gallery-grid .feature-image img");
const momentImages = document.querySelectorAll(".moments-grid .moment-card img");
const galleryThemeLink = document.querySelector('[data-theme-trigger="floral"]');
const greenTeaToggle = document.querySelector("#green-tea-toggle");
let currentTheme = "floral";

function setActiveThemeTrigger(themeName) {
  galleryThemeLink?.classList.toggle("is-active", themeName === "floral");
  greenTeaToggle?.classList.toggle("is-active", themeName === "tea");
}

function renderTheme(themeName) {
  const theme = themes[themeName];

  if (!theme) {
    return;
  }

  currentTheme = themeName;
  document.body.classList.toggle("theme-green-tea", theme.bodyClass !== "");
  setActiveThemeTrigger(themeName);

  heroCards.forEach((card, index) => {
    const config = theme.hero[index];
    const image = card.querySelector("img");
    const label = card.querySelector("span");

    if (config && image && label) {
      image.src = config.src;
      image.alt = config.alt;
      label.textContent = config.label;
    }
  });

  galleryImages.forEach((image, index) => {
    const config = theme.gallery[index];

    if (config) {
      image.src = config.src;
      image.alt = config.alt;
    }
  });

  momentImages.forEach((image, index) => {
    const config = theme.moments[index];

    if (config) {
      image.src = config.src;
      image.alt = config.alt;
    }
  });
}

const shuffleButton = document.querySelector("#shuffle-button");
const shufflableImages = document.querySelectorAll(".feature-image img, .moment-card img");

galleryThemeLink?.addEventListener("click", () => {
  renderTheme("floral");
});

greenTeaToggle?.addEventListener("click", () => {
  renderTheme("tea");
});

shuffleButton?.addEventListener("click", () => {
  const theme = themes[currentTheme];
  const imagePool = [...theme.gallery, ...theme.moments];

  shufflableImages.forEach((image) => {
    const availableImages = imagePool.filter(
      (item) => !image.src.endsWith(item.src.replace("./", ""))
    );
    const nextImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];

    if (nextImage) {
      image.src = nextImage.src;
      image.alt = nextImage.alt;
    }
  });
});

renderTheme("floral");
