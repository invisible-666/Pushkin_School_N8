// =========================================
// TEST.JS — Math Quiz, Grades 5–9
// =========================================

// ---- ALL 40 QUESTIONS ----
// type: 'mc'    = multiple choice (options array)
// type: 'input' = text input (answer is a string)
const ALL_QUESTIONS = [
  // --- GRADE 5: Arithmetic ---
  {
    q: "Сколько будет 15 × 14?",
    type: "mc",
    options: ["200", "210", "195", "220"],
    answer: "210",
    solution: "15 × 14 = 15 × 10 + 15 × 4 = 150 + 60 = 210"
  },
  {
    q: "Чему равно 144 ÷ 12?",
    type: "mc",
    options: ["11", "13", "12", "14"],
    answer: "12",
    solution: "144 ÷ 12 = 12, так как 12 × 12 = 144"
  },
  {
    q: "Найдите: 256 − 178",
    type: "input",
    answer: "78",
    solution: "256 − 178 = 256 − 180 + 2 = 76 + 2 = 78"
  },
  {
    q: "Сколько будет 7³?",
    type: "mc",
    options: ["343", "21", "49", "147"],
    answer: "343",
    solution: "7³ = 7 × 7 × 7 = 49 × 7 = 343"
  },
  {
    q: "Найди НОД(24, 36)",
    type: "mc",
    options: ["6", "4", "12", "9"],
    answer: "12",
    solution: "24 = 2³×3, 36 = 2²×3². НОД = 2²×3 = 12"
  },
  {
    q: "Сколько будет ½ + ⅓?",
    type: "mc",
    options: ["2/5", "5/6", "1/6", "2/6"],
    answer: "5/6",
    solution: "½ + ⅓ = 3/6 + 2/6 = 5/6"
  },
  {
    q: "Периметр квадрата со стороной 9 см равен?",
    type: "input",
    answer: "36",
    solution: "P = 4 × 9 = 36 см"
  },
  {
    q: "Площадь прямоугольника 8×5 равна?",
    type: "input",
    answer: "40",
    solution: "S = 8 × 5 = 40 кв.ед."
  },

  // --- GRADE 6: Ratios & Percents ---
  {
    q: "Сколько составляет 25% от 200?",
    type: "mc",
    options: ["40", "50", "25", "75"],
    answer: "50",
    solution: "25% = 1/4. 200 ÷ 4 = 50"
  },
  {
    q: "Число увеличили на 30% и получили 130. Каково исходное число?",
    type: "mc",
    options: ["91", "100", "110", "95"],
    answer: "100",
    solution: "x × 1.3 = 130 → x = 130 ÷ 1.3 = 100"
  },
  {
    q: "Упрости: 48/72",
    type: "mc",
    options: ["3/4", "2/3", "4/6", "6/9"],
    answer: "2/3",
    solution: "НОД(48,72) = 24. 48÷24 = 2, 72÷24 = 3. Ответ: 2/3"
  },
  {
    q: "Скорость поезда 90 км/ч. Какое расстояние пройдёт за 2,5 ч?",
    type: "input",
    answer: "225",
    solution: "s = v × t = 90 × 2.5 = 225 км"
  },
  {
    q: "Найдите: -8 + 5",
    type: "mc",
    options: ["-13", "3", "-3", "13"],
    answer: "-3",
    solution: "-8 + 5 = -(8-5) = -3"
  },
  {
    q: "Вычислите: (-4) × (-7)",
    type: "mc",
    options: ["-28", "11", "28", "-11"],
    answer: "28",
    solution: "Минус на минус даёт плюс: (-4)×(-7) = +28"
  },

  // --- GRADE 7: Algebra ---
  {
    q: "Решите уравнение: 3x + 7 = 22",
    type: "mc",
    options: ["x = 5", "x = 7", "x = 4", "x = 6"],
    answer: "x = 5",
    solution: "3x = 22 − 7 = 15 → x = 15 ÷ 3 = 5"
  },
  {
    q: "Решите: 2x − 9 = x + 3",
    type: "mc",
    options: ["x = 10", "x = 12", "x = 8", "x = 6"],
    answer: "x = 12",
    solution: "2x − x = 3 + 9 → x = 12"
  },
  {
    q: "Раскройте скобки: (x + 3)(x − 3)",
    type: "mc",
    options: ["x² + 6x − 9", "x² − 9", "x² − 6", "x² + 9"],
    answer: "x² − 9",
    solution: "Формула разности квадратов: (a+b)(a−b) = a²−b² = x²−9"
  },
  {
    q: "Чему равно: (a + b)²?",
    type: "mc",
    options: ["a² + b²", "a² − 2ab + b²", "a² + 2ab + b²", "2a + 2b"],
    answer: "a² + 2ab + b²",
    solution: "(a+b)² = a² + 2ab + b² — формула квадрата суммы"
  },
  {
    q: "Найдите корни: x² − 5x + 6 = 0",
    type: "mc",
    options: ["x=1 и x=6", "x=2 и x=3", "x=−2 и x=−3", "x=0 и x=5"],
    answer: "x=2 и x=3",
    solution: "x²−5x+6=(x−2)(x−3)=0 → x=2 или x=3"
  },
  {
    q: "Решите систему: x+y=7, x−y=3. Найдите x.",
    type: "input",
    answer: "5",
    solution: "Сложим уравнения: 2x=10 → x=5. Тогда y=7−5=2"
  },
  {
    q: "Упростите: 3a²b × 2ab³",
    type: "mc",
    options: ["5a²b⁴", "6a³b⁴", "6a²b³", "5a³b⁴"],
    answer: "6a³b⁴",
    solution: "3×2=6, a²×a=a³, b×b³=b⁴ → 6a³b⁴"
  },
  {
    q: "Прямая y = 2x + 3. Найдите y при x = 4.",
    type: "input",
    answer: "11",
    solution: "y = 2×4 + 3 = 8 + 3 = 11"
  },

  // --- GRADE 8: Quadratics & Geometry ---
  {
    q: "Дискриминант уравнения 2x²−4x+2=0 равен:",
    type: "mc",
    options: ["8", "16", "0", "4"],
    answer: "0",
    solution: "D = b²−4ac = (−4)²−4×2×2 = 16−16 = 0"
  },
  {
    q: "Решите: x² − 7x + 12 = 0",
    type: "mc",
    options: ["x=3 и x=4", "x=1 и x=12", "x=2 и x=6", "x=−3 и x=−4"],
    answer: "x=3 и x=4",
    solution: "D=49−48=1. x=(7±1)/2 → x=4 или x=3"
  },
  {
    q: "В прямоугольном треугольнике катеты 6 и 8. Гипотенуза =?",
    type: "input",
    answer: "10",
    solution: "c = √(6²+8²) = √(36+64) = √100 = 10"
  },
  {
    q: "Площадь круга с радиусом 7 (π≈3.14)?",
    type: "mc",
    options: ["153.86", "43.96", "49", "21.98"],
    answer: "153.86",
    solution: "S = πr² = 3.14 × 49 = 153.86"
  },
  {
    q: "Угол A треугольника = 60°, угол B = 80°. Угол C =?",
    type: "input",
    answer: "40",
    solution: "A+B+C = 180° → C = 180−60−80 = 40°"
  },
  {
    q: "Сумма внутренних углов четырёхугольника =?",
    type: "mc",
    options: ["180°", "270°", "360°", "540°"],
    answer: "360°",
    solution: "Сумма углов любого четырёхугольника = 360°"
  },
  {
    q: "Решите: |x − 3| = 5",
    type: "mc",
    options: ["x=8", "x=−2 и x=8", "x=2 и x=−8", "x=−8"],
    answer: "x=−2 и x=8",
    solution: "x−3=5 → x=8; x−3=−5 → x=−2"
  },
  {
    q: "Упростите дробь: (x²−4)/(x−2)",
    type: "mc",
    options: ["x−2", "x+2", "x²+4", "2"],
    answer: "x+2",
    solution: "x²−4 = (x−2)(x+2). Сокращаем (x−2) → x+2"
  },

  // --- GRADE 9: Advanced ---
  {
    q: "Арифметическая прогрессия: a₁=3, d=4. Найдите a₇.",
    type: "mc",
    options: ["24", "27", "28", "31"],
    answer: "27",
    solution: "aₙ = a₁ + (n−1)d = 3 + 6×4 = 3 + 24 = 27"
  },
  {
    q: "Геометрическая прогрессия: b₁=2, q=3. Найдите b₅.",
    type: "input",
    answer: "162",
    solution: "bₙ = b₁ × q^(n−1) = 2 × 3⁴ = 2 × 81 = 162"
  },
  {
    q: "sin(30°) =?",
    type: "mc",
    options: ["√3/2", "1/2", "√2/2", "1"],
    answer: "1/2",
    solution: "sin(30°) = 1/2 — стандартное значение"
  },
  {
    q: "cos(60°) =?",
    type: "mc",
    options: ["√3/2", "1", "1/2", "0"],
    answer: "1/2",
    solution: "cos(60°) = 1/2 — стандартное значение"
  },
  {
    q: "Объём куба со стороной 5 =?",
    type: "input",
    answer: "125",
    solution: "V = a³ = 5³ = 125"
  },
  {
    q: "Решите неравенство: 2x − 6 > 4",
    type: "mc",
    options: ["x > 5", "x < 5", "x > 1", "x ≥ 5"],
    answer: "x > 5",
    solution: "2x > 4+6=10 → x > 5"
  },
  {
    q: "Сколько корней имеет уравнение x²+1=0?",
    type: "mc",
    options: ["1", "0", "2", "∞"],
    answer: "0",
    solution: "D = 0−4 = −4 < 0. Действительных корней нет."
  },
  {
    q: "Логарифм: log₂(32) =?",
    type: "mc",
    options: ["4", "6", "5", "3"],
    answer: "5",
    solution: "2⁵ = 32, значит log₂(32) = 5"
  },
  {
    q: "Сумма первых 10 членов арифм. прог. a₁=1, d=2",
    type: "input",
    answer: "100",
    solution: "Sₙ = n/2×(2a₁+(n−1)d) = 10/2×(2+18) = 5×20 = 100"
  },
  {
    q: "Угол вписан в окружность и опирается на диаметр. Он равен?",
    type: "mc",
    options: ["45°", "60°", "90°", "180°"],
    answer: "90°",
    solution: "Вписанный угол, опирающийся на диаметр = 90° (теорема Фалеса)"
  },
];

