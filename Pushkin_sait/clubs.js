// =========================================
// CLUBS.JS — Loads clubs list from Firebase and shows them on the page
// =========================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('clubsSection');

  db.collection('clubs').orderBy('name').get().then(snapshot => {
    section.innerHTML = '';

    if (snapshot.empty) {
      section.innerHTML = '<p class="clubs-empty">Пока нет добавленных кружков. Загляните позже!</p>';
      return;
    }

    const sport = [];
    const intellectual = [];

    snapshot.forEach(doc => {
      const c = doc.data();
      if (c.type === 'intellectual') intellectual.push(c);
      else sport.push(c);
    });

    function renderGroup(title, items) {
      if (items.length === 0) return;
      const wrap = document.createElement('div');
      const heading = document.createElement('h2');
      heading.className = 'clubs-group-title';
      heading.textContent = title;
      wrap.appendChild(heading);

      const grid = document.createElement('div');
      grid.className = 'clubs-grid';

      items.forEach(c => {
        const card = document.createElement('div');
        card.className = 'club-card';
        card.innerHTML = `
          <h3>${escapeHtml(c.name)}</h3>
          <div class="club-meta">
            ${c.schedule ? `<span><i class="fa-solid fa-clock"></i> ${escapeHtml(c.schedule)}</span>` : ''}
            ${c.teacher ? `<span><i class="fa-solid fa-user"></i> ${escapeHtml(c.teacher)}</span>` : ''}
          </div>
          ${c.description ? `<p>${escapeHtml(c.description)}</p>` : ''}
        `;
        grid.appendChild(card);
      });

      wrap.appendChild(grid);
      section.appendChild(wrap);
    }

    renderGroup('Спортивные кружки', sport);
    renderGroup('Интеллектуальные кружки', intellectual);

  }).catch(err => {
    console.error(err);
    section.innerHTML = '<p class="clubs-empty">Не удалось загрузить кружки. Попробуйте позже.</p>';
  });
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
