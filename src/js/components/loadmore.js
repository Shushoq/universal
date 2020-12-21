const comments = document.querySelectorAll('.comments__item--hidden');
const load = document.querySelector('.comments__load');

if (load) {
  load.addEventListener('click', () => {
    comments.forEach((el) =>
      el.classList.remove('comments__item--hidden')
    )
  })
}
