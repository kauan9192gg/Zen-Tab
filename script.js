/* ============================================================
   CONSTANTES
============================================================ */
const KEYS = {
  BG_TYPE: 'bg_type',
  BG_PRESET: 'bg_preset',
  BG_FIT: 'bg_fit',
  BG_ENABLED: 'bg_enabled',
  VIDEO_MUTE: 'video_mute',
  ACTIVE_WP: 'active_wp',
  SHORTCUTS: 'shortcuts_data',
  CLOCK: 'show_clock',
  GREETING: 'show_greeting',
  SEARCH: 'show_search',
  OVERLAY: 'show_overlay',
  BLUR: 'show_blur',
  LAYOUT: 'widgets_layout',
  SHORTCUTS_POS: 'shortcuts_position',
  HISTORY: 'search_history',
  V9_CLEANED: 'v9_cleaned'
};

const DEFAULT_SHORTCUTS = [];

const DEFAULT_LAYOUT = {
  clock:  { pos: 'custom', x: 0.5, y: 0.22 },
  search: { pos: 'custom', x: 0.5, y: 0.5 }
};

const DEFAULT_SHORTCUTS_POS = { x: 0.5, y: 0.62 };

const SEARCH_ENGINES = {
  google:     { name: 'Google',     url: 'https://www.google.com/search?q=' },
  bing:       { name: 'Bing',       url: 'https://www.bing.com/search?q=' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' }
};

const PRESET_GRADIENTS = [
  { id: 'blue',    name: 'Azul',       css: 'linear-gradient(135deg, #1a1aff, #2e2eb0)' },
  { id: 'purple',  name: 'Roxo',       css: 'linear-gradient(135deg, #7a1aff, #c42ecc)' },
  { id: 'sunset',  name: 'Pôr do sol', css: 'linear-gradient(135deg, #ff512f, #f09819)' },
  { id: 'pink',    name: 'Rosa',       css: 'linear-gradient(135deg, #ff6ec4, #7873f5)' },
  { id: 'mint',    name: 'Menta',      css: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { id: 'ocean',   name: 'Oceano',     css: 'linear-gradient(135deg, #2193b0, #6dd5ed)' },
  { id: 'blood',   name: 'Sangue',     css: 'linear-gradient(135deg, #8e0e00, #1f1c18)' },
  { id: 'space',   name: 'Espaço',     css: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { id: 'sun',     name: 'Sol',        css: 'linear-gradient(135deg, #f7971e, #ffd200)' },
  { id: 'lava',    name: 'Lava',       css: 'linear-gradient(135deg, #fc4a1a, #f7b733)' },
  { id: 'forest',  name: 'Floresta',   css: 'linear-gradient(135deg, #134e5e, #71b280)' },
  { id: 'candy',   name: 'Doce',       css: 'linear-gradient(135deg, #fc00ff, #00dbde)' },
  { id: 'deep',    name: 'Profundo',   css: 'linear-gradient(135deg, #000428, #004e92)' },
  { id: 'peach',   name: 'Pêssego',    css: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { id: 'royal',   name: 'Real',       css: 'linear-gradient(135deg, #141e30, #243b55)' },
  { id: 'neon',    name: 'Neon',       css: 'linear-gradient(135deg, #00f260, #0575e6)' }
];

const PRESET_COLORS = [
  { id: 'black',    name: 'Preto',     css: '#0a0a0f' },
  { id: 'darkgray', name: 'Grafite',   css: '#1f1f28' },
  { id: 'gray',     name: 'Cinza',     css: '#4a4a55' },
  { id: 'white',    name: 'Branco',    css: '#f5f5f7' },
  { id: 'cream',    name: 'Creme',     css: '#f5e6c8' },
  { id: 'red',      name: 'Vermelho',  css: '#e63946' },
  { id: 'orange',   name: 'Laranja',   css: '#f77f00' },
  { id: 'yellow',   name: 'Amarelo',   css: '#fcbf49' },
  { id: 'green',    name: 'Verde',     css: '#2a9d8f' },
  { id: 'teal',     name: 'Turquesa',  css: '#00afb9' },
  { id: 'blue',     name: 'Azul',      css: '#1d4ed8' },
  { id: 'navy',     name: 'Marinho',   css: '#0a1a3f' },
  { id: 'purple',   name: 'Roxo',      css: '#7209b7' },
  { id: 'pink',     name: 'Rosa',      css: '#e91e8c' },
  { id: 'brown',    name: 'Marrom',    css: '#5c4033' },
  { id: 'olive',    name: 'Oliva',     css: '#556b2f' }
];

const DEFAULT_GRADIENT_ID = 'sunset';
const DEFAULT_COLOR_ID = 'orange';

/* ============================================================
   CATÁLOGO DE WALLPAPERS (GitHub: dharmx/walls)
============================================================ */
const CATALOG = {
  OWNER: 'dharmx',
  REPO:  'walls',
  API:   'https://api.github.com',
  CACHE_TTL: 24 * 60 * 60 * 1000,
  PAGE_SIZE: 20,
  CACHE_KEY: 'catalog_cache_v1'
};

const THUMB_PROXY = {
  BASE: 'https://wsrv.nl/',
  WIDTH: 400,
  QUALITY: 70,
  build(rawUrl) {
    const clean = String(rawUrl).replace(/^https?:\/\//, '');
    return `${this.BASE}?url=${encodeURIComponent(clean)}&w=${this.WIDTH}&q=${this.QUALITY}&output=webp&we`;
  }
};

let catalogCache = {
  categories: null,
  items: {}
};

let catalogState = {
  currentCategory: null,
  allItems: [],
  visibleCount: CATALOG.PAGE_SIZE,
  previewItem: null,
  autoCollapseEnabled: false
};

let catalogObserver = null;

let layout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
let shortcutsPos = { ...DEFAULT_SHORTCUTS_POS };
let editorMode = false;
let editingShortcutIndex = null;
let bgEnabled = true;
let bgFit = 'cover';
let bgType = 'none';
let videoMuted = true;

let wpList = [];
let currentWpId = null;

let pendingBg = null;
let pendingFit = 'cover';
let activeBlobUrl = null;

let lastWpView = 'home';

/* ============================================================
   INDEXEDDB
============================================================ */
const DB_NAME = 'brave_new_tab_wallpapers';
const DB_VERSION = 2;
const STORE_FILES = 'files';
const STORE_META  = 'meta';
const STORE_THUMBS = 'thumbs';

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_FILES)) {
        db.createObjectStore(STORE_FILES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_THUMBS)) {
        db.createObjectStore(STORE_THUMBS, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function dbPut(storeName, value) {
  return openDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(value);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  }));
}

function dbGet(storeName, key) {
  return openDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  }));
}

function dbGetAll(storeName) {
  return openDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  }));
}

function dbDelete(storeName, key) {
  return openDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  }));
}

function blobToUrl(blob) {
  return URL.createObjectURL(blob);
}

/* ============================================================
   RELÓGIO + SAUDAÇÃO
============================================================ */
function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hh}:${mm}`;

  const h = now.getHours();
  let g = 'Boa noite';
  if (h >= 5 && h < 12) g = 'Bom dia';
  else if (h >= 12 && h < 18) g = 'Boa tarde';
  document.getElementById('greeting').textContent = g;
}
setInterval(updateClock, 1000);
updateClock();

/* ============================================================
   HISTÓRICO DE BUSCA
============================================================ */
function getHistory(cb) {
  chrome.storage.local.get([KEYS.HISTORY], (res) => cb(res[KEYS.HISTORY] || []));
}
function pushHistory(term) {
  if (!term || term.length < 2) return;
  getHistory((list) => {
    const next = [term, ...list.filter(t => t !== term)].slice(0, 8);
    chrome.storage.local.set({ [KEYS.HISTORY]: next });
  });
}

/* ============================================================
   BUSCA
============================================================ */
const searchInput = document.getElementById('search-input');
const widgetSearch = document.getElementById('widget-search');
const suggestionsList = document.getElementById('suggestions-list');
const suggestionTitle = document.getElementById('suggestion-title');

let activeSuggestionIndex = -1;

const ICONS = {
  clock: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 0-10z"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.03 8.03 0 0 1 5.08 16zm2.95-8H5.08a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>',
  suggest: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>'
};

async function fetchSuggestions(q) {
  if (!q) return [];

  try {
    const url = `https://api.datamuse.com/sug?s=${encodeURIComponent(q)}&max=8`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(d => d.word).filter(Boolean).slice(0, 8);
      }
    }
  } catch (e) {
    console.warn('[Brave New Tab] Datamuse falhou:', e);
  }

  try {
    const words = await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(q)}`;
      xhr.open('GET', url, true);
      xhr.timeout = 3000;
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data[1] || []);
          } catch (err) { resolve([]); }
        } else resolve([]);
      };
      xhr.onerror = () => resolve([]);
      xhr.ontimeout = () => resolve([]);
      xhr.send();
    });
    if (words && words.length > 0) return words.slice(0, 8);
  } catch (e) {
    console.warn('[Brave New Tab] Google suggest falhou:', e);
  }

  return [];
}

async function buildSuggestions(query) {
  const q = query.trim();
  const history = await new Promise((resolve) => getHistory(resolve));
  const items = [];

  if (!q) {
    suggestionTitle.textContent = history.length ? 'Recentes' : 'Sugestões';

    history.slice(0, 4).forEach(term => {
      items.push({ type: 'history', icon: 'clock', text: term, value: term });
    });

    const shortcuts = await new Promise((resolve) => {
      chrome.storage.local.get([KEYS.SHORTCUTS], (r) => resolve(r[KEYS.SHORTCUTS] || []));
    });
    shortcuts.slice(0, 4).forEach(sc => {
      items.push({ type: 'shortcut', icon: 'link', text: sc.name, value: sc.url });
    });

    renderSuggestions(items);
    return;
  }

  const filtered = history.filter(t => t.toLowerCase().includes(q.toLowerCase())).slice(0, 3);
  filtered.forEach(term => {
    items.push({ type: 'history', icon: 'clock', text: term, value: term });
  });

  const suggestions = await fetchSuggestions(q);
  suggestions.forEach(s => {
    if (filtered.some(f => f.text === s)) return;
    if (s.toLowerCase() === q.toLowerCase()) return;
    items.push({ type: 'suggest', icon: 'suggest', text: s, value: s });
  });

  if (/^(https?:\/\/)?([\w-]+\.)+[\w-]+/i.test(q) && !q.includes(' ')) {
    items.unshift({
      type: 'url',
      icon: 'globe',
      text: q,
      value: q.startsWith('http') ? q : `https://${q}`
    });
  }

  items.push({
    type: 'search',
    icon: 'search',
    text: q,
    value: q,
    engine: 'Google'
  });

  suggestionTitle.textContent = suggestions.length > 0 ? 'Sugestões' : 'Buscar';
  renderSuggestions(items);
}