// ---- SHUFFLE HELPER ----
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---- STATE ----
let questions = [];
let userAnswers = {};

// ---- BUILD QUIZ ----
function buildQuiz() {
  questions = shuffle(ALL_QUESTIONS);
  userAnswers = {};

  const section = document.getElementById('quizSection');
  section.innerHTML = '';

  questions.forEach((q, idx) => {
    const row = document.createElement('div');
    row.className = 'question-row';

    // Left: question
    const left = document.createElement('div');
    left.className = 'q-left';
    left.innerHTML = `
      <div>
        <span class="q-num">Вопрос ${idx + 1}</span>
        <div class="q-text">${q.q}</div>
      </div>`;

    // Right: answers
    const right = document.createElement('div');
    right.className = 'q-right';

    if (q.type === 'mc') {
      const shuffledOpts = shuffle(q.options);
      shuffledOpts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          // Deselect siblings
          right.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          userAnswers[idx] = opt;
        });
        right.appendChild(btn);
      });
    } else {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'q-input';
      inp.placeholder = 'Введите ответ...';
      inp.addEventListener('input', () => {
        userAnswers[idx] = inp.value.trim();
      });
      right.appendChild(inp);
    }

    row.appendChild(left);
    row.appendChild(right);
    section.appendChild(row);
  });

  document.getElementById('quizSection').style.display = 'flex';
  document.getElementById('quizFooter').style.display = 'block';
  document.getElementById('resultsSection').style.display = 'none';
}

