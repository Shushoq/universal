import Swiper, {
  Navigation,
  Pagination
} from 'swiper';
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.news__slider', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: '.news__pagination',
    type: 'bullets',
    clickable: 'true',
    bulletClass: 'news__bullet',
    bulletActiveClass: 'news__bullet--active',
  },
});


const swiper1 = new Swiper('.post__slider-container', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.post__slider-button--next',
    prevEl: '.post__slider-button--prev',
  },
});