function renderSuggestions(items) {
  suggestionsList.innerHTML = '';
  activeSuggestionIndex = -1;

  if (items.length === 0) {
    suggestionsList.innerHTML = '<div style="padding:16px;text-align:center;color:rgba(255,255,255,0.4);font-size:13px">Nenhuma sugestão</div>';
    return;
  }

  items.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.dataset.value = item.value;
    div.dataset.type = item.type;
    div.dataset.index = idx;

    let textHTML = '';
    if (item.type === 'search') {
      textHTML = `<strong>${escapeHtml(item.text)}</strong>`;
    } else if (item.type === 'history' || item.type === 'url') {
      textHTML = escapeHtml(item.text);
    } else {
      textHTML = `<strong>${escapeHtml(item.text)}</strong>`;
      if (item.hint) textHTML += `<span style="opacity:0.5;font-size:11.5px;margin-left:6px">${escapeHtml(item.hint)}</span>`;
    }

    div.innerHTML = `
      <div class="suggestion-icon">${ICONS[item.icon] || ''}</div>
      <div class="suggestion-text">${textHTML}</div>
      <div class="suggestion-type">${item.type === 'search' ? (item.engine || '') : item.type === 'shortcut' ? 'atalho' : item.type === 'url' ? 'abrir' : item.type === 'history' ? 'recente' : item.type === 'suggest' ? 'sugestão' : ''}</div>
    `;

    div.addEventListener('mousedown', (e) => {
      e.preventDefault();
      activateSuggestion(item);
    });

    suggestionsList.appendChild(div);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function activateSuggestion(item) {
  if (item.type === 'search' || item.type === 'suggest') {
    pushHistory(item.text);
    window.location.href = SEARCH_ENGINES.google.url + encodeURIComponent(item.text);
  } else if (item.type === 'url') {
    pushHistory(item.value);
    window.location.href = item.value;
  } else if (item.type === 'shortcut') {
    window.location.href = item.value;
  } else if (item.type === 'history') {
    pushHistory(item.text);
    window.location.href = SEARCH_ENGINES.google.url + encodeURIComponent(item.text);
  }
  closeSearchPanel();
}

function openSearchPanel() {
  if (editorMode) return;
  widgetSearch.classList.add('expanded');
  document.body.classList.add('search-open');
  buildSuggestions(searchInput.value);
}

function closeSearchPanel() {
  widgetSearch.classList.remove('expanded');
  document.body.classList.remove('search-open');
  activeSuggestionIndex = -1;
}

function highlightSuggestion(delta) {
  const items = suggestionsList.querySelectorAll('.suggestion-item');
  if (!items.length) return;
  activeSuggestionIndex = (activeSuggestionIndex + delta + items.length) % items.length;
  items.forEach((el, i) => el.classList.toggle('active', i === activeSuggestionIndex));
  items[activeSuggestionIndex].scrollIntoView({ block: 'nearest' });
}

searchInput.addEventListener('focus', openSearchPanel);
searchInput.addEventListener('input', () => {
  activeSuggestionIndex = -1;
  buildSuggestions(searchInput.value);
});
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (!widgetSearch.contains(document.activeElement)) closeSearchPanel();
  }, 150);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); highlightSuggestion(1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); highlightSuggestion(-1); }
  else if (e.key === 'Escape') { closeSearchPanel(); searchInput.blur(); }
  else if (e.key === 'Enter') {
    if (activeSuggestionIndex >= 0) {
      e.preventDefault();
      const items = suggestionsList.querySelectorAll('.suggestion-item');
      const el = items[activeSuggestionIndex];
      activateSuggestion({
        type: el.dataset.type,
        value: el.dataset.value,
        text: el.querySelector('.suggestion-text').textContent
      });
    }
  }
});

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (editorMode) return;
  const q = searchInput.value.trim();
  if (!q) return;
  if (activeSuggestionIndex >= 0) return;

  pushHistory(q);
  const isUrl = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(q) && !q.includes(' ');
  window.location.href = isUrl
    ? (q.startsWith('http') ? q : `https://${q}`)
    : SEARCH_ENGINES.google.url + encodeURIComponent(q);
});

document.addEventListener('mousedown', (e) => {
  if (!widgetSearch.contains(e.target)) closeSearchPanel();
});

/* ============================================================
   ATALHOS
============================================================ */
function getFavicon(url) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
  } catch { return ''; }
}

function renderShortcuts() {
  chrome.storage.local.get([KEYS.SHORTCUTS], (res) => {
    const list = res[KEYS.SHORTCUTS] || DEFAULT_SHORTCUTS;
    const container = document.getElementById('shortcuts');
    container.innerHTML = '';

    list.forEach((sc, i) => {
      const a = document.createElement('a');
      a.className = 'shortcut';
      a.href = sc.url;
      a.title = sc.name;
      a.style.animationDelay = `${i * 40}ms`;
      a.dataset.index = i;
      const initial = sc.name.charAt(0).toUpperCase();
      const favicon = getFavicon(sc.url);

      a.innerHTML = `
        <div class="favicon">
          <img src="${favicon}" alt="" draggable="false"
               onerror="this.style.display='none';this.parentElement.textContent='${initial}'">
        </div>
        <span class="label">${sc.name}</span>
      `;

      a.addEventListener('click', (e) => {
        if (editorMode) e.preventDefault();
      });

      a.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!editorMode) openShortcutModal(i);
      });

      a.addEventListener('dragstart', (e) => e.preventDefault());
      container.appendChild(a);
    });

    const addBtn = document.createElement('a');
    addBtn.className = 'shortcut add-btn';
    addBtn.href = '#';
    addBtn.title = 'Adicionar atalho';
    addBtn.style.animationDelay = `${list.length * 40}ms`;
    addBtn.innerHTML = `
      <div class="favicon">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </div>
      <span class="label">Adicionar</span>
    `;
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openShortcutModal(null);
    });
    container.appendChild(addBtn);

    scheduleCollisions();
  });
}

function renderShortcutsEditor() {
  chrome.storage.local.get([KEYS.SHORTCUTS], (res) => {
    const list = res[KEYS.SHORTCUTS] || DEFAULT_SHORTCUTS;
    const container = document.getElementById('shortcuts-editor');
    container.innerHTML = '';

    list.forEach((sc, i) => {
      const row = document.createElement('div');
      row.className = 'shortcut-row';
      const initial = sc.name.charAt(0).toUpperCase();
      const favicon = getFavicon(sc.url);

      row.innerHTML = `
        <div class="mini-favicon">
          <img src="${favicon}" alt="" onerror="this.style.display='none';this.parentElement.textContent='${initial}'">
        </div>
        <div class="info">
          <div class="sc-name">${sc.name}</div>
          <div class="sc-url">${sc.url}</div>
        </div>
        <button class="row-btn" title="Editar" data-action="edit">✎</button>
        <button class="row-btn danger" title="Remover" data-action="delete">×</button>
      `;
      row.querySelector('[data-action="edit"]').addEventListener('click', () => openShortcutModal(i));
      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        list.splice(i, 1);
        chrome.storage.local.set({ [KEYS.SHORTCUTS]: list }, () => {
          renderShortcuts();
          renderShortcutsEditor();
        });
      });
      container.appendChild(row);
    });
  });
}

/* ============================================================
   MODAL DE ATALHO
============================================================ */
const scModal = document.getElementById('shortcut-modal');
const scName = document.getElementById('sc-name');
const scUrl = document.getElementById('sc-url');
const scTitle = document.getElementById('shortcut-modal-title');
const scDelete = document.getElementById('sc-delete');

function openShortcutModal(index) {
  editingShortcutIndex = index;
  if (index === null) {
    scTitle.textContent = 'Adicionar atalho';
    scName.value = '';
    scUrl.value = '';
    scDelete.style.display = 'none';
  } else {
    scTitle.textContent = 'Editar atalho';
    chrome.storage.local.get([KEYS.SHORTCUTS], (res) => {
      const list = res[KEYS.SHORTCUTS] || DEFAULT_SHORTCUTS;
      if (!list[index]) return;
      scName.value = list[index].name;
      scUrl.value = list[index].url;
      scDelete.style.display = '';
    });
  }
  scModal.classList.add('open');
  setTimeout(() => scName.focus(), 100);
}

function closeShortcutModal() {
  scModal.classList.remove('open');
  editingShortcutIndex = null;
}

document.getElementById('sc-cancel').addEventListener('click', closeShortcutModal);
document.getElementById('sc-cancel-btn').addEventListener('click', closeShortcutModal);
scModal.addEventListener('click', (e) => { if (e.target === scModal) closeShortcutModal(); });

document.getElementById('sc-confirm').addEventListener('click', () => {
  const name = scName.value.trim();
  let url = scUrl.value.trim();
  if (!name || !url) return;
  if (!url.startsWith('http')) url = `https://${url}`;

  chrome.storage.local.get([KEYS.SHORTCUTS], (res) => {
    const list = res[KEYS.SHORTCUTS] || [...DEFAULT_SHORTCUTS];
    if (editingShortcutIndex === null) list.push({ name, url });
    else list[editingShortcutIndex] = { name, url };

    chrome.storage.local.set({ [KEYS.SHORTCUTS]: list }, () => {
      renderShortcuts();
      renderShortcutsEditor();
      closeShortcutModal();
    });
  });
});

scDelete.addEventListener('click', () => {
  if (editingShortcutIndex === null) return;
  chrome.storage.local.get([KEYS.SHORTCUTS], (res) => {
    const list = res[KEYS.SHORTCUTS] || [...DEFAULT_SHORTCUTS];
    list.splice(editingShortcutIndex, 1);
    chrome.storage.local.set({ [KEYS.SHORTCUTS]: list }, () => {
      renderShortcuts();
      renderShortcutsEditor();
      closeShortcutModal();
    });
  });
});

[scName, scUrl].forEach(el => {
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('sc-confirm').click();
  });
});

/* ============================================================
   BACKGROUND
============================================================ */
const bgLayer = document.getElementById('bg-layer');
const bgVideoSlot = document.getElementById('bg-video-slot');

function showWpView(name) {
  document.querySelectorAll('.wp-view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById('wp-view-' + name);
  if (el) el.classList.remove('hidden');
  if (name !== 'confirm' && name !== 'add' && name !== 'back'
      && name !== 'catalog-preview') lastWpView = name;
}

document.querySelectorAll('[data-view]').forEach(tile => {
  tile.addEventListener('click', () => {
    const view = tile.dataset.view;
    if (view === 'add') {
      showWpView('catalog');
      document.getElementById('catalog-items-empty').classList.remove('hidden');
      document.getElementById('catalog-items-content').classList.add('hidden');
      catalogState.currentCategory = null;
      catalogState.autoCollapseEnabled = false;
      document.querySelectorAll('.catalog-cat-item').forEach(b => b.classList.remove('active'));
      // Coluna volta a ficar expandida (estado inicial)
      const catsCol = document.getElementById('catalog-cats-col');
      if (catsCol) catsCol.classList.remove('collapsed');
      renderCatalogCategories(false);
      return;
    }
    if (view === 'mine')      { showWpView('mine'); setSelectMode(false); renderWpCategories(); }
    if (view === 'gradients') { pendingBg = null; showWpView('gradients'); }
    if (view === 'colors')    { pendingBg = null; showWpView('colors'); }
  });
});

document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    let target = btn.dataset.back;

    if (target === 'back') {
      target = (lastWpView === 'gradients' || lastWpView === 'colors') ? lastWpView : 'mine';
    }

    showWpView(target);

    if (target === 'home') {
      pendingBg = null;
      updateSwatchSelection();
      updateTilePreviews();
    }
    if (target === 'mine') {
      if (!pendingBg || pendingBg.kind !== 'wallpaper') {
        document.querySelectorAll('.wp-thumb').forEach(t => {
          t.classList.toggle('active', t.dataset.id === currentWpId);
        });
      }
    }
  });
});

function extFromMime(mime) {
  if (!mime) return 'other';
  if (mime.startsWith('video/mp4'))   return 'mp4';
  if (mime.startsWith('video/webm'))  return 'webm';
  if (mime.startsWith('video/'))      return 'video';
  if (mime === 'image/gif')           return 'gif';
  if (mime === 'image/png')           return 'png';
  if (mime === 'image/jpeg')          return 'jpg';
  if (mime === 'image/webp')          return 'webp';
  if (mime.startsWith('image/'))      return 'image';
  return 'other';
}
function extLabel(ext) {
  return {
    mp4: 'MP4', webm: 'WebM', video: 'Vídeos',
    gif: 'GIFs', png: 'PNGs', jpg: 'JPGs', webp: 'WebPs', image: 'Imagens'
  }[ext] || 'Outros';
}
function extOrder() {
  return ['mp4', 'webm', 'video', 'gif', 'png', 'jpg', 'webp', 'image', 'other'];
}
function isVideoMime(mime) { return mime && mime.startsWith('video/'); }

async function loadWpList(cb) {
  try {
    wpList = (await dbGetAll(STORE_META)) || [];
  } catch (e) {
    console.warn('[Brave New Tab] Erro ao ler lista do IndexedDB:', e);
    wpList = [];
  }
  if (cb) cb();
}

function updateWpCounts() {
  const total = wpList.length;
  const el = document.getElementById('wp-count-mine');
  if (el) el.textContent = total ? `${total} salvo${total > 1 ? 's' : ''}` : '0';
}

function handleFiles(files) {
  if (!files || !files.length) return;
  Array.from(files).forEach(async (file) => {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert(`Formato não suportado: ${file.name}`);
      return;
    }

    if (file.size > 200 * 1024 * 1024) {
      const ok = confirm(
        `"${file.name}" tem ${(file.size/1024/1024).toFixed(1)} MB.\n\n` +
        `Arquivos muito grandes podem deixar a Nova Guia lenta. Deseja continuar?`
      );
      if (!ok) return;
    }

    const id = 'wp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const item = {
      id,
      name: file.name,
      type: file.type,
      ext: extFromMime(file.type),
      size: file.size,
      addedAt: Date.now()
    };

    try {
      await dbPut(STORE_FILES, { id, blob: file });
      await dbPut(STORE_META, item);
      wpList.push(item);
      updateWpCounts();
      renderWpCategories();
    } catch (e) {
      console.error('[Brave New Tab] Erro ao salvar wallpaper:', e);
      alert(`Não foi possível salvar "${file.name}": ${e.message || e}`);
    }
  });
}

