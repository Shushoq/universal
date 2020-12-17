const burger = document.querySelector('.burger')
const menu = document.querySelector('.nav')
const page = document.querySelector('.page')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active')
  menu.classList.toggle('nav--active')
  page.classList.toggle('page--active')
})
