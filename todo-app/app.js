/**
 * TaskFlow — app.js
 * Vanilla JS + Tailwind CDN | LocalStorage como "banco de dados"
 *
 * Estrutura do localStorage:
 *   "tf_db" → { users: [], todos: [] }
 *   "tf_current_user" → objeto do usuário logado (ou null)
 */

// ─────────────────────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────────────────────

const DB_KEY          = 'tf_db';
const CURRENT_USER_KEY = 'tf_current_user';

const BADGE_CONFIG = {
  work:     { label: 'Trabalho', css: 'badge-work'     },
  personal: { label: 'Pessoal',  css: 'badge-personal' },
  study:    { label: 'Estudos',  css: 'badge-study'    },
};

// ─────────────────────────────────────────────────────────────
// CAMADA DE PERSISTÊNCIA (LocalStorage → simula db.json)
// ─────────────────────────────────────────────────────────────

const db = {
  /** Lê o banco completo; retorna estrutura padrão se não existir */
  read() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : { users: [], todos: [] };
    } catch {
      return { users: [], todos: [] };
    }
  },

  /** Persiste o banco completo */
  write(data) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('[TaskFlow] Erro ao salvar no localStorage:', err);
    }
  },

  // --- Usuários ---

  findUserByEmail(email) {
    return this.read().users.find(u => u.email === email.toLowerCase()) ?? null;
  },

  addUser(user) {
    const data = this.read();
    data.users.push(user);
    this.write(data);
  },

  // --- Tarefas ---

  getTodosForUser(userId) {
    return this.read().todos.filter(t => t.userId === userId);
  },

  addTodo(todo) {
    const data = this.read();
    data.todos.push(todo);
    this.write(data);
  },

  updateTodo(todoId, changes) {
    const data = this.read();
    data.todos = data.todos.map(t => t.id === todoId ? { ...t, ...changes } : t);
    this.write(data);
  },

  deleteTodo(todoId) {
    const data = this.read();
    data.todos = data.todos.filter(t => t.id !== todoId);
    this.write(data);
  },
};

// ─────────────────────────────────────────────────────────────
// SESSÃO
// ─────────────────────────────────────────────────────────────

const session = {
  getCurrent() {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(user) {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (err) {
      console.error('[TaskFlow] Erro ao salvar sessão:', err);
    }
  },

  clear() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};

// ─────────────────────────────────────────────────────────────
// ROTEAMENTO DE TELAS
// ─────────────────────────────────────────────────────────────

const SCREENS = ['screen-login', 'screen-register', 'screen-dashboard'];

function showScreen(screenId) {
  SCREENS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === screenId) {
      el.classList.remove('hidden');
      el.classList.add(id === 'screen-dashboard' ? 'flex' : 'flex');
    } else {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }
  });
}

// ─────────────────────────────────────────────────────────────
// UTILITÁRIOS DE VALIDAÇÃO
// ─────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(errorElementId, message) {
  const el = document.getElementById(errorElementId);
  if (!el) return;
  el.querySelector('span').textContent = message;
  el.classList.remove('hidden');
}

function clearFieldError(errorElementId) {
  const el = document.getElementById(errorElementId);
  if (!el) return;
  el.classList.add('hidden');
  el.querySelector('span').textContent = '';
}

function clearAllErrors(errorIds) {
  errorIds.forEach(clearFieldError);
}

// ─────────────────────────────────────────────────────────────
// AUTENTICAÇÃO — LOGIN
// ─────────────────────────────────────────────────────────────

function handleLogin(event) {
  event.preventDefault();

  const errorIds = ['login-email-error', 'login-password-error', 'login-general-error'];
  clearAllErrors(errorIds);

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  let hasError = false;

  if (!email) {
    showFieldError('login-email-error', 'O e-mail é obrigatório.');
    hasError = true;
  } else if (!isValidEmail(email)) {
    showFieldError('login-email-error', 'Informe um e-mail válido.');
    hasError = true;
  }

  if (!password) {
    showFieldError('login-password-error', 'A senha é obrigatória.');
    hasError = true;
  }

  if (hasError) return;

  const user = db.findUserByEmail(email);

  if (!user) {
    showFieldError('login-general-error', 'E-mail não encontrado. Cadastre-se primeiro.');
    return;
  }

  if (user.password !== password) {
    showFieldError('login-general-error', 'Senha incorreta. Tente novamente.');
    return;
  }

  session.set(user);
  openDashboard(user);
}

// ─────────────────────────────────────────────────────────────
// AUTENTICAÇÃO — CADASTRO
// ─────────────────────────────────────────────────────────────