const bgUpload = document.getElementById('bg-upload');
document.getElementById('wp-add-btn').addEventListener('click', () => bgUpload.click());
bgUpload.addEventListener('change', (e) => {
  handleFiles(e.target.files);
  bgUpload.value = '';
});

// ===== SELEÇÃO MÚLTIPLA (Meus wallpapers) =====
let selectMode = false;
const selectedIds = new Set();

function updateSelectUI() {
  const total = wpList.length;
  const n = selectedIds.size;

  document.getElementById('wp-select-count').textContent =
    n === 1 ? '1 selecionada' : `${n} selecionadas`;

  const all = document.getElementById('wp-select-all');
  all.checked = total > 0 && n === total;
  all.indeterminate = n > 0 && n < total;

  const delBtn = document.getElementById('wp-delete-selected');
  delBtn.disabled = n === 0;
  delBtn.textContent = n > 0 ? `Apagar (${n})` : 'Apagar';

  // Itens do catálogo aparecem em 2 lugares: sincroniza todos pelo id
  document.querySelectorAll('#wp-categories .wp-thumb').forEach(t => {
    t.classList.toggle('selected', selectedIds.has(t.dataset.id));
  });
}

function setSelectMode(on) {
  selectMode = on;
  selectedIds.clear();
  document.getElementById('wp-categories').classList.toggle('select-mode', on);
  document.getElementById('wp-select-bar').hidden = !on;
  document.getElementById('wp-select-toggle').style.display = on ? 'none' : '';
  updateSelectUI();
}

function toggleSelect(id) {
  if (selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
  updateSelectUI();
}

document.getElementById('wp-select-toggle').addEventListener('click', () => {
  if (!wpList.length) return;
  setSelectMode(true);
});
document.getElementById('wp-select-cancel').addEventListener('click', () => setSelectMode(false));
document.getElementById('wp-select-all').addEventListener('change', (e) => {
  selectedIds.clear();
  if (e.target.checked) wpList.forEach(w => selectedIds.add(w.id));
  updateSelectUI();
});
document.getElementById('wp-delete-selected').addEventListener('click', deleteSelectedWallpapers);

async function deleteSelectedWallpapers() {
  const ids = [...selectedIds];
  if (!ids.length) return;

  const msg = ids.length === 1
    ? 'Apagar o wallpaper selecionado?'
    : `Apagar ${ids.length} wallpapers selecionados? Essa ação não pode ser desfeita.`;
  if (!confirm(msg)) return;

  for (const id of ids) {
    try {
      await dbDelete(STORE_FILES, id);
      await dbDelete(STORE_META, id);
      dropThumb(id);
    } catch (e) {
      console.warn('[Brave New Tab] Erro ao remover do IndexedDB:', e);
    }
  }

  const removed = new Set(ids);
  wpList = wpList.filter(w => !removed.has(w.id));
  updateWpCounts();

  if (currentWpId && removed.has(currentWpId)) {
    currentWpId = null;
    await chrome.storage.local.remove([KEYS.BG_TYPE, KEYS.BG_FIT, KEYS.ACTIVE_WP]);
    clearBg();
    applyPrefs();
    updateTilePreviews();
  }

  setSelectMode(false);
  renderWpCategories();
}

/* ============================================================
   MINIATURAS LEVES (cache no IndexedDB + carregamento sob demanda)
============================================================ */
const thumbUrlCache = new Map();   // id -> blob URL da miniatura
const thumbPending  = new Map();   // id -> Promise em andamento
const thumbFailed   = new Set();   // ids sem capa possível (não tenta de novo)
let thumbObserver = null;

function dropThumb(id) {
  const url = thumbUrlCache.get(id);
  if (url) { URL.revokeObjectURL(url); thumbUrlCache.delete(id); }
  thumbPending.delete(id);
  dbDelete(STORE_THUMBS, id).catch(() => {});
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    try { canvas.toBlob((b) => resolve(b), 'image/webp', 0.8); }
    catch (e) { resolve(null); }
  });
}

function loadImageEl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const THUMB_MAX = 360;

async function imageThumbBlob(blob) {
  let src, w, h, tmpUrl = null;
  try {
    src = await createImageBitmap(blob);
    w = src.width; h = src.height;
  } catch (e) {
    tmpUrl = URL.createObjectURL(blob);
    src = await loadImageEl(tmpUrl);
    w = src.naturalWidth; h = src.naturalHeight;
  }
  if (!w || !h) { if (tmpUrl) URL.revokeObjectURL(tmpUrl); return null; }
  const k = Math.min(1, THUMB_MAX / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * k));
  canvas.height = Math.max(1, Math.round(h * k));
  canvas.getContext('2d').drawImage(src, 0, 0, canvas.width, canvas.height);
  if (src.close) src.close();
  if (tmpUrl) URL.revokeObjectURL(tmpUrl);
  return canvasToBlob(canvas);
}

function videoThumbBlob(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    let done = false;
    const finish = (b) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { v.removeAttribute('src'); v.load(); } catch (e) {}
      URL.revokeObjectURL(url);
      resolve(b);
    };
    const timer = setTimeout(() => finish(null), 10000);
    v.onerror = () => finish(null);
    v.onloadedmetadata = () => {
      try { v.currentTime = Math.min(1, (v.duration || 2) / 4); } catch (e) { finish(null); }
    };
    v.onseeked = async () => {
      try {
        const w = v.videoWidth, h = v.videoHeight;
        if (!w || !h) return finish(null);
        const k = Math.min(1, THUMB_MAX / Math.max(w, h));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(w * k));
        canvas.height = Math.max(1, Math.round(h * k));
        canvas.getContext('2d').drawImage(v, 0, 0, canvas.width, canvas.height);
        finish(await canvasToBlob(canvas));
      } catch (e) { finish(null); }
    };
    v.src = url;
  });
}

// Fila: no máximo 2 miniaturas sendo geradas por vez (evita travar a galeria)
let thumbGenActive = 0;
const thumbGenQueue = [];
function enqueueThumbGen(item) {
  return new Promise((resolve) => {
    thumbGenQueue.push({ item, resolve });
    pumpThumbGen();
  });
}
function pumpThumbGen() {
  while (thumbGenActive < 2 && thumbGenQueue.length) {
    const job = thumbGenQueue.shift();
    thumbGenActive++;
    (async () => {
      try {
        const rec = await dbGet(STORE_FILES, job.item.id);
        if (!rec || !rec.blob) return null;
        return isVideoMime(job.item.type)
          ? await videoThumbBlob(rec.blob)
          : await imageThumbBlob(rec.blob);
      } catch (e) { return null; }
    })().then((b) => {
      thumbGenActive--;
      job.resolve(b);
      pumpThumbGen();
    });
  }
}

function getThumbUrl(item) {
  if (thumbUrlCache.has(item.id)) return Promise.resolve(thumbUrlCache.get(item.id));
  if (thumbFailed.has(item.id)) return Promise.resolve(null);
  if (thumbPending.has(item.id)) return thumbPending.get(item.id);

  const p = (async () => {
    let rec = null;
    try { rec = await dbGet(STORE_THUMBS, item.id); } catch (e) {}
    let blob = rec && rec.blob;
    if (!blob) {
      blob = await enqueueThumbGen(item);
      if (blob) { try { await dbPut(STORE_THUMBS, { id: item.id, blob }); } catch (e) {} }
    }
    if (!blob) { thumbFailed.add(item.id); return null; }
    if (!thumbPending.has(item.id)) return null; // foi apagado no meio do caminho
    const url = URL.createObjectURL(blob);
    thumbUrlCache.set(item.id, url);
    return url;
  })().finally(() => thumbPending.delete(item.id));

  thumbPending.set(item.id, p);
  return p;
}

async function loadThumb(thumb) {
  const item = wpList.find(w => w.id === thumb.dataset.id);
  if (!item) return;
  const url = await getThumbUrl(item);
  if (!url || !thumb.isConnected) return;
  thumb.style.backgroundImage = `url('${url}')`;
  thumb.classList.add('has-cover');
}

function observeThumb(thumb) {
  if (!('IntersectionObserver' in window)) { loadThumb(thumb); return; }
  if (!thumbObserver) {
    thumbObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        thumbObserver.unobserve(en.target);
        loadThumb(en.target);
      });
    }, { root: document.querySelector('.settings-body'), rootMargin: '300px 0px' });
  }
  thumbObserver.observe(thumb);
}

function buildWpThumb(item, catalogGroup) {
  const thumb = document.createElement('div');
  thumb.className = 'wp-thumb';
  thumb.dataset.id = item.id;
  thumb.dataset.ext = item.ext;
  if (item.id === currentWpId) thumb.classList.add('active');

  const isVideo = isVideoMime(item.type);
  const badge = catalogGroup
    ? `<div class="wp-thumb-badges"><span class="wp-thumb-badge catalog">CATÁLOGO</span><span class="wp-thumb-badge">${item.ext.toUpperCase()}</span></div>`
    : `<span class="wp-thumb-badge">${item.ext.toUpperCase()}</span>`;

  thumb.innerHTML = (isVideo
    ? `<div class="wp-video-placeholder"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg></div>`
    : '') + badge;

  const del = document.createElement('button');
  del.className = 'wp-thumb-delete';
  del.title = 'Remover';
  del.textContent = '×';
  del.addEventListener('click', (e) => {
    e.stopPropagation();
    removeWallpaper(item.id);
  });
  thumb.appendChild(del);

  const check = document.createElement('span');
  check.className = 'wp-thumb-check';
  check.textContent = '✓';
  thumb.appendChild(check);
  if (selectedIds.has(item.id)) thumb.classList.add('selected');

  thumb.addEventListener('click', () => (selectMode ? toggleSelect(item.id) : openWpConfirm(item.id)));

  // Botão direito: entra no modo seleção e marca/desmarca
  thumb.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!selectMode) setSelectMode(true);
    toggleSelect(item.id);
  });

  return thumb;
}

// Filtro por extensão da categoria Catálogo (vazio = mostra tudo)
const catalogExtFilter = new Set();

function applyCatalogFilter(cat, items) {
  const active = catalogExtFilter;
  let visible = 0;
  cat.querySelectorAll('.wp-thumb').forEach((t) => {
    const show = !active.size || active.has(t.dataset.ext);
    t.classList.toggle('filtered-out', !show);
    if (show) visible++;
  });
  cat.querySelectorAll('.wp-chip').forEach((c) => {
    c.classList.toggle('active', active.has(c.dataset.ext));
  });
  const countEl = cat.querySelector('.wp-category-title .count');
  if (countEl) countEl.textContent = active.size ? `${visible}/${items.length}` : String(items.length);
}

function buildWpCategory(labelHtml, items, railLabel, catalogGroup) {
  const cat = document.createElement('div');
  cat.className = 'wp-category';
  cat.dataset.rail = railLabel;
  cat.dataset.count = items.length;

  const title = document.createElement('div');
  title.className = 'wp-category-title';
  title.innerHTML = `<span>${labelHtml}</span><span class="count">${items.length}</span>`;

  // Chips de filtro por extensão (só no Catálogo, se houver mais de uma extensão)
  if (catalogGroup) {
    const counts = {};
    items.forEach(it => { counts[it.ext] = (counts[it.ext] || 0) + 1; });
    const exts = extOrder().filter(e => counts[e]);
    [...catalogExtFilter].forEach(e => { if (!counts[e]) catalogExtFilter.delete(e); });

    if (exts.length > 1) {
      const chips = document.createElement('div');
      chips.className = 'wp-chips';
      exts.forEach((ext) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'wp-chip';
        chip.dataset.ext = ext;
        chip.title = `Filtrar por ${ext.toUpperCase()}`;
        chip.textContent = ext.toUpperCase();
        chip.addEventListener('click', () => {
          if (catalogExtFilter.has(ext)) catalogExtFilter.delete(ext);
          else catalogExtFilter.add(ext);
          applyCatalogFilter(cat, items);
        });
        chips.appendChild(chip);
      });
      title.insertBefore(chips, title.lastElementChild);
    }
  }
  cat.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'wp-thumb-grid';
  items.forEach((item) => {
    const thumb = buildWpThumb(item, catalogGroup);
    grid.appendChild(thumb);
    observeThumb(thumb);
  });
  cat.appendChild(grid);

  if (catalogGroup) applyCatalogFilter(cat, items);
  return cat;
}

