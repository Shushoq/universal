const bookmark = document.querySelectorAll('.icon')

bookmark.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('icon--active')
  })
})
