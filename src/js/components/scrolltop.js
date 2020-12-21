const toTop = document.getElementById('to-top')
let scrolled
const scrollBegin = 500

window.addEventListener("scroll", e => {
  if (window.pageYOffset > scrollBegin) {
    toTop.classList.add('visible')
  } else {
    toTop.classList.remove('visible')
  }
}, false);


toTop.addEventListener('click', () => {
  scrolled = window.pageYOffset
  scrollToTop()
})

function scrollToTop() {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled)
    scrolled = scrolled - 100
    requestAnimationFrame(scrollToTop)
  } else {
    window.scrollTo(0, 0)
  }
}
requestAnimationFrame(scrollToTop)