async function renderWpCategories() {
  const container = document.getElementById('wp-categories');
  if (thumbObserver) thumbObserver.disconnect();
  container.innerHTML = '';

  if (!wpList.length) {
    if (selectMode) setSelectMode(false);
    container.innerHTML = `<div class="wp-empty">Nenhum wallpaper salvo ainda. Clique em <strong>+ Adicionar</strong> para começar.</div>`;
    return;
  }

  const groups = {};
  wpList.filter(w => w.source !== 'catalog').forEach(w => {
    if (!groups[w.ext]) groups[w.ext] = [];
    groups[w.ext].push(w);
  });

  const frag = document.createDocumentFragment();

  extOrder().forEach(ext => {
    const arr = groups[ext];
    if (!arr || !arr.length) return;
    frag.appendChild(buildWpCategory(extLabel(ext), arr, ext.toUpperCase(), false));
  });

  const catalogItems = wpList.filter(w => w.source === 'catalog');
  if (catalogItems.length) {
    frag.appendChild(buildWpCategory('🌐 Baixados do Catálogo', catalogItems, 'CATÁLOGO', true));
  }

  container.appendChild(frag);
}

/* ============================================================
   ÍNDICE NA BARRA DE ROLAGEM (etiquetas por extensão)
============================================================ */
(function initScrollRail() {
  const body = document.querySelector('.settings-body');
  const rail = document.createElement('div');
  rail.id = 'wp-scroll-rail';
  document.body.appendChild(rail);

  let hideTimer = null;
  const PILL_H = 26;

  function railAvailable() {
    const cats = document.getElementById('wp-categories');
    return !!cats && cats.offsetParent !== null && cats.querySelector('.wp-category');
  }

  function buildRail() {
    const cats = [...document.querySelectorAll('#wp-categories .wp-category')];
    const bRect = body.getBoundingClientRect();
    const sbw = Math.max(body.offsetWidth - body.clientWidth, 8);
    const trackH = body.clientHeight;
    const total = body.scrollHeight || 1;
    const scrollTop = body.scrollTop;

    const entries = cats.map((el) => {
      const top = el.getBoundingClientRect().top - bRect.top + scrollTop;
      return { el, top, y: (top / total) * trackH };
    });

    // Seção atual = última cujo topo já passou da borda superior
    let currentIdx = 0;
    entries.forEach((en, i) => { if (en.top - 40 <= scrollTop) currentIdx = i; });

    // Evita sobreposição entre etiquetas
    const maxY = Math.max(0, trackH - PILL_H);
    entries.forEach((en, i) => {
      en.y = Math.min(Math.max(en.y, 0), maxY);
      if (i > 0 && en.y < entries[i - 1].y + PILL_H + 2) en.y = entries[i - 1].y + PILL_H + 2;
    });
    for (let i = entries.length - 1; i >= 0; i--) {
      const limit = i === entries.length - 1 ? maxY : entries[i + 1].y - PILL_H - 2;
      if (entries[i].y > limit) entries[i].y = Math.max(0, limit);
    }

    rail.innerHTML = '';
    rail.style.top = bRect.top + 'px';
    rail.style.height = trackH + 'px';
    rail.style.right = (window.innerWidth - bRect.right + sbw + 6) + 'px';

    entries.forEach((en, i) => {
      const pill = document.createElement('button');
      pill.className = 'wp-rail-pill' + (i === currentIdx ? ' current' : '');
      pill.style.top = en.y + 'px';
      pill.innerHTML = `${en.el.dataset.rail}<span>${en.el.dataset.count}</span>`;
      pill.addEventListener('click', (ev) => {
        ev.preventDefault();
        const r = body.getBoundingClientRect();
        const target = en.el.getBoundingClientRect().top - r.top + body.scrollTop - 8;
        body.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
        en.el.classList.remove('flash');
        void en.el.offsetWidth;
        en.el.classList.add('flash');
        rail.querySelectorAll('.wp-rail-pill').forEach(p => p.classList.remove('current'));
        pill.classList.add('current');
      });
      rail.appendChild(pill);
    });
  }

  function showRail() {
    clearTimeout(hideTimer);
    if (!rail.classList.contains('visible')) buildRail();
    rail.classList.add('visible');
  }
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => rail.classList.remove('visible'), 90);
  }

  body.addEventListener('mousemove', (e) => {
    if (!railAvailable()) return;
    const r = body.getBoundingClientRect();
    const sbw = Math.max(body.offsetWidth - body.clientWidth, 8);
    const overBar = e.clientX >= r.right - sbw - 4 && e.clientX <= r.right;
    if (overBar) showRail(); else if (rail.classList.contains('visible')) scheduleHide();
  });
  body.addEventListener('mouseleave', () => { if (rail.classList.contains('visible')) scheduleHide(); });
  rail.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  rail.addEventListener('mouseleave', scheduleHide);
})();

async function removeWallpaper(id) {
  if (!confirm('Remover este wallpaper da galeria?')) return;

  try {
    await dbDelete(STORE_FILES, id);
    await dbDelete(STORE_META, id);
    dropThumb(id);
  } catch (e) {
    console.warn('[Brave New Tab] Erro ao remover do IndexedDB:', e);
  }

  wpList = wpList.filter(w => w.id !== id);
  updateWpCounts();

  if (currentWpId === id) {
    currentWpId = null;
    await chrome.storage.local.remove([KEYS.BG_TYPE, KEYS.BG_FIT, KEYS.ACTIVE_WP]);
    clearBg();
    applyPrefs();
    updateTilePreviews();
  }

  renderWpCategories();
}

async function openWpConfirm(id) {
  const item = wpList.find(w => w.id === id);
  if (!item) return;

  pendingBg = { kind: 'wallpaper', id };
  const preview = document.getElementById('wp-confirm-preview');
  const isVideo = isVideoMime(item.type);

  try {
    const rec = await dbGet(STORE_FILES, id);
    if (!rec || !rec.blob) return;
    const url = blobToUrl(rec.blob);

    if (preview._blobUrl) URL.revokeObjectURL(preview._blobUrl);
    preview._blobUrl = url;

    if (isVideo) {
      preview.style.backgroundImage = '';
      preview.style.background = 'linear-gradient(135deg, #1e1e28, #14141c)';
      preview.innerHTML = `
        <div class="badge-type">${item.ext.toUpperCase()}</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;color:rgba(255,255,255,0.85);position:relative;z-index:2;text-align:center;padding:0 20px">
          <svg viewBox="0 0 24 24" width="52" height="52"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
          <div style="font-size:13.5px;font-weight:500">${item.name}</div>
          <div style="font-size:11.5px;opacity:0.6">Clique em <strong>Aplicar</strong> para usar como fundo</div>
        </div>`;
    } else {
      preview.innerHTML = `<div class="badge-type">${item.ext.toUpperCase()}</div>`;
      preview.style.background = '';
      preview.style.backgroundImage = `url('${url}')`;
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundRepeat = 'no-repeat';
      preview.style.backgroundPosition = 'center';
    }
  } catch (e) {
    console.warn('[Brave New Tab] Erro ao carregar preview:', e);
    return;
  }

  document.getElementById('row-video-mute').style.display = isVideo ? '' : 'none';
  document.querySelectorAll('.wp-thumb').forEach(t => t.classList.toggle('active', t.dataset.id === id));

  applyPreviewExtras();
  showWpView('confirm');
}

function selectGradient(id) {
  const g = PRESET_GRADIENTS.find(x => x.id === id);
  if (!g) return;
  pendingBg = { kind: 'gradient', id, css: g.css };
  updateSwatchSelection();
  document.getElementById('row-video-mute').style.display = 'none';
  renderConfirmPreview(g.css, `Gradiente · ${g.name}`);
  showWpView('confirm');
}

function selectColor(id) {
  const c = PRESET_COLORS.find(x => x.id === id);
  if (!c) return;
  pendingBg = { kind: 'color', id, css: c.css };
  updateSwatchSelection();
  document.getElementById('row-video-mute').style.display = 'none';
  renderConfirmPreview(c.css, `Cor sólida · ${c.name}`);
  showWpView('confirm');
}

function updateSwatchSelection() {
  document.querySelectorAll('.wp-swatch').forEach(s => {
    const isMatch = pendingBg && s.dataset.id === pendingBg.id && s.dataset.type === pendingBg.kind;
    s.classList.toggle('active', !!isMatch);
  });
}

function renderConfirmPreview(css, label) {
  const preview = document.getElementById('wp-confirm-preview');
  preview.style.backgroundImage = '';
  preview.style.background = css;
  preview.style.backgroundSize = 'cover';
  preview.style.backgroundRepeat = 'no-repeat';
  preview.style.backgroundPosition = 'center';
  preview.innerHTML = `<div class="badge-type">${label}</div>`;
  applyPreviewExtras();
}

function applyPreviewExtras() {
  const preview = document.getElementById('wp-confirm-preview');
  const overlayOn = document.getElementById('toggle-overlay')?.checked !== false;
  const blurOn    = document.getElementById('toggle-blur')?.checked === true;

  let overlay = preview.querySelector('.preview-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'preview-overlay';
    preview.appendChild(overlay);
  }
  overlay.style.background = overlayOn ? 'rgba(0,0,0,0.32)' : 'transparent';

  preview.style.filter = blurOn ? 'blur(3px) brightness(0.95)' : '';

  let size = 'cover', repeat = 'no-repeat';
  switch (pendingFit) {
    case 'cover':    size = 'cover';      repeat = 'no-repeat'; break;
    case 'contain':  size = 'contain';    repeat = 'no-repeat'; break;
    case 'stretch':  size = '100% 100%';  repeat = 'no-repeat'; break;
    case 'center':   size = 'auto';       repeat = 'no-repeat'; break;
    case 'repeat':   size = 'auto';       repeat = 'repeat';    break;
    case 'repeat-x': size = 'auto';       repeat = 'repeat-x';  break;
  }
  if (preview.style.backgroundImage.startsWith('url') || preview.style.background.startsWith('url')) {
    preview.style.backgroundSize = size;
    preview.style.backgroundRepeat = repeat;
    preview.style.backgroundPosition = 'center';
  }
}

document.getElementById('wp-apply-btn').addEventListener('click', async () => {
  if (!pendingBg) {
    showWpView('home');
    return;
  }

  if (pendingBg.kind === 'gradient' || pendingBg.kind === 'color') {
    const preset = { type: pendingBg.kind, id: pendingBg.id };
    await chrome.storage.local.remove([KEYS.BG_TYPE, KEYS.ACTIVE_WP]);
    stopVideo();
    bgType = pendingBg.kind;
    currentWpId = null;

    bgLayer.style.background = '';
    bgLayer.style.backgroundImage = '';
    bgLayer.style.backgroundColor = '';

    if (pendingBg.kind === 'color') {
      bgLayer.style.backgroundColor = pendingBg.css;
    } else {
      bgLayer.style.backgroundImage = pendingBg.css;
      bgLayer.style.backgroundSize = 'cover';
      bgLayer.style.backgroundRepeat = 'no-repeat';
      bgLayer.style.backgroundPosition = 'center';
    }

    await chrome.storage.local.set({ [KEYS.BG_PRESET]: preset });
    updateSwatchSelection();
    updateTilePreviews();
    showWpView('home');
    return;
  }

  if (pendingBg.kind === 'wallpaper') {
    const id = pendingBg.id;
    await applySelectedWallpaper(id);
    showWpView('home');
    setTimeout(() => updateTilePreviews(), 50);
    setTimeout(() => updateTilePreviews(), 200);
  }
});

document.getElementById('bg-clear').addEventListener('click', async () => {
  await chrome.storage.local.remove([KEYS.BG_TYPE, KEYS.BG_FIT, KEYS.ACTIVE_WP, KEYS.BG_PRESET]);
  currentWpId = null;
  pendingBg = null;
  clearBg();
  document.querySelectorAll('.wp-thumb, .wp-swatch').forEach(t => t.classList.remove('active'));
  updateTilePreviews();
  showWpView('home');
});

