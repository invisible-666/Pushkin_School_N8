// =========================================
// ADMIN.JS — Admin panel logic
// Needs firebase-config.js loaded before this file (gives us `db` and `auth`)
// =========================================

const loginScreen = document.getElementById('loginScreen');
const dashboard    = document.getElementById('dashboard');

// ---- LOGIN ----
document.getElementById('loginBtn').addEventListener('click', () => {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errBox   = document.getElementById('loginError');
  errBox.textContent = '';

  if (!email || !password) {
    errBox.textContent = 'Введите email и пароль.';
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      errBox.textContent = 'Неверный email или пароль.';
      console.error(err);
    });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    loginScreen.style.display = 'none';
    dashboard.style.display   = 'block';
    loadClubs();
    loadNews();
    loadHours();
    loadGallery();
  } else {
    loginScreen.style.display = 'block';
    dashboard.style.display   = 'none';
  }
});

// ---- TABS ----
document.querySelectorAll('.admin-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// =========================================
// CLUBS
// =========================================
const clubsCol = db.collection('clubs');

function loadClubs() {
  clubsCol.orderBy('name').onSnapshot(snap => {
    const list = document.getElementById('clubsList');
    list.innerHTML = '';
    if (snap.empty) {
      list.innerHTML = '<p class="admin-empty">Кружков пока нет. Добавьте первый выше.</p>';
      return;
    }
    snap.forEach(doc => {
      const c = doc.data();
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <div class="admin-item-info">
          <div class="admin-item-title">${escapeHtml(c.name)}
            <span class="badge-type ${c.type}">${c.type === 'sport' ? 'Спорт' : 'Интеллект'}</span>
          </div>
          <div class="admin-item-sub">${escapeHtml(c.schedule || '')} ${c.teacher ? '· ' + escapeHtml(c.teacher) : ''}</div>
        </div>
        <div class="admin-item-actions">
          <button class="icon-btn" data-edit="${doc.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn danger" data-delete="${doc.id}"><i class="fa-solid fa-trash"></i></button>
        </div>`;
      list.appendChild(item);

      item.querySelector('[data-edit]').addEventListener('click', () => {
        document.getElementById('clubId').value = doc.id;
        document.getElementById('clubName').value = c.name || '';
        document.getElementById('clubType').value = c.type || 'sport';
        document.getElementById('clubSchedule').value = c.schedule || '';
        document.getElementById('clubTeacher').value = c.teacher || '';
        document.getElementById('clubDesc').value = c.description || '';
        document.getElementById('clubFormTitle').textContent = 'Изменить кружок';
        document.getElementById('cancelClubBtn').style.display = 'inline-block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      item.querySelector('[data-delete]').addEventListener('click', () => {
        if (confirm(`Удалить кружок «${c.name}»?`)) {
          clubsCol.doc(doc.id).delete();
        }
      });
    });
  });
}

function resetClubForm() {
  document.getElementById('clubId').value = '';
  document.getElementById('clubName').value = '';
  document.getElementById('clubType').value = 'sport';
  document.getElementById('clubSchedule').value = '';
  document.getElementById('clubTeacher').value = '';
  document.getElementById('clubDesc').value = '';
  document.getElementById('clubFormTitle').textContent = 'Добавить кружок';
  document.getElementById('cancelClubBtn').style.display = 'none';
}

document.getElementById('cancelClubBtn').addEventListener('click', resetClubForm);

document.getElementById('saveClubBtn').addEventListener('click', () => {
  const id   = document.getElementById('clubId').value;
  const name = document.getElementById('clubName').value.trim();
  if (!name) { alert('Введите название кружка.'); return; }

  const data = {
    name,
    type: document.getElementById('clubType').value,
    schedule: document.getElementById('clubSchedule').value.trim(),
    teacher: document.getElementById('clubTeacher').value.trim(),
    description: document.getElementById('clubDesc').value.trim(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  const promise = id
    ? clubsCol.doc(id).update(data)
    : clubsCol.add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });

  promise.then(resetClubForm).catch(err => alert('Ошибка: ' + err.message));
});

// =========================================
// NEWS
// =========================================
const newsCol = db.collection('news');

function loadNews() {
  newsCol.orderBy('createdAt', 'desc').onSnapshot(snap => {
    const list = document.getElementById('newsList');
    list.innerHTML = '';
    if (snap.empty) {
      list.innerHTML = '<p class="admin-empty">Новостей пока нет.</p>';
      return;
    }
    snap.forEach(doc => {
      const n = doc.data();
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <div class="admin-item-info">
          <div class="admin-item-title">${escapeHtml(n.title)}</div>
          <div class="admin-item-sub">${escapeHtml((n.text || '').slice(0, 90))}${(n.text || '').length > 90 ? '…' : ''}</div>
        </div>
        <div class="admin-item-actions">
          <button class="icon-btn" data-edit="${doc.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn danger" data-delete="${doc.id}"><i class="fa-solid fa-trash"></i></button>
        </div>`;
      list.appendChild(item);

      item.querySelector('[data-edit]').addEventListener('click', () => {
        document.getElementById('newsId').value = doc.id;
        document.getElementById('newsTitle').value = n.title || '';
        document.getElementById('newsText').value = n.text || '';
        document.getElementById('newsImage').value = n.image || '';
        document.getElementById('newsFormTitle').textContent = 'Изменить новость';
        document.getElementById('cancelNewsBtn').style.display = 'inline-block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      item.querySelector('[data-delete]').addEventListener('click', () => {
        if (confirm(`Удалить новость «${n.title}»?`)) {
          newsCol.doc(doc.id).delete();
        }
      });
    });
  });
}

function resetNewsForm() {
  document.getElementById('newsId').value = '';
  document.getElementById('newsTitle').value = '';
  document.getElementById('newsText').value = '';
  document.getElementById('newsImage').value = '';
  document.getElementById('newsFormTitle').textContent = 'Добавить новость';
  document.getElementById('cancelNewsBtn').style.display = 'none';
}

document.getElementById('cancelNewsBtn').addEventListener('click', resetNewsForm);

document.getElementById('saveNewsBtn').addEventListener('click', () => {
  const id    = document.getElementById('newsId').value;
  const title = document.getElementById('newsTitle').value.trim();
  const text  = document.getElementById('newsText').value.trim();
  if (!title || !text) { alert('Заполните заголовок и текст.'); return; }

  const data = {
    title,
    text,
    image: document.getElementById('newsImage').value.trim()
  };

  const promise = id
    ? newsCol.doc(id).update(data)
    : newsCol.add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });

  promise.then(resetNewsForm).catch(err => alert('Ошибка: ' + err.message));
});

