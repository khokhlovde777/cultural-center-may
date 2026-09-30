const GALLERY_PATH = '../src/gallery/';
const IMAGES_COUNT = 5;
const TOTAL_ITEMS = 15;
const GAP = 16;
const DURATION = 40;

const gallery = document.querySelector('.gallery');

const track = document.createElement('div');
track.className = 'gallery__track';

const baseSrcs = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
  const n = (i % IMAGES_COUNT) + 1;
  return `${GALLERY_PATH}img__${n}.png`;
});

const allSrcs = [...baseSrcs, ...baseSrcs];

const images = allSrcs.map(src => {
  const img = document.createElement('img');
  img.className = 'gallery__item';
  img.src = src;
  img.alt = '';
  img.loading = 'lazy';
  track.appendChild(img);
  return img;
});

gallery.appendChild(track);

function calcShift() {
  let shift = 0;
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    shift += images[i].offsetWidth + GAP;
  }
  return shift;
}

function applyShift() {
  track.style.setProperty('--shift', `${calcShift()}px`);
  track.style.animationDuration = `${DURATION}s`;
}

const firstImg = images[0];
if (firstImg.complete) {
  applyShift();
} else {
  firstImg.addEventListener('load', applyShift, { once: true });
  firstImg.addEventListener('error', applyShift, { once: true });
}

window.addEventListener('resize', applyShift);