function applyFitToLayer() {
  let size = 'cover', repeat = 'no-repeat';
  switch (bgFit) {
    case 'cover':    size = 'cover';      repeat = 'no-repeat'; break;
    case 'contain':  size = 'contain';    repeat = 'no-repeat'; break;
    case 'stretch':  size = '100% 100%';  repeat = 'no-repeat'; break;
    case 'center':   size = 'auto';       repeat = 'no-repeat'; break;
    case 'repeat':   size = 'auto';       repeat = 'repeat';    break;
    case 'repeat-x': size = 'auto';       repeat = 'repeat-x';  break;
  }
  bgLayer.style.backgroundSize = size;
  bgLayer.style.backgroundRepeat = repeat;
  bgLayer.style.backgroundPosition = 'center';

  document.querySelectorAll('#bg-video-slot video').forEach(v => {
    const objFit = bgFit === 'contain' ? 'contain'
                 : bgFit === 'stretch' ? 'fill'
                 : bgFit === 'center'  ? 'none'
                 : 'cover';
    v.style.objectFit = objFit;
    v.style.objectPosition = 'center';
  });

  document.querySelectorAll('.wp-adjust-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.fit === bgFit);
  });
}

function stopVideo() {
  bgVideoSlot.innerHTML = '';
}

function applyImageBg(url) {
  bgType = 'image';
  stopVideo();

  bgLayer.style.background = '';
  bgLayer.style.backgroundColor = '';
  bgLayer.style.backgroundImage = `url('${url}')`;
  bgLayer.style.backgroundSize = 'cover';
  bgLayer.style.backgroundRepeat = 'no-repeat';
  bgLayer.style.backgroundPosition = 'center';

  applyFitToLayer();
}

function applyVideoBg(url) {
  bgType = 'video';

  bgLayer.style.backgroundImage = '';
  bgLayer.style.backgroundColor = '';

  bgVideoSlot.innerHTML = '';

  const vid = document.createElement('video');
  vid.autoplay = true;
  vid.loop = true;
  vid.muted = videoMuted;
  vid.playsInline = true;
  vid.setAttribute('playsinline', '');
  vid.setAttribute('muted', '');
  vid.setAttribute('autoplay', '');

  chrome.storage.local.get([KEYS.BLUR], (r) => {
    if (r[KEYS.BLUR] === true) {
      vid.style.filter = 'blur(6px) brightness(0.95)';
    }
  });

  const tryPlay = () => {
    const p = vid.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        vid.muted = true;
        vid.play().catch(() => {
          const resume = () => { vid.play().catch(()=>{}); document.removeEventListener('click', resume); };
          document.addEventListener('click', resume, { once: true });
        });
      });
    }
  };

  bgVideoSlot.appendChild(vid);
  vid.src = url;
  tryPlay();
  applyFitToLayer();
}

function clearBg() {
  stopVideo();
  bgLayer.style.backgroundImage = '';
  bgLayer.style.backgroundColor = '';
  bgType = 'none';
}

async function applySelectedWallpaper(id) {
  const item = wpList.find(w => w.id === id);
  if (!item) return;

  try {
    const rec = await dbGet(STORE_FILES, id);
    if (!rec || !rec.blob) return;

    const url = blobToUrl(rec.blob);
    const isVideo = isVideoMime(item.type);

    currentWpId = id;

    if (isVideo) applyVideoBg(url);
    else         applyImageBg(url);

    await chrome.storage.local.set({
      [KEYS.BG_TYPE]: isVideo ? 'video' : 'image',
      [KEYS.BG_FIT]: bgFit,
      [KEYS.ACTIVE_WP]: id
    });
    await chrome.storage.local.remove(KEYS.BG_PRESET);

    if (activeBlobUrl && activeBlobUrl !== url) {
      const old = activeBlobUrl;
      setTimeout(() => {
        try { URL.revokeObjectURL(old); } catch (e) {}
      }, 5000);
    }
    activeBlobUrl = url;

    document.querySelectorAll('.wp-thumb').forEach(t => t.classList.toggle('active', t.dataset.id === id));
    updateTilePreviews();
  } catch (e) {
    console.warn('[Brave New Tab] Erro ao aplicar wallpaper:', e);
  }
}

document.querySelectorAll('.wp-adjust-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    bgFit = btn.dataset.fit;
    pendingFit = bgFit;
    applyFitToLayer();
    applyPreviewExtras();
    chrome.storage.local.set({ [KEYS.BG_FIT]: bgFit });
  });
});

function renderPalette(containerId, list, type) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'wp-swatch';
    div.dataset.id = item.id;
    div.dataset.type = type;
    div.style.background = item.css;

    const label = document.createElement('span');
    label.className = 'wp-swatch-label';
    label.textContent = item.name;
    div.appendChild(label);

    div.addEventListener('click', () => {
      if (type === 'gradient') selectGradient(item.id);
      else                     selectColor(item.id);
    });
    container.appendChild(div);
  });
}

renderPalette('gradient-swatches', PRESET_GRADIENTS, 'gradient');
renderPalette('color-swatches', PRESET_COLORS, 'color');

function fallbackMineInner(isVideo = false) {
  const icon = isVideo
    ? `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>`
    : `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`;
  return `<div class="wp-tile-icon">${icon}</div>`;
}

async function updateTilePreviews() {
  chrome.storage.local.get([KEYS.BG_PRESET], (res) => {
    const preset = res[KEYS.BG_PRESET];

    const gradEl = document.getElementById('tile-preview-gradients');
    let gradCss = null;
    if (preset && preset.type === 'gradient') {
      const g = PRESET_GRADIENTS.find(x => x.id === preset.id);
      if (g) gradCss = g.css;
    }
    if (!gradCss) {
      const d = PRESET_GRADIENTS.find(x => x.id === DEFAULT_GRADIENT_ID);
      gradCss = d ? d.css : null;
    }
    if (gradEl) gradEl.style.background = gradCss || 'none';

    const colorEl = document.getElementById('tile-preview-colors');
    let colorCss = null;
    if (preset && preset.type === 'color') {
      const c = PRESET_COLORS.find(x => x.id === preset.id);
      if (c) colorCss = c.css;
    }
    if (!colorCss) {
      const d = PRESET_COLORS.find(x => x.id === DEFAULT_COLOR_ID);
      colorCss = d ? d.css : '#0a0a0f';
    }
    if (colorEl) colorEl.style.background = colorCss;
  });

  const mineEl = document.getElementById('tile-preview-mine');
  if (!mineEl) return;

  if (currentWpId) {
    const item = wpList.find(w => w.id === currentWpId);
    if (item && !isVideoMime(item.type)) {
      try {
        const rec = await dbGet(STORE_FILES, currentWpId);
        if (rec && rec.blob) {
          const url = blobToUrl(rec.blob);
          mineEl.style.backgroundImage = '';
          mineEl.innerHTML = `
            <img class="wp-tile-bg-img" src="${url}" alt="">
            ${fallbackMineInner()}
          `;
          return;
        }
      } catch (e) {}
    } else if (item && isVideoMime(item.type)) {
      mineEl.style.backgroundImage = 'linear-gradient(135deg, #1e1e28, #14141c)';
      mineEl.innerHTML = fallbackMineInner(true);
      return;
    }
  }
  mineEl.style.backgroundImage = '';
  mineEl.innerHTML = fallbackMineInner();
}

async function loadBackground() {
  const res = await chrome.storage.local.get([
    KEYS.BG_FIT, KEYS.VIDEO_MUTE, KEYS.ACTIVE_WP, KEYS.BG_PRESET
  ]);

  if (res[KEYS.BG_FIT])   bgFit = res[KEYS.BG_FIT];
  if (res[KEYS.VIDEO_MUTE] !== undefined) videoMuted = res[KEYS.VIDEO_MUTE];

  if (res[KEYS.ACTIVE_WP]) {
    const id = res[KEYS.ACTIVE_WP];
    const item = wpList.find(w => w.id === id);
    if (item) {
      currentWpId = id;
      try {
        const rec = await dbGet(STORE_FILES, id);
        if (rec && rec.blob) {
          const url = blobToUrl(rec.blob);
          activeBlobUrl = url;
          const isVideo = isVideoMime(item.type);
          if (isVideo) applyVideoBg(url);
          else         applyImageBg(url);
          updateTilePreviews();
          return;
        }
      } catch (e) {
        console.warn('[Brave New Tab] Erro ao restaurar:', e);
      }
    }
  }

  const preset = res[KEYS.BG_PRESET];
  if (preset) {
    let css = null;
    if (preset.type === 'gradient') {
      const g = PRESET_GRADIENTS.find(x => x.id === preset.id);
      if (g) css = g.css;
    } else if (preset.type === 'color') {
      const c = PRESET_COLORS.find(x => x.id === preset.id);
      if (c) css = c.css;
    }
    if (css) {
      bgType = preset.type;
      stopVideo();

      bgLayer.style.background = '';
      bgLayer.style.backgroundImage = '';
      bgLayer.style.backgroundColor = '';

      if (preset.type === 'color') {
        bgLayer.style.backgroundColor = css;
      } else {
        bgLayer.style.backgroundImage = css;
        bgLayer.style.backgroundSize = 'cover';
        bgLayer.style.backgroundRepeat = 'no-repeat';
        bgLayer.style.backgroundPosition = 'center';
      }

      document.querySelectorAll('.wp-swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.id === preset.id && s.dataset.type === preset.type);
      });
      updateTilePreviews();
      return;
    }
  }

  clearBg();
  updateTilePreviews();
}

/* ============================================================
   PREFERÊNCIAS
============================================================ */
function applyPrefs() {
  chrome.storage.local.get(
    [KEYS.CLOCK, KEYS.GREETING, KEYS.SEARCH, KEYS.OVERLAY, KEYS.BLUR, KEYS.BG_ENABLED, KEYS.VIDEO_MUTE],
    (res) => {
      const clockOn    = res[KEYS.CLOCK]    !== false;
      const greetingOn = res[KEYS.GREETING] !== false;
      const searchOn   = res[KEYS.SEARCH]   !== false;
      const overlayOn  = res[KEYS.OVERLAY]  !== false;
      const blurOn     = res[KEYS.BLUR]     === true;
      bgEnabled        = res[KEYS.BG_ENABLED] !== false;
      videoMuted       = res[KEYS.VIDEO_MUTE] !== false;

      const clockWidget = document.getElementById('widget-clock');
      clockWidget.classList.toggle('hidden', !clockOn && !greetingOn);
      document.getElementById('clock').style.display = clockOn ? '' : 'none';
      document.getElementById('greeting').style.display = greetingOn ? '' : 'none';

      document.getElementById('widget-search').classList.toggle('hidden', !searchOn);
      document.getElementById('bg-overlay').classList.toggle('hidden', !overlayOn || !bgEnabled);

      document.querySelectorAll('#bg-video-slot video').forEach(v => {
        if (blurOn) v.style.filter = 'blur(6px) brightness(0.95)';
        else v.style.filter = '';
        v.muted = videoMuted;
      });

      bgLayer.classList.toggle('blurred', blurOn);

      if (!bgEnabled) {
        bgVideoSlot.style.opacity = '0';
        bgLayer.style.opacity = '0';
      } else {
        bgVideoSlot.style.opacity = '';
        bgLayer.style.opacity = '';
      }

      const el1 = document.getElementById('toggle-clock');    if (el1) el1.checked = clockOn;
      const el2 = document.getElementById('toggle-greeting'); if (el2) el2.checked = greetingOn;
      const el3 = document.getElementById('toggle-search');   if (el3) el3.checked = searchOn;
      const el4 = document.getElementById('toggle-overlay');  if (el4) el4.checked = overlayOn;
      const el5 = document.getElementById('toggle-blur');     if (el5) el5.checked = blurOn;
      const el6 = document.getElementById('toggle-video-mute'); if (el6) el6.checked = videoMuted;

      scheduleCollisions();
    }
  );
}

const prefMap = {
  'toggle-clock': KEYS.CLOCK,
  'toggle-greeting': KEYS.GREETING,
  'toggle-search': KEYS.SEARCH,
  'toggle-overlay': KEYS.OVERLAY,
  'toggle-blur': KEYS.BLUR,
  'toggle-video-mute': KEYS.VIDEO_MUTE
};
Object.keys(prefMap).forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', (e) => {
    chrome.storage.local.set({ [prefMap[id]]: e.target.checked }, () => {
      applyPrefs();
      if (id === 'toggle-overlay' || id === 'toggle-blur') applyPreviewExtras();
    });
  });
});

