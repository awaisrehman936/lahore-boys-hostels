// ============================================================
// LBH PLATFORM â€” script.js v2.0
// Supabase-powered. No localStorage for data. No hardcoded creds.
// ============================================================

// â”€â”€â”€ GLOBAL STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let allHostels      = [];     // public directory cache
let compareList     = [];     // hostel IDs selected for compare (max 3)
let activeFilter    = 'all';  // public directory filter
let viewMode        = 'grid'; // 'grid' | 'list'
let applyHostelId   = null;   // hostel selected for application

// â”€â”€â”€ INIT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initObserver();
  loadPublicDirectory();
});

function initObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  window.observeElements = () => {
    document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
  };
}

// â”€â”€â”€ THEME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const THEMES = ['charcoal-grey','off-white','golden-honey'];

function setTheme(t) {
  if (!THEMES.includes(t)) t = 'charcoal-grey';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('lbh_theme', t);
  document.querySelectorAll('.tp-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.theme === t);
  });
}

function loadTheme() {
  const t = localStorage.getItem('lbh_theme') || 'charcoal-grey';
  setTheme(t);
}

// â”€â”€â”€ PAGE NAVIGATION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
}

function smoothScroll(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

async function loadPublicDirectory() {
  try {
    allHostels = await Hostels.listActive();
    renderHostelCards(allHostels);
    updateHeroStats();
  } catch (e) {
    document.getElementById('hgrid').innerHTML = '<p style="color:var(--muted);padding:2rem">Unable to load hostels. Please refresh.</p>';
  }
}

function updateHeroStats() {
  const total = allHostels.length;
  const beds  = allHostels.reduce((s, h) => s + (h.total_capacity || 0), 0);
  const minP  = allHostels.reduce((m, h) => Math.min(m, h.price_from || 99999), 99999);
  const el = id => document.getElementById(id);
  if (el('stat-hostels')) el('stat-hostels').textContent = total;
  if (el('stat-beds'))    el('stat-beds').textContent    = beds > 0 ? beds + '+' : 'â€”';
  if (el('stat-price'))   el('stat-price').textContent   = minP < 99999 ? 'Rs. ' + _fmt(minP) : 'â€”';
}

function filterHostels() {
  const search = (document.getElementById('hero-search-input')?.value || '').toLowerCase();
  const area   = document.getElementById('fsel-area')?.value || 'all';
  const sort   = document.getElementById('fsel-sort')?.value || 'default';

  let list = allHostels.filter(h => {
    const matchSearch = !search ||
      h.name.toLowerCase().includes(search) ||
      (h.area || '').toLowerCase().includes(search) ||
      String(h.price_from || '').includes(search);
    const matchArea = area === 'all' || h.area === area;
    const matchFilter =
      activeFilter === 'all'     ? true :
      activeFilter === 'student' ? (h.amenities || []).some(a => a.toLowerCase().includes('study') || a.toLowerCase().includes('wifi')) :
      activeFilter === 'pro'     ? (h.price_from || 0) >= 8000 :
      activeFilter === 'meals'   ? (h.amenities || []).some(a => a.toLowerCase().includes('meal')) :
      activeFilter === 'wifi'    ? (h.amenities || []).some(a => a.toLowerCase().includes('wifi')) : true;
    return matchSearch && matchArea && matchFilter;
  });

  if (sort === 'price-asc')  list.sort((a, b) => (a.price_from||0) - (b.price_from||0));
  if (sort === 'price-desc') list.sort((a, b) => (b.price_from||0) - (a.price_from||0));
  if (sort === 'rating')     list.sort((a, b) => (b.rating||0) - (a.rating||0));

  const rc = document.getElementById('result-count');
  if (rc) rc.textContent = list.length + ' hostel' + (list.length !== 1 ? 's' : '') + ' found';
  renderHostelCards(list);
}

function setF(f) {
  activeFilter = f;
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('fb-' + f);
  if (btn) btn.classList.add('active');
  filterHostels();
}

function setViewMode(m) {
  viewMode = m;
  document.getElementById('vt-grid')?.classList.toggle('active', m === 'grid');
  document.getElementById('vt-list')?.classList.toggle('active', m === 'list');
  const grid = document.getElementById('hgrid');
  if (grid) { grid.classList.toggle('hgrid-list', m === 'list'); }
}

// Generate a consistent photo URL for a hostel using picsum (free, no API key)
function hostelPhoto(h) {
  if (h.cover_image_url) {
    return `<img src="${h.cover_image_url}" alt="${h.name}" style="width:100%;height:100%;object-fit:cover">`;
  }
  const seed = encodeURIComponent((h.prefix || h.name.slice(0,6)).replace(/\s/g,'-'));
  return `<img src="https://picsum.photos/seed/${seed}/600/300"
    alt="${h.name}" loading="lazy"
    style="width:100%;height:100%;object-fit:cover"
    onerror="this.parentElement.innerHTML='<div class=hcard-img-fallback>ðŸ¢</div>'">`;
}

function renderHostelCards(list) {
  const grid = document.getElementById('hgrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<div class="empty-state"><p>No hostels match your search.</p></div>';
    return;
  }
  grid.innerHTML = list.map((h, i) => {
    const inCompare  = compareList.includes(h.id);
    const amenityTags = (h.amenities || []).slice(0, 4).map(a =>
      `<span class="htag">${a}</span>`).join('');
    const safeName = h.name.replace(/'/g, "\\'");
    return `
    <div class="hcard reveal ${inCompare ? 'hcard-selected' : ''}" style="transition-delay: ${i*0.05}s" data-id="${h.id}">
      <div class="hcard-img">
        ${hostelPhoto(h)}
        <span class="hcard-badge">Verified</span>
      </div>
      <div class="hcard-body">
        <div class="hcard-top">
          <div class="hcard-name">${h.name}</div>
          <div class="hcard-area">ðŸ“ ${h.area || h.city}</div>
        </div>
        <div class="hcard-price">
          <span class="hp-from">Rs. ${_fmt(h.price_from || 0)}</span>
          <span class="hp-mo">/month</span>
        </div>
        <div class="hcard-tags">${amenityTags}</div>
        ${h.rating ? `<div class="hcard-rating">${stars(h.rating)}</div>` : ''}
        <div class="hcard-actions">
          <button class="hc-btn hc-apply" onclick="openApply('${h.id}','${safeName}')">Apply</button>
          ${h.website_url ? `<a class="hc-btn hc-visit" href="${h.website_url}" target="_blank" rel="noopener">Web â†—</a>` : ''}
          <button class="hc-btn hc-cmp ${inCompare ? 'hc-cmp-active' : ''}"
            onclick="toggleCompare('${h.id}',this)">
            ${inCompare ? 'âœ“ Compare' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
  
  if (window.observeElements) setTimeout(window.observeElements, 50);
}

function stars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5 ? 1 : 0, empty = 5 - full - half;
  return 'â˜…'.repeat(full) + (half ? 'Â½' : '') + 'â˜†'.repeat(empty);
}

// â”€â”€â”€ COMPARE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toggleCompare(id, btn) {
  if (compareList.includes(id)) {
    compareList = compareList.filter(x => x !== id);
  } else {
    if (compareList.length >= 3) { toast('Max 3 hostels for comparison'); return; }
    compareList.push(id);
  }
  updateCompareBar();
  filterHostels();
}

function updateCompareBar() {
  const bar = document.getElementById('compare-bar');
  const inlineBar = document.getElementById('inline-compare-bar');
  if (!compareList.length) {
    if (bar) bar.style.display = 'none';
    if (inlineBar) inlineBar.classList.remove('visible');
    return;
  }
  if (bar) bar.style.display = 'flex';
  if (inlineBar) inlineBar.classList.add('visible');
  const slots = document.getElementById('cmp-slots');
  if (slots) slots.innerHTML = compareList.map(id => {
    const h = allHostels.find(x => x.id === id);
    return `<div class="cslot">${h?.name || id} <span onclick="toggleCompare('${id}',null)" style="cursor:pointer;margin-left:4px">âœ•</span></div>`;
  }).join('') + Array(3 - compareList.length).fill('<div class="cslot empty">+ Add hostel</div>').join('');
  const iSlots = document.getElementById('inline-compare-slots');
  if (iSlots) iSlots.innerHTML = compareList.map(id => {
    const h = allHostels.find(x => x.id === id);
    return `<span class="cislot">${h?.name?.split(' ')[0] || 'â€¦'}</span>`;
  }).join('') + Array(3 - compareList.length).fill('<span class="cislot empty">+</span>').join('');
}

function clearCompare() {
  compareList = [];
  updateCompareBar();
  filterHostels();
}

function openCompare() {
  if (compareList.length < 2) { toast('Select at least 2 hostels to compare'); return; }
  const selected = compareList.map(id => allHostels.find(h => h.id === id)).filter(Boolean);
  const fields = ['area','price_from','total_capacity','rating'];
  const labels = { area:'Area', price_from:'From (Rs.)', total_capacity:'Capacity', rating:'Rating' };
  document.getElementById('m-cmp-body').innerHTML = `
    <div style="overflow-x:auto"><table class="cmp-table">
      <thead><tr><th>Feature</th>${selected.map(h => `<th>${h.name}</th>`).join('')}</tr></thead>
      <tbody>
        ${fields.map(f => `<tr><td>${labels[f]}</td>${selected.map(h =>
          `<td>${f === 'price_from' ? 'Rs. ' + _fmt(h[f] || 0) : (h[f] || 'â€”')}</td>`).join('')}</tr>`).join('')}
        <tr><td>Amenities</td>${selected.map(h =>
          `<td>${(h.amenities||[]).join(', ') || 'â€”'}</td>`).join('')}</tr>
        <tr><td>Apply</td>${selected.map(h =>
          `<td><button class="hc-btn hc-apply" onclick="openApply('${h.id}','${h.name.replace(/'/g,"\\'")}');closeModal('m-compare')">Apply</button></td>`).join('')}</tr>
      </tbody>
    </table></div>`;
  openModal('m-compare');
}

// â”€â”€â”€ APPLY MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openApply(hostelId, hostelName) {
  applyHostelId = hostelId;
  document.getElementById('m-apply-title').textContent = 'Apply â€” ' + hostelName;
  document.getElementById('m-apply-body').style.display = 'block';
  document.getElementById('m-apply-success').style.display = 'none';
  document.getElementById('ap-name').value = '';
  document.getElementById('ap-phone').value = '';
  document.getElementById('ap-msg').value = '';
  openModal('m-apply');
}

async function submitApply() {
  const name  = document.getElementById('ap-name').value.trim();
  const phone = document.getElementById('ap-phone').value.trim();
  const rtype = document.getElementById('ap-room').value;
  const msg   = document.getElementById('ap-msg').value.trim();
  if (!name || !phone) { toast('Name and phone are required'); return; }
  try {
    await Applications.submit({
      hostel_id:  applyHostelId,
      name, phone,
      room_type:  rtype === 'Sharing Room' ? 'sharing' : rtype === 'Private Room' ? 'single' : 'any',
      message:    msg,
      source:     'website',
    });
    document.getElementById('m-apply-body').style.display    = 'none';
    document.getElementById('m-apply-success').style.display = 'block';
  } catch (e) {
    toast('Submission failed: ' + e.message);
  }
}

// â”€â”€â”€ MODAL HELPERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openModal(id)  { const m = document.getElementById(id); if (m) m.style.display = 'flex'; }
function closeModal(id) { const m = document.getElementById(id); if (m) m.style.display = 'none'; }

// â”€â”€â”€ TOAST â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toast(msg) {
  let c = document.getElementById('toast-c');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'toast'; d.textContent = msg;
  c.appendChild(d);
  setTimeout(() => d.remove(), 3500);
}

// ─── PORTAL REDIRECT ────────────────────────────────────────
// Portal has moved to lbh-portal (standalone PWA)
const PORTAL_URL = 'https://lbh-portal.vercel.app';
function openPortal() {
  window.open(PORTAL_URL, '_blank', 'noopener');
}
function closePortal() {
  // no-op: portal is now a separate app
}

