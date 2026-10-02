document.addEventListener('DOMContentLoaded', () => {

  const thumbsSwiper = new Swiper('.thumbs-gallery', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper('.main-gallery', {
    slidesPerView: 1,
    spaceBetween: 24,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

});