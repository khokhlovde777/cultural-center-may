(function initHeadGallery() {
  const headSection = document.querySelector('.head-section');
  if (!headSection) return;

  let backImg = headSection.querySelector('.back-img');
  const circlesContainer = headSection.querySelector('.gallery-circles');
  const titleEl = headSection.querySelector('.head-section__text h1');
  const descEl = headSection.querySelector('.head__par');

  if (!backImg || !circlesContainer || !titleEl || !descEl) return;

  const slides = [
    {
      img: '../src/creative-groups-gallery/cgc-1.png',
      title: 'Студия<br>«Соловушка»',
      description:
        'Академический и эстрадный вокал, сольное и ансамблевое пение для всех возрастов.',
    },
    {
      img: '../src/creative-groups-gallery/cgc-2.png',
      title: 'Ансамбль<br>«Ручеёк»',
      description:
        'Народное пение, фольклорные традиции и сценическое мастерство для детей и взрослых.',
    },
    {
      img: '../src/creative-groups-gallery/cgc-3.png',
      title: 'Театр<br>«Маска»',
      description:
        'Актёрское мастерство, сценическая речь и пластика. Постановки для всей семьи.',
    },
    {
      img: '../src/creative-groups-gallery/cgc-4.png',
      title: 'Хор<br>«Гармония»',
      description:
        'Многоголосное хоровое пение, классический и современный репертуар.',
    },
    {
      img: '../src/creative-groups-gallery/cgc-5.png',
      title: 'Студия<br>«Ритм»',
      description:
        'Современная хореография, эстрадный танец и постановка номеров для любых событий.',
    },
  ];

  const INTERVAL = 3000;
  let currentIndex = 0;
  let isAnimating = false;

  const ACTIVE_CIRCLE = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" fill="white" fill-opacity="0.5" stroke="white"/>
    </svg>
  `;
  const INACTIVE_CIRCLE = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="6" fill="white" fill-opacity="0.5"/>
    </svg>
  `;

  // Кружочки
  circlesContainer.innerHTML = slides.map(() => INACTIVE_CIRCLE).join('');
  let circles = Array.from(circlesContainer.children);

  function updateCircles() {
    circles.forEach((circle, i) => {
      circle.outerHTML = i === currentIndex ? ACTIVE_CIRCLE : INACTIVE_CIRCLE;
    });
    circles = Array.from(circlesContainer.children);
  }

  function updateText(slide) {
    titleEl.classList.add('is-fading');
    descEl.classList.add('is-fading');

    setTimeout(() => {
      titleEl.innerHTML = slide.title;
      descEl.textContent = slide.description;

      titleEl.classList.remove('is-fading');
      descEl.classList.remove('is-fading');
    }, 300);
  }

  function animateImageChange(newSrc) {
    if (isAnimating) return;
    isAnimating = true;

    const parent = backImg.parentElement;
    if (!parent) {
      isAnimating = false;
      return;
    }

    const newImg = document.createElement('img');
    newImg.className = 'back-img back-img--next';
    newImg.src = newSrc;
    newImg.alt = '';
    parent.appendChild(newImg);

    void newImg.offsetWidth;

    requestAnimationFrame(() => {
      newImg.classList.add('back-img--active');
      backImg.classList.add('back-img--leave');
    });

    const cleanup = () => {
      newImg.removeEventListener('transitionend', cleanup);
      if (backImg && backImg.parentElement) {
        backImg.parentElement.removeChild(backImg);
      }
      newImg.classList.remove('back-img--next', 'back-img--active');
      backImg = newImg;
      isAnimating = false;
    };

    newImg.addEventListener('transitionend', cleanup, { once: true });

    setTimeout(() => {
      if (isAnimating) cleanup();
    }, 1200);
  }

  function goTo(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateCircles();
    updateText(slides[currentIndex]);
    animateImageChange(slides[currentIndex].img);
  }

  function next() {
    goTo(currentIndex + 1);
  }

  if (slides.length > 0) {
    backImg.src = slides[0].img;
    titleEl.innerHTML = slides[0].title;
    descEl.textContent = slides[0].description;
  }
  updateCircles();

  setInterval(next, INTERVAL);

  circlesContainer.addEventListener('click', (e) => {
    const svg = e.target.closest('svg');
    if (!svg) return;
    const idx = circles.indexOf(svg);
    if (idx !== -1 && idx !== currentIndex) goTo(idx);
  });
})();