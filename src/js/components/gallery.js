require('fslightbox');

const gallery = document.querySelectorAll('.button__gal')
gallery.forEach(el => {
  el.addEventListener('click', () => {
    fsLightboxInstances['gallery'].open(0);
  })
})
