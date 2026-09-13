// =========================================
// SCHOOL.JS — Gallery & Lightbox (fixed)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');
  const grid    = document.querySelector('.gallery-grid');

  // BUG FIX: Only track successfully loaded images (not no-img items)
  let loadedImgs = [];
  let current = 0;

  function makeClickable(img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      // Rebuild list fresh each click (handles dynamic changes)
      loadedImgs = Array.from(document.querySelectorAll('.gallery-item:not(.no-img) img'));
      current = loadedImgs.indexOf(img);
      if (current !== -1) openLightbox(current);
    });
  }

  function setupItem(item) {
    const img = item.querySelector('img');
    if (!img) return;

    // BUG FIX: if the image is already in the browser cache, it may finish
    // loading (or fail) BEFORE we attach 'load'/'error' listeners below.
    // In that case those events never fire again, so we check img.complete
    // first and handle the already-resolved state immediately.
    if (img.complete) {
      if (img.naturalWidth === 0) {
        item.classList.add('no-img');
      } else {
        makeClickable(img);
      }
      return;
    }

    img.addEventListener('load', () => makeClickable(img));

    img.addEventListener('error', () => {
      item.classList.add('no-img');
    });
  }

  function setupAllItems() {
    document.querySelectorAll('.gallery-item').forEach(setupItem);
  }

  // Static photos that are already in the HTML
  setupAllItems();

  // NEW: extra photos the director added through the admin panel (stored in Firebase)
  if (typeof db !== 'undefined' && grid) {
    db.collection('gallery').orderBy('createdAt', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        const p = doc.data();
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
          <img src="${p.url}" alt="${p.caption || ''}" />
          <div class="img-placeholder"><i class="fa-solid fa-image"></i><span>${p.caption || 'Фото'}</span></div>
        `;
        grid.appendChild(item);
        setupItem(item);
      });
    }).catch(err => console.warn('Extra gallery photos not loaded:', err));
  }

  function openLightbox(index) {
    current = index;
    lbImg.src = loadedImgs[current].src;
    lbImg.alt = loadedImgs[current].alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showPrev() {
    if (!loadedImgs.length) return;
    current = (current - 1 + loadedImgs.length) % loadedImgs.length;
    lbImg.src = loadedImgs[current].src;
    lbImg.alt = loadedImgs[current].alt;
  }

  function showNext() {
    if (!loadedImgs.length) return;
    current = (current + 1) % loadedImgs.length;
    lbImg.src = loadedImgs[current].src;
    lbImg.alt = loadedImgs[current].alt;
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});