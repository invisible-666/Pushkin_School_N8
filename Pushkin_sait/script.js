// =========================================
// SCRIPT.JS — Shared Navigation Logic + Theme
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- THEME SWITCHER ----
  const THEME_KEY = 'school8-theme';
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.querySelector('.theme-label').textContent = theme === 'dark' ? 'Светлая' : 'Тёмная';
    }
  }

  // Inject theme toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'theme-toggle';
  toggleBtn.className = 'theme-toggle';
  toggleBtn.innerHTML = '<span class="theme-icon"></span><span class="theme-label"></span>';
  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
  document.body.appendChild(toggleBtn);

  // Re-apply after button is in DOM
  applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

  // ---- NAVIGATION ----
  const lists = document.querySelectorAll('.navigation ul .list');
  lists.forEach(item => {
    item.addEventListener('click', function () {
      lists.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

});