/* ============================================================
   CATÁLOGO — CACHE
============================================================ */
async function loadCatalogCache() {
  return new Promise((resolve) => {
    chrome.storage.local.get([CATALOG.CACHE_KEY], (res) => {
      const raw = res[CATALOG.CACHE_KEY];
      if (raw && typeof raw === 'object') {
        catalogCache.categories = raw.categories || null;
        catalogCache.items = raw.items || {};
      }
      resolve();
    });
  });
}

function saveCatalogCache() {
  chrome.storage.local.set({
    [CATALOG.CACHE_KEY]: {
      categories: catalogCache.categories,
      items: catalogCache.items
    }
  });
}

function isCacheFresh(entry) {
  return entry && entry.ts && (Date.now() - entry.ts) < CATALOG.CACHE_TTL;
}

/* ============================================================
   CATÁLOGO — API GITHUB
============================================================ */
async function ghFetch(path) {
  const url = `${CATALOG.API}${path}`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if (!res.ok) {
    if (res.status === 403) throw new Error('Limite da API do GitHub atingido. Tente novamente em alguns minutos.');
    if (res.status === 404) throw new Error('Recurso não encontrado no GitHub.');
    throw new Error(`Erro HTTP ${res.status}`);
  }
  return res.json();
}

async function fetchCategories(force = false) {
  if (!force && isCacheFresh(catalogCache.categories)) {
    return catalogCache.categories.data;
  }
  const data = await ghFetch(`/repos/${CATALOG.OWNER}/${CATALOG.REPO}/contents/`);
  const cats = data
    .filter(x => x.type === 'dir')
    .map(x => ({ name: x.name, sha: x.sha }))
    .sort((a, b) => a.name.localeCompare(b.name));

  catalogCache.categories = { ts: Date.now(), data: cats };
  saveCatalogCache();
  return cats;
}