// =========================================
// HOURS (single settings document)
// =========================================
const hoursDoc = db.collection('settings').doc('hours');

function loadHours() {
  hoursDoc.get().then(doc => {
    if (doc.exists) {
      document.getElementById('hoursText').value = doc.data().text || '';
    }
  });
}

document.getElementById('saveHoursBtn').addEventListener('click', () => {
  const text = document.getElementById('hoursText').value.trim();
  hoursDoc.set({ text }).then(() => {
    alert('Сохранено!');
  }).catch(err => alert('Ошибка: ' + err.message));
});

// =========================================
// GALLERY
// =========================================
const galleryCol = db.collection('gallery');

function loadGallery() {
  galleryCol.orderBy('createdAt', 'desc').onSnapshot(snap => {
    const list = document.getElementById('galleryList');
    list.innerHTML = '';
    if (snap.empty) {
      list.innerHTML = '<p class="admin-empty">Дополнительных фото пока нет.</p>';
      return;
    }
    snap.forEach(doc => {
      const p = doc.data();
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <div class="admin-item-info">
          <div class="admin-item-title">${escapeHtml(p.caption || 'Без подписи')}</div>
          <div class="admin-item-sub" style="word-break:break-all;">${escapeHtml(p.url)}</div>
        </div>
        <div class="admin-item-actions">
          <button class="icon-btn danger" data-delete="${doc.id}"><i class="fa-solid fa-trash"></i></button>
        </div>`;
      list.appendChild(item);

      item.querySelector('[data-delete]').addEventListener('click', () => {
        if (confirm('Удалить это фото?')) {
          galleryCol.doc(doc.id).delete();
        }
      });
    });
  });
}

document.getElementById('savePhotoBtn').addEventListener('click', () => {
  const url = document.getElementById('photoUrl').value.trim();
  if (!url) { alert('Вставьте ссылку на фото.'); return; }

  galleryCol.add({
    url,
    caption: document.getElementById('photoCaption').value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById('photoUrl').value = '';
    document.getElementById('photoCaption').value = '';
  }).catch(err => alert('Ошибка: ' + err.message));
});