function handleRegister(event) {
  event.preventDefault();

  const errorIds = ['reg-name-error', 'reg-email-error', 'reg-password-error', 'reg-general-error'];
  clearAllErrors(errorIds);

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  let hasError = false;

  if (!name) {
    showFieldError('reg-name-error', 'O nome é obrigatório.');
    hasError = true;
  }

  if (!email) {
    showFieldError('reg-email-error', 'O e-mail é obrigatório.');
    hasError = true;
  } else if (!isValidEmail(email)) {
    showFieldError('reg-email-error', 'Informe um e-mail válido.');
    hasError = true;
  }

  if (!password) {
    showFieldError('reg-password-error', 'A senha é obrigatória.');
    hasError = true;
  } else if (password.length < 6) {
    showFieldError('reg-password-error', 'A senha deve ter pelo menos 6 caracteres.');
    hasError = true;
  }

  if (hasError) return;

  const existing = db.findUserByEmail(email);
  if (existing) {
    showFieldError('reg-general-error', 'Este e-mail já está cadastrado.');
    return;
  }

  const newUser = {
    id:       Date.now(),
    name,
    email:    email.toLowerCase(),
    password,
  };

  db.addUser(newUser);
  session.set(newUser);
  openDashboard(newUser);
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────

function openDashboard(user) {
  document.getElementById('dashboard-username').textContent = user.name;
  showScreen('screen-dashboard');
  renderTodos(user.email);
}

function handleLogout() {
  session.clear();
  document.getElementById('form-login').reset();
  showScreen('screen-login');
}

// ─────────────────────────────────────────────────────────────
// TAREFAS — CRUD
// ─────────────────────────────────────────────────────────────

function handleAddTodo(event) {
  event.preventDefault();

  clearFieldError('todo-title-error');

  const title = document.getElementById('todo-title').value.trim();
  const type  = document.getElementById('todo-type').value;
  const desc  = document.getElementById('todo-desc').value.trim();

  if (!title) {
    showFieldError('todo-title-error', 'O título da tarefa é obrigatório.');
    return;
  }

  const currentUser = session.getCurrent();
  if (!currentUser) return;

  const newTodo = {
    id:          Date.now(),
    userId:      currentUser.email,
    title,
    type,
    description: desc,
    done:        false,
    createdAt:   new Date().toISOString(),
  };

  db.addTodo(newTodo);
  clearTodoForm();
  renderTodos(currentUser.email);
}

function handleToggleDone(todoId) {
  db.updateTodo(todoId, { done: true });
  const currentUser = session.getCurrent();
  if (currentUser) renderTodos(currentUser.email);
}

function handleDeleteTodo(todoId) {
  db.deleteTodo(todoId);
  const currentUser = session.getCurrent();
  if (currentUser) renderTodos(currentUser.email);
}

function clearTodoForm() {
  document.getElementById('todo-title').value = '';
  document.getElementById('todo-type').value  = 'work';
  document.getElementById('todo-desc').value  = '';
}

// ─────────────────────────────────────────────────────────────
// RENDERIZAÇÃO — CARDS DE TAREFA
// ─────────────────────────────────────────────────────────────

function renderTodos(userId) {
  const todos   = db.getTodosForUser(userId);
  const list    = document.getElementById('todo-list');
  const pending = todos.filter(t => !t.done);
  const done    = todos.filter(t =>  t.done);
  const sorted  = [...pending, ...done];

  updateCounters(todos.length, done.length);

  if (sorted.length === 0) {
    list.innerHTML = buildEmptyState();
    return;
  }

  list.innerHTML = sorted.map(buildTodoCard).join('');

  // Anexa event listeners nos botões de cada card
  sorted.forEach(todo => {
    const doneBtn = document.getElementById(`btn-done-${todo.id}`);
    if (doneBtn) doneBtn.addEventListener('click', () => handleToggleDone(todo.id));

    const delBtn = document.getElementById(`btn-del-${todo.id}`);
    if (delBtn) delBtn.addEventListener('click', () => handleDeleteTodo(todo.id));
  });
}

function buildTodoCard(todo) {
  const badge    = BADGE_CONFIG[todo.type] ?? BADGE_CONFIG.work;
  const doneClass = todo.done ? 'is-done' : '';
  const doneLabel = todo.done
    ? `<span class="btn-done completed">Concluída ✓</span>`
    : `<button id="btn-done-${todo.id}" class="btn-done">Concluir</button>`;

  const descHtml = todo.description
    ? `<p class="text-slate-400 text-xs mt-2 leading-relaxed">${escapeHtml(todo.description)}</p>`
    : '';

  return `
    <div class="task-card ${doneClass}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="task-title text-slate-200 text-sm font-medium leading-snug">${escapeHtml(todo.title)}</span>
            <span class="badge ${badge.css}">${badge.label}</span>
          </div>
          ${descHtml}
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          ${doneLabel}
          <button id="btn-del-${todo.id}" class="btn-delete" title="Remover tarefa">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `.trim();
}

function buildEmptyState() {
  return `
    <div class="empty-state animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="12" y2="13"/>
      </svg>
      <p class="text-sm font-medium text-slate-600">Nenhuma tarefa cadastrada ainda.</p>
      <p class="text-xs text-slate-700 mt-1">Use o formulário acima para adicionar sua primeira tarefa.</p>
    </div>
  `.trim();
}

function updateCounters(total, done) {
  document.getElementById('count-total').textContent = total;
  document.getElementById('count-done').textContent  = done;
}

// ─────────────────────────────────────────────────────────────
// SEGURANÇA — Escape HTML (previne XSS ao inserir conteúdo do usuário)
// ─────────────────────────────────────────────────────────────

function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}

// ─────────────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────

function bindEvents() {
  // Formulários de autenticação
  document.getElementById('form-login').addEventListener('submit', handleLogin);
  document.getElementById('form-register').addEventListener('submit', handleRegister);

  // Navegação entre telas de auth
  document.getElementById('go-register').addEventListener('click', () => showScreen('screen-register'));
  document.getElementById('go-login').addEventListener('click', () => showScreen('screen-login'));

  // Dashboard
  document.getElementById('btn-logout').addEventListener('click', handleLogout);
  document.getElementById('form-todo').addEventListener('submit', handleAddTodo);
}

function init() {
  bindEvents();

  // Restaura sessão ativa ao recarregar a página
  const currentUser = session.getCurrent();
  if (currentUser) {
    openDashboard(currentUser);
  } else {
    showScreen('screen-login');
  }
}

// Ponto de entrada — aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', init);