// ---- SUBMIT ----
function normalizeAnswer(str) {
  // Remove spaces around operators and normalize for comparison
  return str.toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

function submitQuiz() {
  // BUG FIX: Warn if unanswered questions
  const unanswered = questions.filter((_, idx) => !userAnswers[idx] || userAnswers[idx].toString().trim() === '').length;
  if (unanswered > 0) {
    const go = confirm(`Вы не ответили на ${unanswered} вопрос(ов). Всё равно отправить?`);
    if (!go) return;
  }

  let correct = 0;

  questions.forEach((q, idx) => {
    const given = normalizeAnswer(userAnswers[idx] || '');
    const right = normalizeAnswer(q.answer);
    if (given === right) correct++;
  });

  const total   = questions.length;
  const pct     = Math.round((correct / total) * 100);

  // Grade
  let grade = '';
  if (pct >= 90)      grade = '🌟 Отлично!';
  else if (pct >= 75) grade = '👍 Хорошо!';
  else if (pct >= 50) grade = '📖 Удовлетворительно';
  else                grade = '💪 Нужно больше практики';

  document.getElementById('scoreNum').textContent    = correct;
  document.getElementById('scoreTotal').textContent  = `/ ${total}`;
  document.getElementById('scorePercent').textContent = `${pct}% правильных ответов`;
  document.getElementById('scoreGrade').textContent  = grade;

  // Build solutions
  const wrap = document.getElementById('solutionsWrap');
  wrap.innerHTML = '<h3 style="color:var(--gold);font-family:\'Playfair Display\',serif;font-size:24px;margin-bottom:16px;">Разбор ответов</h3>';

  questions.forEach((q, idx) => {
    const given = normalizeAnswer(userAnswers[idx] || '');
    const right = normalizeAnswer(q.answer);
    const isOk  = given === right;

    const item = document.createElement('div');
    item.className = `solution-item ${isOk ? 'correct' : 'wrong'}`;
    item.innerHTML = `
      <div class="sol-header">
        <div class="sol-q">${idx + 1}. ${q.q}</div>
        <span class="sol-badge ${isOk ? 'correct' : 'wrong'}">${isOk ? '✓ Верно' : '✗ Неверно'}</span>
      </div>
      ${!isOk ? `<div class="sol-your">Ваш ответ: ${userAnswers[idx] || '—'}</div>` : ''}
      <div class="sol-correct">Правильный ответ: ${q.answer}</div>
      <div class="sol-explain">Решение: ${q.solution}</div>`;
    wrap.appendChild(item);
  });

  // Show results
  document.getElementById('quizSection').style.display   = 'none';
  document.getElementById('quizFooter').style.display    = 'none';
  document.getElementById('resultsSection').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- RESTART ----
function restartQuiz() {
  buildQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', buildQuiz);
