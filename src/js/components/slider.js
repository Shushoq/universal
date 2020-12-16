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