async function fetchCategoryItems(catName, force = false) {
  const cached = catalogCache.items[catName];
  if (!force && isCacheFresh(cached)) {
    return cached.data;
  }
  const data = await ghFetch(`/repos/${CATALOG.OWNER}/${CATALOG.REPO}/contents/${encodeURIComponent(catName)}`);
  const files = data
    .filter(x => x.type === 'file' && /\.(jpe?g|png|webp|gif)$/i.test(x.name))
    .map(x => ({
      name: x.name,
      download_url: x.download_url,
      size: x.size,
      path: x.path
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  catalogCache.items[catName] = { ts: Date.now(), data: files };
  saveCatalogCache();
  return files;
}

/* ============================================================
   CATÁLOGO — RENDER: CATEGORIAS (lista vertical)
============================================================ */
async function renderCatalogCategories(force = false) {
  const list = document.getElementById('catalog-cats');
  const status = document.getElementById('catalog-cats-status');
  list.innerHTML = '';
  status.className = 'catalog-status compact';
  status.textContent = 'Carregando...';

  let cats;
  try {
    cats = await fetchCategories(force);
  } catch (e) {
    status.className = 'catalog-status compact error';
    status.textContent = e.message || 'Falha ao carregar.';
    return;
  }

  const filterEl = document.getElementById('catalog-cat-filter');
  const filter = (filterEl.value || '').toLowerCase().trim();
  const filtered = filter
    ? cats.filter(c => c.name.toLowerCase().includes(filter))
    : cats;

  if (!filtered.length) {
    status.textContent = filter ? 'Nada encontrado.' : 'Vazio.';
    return;
  }

  status.textContent = `${filtered.length} categoria${filtered.length > 1 ? 's' : ''}`;
  list.innerHTML = '';

  filtered.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'catalog-cat-item';
    btn.dataset.name = cat.name;
    if (catalogState.currentCategory === cat.name) btn.classList.add('active');

    btn.innerHTML = `
      <span class="hash">#</span>
      <span class="name">${escapeHtml(cat.name)}</span>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.catalog-cat-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      openCatalogCategory(cat.name);
    });
    list.appendChild(btn);
  });
}

/* ============================================================
   CATÁLOGO — ITENS DA CATEGORIA
============================================================ */
async function openCatalogCategory(catName) {
  catalogState.currentCategory = catName;
  catalogState.visibleCount = CATALOG.PAGE_SIZE;

  const emptyEl = document.getElementById('catalog-items-empty');
  const contentEl = document.getElementById('catalog-items-content');
  emptyEl.classList.add('hidden');
  contentEl.classList.remove('hidden');

  document.getElementById('catalog-items-title').textContent = '#' + catName;
  document.getElementById('catalog-items-desc').textContent = 'Carregando...';
  document.getElementById('catalog-item-filter').value = '';
  document.getElementById('catalog-items').innerHTML = '';
  document.getElementById('catalog-sentinel').style.display = 'none';

  const status = document.getElementById('catalog-items-status');
  status.className = 'catalog-status';
  status.textContent = 'Carregando wallpapers...';

  let items;
  try {
    items = await fetchCategoryItems(catName);
  } catch (e) {
    status.className = 'catalog-status error';
    status.textContent = e.message || 'Falha ao carregar wallpapers.';
    return;
  }

  catalogState.allItems = items;
  document.getElementById('catalog-items-desc').textContent =
    `${items.length} wallpaper${items.length !== 1 ? 's' : ''}`;
  status.textContent = '';

  renderCatalogItems();
  setupCatalogObserver();

  // A partir da primeira seleção, habilita o modo retrátil
  catalogState.autoCollapseEnabled = true;
  const catsCol = document.getElementById('catalog-cats-col');
  if (catsCol) catsCol.classList.add('collapsed');

  const scrollBox = document.getElementById('catalog-items-content');
  if (scrollBox) scrollBox.scrollTop = 0;
}

function isCatalogItemDownloaded(item) {
  return wpList.some(w =>
    w.source === 'catalog' &&
    w.name === item.name &&
    w.catalogCategory === catalogState.currentCategory
  );
}

function renderCatalogItems() {
  const grid = document.getElementById('catalog-items');
  const status = document.getElementById('catalog-items-status');
  const sentinel = document.getElementById('catalog-sentinel');

  const filter = (document.getElementById('catalog-item-filter').value || '').toLowerCase().trim();
  const filtered = filter
    ? catalogState.allItems.filter(it => it.name.toLowerCase().includes(filter))
    : catalogState.allItems;

  const visible = filtered.slice(0, catalogState.visibleCount);

  const existing = grid.querySelectorAll('.catalog-item').length;
  const toAppend = visible.slice(existing);

  if (!visible.length) {
    if (existing === 0) {
      status.textContent = filter ? 'Nenhum resultado para o filtro.' : 'Nenhum wallpaper nesta categoria.';
    }
    sentinel.style.display = 'none';
    return;
  }

  status.textContent = `${visible.length} de ${filtered.length}`;

  toAppend.forEach(item => {
    const div = document.createElement('div');
    div.className = 'catalog-item loading';
    div.title = item.name;

    if (isCatalogItemDownloaded(item)) {
      div.classList.add('downloaded');
    }

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = item.name;
    img.src = THUMB_PROXY.build(item.download_url);
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      div.classList.remove('loading');
    });
    img.addEventListener('error', () => {
      if (!img.dataset.fallbackTried) {
        img.dataset.fallbackTried = '1';
        img.src = item.download_url;
        return;
      }
      div.classList.remove('loading');
      div.style.background = 'linear-gradient(135deg, #2a1a1a, #1a0f0f)';
    });

    div.appendChild(img);
    div.addEventListener('click', () => openCatalogPreview(item));
    grid.appendChild(div);
  });

  sentinel.style.display = filtered.length > visible.length ? '' : 'none';
}

function setupCatalogObserver() {
  if (catalogObserver) {
    catalogObserver.disconnect();
    catalogObserver = null;
  }

  const sentinel = document.getElementById('catalog-sentinel');
  const scrollRoot = document.getElementById('catalog-items-content');
  if (!sentinel || !scrollRoot) return;

  catalogObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const filter = (document.getElementById('catalog-item-filter').value || '').toLowerCase().trim();
      const filtered = filter
        ? catalogState.allItems.filter(it => it.name.toLowerCase().includes(filter))
        : catalogState.allItems;

      if (catalogState.visibleCount >= filtered.length) return;
      catalogState.visibleCount += CATALOG.PAGE_SIZE;
      renderCatalogItems();
    }
  }, {
    root: scrollRoot,
    rootMargin: '300px 0px',
    threshold: 0
  });

  catalogObserver.observe(sentinel);
}

/* ============================================================
   CATÁLOGO — PREVIEW + DOWNLOAD
============================================================ */
function openCatalogPreview(item) {
  catalogState.previewItem = item;

  const box = document.getElementById('catalog-preview-box');
  const previewUrl = THUMB_PROXY.build(item.download_url).replace('w=400', 'w=900');
  box.innerHTML = `<div class="badge-type">PREVIEW</div>`;
  box.style.backgroundImage = '';
  box.style.background = `#1a1a22 center/cover no-repeat url('${previewUrl}')`;

  const sizeMB = item.size ? (item.size / 1024 / 1024).toFixed(2) + ' MB' : '—';
  const already = isCatalogItemDownloaded(item);

  document.getElementById('catalog-preview-meta').innerHTML = `
    <div class="row"><span class="k">Nome</span><span class="v">${escapeHtml(item.name)}</span></div>
    <div class="row"><span class="k">Categoria</span><span class="v">${escapeHtml(catalogState.currentCategory || '')}</span></div>
    <div class="row"><span class="k">Tamanho</span><span class="v">${sizeMB}</span></div>
  `;

  const btn = document.getElementById('catalog-download-btn');

  const oldWarn = document.querySelector('.catalog-already');
  if (oldWarn) oldWarn.remove();

  if (already) {
    btn.textContent = 'Baixar novamente';
    const warn = document.createElement('div');
    warn.className = 'catalog-already';
    warn.innerHTML = `
      <svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      Você já baixou este wallpaper. Baixar novamente criará uma cópia duplicada.
    `;
    const applyBar = document.querySelector('#wp-view-catalog-preview .apply-bar');
    applyBar.parentElement.insertBefore(warn, applyBar);
  } else {
    btn.textContent = 'Baixar para Meus wallpapers';
  }

  showWpView('catalog-preview');
}

async function downloadCatalogItem() {
  const item = catalogState.previewItem;
  if (!item) return;

  const btn = document.getElementById('catalog-download-btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Baixando...';

  try {
    const res = await fetch(item.download_url);
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
    const blob = await res.blob();

    const id = 'wp_cat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const mime = blob.type || mimeFromExt(item.name);
    const metaItem = {
      id,
      name: item.name,
      type: mime,
      ext: extFromMime(mime),
      size: blob.size,
      addedAt: Date.now(),
      source: 'catalog',
      catalogCategory: catalogState.currentCategory
    };

    await dbPut(STORE_FILES, { id, blob });
    await dbPut(STORE_META, metaItem);
    wpList.push(metaItem);

    updateWpCounts();

    document.querySelectorAll('#catalog-items .catalog-item').forEach(el => {
      if (el.title === item.name) el.classList.add('downloaded');
    });

    await renderWpCategories();
    showWpView('mine');

    btn.disabled = false;
    btn.textContent = originalText;

  } catch (e) {
    console.error('[Brave New Tab] Erro ao baixar do catálogo:', e);
    alert(`Não foi possível baixar "${item.name}": ${e.message || e}`);
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function mimeFromExt(name) {
  const ext = (name.split('.').pop() || '').toLowerCase();
  return {
    jpg: 'image/jpeg', jpeg: 'image/jpeg',
    png: 'image/png', webp: 'image/webp',
    gif: 'image/gif'
  }[ext] || 'image/jpeg';
}

/* ============================================================
   CATÁLOGO — EVENTOS
============================================================ */
function initCatalogEvents() {
  // ===== Coluna de categorias retrátil =====
  // Só passa a retrair depois que o usuário selecionou pelo menos uma categoria.
  const catsCol = document.getElementById('catalog-cats-col');
  if (catsCol) {
    catsCol.addEventListener('mouseenter', () => {
      if (!catalogState.autoCollapseEnabled) return;
      catsCol.classList.remove('collapsed');
    });
    catsCol.addEventListener('mouseleave', () => {
      if (!catalogState.autoCollapseEnabled) return;
      catsCol.classList.add('collapsed');
    });
    // Estado inicial: expandida
    catsCol.classList.remove('collapsed');
  }

  document.getElementById('catalog-refresh').addEventListener('click', async () => {
    await renderCatalogCategories(true);
    if (catalogState.currentCategory) {
      await fetchCategoryItems(catalogState.currentCategory, true);
      openCatalogCategory(catalogState.currentCategory);
    }
  });

  document.getElementById('catalog-close').addEventListener('click', () => {
    if (catalogObserver) { catalogObserver.disconnect(); catalogObserver = null; }
    catalogState.currentCategory = null;
    catalogState.autoCollapseEnabled = false;
    document.getElementById('catalog-items-empty').classList.remove('hidden');
    document.getElementById('catalog-items-content').classList.add('hidden');
    const catsCol = document.getElementById('catalog-cats-col');
    if (catsCol) catsCol.classList.remove('collapsed');
    showWpView('home');
  });

  document.getElementById('catalog-cat-filter').addEventListener('input', () => {
    renderCatalogCategories(false);
  });

  document.getElementById('catalog-item-filter').addEventListener('input', () => {
    catalogState.visibleCount = CATALOG.PAGE_SIZE;
    document.getElementById('catalog-items').innerHTML = '';
    renderCatalogItems();
  });

  document.getElementById('catalog-preview-back').addEventListener('click', () => {
    showWpView('catalog');
  });
  document.getElementById('catalog-preview-cancel').addEventListener('click', () => {
    showWpView('catalog');
  });

  document.getElementById('catalog-download-btn').addEventListener('click', downloadCatalogItem);
}

/* ============================================================
   LAYOUT
============================================================ */
function applyLayout(save = true) {
  const W = window.innerWidth;
  const H = window.innerHeight;

  ['clock', 'search'].forEach(name => {
    const el = document.getElementById(`widget-${name}`);
    const cfg = layout[name] || { pos: 'center', x: null, y: null };

    const cleanTransform = (el.style.transform || '').replace(/translateY\([^)]*\)/, '').trim();
    el.style.transform = cleanTransform;

    if (cfg.pos === 'custom' && cfg.x !== null && cfg.y !== null) {
      el.setAttribute('data-pos', 'custom');
      el.style.transform = 'translate(-50%, -50%)';
      el.style.left = `${Math.round(cfg.x * W)}px`;
      el.style.top  = `${Math.round(cfg.y * H)}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    } else {
      el.setAttribute('data-pos', cfg.pos);
      el.style.left = '';
      el.style.top = '';
      el.style.right = '';
      el.style.bottom = '';
      el.style.transform = '';
    }
  });

  if (save) chrome.storage.local.set({ [KEYS.LAYOUT]: layout });

  scheduleCollisions();
}

function loadLayout() {
  chrome.storage.local.get([KEYS.LAYOUT], (res) => {
    if (res[KEYS.LAYOUT]) {
      layout = { ...JSON.parse(JSON.stringify(DEFAULT_LAYOUT)), ...res[KEYS.LAYOUT] };
    }
    applyLayout(false);
  });
}

function applyShortcutsPosition(save = true) {
  const el = document.getElementById('shortcuts-block');
  const W = window.innerWidth;
  const H = window.innerHeight;

  const sx = shortcutsPos.x !== null ? shortcutsPos.x : DEFAULT_SHORTCUTS_POS.x;
  const sy = shortcutsPos.y !== null ? shortcutsPos.y : DEFAULT_SHORTCUTS_POS.y;

  el.style.left = `${Math.round(sx * W)}px`;
  el.style.top  = `${Math.round(sy * H)}px`;
  el.style.transform = 'translate(-50%, -50%)';

  if (save) chrome.storage.local.set({ [KEYS.SHORTCUTS_POS]: shortcutsPos });

  scheduleCollisions();
}

function loadShortcutsPosition() {
  chrome.storage.local.get([KEYS.SHORTCUTS_POS], (res) => {
    if (res[KEYS.SHORTCUTS_POS]) shortcutsPos = { ...DEFAULT_SHORTCUTS_POS, ...res[KEYS.SHORTCUTS_POS] };
    applyShortcutsPosition(false);
  });
}

/* ============================================================
   RESOLUÇÃO DE LAYOUT
============================================================ */
function resolveCollisions() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const MIN_GAP = 16;
  const EDGE = 16;

  ['clock', 'search'].forEach(name => {
    const el = document.getElementById(`widget-${name}`);
    if (el) {
      el.style.transform = (el.style.transform || '').replace(/translateY\([^)]*\)/, '').trim();
    }
  });
  const scEl = document.getElementById('shortcuts-block');
  if (scEl) {
    scEl.style.transform = (scEl.style.transform || '').replace(/translateY\([^)]*\)/, '').trim();
  }

  const items = [];

  ['clock', 'search'].forEach(name => {
    const el = document.getElementById(`widget-${name}`);
    if (!el || el.classList.contains('hidden')) return;
    const cfg = layout[name] || { pos: 'center', x: null, y: null };
    items.push({
      el,
      id: name,
      isShortcut: false,
      baseX: cfg.x,
      baseY: cfg.y,
      baseTop: cfg.y !== null ? cfg.y * H : null
    });
  });

  if (scEl) {
    const sx = shortcutsPos.x !== null ? shortcutsPos.x : DEFAULT_SHORTCUTS_POS.x;
    const sy = shortcutsPos.y !== null ? shortcutsPos.y : DEFAULT_SHORTCUTS_POS.y;
    items.push({
      el: scEl,
      id: 'shortcuts',
      isShortcut: true,
      baseX: sx,
      baseY: sy,
      baseTop: sy * H
    });
  }

  items.forEach(item => item.el.classList.remove('collision-hidden'));

  if (items.length < 2) return;

  const anyCollision = () => {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i].el.getBoundingClientRect();
        const b = items[j].el.getBoundingClientRect();
        const overlapX = a.right > b.left + 4 && a.left < b.right - 4;
        const overlapY = a.bottom > b.top + 4 && a.top < b.bottom - 4;
        if (overlapX && overlapY) return true;
      }
    }
    return false;
  };

  if (!anyCollision()) return;

  items.sort((a, b) => {
    const ra = a.el.getBoundingClientRect();
    const rb = b.el.getBoundingClientRect();
    return ra.top - rb.top;
  });

  const totalHeight = items.reduce((sum, item) => {
    return sum + item.el.getBoundingClientRect().height;
  }, 0) + (items.length - 1) * MIN_GAP;

  if (totalHeight > H - 2 * EDGE) {
    const cx = W / 2, cy = H / 2;
    const withDist = items.map(item => {
      const r = item.el.getBoundingClientRect();
      item._dist = Math.hypot(r.left + r.width / 2 - cx, r.top + r.height / 2 - cy);
      return item;
    });
    withDist.sort((a, b) => a._dist - b._dist);

    let usedHeight = 0;
    const kept = [];
    for (const item of withDist) {
      const h = item.el.getBoundingClientRect().height;
      const needed = usedHeight + (kept.length > 0 ? MIN_GAP : 0) + h;
      if (needed <= H - 2 * EDGE) {
        kept.push(item);
        usedHeight = needed;
      } else {
        item.el.classList.add('collision-hidden');
      }
    }

    applyVerticalStack(kept, EDGE, H - EDGE, MIN_GAP);
    return;
  }

  applyVerticalStack(items, EDGE, H - EDGE, MIN_GAP);
}

function applyVerticalStack(items, topLimit, bottomLimit, gap) {
  if (items.length === 0) return;

  items.sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);

  const centerY = items.reduce((sum, item) => {
    const r = item.el.getBoundingClientRect();
    return sum + (r.top + r.height / 2);
  }, 0) / items.length;

  const totalH = items.reduce((sum, item) => sum + item.el.getBoundingClientRect().height, 0);
  const totalGaps = (items.length - 1) * gap;

  let startY = centerY - (totalH + totalGaps) / 2;
  if (startY < topLimit) startY = topLimit;
  if (startY + totalH + totalGaps > bottomLimit) startY = bottomLimit - totalH - totalGaps;

  let cursorY = startY;

  for (const item of items) {
    const rect = item.el.getBoundingClientRect();
    const h = rect.height;
    const baseTop = item.baseTop !== null ? item.baseTop - h / 2 : rect.top;
    const offsetY = cursorY - baseTop;

    const clean = (item.el.style.transform || '').replace(/translateY\([^)]*\)/, '').trim();
    item.el.style.transform = `${clean} translateY(${Math.round(offsetY)}px)`.trim();

    cursorY += h + gap;
  }
}

function scheduleCollisions() {
  requestAnimationFrame(() => {
    resolveCollisions();
    setTimeout(resolveCollisions, 80);
    setTimeout(resolveCollisions, 250);
  });
}

/* ============================================================
   DRAG + SNAP + GUIAS
============================================================ */
let dragState = null;
const DRAG_THRESHOLD = 4;
const SNAP_THRESHOLD = 8;
const EDGE_MARGIN = 8;

const guideV = document.getElementById('guide-v');
const guideH = document.getElementById('guide-h');

function showGuideV(x) { guideV.style.left = `${x}px`; guideV.classList.add('visible'); }
function showGuideH(y) { guideH.style.top = `${y}px`; guideH.classList.add('visible'); }
function hideGuides() {
  guideV.classList.remove('visible');
  guideH.classList.remove('visible');
}

function snapX(rawX, width, height, centerY, selfEl) {
  const W = window.innerWidth;
  const candidates = [];
  candidates.push({ x: Math.round((W - width) / 2), guideX: W / 2 });
  candidates.push({ x: 24 });
  candidates.push({ x: W - width - 24 });

  document.querySelectorAll('.widget').forEach(other => {
    if (other === selfEl || other.classList.contains('hidden') || other.classList.contains('collision-hidden')) return;
    const r = other.getBoundingClientRect();
    const sameRow = Math.abs((r.top + r.height / 2) - centerY) < 80;
    if (!sameRow) return;
    candidates.push({ x: Math.round(r.left + r.width / 2 - width / 2), guideX: r.left + r.width / 2 });
    candidates.push({ x: Math.round(r.left), guideX: r.left });
    candidates.push({ x: Math.round(r.right - width), guideX: r.right });
  });

  let best = null;
  for (const c of candidates) {
    const d = Math.abs(c.x - rawX);
    if (d <= SNAP_THRESHOLD && (!best || d < best.d)) best = { ...c, d };
  }
  if (best) {
    if (best.guideX !== undefined) showGuideV(best.guideX);
    return best.x;
  }
  return rawX;
}

function snapY(rawY, width, height, centerX, selfEl) {
  const H = window.innerHeight;
  const candidates = [];
  candidates.push({ y: Math.round((H - height) / 2), guideY: H / 2 });
  candidates.push({ y: 24 });
  candidates.push({ y: H - height - 24 });

  document.querySelectorAll('.widget').forEach(other => {
    if (other === selfEl || other.classList.contains('hidden') || other.classList.contains('collision-hidden')) return;
    const r = other.getBoundingClientRect();
    const sameCol = Math.abs((r.left + r.width / 2) - centerX) < 80;
    if (!sameCol) return;
    candidates.push({ y: Math.round(r.top + r.height / 2 - height / 2), guideY: r.top + r.height / 2 });
    candidates.push({ y: Math.round(r.top), guideY: r.top });
    candidates.push({ y: Math.round(r.bottom - height), guideY: r.bottom });
  });

  let best = null;
  for (const c of candidates) {
    const d = Math.abs(c.y - rawY);
    if (d <= SNAP_THRESHOLD && (!best || d < best.d)) best = { ...c, d };
  }
  if (best) {
    if (best.guideY !== undefined) showGuideH(best.guideY);
    return best.y;
  }
  return rawY;
}

function attachDrag(el, options) {
  const { name, onEnd, onClick } = options;

  el.addEventListener('mousedown', (e) => {
    if (!editorMode) return;
    if (e.button !== 0 && e.button !== 2) return;
    if (e.target.closest('input, textarea')) return;
    if (e.target.closest('.shortcut')) return;

    e.preventDefault();
    const rect = el.getBoundingClientRect();

    dragState = {
      el, name,
      startX: e.clientX, startY: e.clientY,
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      width: rect.width, height: rect.height,
      moved: false, onEnd, onClick,
      button: e.button, clientX: e.clientX, clientY: e.clientY
    };

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  });
}

function onDragMove(e) {
  if (!dragState) return;
  const dx = e.clientX - dragState.startX;
  const dy = e.clientY - dragState.startY;
  if (!dragState.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

  if (!dragState.moved) {
    dragState.moved = true;
    dragState.el.style.position = 'fixed';
    dragState.el.style.transform = 'translate(-50%, -50%)';
    dragState.el.style.left = `${dragState.centerX}px`;
    dragState.el.style.top = `${dragState.centerY}px`;
    dragState.el.style.right = 'auto';
    dragState.el.style.bottom = 'auto';
    dragState.el.classList.add('dragging');
  }

  let centerX = dragState.centerX + dx;
  let centerY = dragState.centerY + dy;

  const halfW = dragState.width / 2;
  const halfH = dragState.height / 2;

  centerX = Math.max(EDGE_MARGIN + halfW, Math.min(window.innerWidth - EDGE_MARGIN - halfW, centerX));
  centerY = Math.max(EDGE_MARGIN + halfH, Math.min(window.innerHeight - EDGE_MARGIN - halfH, centerY));

  hideGuides();

  const leftRaw = centerX - halfW;
  const topRaw  = centerY - halfH;

  const snappedLeft = snapX(leftRaw, dragState.width, dragState.height, centerY, dragState.el);
  const snappedTop  = snapY(topRaw,  dragState.width, dragState.height, centerX, dragState.el);

  dragState.el.style.left = `${snappedLeft + halfW}px`;
  dragState.el.style.top = `${snappedTop + halfH}px`;
}

function onDragEnd() {
  if (!dragState) return;
  const { el, name, moved, onEnd, onClick, button, clientX, clientY } = dragState;
  hideGuides();

  if (moved) {
    el.classList.remove('dragging');
    const left = parseFloat(el.style.left);
    const top  = parseFloat(el.style.top);

    el.style.transform = (el.style.transform || '').replace(/translateY\([^)]*\)/, '').trim();

    if (name === 'shortcuts') {
      shortcutsPos = {
        x: left / window.innerWidth,
        y: top / window.innerHeight
      };
      chrome.storage.local.set({ [KEYS.SHORTCUTS_POS]: shortcutsPos });
    } else {
      layout[name] = {
        pos: 'custom',
        x: left / window.innerWidth,
        y: top / window.innerHeight
      };
      applyLayout(true);
    }
  } else {
    if (onClick) onClick(button, clientX, clientY);
  }

  dragState = null;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
}

/* ============================================================
   MENU DE POSIÇÃO
============================================================ */
const posMenu = document.getElementById('pos-menu');
const posMenuTitle = document.getElementById('pos-menu-title');
let posMenuTarget = null;

function openPosMenu(x, y, widgetName) {
  posMenuTarget = widgetName;
  const label = widgetName === 'clock' ? 'Relógio' : widgetName === 'search' ? 'Busca' : 'Conjunto';
  posMenuTitle.textContent = `Posicionar: ${label}`;

  posMenu.classList.add('open');
  const rect = posMenu.getBoundingClientRect();
  let px = x, py = y;
  if (x + rect.width > window.innerWidth - 8) px = window.innerWidth - rect.width - 8;
  if (y + rect.height > window.innerHeight - 8) py = window.innerHeight - rect.height - 8;
  if (px < 8) px = 8;
  if (py < 8) py = 8;
  posMenu.style.left = `${px}px`;
  posMenu.style.top = `${py}px`;
}

function closePosMenu() {
  posMenu.classList.remove('open');
  posMenuTarget = null;
}

posMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!posMenuTarget) return closePosMenu();
    const pos = btn.dataset.pos;

    if (posMenuTarget === 'shortcuts') {
      const el = document.getElementById('shortcuts-block');
      const rect = el.getBoundingClientRect();
      const positions = {
        'top-left':      { x: 24, y: 24 },
        'top-center':    { x: Math.round((window.innerWidth - rect.width) / 2), y: 24 },
        'top-right':     { x: Math.round(window.innerWidth - rect.width - 24), y: 24 },
        'center-left':   { x: 24, y: Math.round((window.innerHeight - rect.height) / 2) },
        'center':        { x: Math.round((window.innerWidth - rect.width) / 2), y: Math.round((window.innerHeight - rect.height) / 2) },
        'center-right':  { x: Math.round(window.innerWidth - rect.width - 24), y: Math.round((window.innerHeight - rect.height) / 2) },
        'bottom-left':   { x: 24, y: Math.round(window.innerHeight - rect.height - 24) },
        'bottom-center': { x: Math.round((window.innerWidth - rect.width) / 2), y: Math.round(window.innerHeight - rect.height - 24) },
        'bottom-right':  { x: Math.round(window.innerWidth - rect.width - 24), y: Math.round(window.innerHeight - rect.height - 24) }
      };
      if (pos === 'reset') {
        shortcutsPos = { ...DEFAULT_SHORTCUTS_POS };
      } else if (positions[pos]) {
        const cw = rect.width;
        const ch = rect.height;
        shortcutsPos = {
          x: (positions[pos].x + cw / 2) / window.innerWidth,
          y: (positions[pos].y + ch / 2) / window.innerHeight
        };
      }
      applyShortcutsPosition(true);
    } else {
      const el = document.getElementById(`widget-${posMenuTarget}`);
      const positionsMap = {
        'top-left':      { x: 40, y: 40 },
        'top-center':    { x: 'center', y: 40 },
        'top-right':     { x: 'right', y: 40 },
        'center-left':   { x: 40, y: 'center' },
        'center':        { x: 'center', y: 'center' },
        'center-right':  { x: 'right', y: 'center' },
        'bottom-left':   { x: 40, y: 'bottom' },
        'bottom-center': { x: 'center', y: 'bottom' },
        'bottom-right':  { x: 'right', y: 'bottom' }
      };

      if (pos === 'reset') {
        layout[posMenuTarget] = { pos: 'center', x: null, y: null };
        applyLayout(true);
      } else if (positionsMap[pos]) {
        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const W = window.innerWidth;
        const H = window.innerHeight;
        const m = positionsMap[pos];

        let cx, cy;
        if (m.x === 'center') cx = W / 2;
        else if (m.x === 'right') cx = W - 40 - width / 2;
        else cx = 40 + width / 2;

        if (m.y === 'center') cy = H / 2;
        else if (m.y === 'bottom') cy = H - 40 - height / 2;
        else cy = 40 + height / 2;

        layout[posMenuTarget] = {
          pos: 'custom',
          x: cx / W,
          y: cy / H
        };
        applyLayout(true);
      }
    }
    closePosMenu();
  });
});

document.addEventListener('mousedown', (e) => {
  if (!e.target.closest('#pos-menu')) closePosMenu();
});

/* ============================================================
   DRAG DOS WIDGETS
============================================================ */
function initWidgetDrag(widgetId, name) {
  const el = document.getElementById(widgetId);

  attachDrag(el, {
    name,
    onEnd: (n, x, y) => {
      layout[n] = { pos: 'custom', x, y };
      applyLayout(true);
    },
    onClick: (button, x, y) => {
      openPosMenu(x, y, name);
    }
  });

  el.addEventListener('contextmenu', (e) => {
    if (e.target.closest('input, textarea')) return;
    if (!editorMode) return;
    e.preventDefault();
    openPosMenu(e.clientX, e.clientY, name);
  });
}

function initShortcutsDrag() {
  const el = document.getElementById('shortcuts-block');
  attachDrag(el, {
    name: 'shortcuts',
    onEnd: (n, x, y) => {
      shortcutsPos = { x, y };
      applyShortcutsPosition(true);
    },
    onClick: (button, x, y) => {
      openPosMenu(x, y, 'shortcuts');
    }
  });

  el.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.shortcut')) return;
    if (!editorMode) return;
    e.preventDefault();
    openPosMenu(e.clientX, e.clientY, 'shortcuts');
  });
}

/* ============================================================
   MODO EDITOR
============================================================ */
function enterEditor() {
  editorMode = true;
  document.body.classList.add('editor-mode');
  document.getElementById('shortcuts-block').classList.add('draggable');
  closeSettings();
  closeShortcutModal();
  searchInput.blur();
  closeSearchPanel();
  document.querySelectorAll('.collision-hidden').forEach(el => el.classList.remove('collision-hidden'));
}

function exitEditor() {
  editorMode = false;
  document.body.classList.remove('editor-mode');
  document.getElementById('shortcuts-block').classList.remove('draggable');
  closePosMenu();
  hideGuides();
  scheduleCollisions();
}

document.getElementById('enter-editor').addEventListener('click', enterEditor);
document.getElementById('exit-editor').addEventListener('click', exitEditor);

/* ============================================================
   MODAL DE CONFIGURAÇÕES
============================================================ */
const settingsModal = document.getElementById('settings-modal');
function openSettings() { settingsModal.classList.add('open'); }
function closeSettings() {
  settingsModal.classList.remove('open');
  if (catalogObserver) { catalogObserver.disconnect(); catalogObserver = null; }
}

document.getElementById('open-settings').addEventListener('click', openSettings);
document.getElementById('close-settings').addEventListener('click', closeSettings);
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) closeSettings();
});

const TAB_TITLES = {
  wallpaper: 'Imagem de fundo',
  widgets: 'Widgets',
  shortcuts: 'Atalhos',
  about: 'Sobre'
};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.tab;
    document.querySelector(`.tab-panel[data-panel="${key}"]`).classList.add('active');
    document.getElementById('settings-header-title').textContent = TAB_TITLES[key] || '';
    if (key === 'wallpaper') updateTilePreviews();
  });
});

/* ============================================================
   BOTÃO DO BRAVE
============================================================ */
const braveBtn = document.getElementById('open-brave-appearance');
if (braveBtn) {
  braveBtn.addEventListener('click', () => {
    const isBrave = navigator.brave !== undefined || /Brave/.test(navigator.userAgent);
    const url = isBrave ? 'brave://settings/appearance' : 'chrome://settings/appearance';
    chrome.tabs.create({ url });
  });
}

/* ============================================================
   RESET
============================================================ */
document.getElementById('reset-layout').addEventListener('click', () => {
  layout = JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
  shortcutsPos = { ...DEFAULT_SHORTCUTS_POS };
  applyLayout(true);
  applyShortcutsPosition(true);
});

/* ============================================================
   BLOQUEIO GLOBAL DO BOTÃO DIREITO
============================================================ */
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('input, textarea, [contenteditable="true"]')) return;
  e.preventDefault();
});

/* ============================================================
   ATALHOS DE TECLADO
============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (editorMode) { exitEditor(); return; }
    closeSettings();
    closeShortcutModal();
    closePosMenu();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === ',') {
    e.preventDefault();
    openSettings();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (!editorMode) { searchInput.focus(); searchInput.select(); }
  }
});

/* ============================================================
   REDIMENSIONAMENTO DA JANELA
============================================================ */
let resizeTimer = null;
window.addEventListener('resize', () => {
  applyLayout(false);
  applyShortcutsPosition(false);
  scheduleCollisions();

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(scheduleCollisions, 120);
});

/* ============================================================
   INICIALIZAÇÃO
============================================================ */
(async () => {
  await new Promise((resolve) => {
    chrome.storage.local.get([KEYS.V9_CLEANED], (r) => {
      if (!r[KEYS.V9_CLEANED]) {
        chrome.storage.local.set({ [KEYS.V9_CLEANED]: true }, () => {
          chrome.storage.local.remove(KEYS.SHORTCUTS, resolve);
        });
      } else resolve();
    });
  });

  try {
    await openDB();
  } catch (e) {
    console.error('[Brave New Tab] Falha ao abrir IndexedDB:', e);
  }

  await new Promise((resolve) => {
    loadWpList(() => {
      updateWpCounts();
      renderWpCategories().then(resolve);
    });
  });

  await loadBackground();
  await loadCatalogCache();
  initCatalogEvents();
  renderShortcuts();
  renderShortcutsEditor();
  applyPrefs();
  loadLayout();
  loadShortcutsPosition();
  initWidgetDrag('widget-clock', 'clock');
  initWidgetDrag('widget-search', 'search');
  initShortcutsDrag();

  document.getElementById('add-shortcut-btn').addEventListener('click', () => openShortcutModal(null));
  document.getElementById('reset-shortcuts').addEventListener('click', () => {
    if (!confirm('Restaurar os atalhos padrão?')) return;
    chrome.storage.local.set({ [KEYS.SHORTCUTS]: DEFAULT_SHORTCUTS }, () => {
      renderShortcuts();
      renderShortcutsEditor();
    });
  });
})();