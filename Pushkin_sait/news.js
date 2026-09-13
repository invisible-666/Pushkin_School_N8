// =========================================
// NEWS.JS — Loads news posts from Firebase and shows them on the page
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('newsSection');

  db.collection('news').orderBy('createdAt', 'desc').get().then(snapshot => {
    section.innerHTML = '';

    if (snapshot.empty) {
      section.innerHTML = '<p class="news-empty">Новостей пока нет. Загляните позже!</p>';
      return;
    }

    snapshot.forEach(doc => {
      const n = doc.data();
      const card = document.createElement('article');
      card.className = 'news-card';

      let dateStr = '';
      if (n.createdAt && n.createdAt.toDate) {
        dateStr = n.createdAt.toDate().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      }

      card.innerHTML = `
        ${n.image ? `<img src="${n.image}" alt="${escapeHtml(n.title)}" onerror="this.remove()">` : ''}
        <div class="news-card-body">
          <h2>${escapeHtml(n.title)}</h2>
          ${dateStr ? `<div class="news-date">${dateStr}</div>` : ''}
          <p>${escapeHtml(n.text)}</p>
        </div>`;
      section.appendChild(card);
    });

  }).catch(err => {
    console.error(err);
    section.innerHTML = '<p class="news-empty">Не удалось загрузить новости. Попробуйте позже.</p>';
  });
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
