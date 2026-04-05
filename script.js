// ============================================================
// LBH PLATFORM — script.js v2.0
// Supabase-powered. No localStorage for data. No hardcoded creds.
// ============================================================

// ─── GLOBAL STATE ───────────────────────────────────────────
let currentUser     = null;   // profile row from Supabase
let currentHostelId = null;   // UUID of active hostel context
let allHostels      = [];     // public directory cache
let compareList     = [];     // hostel IDs selected for compare (max 3)
let activeFilter    = 'all';  // public directory filter
let viewMode        = 'grid'; // 'grid' | 'list'
let applyHostelId   = null;   // hostel selected for application
let mCurrentTab     = 'dashboard'; // active manager tab

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  loadTheme();
  await loadPublicDirectory();
  await restoreSession();
});

// ─── THEME ──────────────────────────────────────────────────
const THEMES = ['white','charcoal','midnight','aqua','honey'];

function setTheme(t) {
  if (!THEMES.includes(t)) t = 'white';
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('lbh_theme', t);
  document.querySelectorAll('.tp-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.theme === t);
  });
}

function loadTheme() {
  const t = localStorage.getItem('lbh_theme') || 'white';
  setTheme(t);
}

// ─── PAGE NAVIGATION ─────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const closeBtn = document.getElementById('nav-portal-close');
  if (closeBtn) closeBtn.style.display = id === 'portal' ? 'inline-flex' : 'none';
}

function smoothScroll(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── AUTH ────────────────────────────────────────────────────
async function restoreSession() {
  try {
    const session = await Auth.getSession();
    if (!session) return;
    currentUser = await Auth.getProfile();
    if (currentUser) {
      currentHostelId = currentUser.hostel_id;
      showPortalView();
    }
  } catch (e) {
    // No active session — stay on home
  }
}

async function portalLogin() {
  const email = document.getElementById('l-email').value.trim();
  const pass  = document.getElementById('l-pass').value;
  const btn   = document.getElementById('l-btn');
  const err   = document.getElementById('l-err');

  err.style.display = 'none';
  if (!email || !pass) { showLoginErr('Please enter your email and password.'); return; }

  btn.textContent = 'Signing in…';
  btn.disabled = true;

  try {
    await Auth.signIn(email, pass);
    currentUser     = await Auth.getProfile();
    currentHostelId = currentUser.hostel_id;
    showPortalView();
  } catch (e) {
    showLoginErr(e.message || 'Invalid email or password.');
    btn.textContent = 'Sign In';
    btn.disabled = false;
  }
}

function showLoginErr(msg) {
  const el = document.getElementById('l-err');
  el.textContent = msg;
  el.style.display = 'block';
}

async function showForgotPassword() {
  const email = prompt('Enter your email address to receive a reset link:');
  if (!email) return;
  try {
    await Auth.resetPassword(email);
    alert('Password reset email sent. Check your inbox.');
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

async function logout() {
  try { await Auth.signOut(); } catch (_) {}
  currentUser     = null;
  currentHostelId = null;
  closePortal();
}

// ─── PORTAL OPEN/CLOSE ───────────────────────────────────────
function openPortal() {
  if (currentUser) {
    showPortalView();
  } else {
    document.getElementById('l-wrap').style.display  = 'flex';
    document.getElementById('p-wrap').style.display  = 'none';
    document.getElementById('l-email').value = '';
    document.getElementById('l-pass').value  = '';
    document.getElementById('l-err').style.display = 'none';
    document.getElementById('l-btn').textContent = 'Sign In';
    document.getElementById('l-btn').disabled = false;
    showPage('portal');
  }
}

function closePortal() {
  currentUser     = null;
  currentHostelId = null;
  showPage('home');
  document.getElementById('l-wrap').style.display = 'flex';
  document.getElementById('p-wrap').style.display = 'none';
}

// ─── PORTAL ROUTING ──────────────────────────────────────────
function showPortalView() {
  document.getElementById('l-wrap').style.display = 'none';
  document.getElementById('p-wrap').style.display = 'block';
  showPage('portal');
  buildTopbar();
  const role = currentUser?.role;
  if (role === 'admin')     renderAdmin();
  else if (role === 'manager') renderManager('dashboard');
  else if (role === 'finance') renderFinance('overview');
  else if (role === 'hostelite') renderHostelite();
  else if (role === 'staff')   renderStaff();
}

function buildTopbar() {
  const u = currentUser;
  if (!u) return;
  const hostelName = u.hostels?.name || 'LBH Platform';
  const roleLabel  = { admin:'Admin', manager:'Manager', finance:'Finance', hostelite:'Tenant', staff:'Staff' }[u.role] || u.role;
  document.getElementById('p-topbar').innerHTML = `
    <div class="ptb-left">
      <div class="ptb-brand">Lahore<span>Boys</span>Hostels</div>
      <div class="ptb-hostel">${hostelName}</div>
    </div>
    <div class="ptb-right">
      <span class="ptb-role">${roleLabel}</span>
      <span class="ptb-name">${u.full_name || u.id}</span>
      <button class="mb mb-sm" onclick="logout()">Sign Out</button>
    </div>`;
}

// ─── PUBLIC DIRECTORY ────────────────────────────────────────
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
  if (el('stat-beds'))    el('stat-beds').textContent    = beds > 0 ? beds + '+' : '—';
  if (el('stat-price'))   el('stat-price').textContent   = minP < 99999 ? 'Rs. ' + _fmt(minP) : '—';
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
    onerror="this.parentElement.innerHTML='<div class=hcard-img-fallback>🏢</div>'">`;
}

function renderHostelCards(list) {
  const grid = document.getElementById('hgrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<div class="empty-state"><p>No hostels match your search.</p></div>';
    return;
  }
  grid.innerHTML = list.map(h => {
    const inCompare  = compareList.includes(h.id);
    const amenityTags = (h.amenities || []).slice(0, 4).map(a =>
      `<span class="htag">${a}</span>`).join('');
    const safeName = h.name.replace(/'/g, "\\'");
    return `
    <div class="hcard ${inCompare ? 'hcard-selected' : ''}" data-id="${h.id}">
      <div class="hcard-img">
        ${hostelPhoto(h)}
        <span class="hcard-badge">Verified</span>
      </div>
      <div class="hcard-body">
        <div class="hcard-top">
          <div class="hcard-name">${h.name}</div>
          <div class="hcard-area">📍 ${h.area || h.city}</div>
        </div>
        <div class="hcard-price">
          <span class="hp-from">Rs. ${_fmt(h.price_from || 0)}</span>
          <span class="hp-mo">/month</span>
        </div>
        <div class="hcard-tags">${amenityTags}</div>
        ${h.rating ? `<div class="hcard-rating">${stars(h.rating)} <small style="color:var(--muted)">${h.rating}</small></div>` : ''}
        <div class="hcard-actions">
          <button class="hc-btn hc-apply" onclick="openApply('${h.id}','${safeName}')">Apply Now</button>
          ${h.website_url ? `<a class="hc-btn hc-visit" href="${h.website_url}" target="_blank" rel="noopener">Website ↗</a>` : ''}
          <button class="hc-btn hc-cmp ${inCompare ? 'hc-cmp-active' : ''}"
            onclick="toggleCompare('${h.id}',this)">
            ${inCompare ? '✓ Comparing' : '+ Compare'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function stars(r) {
  const full = Math.floor(r), half = r % 1 >= 0.5 ? 1 : 0, empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ─── COMPARE ────────────────────────────────────────────────
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
    return `<div class="cslot">${h?.name || id} <span onclick="toggleCompare('${id}',null)" style="cursor:pointer;margin-left:4px">✕</span></div>`;
  }).join('') + Array(3 - compareList.length).fill('<div class="cslot empty">+ Add hostel</div>').join('');
  const iSlots = document.getElementById('inline-compare-slots');
  if (iSlots) iSlots.innerHTML = compareList.map(id => {
    const h = allHostels.find(x => x.id === id);
    return `<span class="cislot">${h?.name?.split(' ')[0] || '…'}</span>`;
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
          `<td>${f === 'price_from' ? 'Rs. ' + _fmt(h[f] || 0) : (h[f] || '—')}</td>`).join('')}</tr>`).join('')}
        <tr><td>Amenities</td>${selected.map(h =>
          `<td>${(h.amenities||[]).join(', ') || '—'}</td>`).join('')}</tr>
        <tr><td>Apply</td>${selected.map(h =>
          `<td><button class="hc-btn hc-apply" onclick="openApply('${h.id}','${h.name.replace(/'/g,"\\'")}');closeModal('m-compare')">Apply</button></td>`).join('')}</tr>
      </tbody>
    </table></div>`;
  openModal('m-compare');
}

// ─── APPLY MODAL ─────────────────────────────────────────────
function openApply(hostelId, hostelName) {
  applyHostelId = hostelId;
  document.getElementById('m-apply-title').textContent = 'Apply — ' + hostelName;
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

// ─── MODAL HELPERS ───────────────────────────────────────────
function openModal(id)  { const m = document.getElementById(id); if (m) m.style.display = 'flex'; }
function closeModal(id) { const m = document.getElementById(id); if (m) m.style.display = 'none'; }

// ─── TOAST ───────────────────────────────────────────────────
function toast(msg) {
  let c = document.getElementById('toast-c');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'toast'; d.textContent = msg;
  c.appendChild(d);
  setTimeout(() => d.remove(), 3500);
}
function mToast(msg, type = 'info') {
  const mc = document.getElementById('p-main-content');
  if (!mc) return;
  const d = document.createElement('div');
  d.className = 'mtoast mtoast-' + type;
  d.textContent = msg;
  mc.prepend(d);
  setTimeout(() => d.remove(), 3500);
}

// ─── PORTAL: MANAGER ─────────────────────────────────────────
function renderManager(tab) {
  mCurrentTab = tab || 'dashboard';
  const tabs = ['dashboard','tenants','rooms','payments','maintenance','notices','expenses','bills','staff','visitors','attendance','settings'];
  const icons = { dashboard:'⊞', tenants:'👥', rooms:'🛏', payments:'💰', maintenance:'🔧',
                  notices:'📢', expenses:'📊', bills:'🧾', staff:'👤', visitors:'🚪', attendance:'📋', settings:'⚙️' };
  document.getElementById('p-main-content').innerHTML = `
    <div class="portal-layout">
      <nav class="p-sidenav">
        ${tabs.map(t => `
          <button class="pnav-item ${t === mCurrentTab ? 'active' : ''}" onclick="renderManager('${t}')">
            <span class="pnav-icon">${icons[t]}</span>
            <span class="pnav-lbl">${t.charAt(0).toUpperCase()+t.slice(1)}</span>
          </button>`).join('')}
      </nav>
      <div class="p-content" id="p-tab-content">
        <div class="loading">Loading…</div>
      </div>
    </div>`;
  const fns = {
    dashboard:   renderMDash,   tenants:   renderMTenants, rooms:      renderMRooms,
    payments:    renderMPayments, maintenance: renderMMaint, notices:  renderMNotices,
    expenses:    renderMExpenses, bills:    renderMBills,   staff:     renderMStaff,
    visitors:    renderMVisitors, attendance: renderMAttendance, settings: renderMSettings,
  };
  if (fns[mCurrentTab]) fns[mCurrentTab]();
}

function tabContent() { return document.getElementById('p-tab-content'); }

// ── DASHBOARD ──
async function renderMDash() {
  const tc = tabContent(); if (!tc) return;
  try {
    const [tenants, rooms, maint, activity] = await Promise.all([
      Tenants.list(currentHostelId, { status: 'active' }),
      Rooms.listWithOccupancy(currentHostelId),
      Maintenance.list(currentHostelId, { status: 'open' }),
      ActivityLog.list(currentHostelId, 8),
    ]);
    const totalBeds  = rooms.reduce((s, r) => s + (r.capacity || 0), 0);
    const occupiedBeds = rooms.reduce((s, r) => s + (r.occupied_beds || 0), 0);
    const vacantBeds   = totalBeds - occupiedBeds;

    // Payments this month
    const pays = await Payments.listByMonth(currentHostelId, _curMonth());
    const collected = pays.reduce((s, p) => s + Number(p.amount || 0), 0);
    const paidTids  = new Set(pays.filter(p => p.type === 'regular').map(p => p.tenant_id));
    const unpaid    = tenants.filter(t => !paidTids.has(t.id));

    tc.innerHTML = `
      <div class="dash-header">
        <h2 class="dash-title">Dashboard</h2>
        <div class="dash-date">${new Date().toLocaleDateString('en-PK',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
      </div>
      <div class="stat-grid">
        ${statCard('Active Tenants', tenants.length, '👥', 'blue')}
        ${statCard('Vacant Beds',    vacantBeds,     '🛏', vacantBeds > 0 ? 'green' : 'muted')}
        ${statCard('Collected ('+_mlabel(_curMonth())+')', 'Rs. '+_fmt(collected), '💰', 'gold')}
        ${statCard('Open Issues',    maint.length,   '🔧', maint.length > 0 ? 'red' : 'green')}
      </div>
      <div class="dash-widgets">
        <div class="widget">
          <div class="widget-title">Unpaid This Month ${unpaid.length ? `<span class="badge-red">${unpaid.length}</span>` : ''}</div>
          ${unpaid.length === 0
            ? '<div class="widget-empty">All tenants paid for this month 🎉</div>'
            : `<table class="mini-table"><thead><tr><th>TID</th><th>Name</th><th>Room</th><th>Rent</th><th></th></tr></thead><tbody>
               ${unpaid.slice(0,6).map(t => `<tr>
                 <td><code>${t.tid}</code></td><td>${t.name}</td>
                 <td>${t.rooms?.room_number||'—'}</td>
                 <td>Rs. ${_fmt(t.rent)}</td>
                 <td><button class="mb mb-sm mb-gold" onclick="openPayModal('${t.id}','${t.name.replace(/'/g,"\\'")}',${t.rent})">Pay</button></td>
               </tr>`).join('')}
               </tbody></table>`}
        </div>
        <div class="widget">
          <div class="widget-title">Recent Activity</div>
          ${activity.length === 0
            ? '<div class="widget-empty">No recent activity</div>'
            : `<div class="activity-list">${activity.map(a => `
               <div class="act-item">
                 <span class="act-dot"></span>
                 <span class="act-text">${a.action} <em>${a.entity_type||''}</em></span>
                 <span class="act-time">${_fdate(a.created_at)}</span>
               </div>`).join('')}</div>`}
        </div>
      </div>
      <div class="dash-quick">
        <div class="widget-title">Quick Actions</div>
        <div class="quick-btns">
          <button class="mb mb-gold" onclick="renderManager('tenants');setTimeout(openMAddTenant,200)">+ Add Tenant</button>
          <button class="mb mb-blue" onclick="renderManager('payments')">Record Payment</button>
          <button class="mb mb-red"  onclick="renderManager('maintenance');setTimeout(openMaintModal,200)">Log Issue</button>
          <button class="mb"         onclick="renderManager('notices');setTimeout(openNoticeModal,200)">Post Notice</button>
        </div>
      </div>`;
  } catch (e) {
    tc.innerHTML = `<div class="error-state">Error loading dashboard: ${e.message}</div>`;
  }
}

function statCard(label, value, icon, color) {
  return `<div class="stat-card stat-${color}">
    <div class="stat-icon">${icon}</div>
    <div class="stat-val">${value}</div>
    <div class="stat-lbl">${label}</div>
  </div>`;
}

// ── TENANTS ──
async function renderMTenants() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading tenants…</div>';
  try {
    const tenants = await Tenants.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header">
        <h2>Tenants</h2>
        <button class="mb mb-gold" onclick="openMAddTenant()">+ Add Tenant</button>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search by name, TID, phone…" oninput="filterTenantTable(this.value)" id="tenant-search">
        <select onchange="filterTenantTable(document.getElementById('tenant-search').value)" id="tenant-status-filter">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive / Moved Out</option>
        </select>
      </div>
      <div class="table-wrap">
        <table class="data-table" id="tenant-table">
          <thead><tr><th>TID</th><th>Name</th><th>Room</th><th>Rent</th><th>Move In</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${renderTenantRows(tenants)}</tbody>
        </table>
      </div>
      ${tenantFormModal()}`;
  } catch (e) {
    tc.innerHTML = `<div class="error-state">${e.message}</div>`;
  }
}

function renderTenantRows(tenants) {
  if (!tenants.length) return '<tr><td colspan="7" class="empty-td">No tenants found</td></tr>';
  return tenants.map(t => `<tr class="${t.status !== 'active' ? 'row-inactive' : ''}">
    <td><code>${t.tid || '—'}</code></td>
    <td>${t.name}</td>
    <td>${t.rooms?.room_number || '—'}</td>
    <td>Rs. ${_fmt(t.rent)}</td>
    <td>${_fdate(t.move_in_date)}</td>
    <td><span class="badge badge-${t.status === 'active' ? 'green' : 'muted'}">${t.status}</span></td>
    <td class="actions-cell">
      <button class="mb mb-sm" onclick="viewTenant('${t.id}')">View</button>
      <button class="mb mb-sm" onclick="openPayModal('${t.id}','${t.name.replace(/'/g,"\\'")}',${t.rent})">Pay</button>
      ${t.status === 'active' ? `<button class="mb mb-sm mb-red" onclick="confirmDeactivate('${t.id}','${t.name.replace(/'/g,"\\'")}')">Move Out</button>` : ''}
    </td>
  </tr>`).join('');
}

function filterTenantTable(q) {
  const sf = document.getElementById('tenant-status-filter')?.value || 'all';
  const rows = document.querySelectorAll('#tenant-table tbody tr');
  rows.forEach(row => {
    const text   = row.textContent.toLowerCase();
    const status = row.classList.contains('row-inactive') ? 'inactive' : 'active';
    const matchQ = !q || text.includes(q.toLowerCase());
    const matchS = sf === 'all' || status === sf;
    row.style.display = matchQ && matchS ? '' : 'none';
  });
}

function tenantFormModal() {
  return `<div id="m-add-tenant" class="modal-ov" style="display:none">
    <div class="modal">
      <div class="mhdr"><h3 id="tenant-modal-title">Add Tenant</h3><button class="mx" onclick="closeModal('m-add-tenant')">✕</button></div>
      <div class="mbody">
        <div class="frow">
          <div class="fg"><label>Full Name *</label><input id="t-name" placeholder="Muhammad Ali"></div>
          <div class="fg"><label>Phone *</label><input id="t-phone" placeholder="+92 300..."></div>
        </div>
        <div class="frow">
          <div class="fg"><label>CNIC</label><input id="t-cnic" placeholder="35202-XXXXXXX-X"></div>
          <div class="fg"><label>Father's Name</label><input id="t-father" placeholder="Abdul Rehman"></div>
        </div>
        <div class="frow">
          <div class="fg"><label>Emergency Contact</label><input id="t-emrg" placeholder="+92 300..."></div>
          <div class="fg"><label>Occupation</label>
            <select id="t-occ"><option>University Student</option><option>Working Professional</option><option>Other</option></select>
          </div>
        </div>
        <div class="frow">
          <div class="fg"><label>Employer / Institution</label><input id="t-emp" placeholder="UET Lahore / Company Name"></div>
          <div class="fg"><label>Room</label><select id="t-room"><option value="">Select room…</option></select></div>
        </div>
        <div class="frow">
          <div class="fg"><label>Monthly Rent (Rs.) *</label><input id="t-rent" type="number" placeholder="7000"></div>
          <div class="fg"><label>Security Deposit (Rs.)</label><input id="t-deposit" type="number" placeholder="0"></div>
        </div>
        <div class="frow">
          <div class="fg"><label>Move-In Date *</label><input id="t-movein" type="date"></div>
          <div class="fg"><label>Occupancy Type</label>
            <select id="t-otype"><option value="sharing">Sharing</option><option value="double">Double</option><option value="single">Single</option></select>
          </div>
        </div>
        <div class="frow full">
          <div class="fg"><label>Notes</label><textarea id="t-notes" placeholder="Any additional notes…"></textarea></div>
        </div>
      </div>
      <div class="mfoot">
        <button class="bcancel" onclick="closeModal('m-add-tenant')">Cancel</button>
        <button class="bsubmit" id="t-save-btn" onclick="saveTenant()">Add Tenant</button>
      </div>
    </div>
  </div>`;
}

async function openMAddTenant() {
  // Load rooms into dropdown
  try {
    const rooms = await Rooms.list(currentHostelId);
    const sel = document.getElementById('t-room');
    if (sel) sel.innerHTML = '<option value="">Select room…</option>' +
      rooms.map(r => `<option value="${r.id}">Room ${r.room_number} (${r.type}, Rs.${_fmt(r.price)})</option>`).join('');
  } catch (_) {}
  document.getElementById('tenant-modal-title').textContent = 'Add Tenant';
  document.getElementById('t-save-btn').onclick = saveTenant;
  document.getElementById('t-save-btn').textContent = 'Add Tenant';
  ['t-name','t-phone','t-cnic','t-father','t-emrg','t-emp','t-rent','t-deposit','t-notes'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  document.getElementById('t-movein').value = _today();
  openModal('m-add-tenant');
}

async function saveTenant() {
  const name  = document.getElementById('t-name').value.trim();
  const phone = document.getElementById('t-phone').value.trim();
  const rent  = parseFloat(document.getElementById('t-rent').value);
  const movein = document.getElementById('t-movein').value;
  if (!name || !phone || !rent || !movein) { mToast('Name, phone, rent and move-in date are required', 'error'); return; }
  const btn = document.getElementById('t-save-btn');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    await Tenants.create({
      hostel_id:         currentHostelId,
      name, phone,
      cnic:              document.getElementById('t-cnic').value.trim()    || null,
      father_name:       document.getElementById('t-father').value.trim()  || null,
      emergency_contact: document.getElementById('t-emrg').value.trim()    || null,
      occupation:        document.getElementById('t-occ').value            || null,
      employer:          document.getElementById('t-emp').value.trim()     || null,
      room_id:           document.getElementById('t-room').value           || null,
      occupancy_type:    document.getElementById('t-otype').value,
      rent,
      deposit:           parseFloat(document.getElementById('t-deposit').value) || 0,
      move_in_date:      movein,
      notes:             document.getElementById('t-notes').value.trim()   || null,
    });
    closeModal('m-add-tenant');
    mToast('Tenant added successfully', 'success');
    renderMTenants();
  } catch (e) {
    mToast(e.message, 'error');
    btn.disabled = false; btn.textContent = 'Add Tenant';
  }
}

async function viewTenant(id) {
  try {
    const [t, pays, balance] = await Promise.all([
      Tenants.get(id),
      Payments.listByTenant(id, 24),
      Payments.getBalance(id),
    ]);
    const pRows = pays.length
      ? pays.map(p => `<tr>
          <td>${_mlabel(p.month)}</td>
          <td>Rs. ${_fmt(p.amount)}</td>
          <td><span class="badge badge-blue">${p.type}</span></td>
          <td>${p.method}</td>
          <td>${_fdate(p.payment_date)}</td>
          <td>${p.notes||'—'}</td>
        </tr>`).join('')
      : '<tr><td colspan="6" class="empty-td">No payments recorded</td></tr>';
    const diffColor = balance.diff >= 0 ? 'green' : 'red';
    const diffLabel = balance.diff >= 0 ? 'In Credit / Advance' : 'Outstanding';
    const html = `<div id="m-view-tenant" class="modal-ov" style="display:flex">
      <div class="modal modal-lg">
        <div class="mhdr">
          <div><h3>${t.name}</h3><p><code>${t.tid}</code> · ${t.rooms?.room_number ? 'Room '+t.rooms.room_number : 'No Room'}</p></div>
          <button class="mx" onclick="closeModal('m-view-tenant');this.closest('.modal-ov').remove()">✕</button>
        </div>
        <div class="mbody">
          <div class="detail-grid">
            ${mFld('Phone', t.phone)}${mFld('CNIC', t.cnic||'—')}
            ${mFld("Father's Name", t.father_name||'—')}${mFld('Emergency', t.emergency_contact||'—')}
            ${mFld('Occupation', t.occupation||'—')}${mFld('Employer', t.employer||'—')}
            ${mFld('Move-In', _fdate(t.move_in_date))}${mFld('Move-Out', t.move_out_date ? _fdate(t.move_out_date) : '—')}
            ${mFld('Monthly Rent', 'Rs. '+_fmt(t.rent))}${mFld('Deposit', 'Rs. '+_fmt(t.deposit||0))}
          </div>
          <div class="balance-bar">
            <div class="bal-item"><div class="bal-val">Rs. ${_fmt(balance.paid)}</div><div class="bal-lbl">Total Paid</div></div>
            <div class="bal-item"><div class="bal-val">Rs. ${_fmt(balance.expected)}</div><div class="bal-lbl">Expected</div></div>
            <div class="bal-item bal-${diffColor}"><div class="bal-val">Rs. ${_fmt(Math.abs(balance.diff))}</div><div class="bal-lbl">${diffLabel}</div></div>
          </div>
          <h4 style="margin:1.2rem 0 .5rem">Payment History</h4>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>Month</th><th>Amount</th><th>Type</th><th>Method</th><th>Date</th><th>Notes</th></tr></thead>
              <tbody>${pRows}</tbody>
            </table>
          </div>
        </div>
        <div class="mfoot">
          <button class="bcancel" onclick="closeModal('m-view-tenant');this.closest('.modal-ov').remove()">Close</button>
          <button class="bsubmit" onclick="openPayModal('${t.id}','${t.name.replace(/'/g,"\\'")}',${t.rent})">Record Payment</button>
          ${t.status === 'active' ? `<button class="mb mb-red" onclick="confirmDeactivate('${t.id}','${t.name.replace(/'/g,"\\'")}')">Move Out</button>` : ''}
        </div>
      </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  } catch (e) {
    mToast(e.message, 'error');
  }
}

async function confirmDeactivate(id, name) {
  if (!confirm(`Move out ${name}? This will mark them as inactive.`)) return;
  try {
    await Tenants.deactivate(id, _today());
    mToast(name + ' moved out', 'success');
    renderMTenants();
  } catch (e) { mToast(e.message, 'error'); }
}

function mFld(label, value) {
  return `<div class="detail-field"><div class="df-lbl">${label}</div><div class="df-val">${value}</div></div>`;
}

// ── ROOMS ──
async function renderMRooms() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading rooms…</div>';
  try {
    const rooms = await Rooms.listWithOccupancy(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Rooms</h2></div>
      <div class="rooms-grid">
        ${rooms.map(r => {
          const pct = r.capacity ? Math.round((r.occupied_beds/r.capacity)*100) : 0;
          const color = pct >= 100 ? 'red' : pct >= 60 ? 'gold' : 'green';
          return `<div class="room-card">
            <div class="rc-num">Room ${r.room_number}</div>
            <div class="rc-floor">Floor ${r.floor||1} · ${r.type}</div>
            <div class="rc-price">Rs. ${_fmt(r.price)}/mo</div>
            <div class="rc-beds">
              ${Array(r.capacity).fill(0).map((_,i) =>
                `<span class="bed-dot ${i < r.occupied_beds ? 'bed-occ' : 'bed-free'}"></span>`).join('')}
            </div>
            <div class="rc-status rc-${color}">${r.occupied_beds}/${r.capacity} occupied (${pct}%)</div>
            ${(r.features||[]).length ? `<div class="rc-feats">${r.features.slice(0,3).map(f=>`<span class="htag">${f}</span>`).join('')}</div>` : ''}
          </div>`;
        }).join('')}
      </div>`;
  } catch (e) {
    tc.innerHTML = `<div class="error-state">${e.message}</div>`;
  }
}

// ── PAYMENTS ──
let paySubview = 'monthly';

async function renderMPayments(sub) {
  const tc = tabContent(); if (!tc) return;
  paySubview = sub || paySubview || 'monthly';
  tc.innerHTML = `
    <div class="tab-header"><h2>Payments</h2><button class="mb mb-gold" onclick="openPayModal()">+ Record Payment</button></div>
    <div class="subtabs">
      <button class="stab ${paySubview==='monthly'?'active':''}"   onclick="renderMPayments('monthly')">Monthly View</button>
      <button class="stab ${paySubview==='ledger'?'active':''}"    onclick="renderMPayments('ledger')">Per-Tenant Ledger</button>
      <button class="stab ${paySubview==='advances'?'active':''}"  onclick="renderMPayments('advances')">Advances & Extras</button>
    </div>
    <div id="pay-subview-content"><div class="loading">Loading…</div></div>
    ${paymentFormModal()}`;
  if (paySubview === 'monthly')   renderPayMonthly();
  if (paySubview === 'ledger')    renderPayLedger();
  if (paySubview === 'advances')  renderPayAdvances();
}

async function renderPayMonthly() {
  const el = document.getElementById('pay-subview-content'); if (!el) return;
  const month = _curMonth();
  try {
    const [pays, tenants] = await Promise.all([
      Payments.listByMonth(currentHostelId, month),
      Tenants.list(currentHostelId, { status: 'active' }),
    ]);
    const paidIds = new Set(pays.filter(p => p.type === 'regular').map(p => p.tenant_id));
    const pct = tenants.length ? Math.round((paidIds.size / tenants.length) * 100) : 0;
    el.innerHTML = `
      <div class="pay-month-header">
        <strong>${_mlabel(month)}</strong>
        <div class="pay-progress-bar"><div class="ppb-fill" style="width:${pct}%"></div></div>
        <span>${paidIds.size}/${tenants.length} paid (${pct}%)</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>TID</th><th>Name</th><th>Room</th><th>Rent</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${tenants.map(t => {
            const paid = paidIds.has(t.id);
            return `<tr>
              <td><code>${t.tid}</code></td><td>${t.name}</td>
              <td>${t.rooms?.room_number||'—'}</td>
              <td>Rs. ${_fmt(t.rent)}</td>
              <td><span class="badge badge-${paid?'green':'red'}">${paid?'Paid':'Pending'}</span></td>
              <td>${paid ? '—' : `<button class="mb mb-sm mb-gold" onclick="openPayModal('${t.id}','${t.name.replace(/'/g,"\\'")}',${t.rent})">Pay</button>`}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function renderPayLedger() {
  const el = document.getElementById('pay-subview-content'); if (!el) return;
  try {
    const tenants = await Tenants.list(currentHostelId, { status: 'all' });
    el.innerHTML = `
      <div class="fg" style="max-width:360px;margin-bottom:1rem">
        <label>Select Tenant</label>
        <select id="ledger-tenant-sel" onchange="loadTenantLedger(this.value)">
          <option value="">Choose a tenant…</option>
          ${tenants.map(t => `<option value="${t.id}">${t.tid} — ${t.name}</option>`).join('')}
        </select>
      </div>
      <div id="ledger-detail"></div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function loadTenantLedger(tid) {
  const el = document.getElementById('ledger-detail'); if (!el || !tid) return;
  el.innerHTML = '<div class="loading">Loading ledger…</div>';
  try {
    const [pays, balance] = await Promise.all([
      Payments.listByTenant(tid, 36),
      Payments.getBalance(tid),
    ]);
    const diffColor = balance.diff >= 0 ? 'green' : 'red';
    el.innerHTML = `
      <div class="balance-bar">
        <div class="bal-item"><div class="bal-val">Rs. ${_fmt(balance.paid)}</div><div class="bal-lbl">Total Paid</div></div>
        <div class="bal-item"><div class="bal-val">Rs. ${_fmt(balance.expected)}</div><div class="bal-lbl">Expected</div></div>
        <div class="bal-item bal-${diffColor}"><div class="bal-val">Rs. ${_fmt(Math.abs(balance.diff))}</div>
          <div class="bal-lbl">${balance.diff >= 0 ? 'In Credit' : 'Outstanding'}</div></div>
      </div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Month</th><th>Amount</th><th>Type</th><th>Method</th><th>Date</th><th>Notes</th></tr></thead>
        <tbody>${pays.length
          ? pays.map(p => `<tr>
              <td>${_mlabel(p.month)}</td><td>Rs. ${_fmt(p.amount)}</td>
              <td><span class="badge badge-blue">${p.type}</span></td>
              <td>${p.method}</td><td>${_fdate(p.payment_date)}</td><td>${p.notes||'—'}</td>
            </tr>`).join('')
          : '<tr><td colspan="6" class="empty-td">No payments</td></tr>'}
        </tbody>
      </table></div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function renderPayAdvances() {
  const el = document.getElementById('pay-subview-content'); if (!el) return;
  try {
    const [allPays, tenants] = await Promise.all([
      Payments.listByMonth(currentHostelId, _curMonth()),
      Tenants.list(currentHostelId),
    ]);
    const extras = allPays.filter(p => ['advance','overpayment','security','refund'].includes(p.type));
    const tMap = Object.fromEntries(tenants.map(t => [t.id, t]));
    el.innerHTML = extras.length === 0
      ? '<div class="widget-empty">No advances or extras this month</div>'
      : `<div class="table-wrap"><table class="data-table">
          <thead><tr><th>Tenant</th><th>Amount</th><th>Type</th><th>Method</th><th>Date</th><th>Notes</th></tr></thead>
          <tbody>${extras.map(p => `<tr>
            <td>${tMap[p.tenant_id]?.name || p.tenant_id}</td>
            <td>Rs. ${_fmt(p.amount)}</td>
            <td><span class="badge badge-blue">${p.type}</span></td>
            <td>${p.method}</td><td>${_fdate(p.payment_date)}</td><td>${p.notes||'—'}</td>
          </tr>`).join('')}</tbody>
        </table></div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function paymentFormModal() {
  return `<div id="m-pay" class="modal-ov" style="display:none">
    <div class="modal">
      <div class="mhdr"><h3>Record Payment</h3><button class="mx" onclick="closeModal('m-pay')">✕</button></div>
      <div class="mbody">
        <div class="frow">
          <div class="fg"><label>Tenant *</label><select id="pay-tenant"><option value="">Select tenant…</option></select></div>
          <div class="fg"><label>Month *</label><input id="pay-month" type="month" value="${_curMonth()}"></div>
        </div>
        <div class="frow">
          <div class="fg"><label>Amount (Rs.) *</label><input id="pay-amount" type="number" placeholder="7000"></div>
          <div class="fg"><label>Payment Date *</label><input id="pay-date" type="date" value="${_today()}"></div>
        </div>
        <div class="frow">
          <div class="fg"><label>Type *</label>
            <select id="pay-type" onchange="onPayTypeChange()">
              <option value="regular">Regular (Monthly Rent)</option>
              <option value="advance">Advance Payment</option>
              <option value="partial">Partial Payment</option>
              <option value="security">Security Deposit</option>
              <option value="overpayment">Overpayment / Extra</option>
              <option value="refund">Refund</option>
            </select>
          </div>
          <div class="fg"><label>Method *</label>
            <select id="pay-method">
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="cheque">Cheque</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div id="pay-advance-row" class="frow" style="display:none">
          <div class="fg"><label>Months Covered</label><input id="pay-adv-months" type="number" min="1" max="12" placeholder="3" oninput="calcAdvanceHint()"></div>
          <div class="fg"><div id="pay-adv-hint" style="padding-top:1.6rem;font-size:.85rem;color:var(--muted)"></div></div>
        </div>
        <div id="pay-overreason-row" class="frow" style="display:none">
          <div class="fg full"><label>Reason for Overpayment</label>
            <select id="pay-overreason">
              <option value="">Select reason…</option>
              <option value="advance_future">Advance for future months</option>
              <option value="rounding">Rounding up</option>
              <option value="utilities">Extra for utilities/bills</option>
              <option value="goodwill">Goodwill / voluntary</option>
              <option value="mistake">Paid by mistake (refund pending)</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="frow full">
          <div class="fg"><label>Notes</label><textarea id="pay-notes" placeholder="Optional notes…"></textarea></div>
        </div>
        <div id="pay-dup-warn" style="display:none;padding:8px 12px;background:#2A1A1A;border:1px solid #5A2020;border-radius:6px;font-size:.8rem;color:#E88080;margin-top:.5rem">
          ⚠ A regular payment already exists for this tenant this month.
        </div>
      </div>
      <div class="mfoot">
        <button class="bcancel" onclick="closeModal('m-pay')">Cancel</button>
        <button class="bsubmit" id="pay-save-btn" onclick="savePayment()">Save Payment</button>
      </div>
    </div>
  </div>`;
}

async function openPayModal(tenantId, tenantName, rent) {
  try {
    const tenants = await Tenants.list(currentHostelId, { status: 'active' });
    const sel = document.getElementById('pay-tenant');
    if (sel) {
      sel.innerHTML = '<option value="">Select tenant…</option>' +
        tenants.map(t => `<option value="${t.id}" data-rent="${t.rent}">${t.tid} — ${t.name}</option>`).join('');
      if (tenantId) sel.value = tenantId;
    }
    if (rent) document.getElementById('pay-amount').value = rent;
    document.getElementById('pay-month').value  = _curMonth();
    document.getElementById('pay-date').value   = _today();
    document.getElementById('pay-type').value   = 'regular';
    document.getElementById('pay-notes').value  = '';
    document.getElementById('pay-dup-warn').style.display    = 'none';
    document.getElementById('pay-advance-row').style.display = 'none';
    document.getElementById('pay-overreason-row').style.display = 'none';
    document.getElementById('pay-save-btn').disabled = false;
    document.getElementById('pay-save-btn').textContent = 'Save Payment';
    openModal('m-pay');
  } catch (e) { mToast(e.message, 'error'); }
}

function onPayTypeChange() {
  const t = document.getElementById('pay-type').value;
  document.getElementById('pay-advance-row').style.display    = t === 'advance'     ? 'flex' : 'none';
  document.getElementById('pay-overreason-row').style.display = t === 'overpayment' ? 'flex' : 'none';
}

function calcAdvanceHint() {
  const months = parseInt(document.getElementById('pay-adv-months').value) || 0;
  const sel    = document.getElementById('pay-tenant');
  const rent   = sel?.selectedOptions[0]?.dataset?.rent || 0;
  const hint   = document.getElementById('pay-adv-hint');
  if (hint && months && rent) hint.textContent = `${months} × Rs. ${_fmt(rent)} = Rs. ${_fmt(months * rent)}`;
}

async function savePayment() {
  const tenantId = document.getElementById('pay-tenant').value;
  const month    = document.getElementById('pay-month').value;
  const amount   = parseFloat(document.getElementById('pay-amount').value);
  const type     = document.getElementById('pay-type').value;
  const method   = document.getElementById('pay-method').value;
  const date     = document.getElementById('pay-date').value;
  if (!tenantId || !month || !amount || !date) { mToast('All required fields must be filled', 'error'); return; }

  // Duplicate check for regular payments
  if (type === 'regular') {
    try {
      const existing = await Payments.listByMonth(currentHostelId, month);
      const dup = existing.find(p => p.tenant_id === tenantId && p.type === 'regular');
      if (dup) {
        document.getElementById('pay-dup-warn').style.display = 'block';
        if (!confirm('A regular payment already exists for this tenant this month. Record anyway?')) return;
      }
    } catch (_) {}
  }

  const btn = document.getElementById('pay-save-btn');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    await Payments.create({
      hostel_id:          currentHostelId,
      tenant_id:          tenantId,
      month, amount, type, method,
      payment_date:       date,
      advance_months:     type === 'advance'     ? parseInt(document.getElementById('pay-adv-months').value) || null : null,
      overpayment_reason: type === 'overpayment' ? document.getElementById('pay-overreason').value || null : null,
      notes:              document.getElementById('pay-notes').value.trim() || null,
      recorded_by:        currentUser.id,
    });
    closeModal('m-pay');
    mToast('Payment recorded', 'success');
    renderMPayments(paySubview);
  } catch (e) {
    mToast(e.message, 'error');
    btn.disabled = false; btn.textContent = 'Save Payment';
  }
}

// ── MAINTENANCE ──
async function renderMMaint() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const items = await Maintenance.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Maintenance</h2><button class="mb mb-gold" onclick="openMaintModal()">+ Log Issue</button></div>
      <div class="filter-row">
        <button class="fb active" onclick="filterMaint('all',this)">All</button>
        <button class="fb" onclick="filterMaint('open',this)">Open</button>
        <button class="fb" onclick="filterMaint('in-progress',this)">In Progress</button>
        <button class="fb" onclick="filterMaint('resolved',this)">Resolved</button>
      </div>
      <div id="maint-list">${renderMaintCards(items)}</div>
      ${maintModal()}`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

let _maintItems = [];
async function filterMaint(status, btn) {
  document.querySelectorAll('.filter-row .fb').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const items = await Maintenance.list(currentHostelId, { status: status === 'all' ? 'all' : status });
  document.getElementById('maint-list').innerHTML = renderMaintCards(items);
}

function renderMaintCards(items) {
  if (!items.length) return '<div class="widget-empty">No issues found</div>';
  return `<div class="maint-grid">${items.map(m => `
    <div class="maint-card maint-${m.priority}">
      <div class="mc-top">
        <span class="badge badge-${m.priority === 'high'||m.priority==='critical' ? 'red' : m.priority === 'medium' ? 'orange' : 'green'}">${m.priority}</span>
        <span class="badge badge-${m.status === 'resolved' ? 'green' : m.status === 'in-progress' ? 'blue' : 'muted'}">${m.status}</span>
      </div>
      <div class="mc-title">${m.title}</div>
      <div class="mc-cat">${m.category} ${m.rooms ? '· Room '+m.rooms.room_number : ''}</div>
      ${m.description ? `<div class="mc-desc">${m.description}</div>` : ''}
      <div class="mc-date">${_fdate(m.created_at)}</div>
      ${m.status !== 'resolved' ? `<button class="mb mb-sm mb-green" onclick="resolveMaint('${m.id}')">Mark Resolved</button>` : `<div style="font-size:.75rem;color:var(--muted)">Resolved: ${_fdate(m.resolved_at)}</div>`}
    </div>`).join('')}</div>`;
}

function maintModal() {
  return `<div id="m-maint" class="modal-ov" style="display:none">
    <div class="modal">
      <div class="mhdr"><h3>Log Maintenance Issue</h3><button class="mx" onclick="closeModal('m-maint')">✕</button></div>
      <div class="mbody">
        <div class="frow">
          <div class="fg"><label>Title *</label><input id="mi-title" placeholder="Tap leaking in Room 101"></div>
          <div class="fg"><label>Category *</label>
            <select id="mi-cat"><option value="plumbing">Plumbing</option><option value="electrical">Electrical</option><option value="furniture">Furniture</option><option value="cleanliness">Cleanliness</option><option value="internet">Internet</option><option value="appliance">Appliance</option><option value="structural">Structural</option><option value="general">General</option><option value="other">Other</option></select>
          </div>
        </div>
        <div class="frow">
          <div class="fg"><label>Priority *</label>
            <select id="mi-pri"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option><option value="critical">Critical</option></select>
          </div>
          <div class="fg"><label>Room</label><select id="mi-room"><option value="">All / Common Area</option></select></div>
        </div>
        <div class="frow full">
          <div class="fg"><label>Description</label><textarea id="mi-desc" placeholder="Describe the issue…"></textarea></div>
        </div>
      </div>
      <div class="mfoot">
        <button class="bcancel" onclick="closeModal('m-maint')">Cancel</button>
        <button class="bsubmit" id="mi-save-btn" onclick="saveMaint()">Log Issue</button>
      </div>
    </div>
  </div>`;
}

async function openMaintModal() {
  try {
    const rooms = await Rooms.list(currentHostelId);
    const sel = document.getElementById('mi-room');
    if (sel) sel.innerHTML = '<option value="">All / Common Area</option>' +
      rooms.map(r => `<option value="${r.id}">Room ${r.room_number}</option>`).join('');
  } catch (_) {}
  ['mi-title','mi-desc'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  openModal('m-maint');
}

async function saveMaint() {
  const title = document.getElementById('mi-title').value.trim();
  if (!title) { mToast('Title is required', 'error'); return; }
  const btn = document.getElementById('mi-save-btn');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    await Maintenance.create({
      hostel_id:   currentHostelId,
      title,
      category:    document.getElementById('mi-cat').value,
      priority:    document.getElementById('mi-pri').value,
      room_id:     document.getElementById('mi-room').value || null,
      description: document.getElementById('mi-desc').value.trim() || null,
      reported_by: currentUser.id,
    });
    closeModal('m-maint');
    mToast('Issue logged', 'success');
    renderMMaint();
  } catch (e) {
    mToast(e.message, 'error');
    btn.disabled = false; btn.textContent = 'Log Issue';
  }
}

async function resolveMaint(id) {
  const notes = prompt('Resolution notes (optional):') || '';
  try {
    await Maintenance.resolve(id, notes);
    mToast('Issue marked resolved', 'success');
    renderMMaint();
  } catch (e) { mToast(e.message, 'error'); }
}

// ── NOTICES ──
async function renderMNotices() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const notices = await Notices.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Notices</h2><button class="mb mb-gold" onclick="openNoticeModal()">+ Post Notice</button></div>
      <div class="notices-list">
        ${notices.length === 0
          ? '<div class="widget-empty">No active notices</div>'
          : notices.map(n => `
            <div class="notice-card ${n.priority === 'urgent' ? 'notice-urgent' : ''}">
              <div class="nc-top">
                <span class="badge badge-${n.priority === 'urgent' ? 'red' : 'muted'}">${n.priority}</span>
                <span class="badge">${n.category}</span>
                <span class="nc-date">${_fdate(n.created_at)}</span>
              </div>
              <div class="nc-title">${n.title}</div>
              <div class="nc-body">${n.body}</div>
              <button class="mb mb-sm mb-red" onclick="deleteNotice('${n.id}')">Remove</button>
            </div>`).join('')}
      </div>
      <div id="m-notice" class="modal-ov" style="display:none">
        <div class="modal">
          <div class="mhdr"><h3>Post Notice</h3><button class="mx" onclick="closeModal('m-notice')">✕</button></div>
          <div class="mbody">
            <div class="frow">
              <div class="fg"><label>Title *</label><input id="n-title" placeholder="Notice title"></div>
              <div class="fg"><label>Category</label>
                <select id="n-cat"><option value="general">General</option><option value="payment">Payment</option><option value="maintenance">Maintenance</option><option value="rules">Rules & Regulations</option><option value="event">Event</option><option value="emergency">Emergency</option></select>
              </div>
            </div>
            <div class="frow">
              <div class="fg"><label>Priority</label>
                <select id="n-pri"><option value="normal">Normal</option><option value="urgent">Urgent</option></select>
              </div>
            </div>
            <div class="frow full">
              <div class="fg"><label>Message *</label><textarea id="n-body" placeholder="Notice content…" rows="4"></textarea></div>
            </div>
          </div>
          <div class="mfoot">
            <button class="bcancel" onclick="closeModal('m-notice')">Cancel</button>
            <button class="bsubmit" id="n-save-btn" onclick="saveNotice()">Post Notice</button>
          </div>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function openNoticeModal() {
  ['n-title','n-body'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  openModal('m-notice');
}

async function saveNotice() {
  const title = document.getElementById('n-title').value.trim();
  const body  = document.getElementById('n-body').value.trim();
  if (!title || !body) { mToast('Title and message are required', 'error'); return; }
  const btn = document.getElementById('n-save-btn');
  btn.disabled = true; btn.textContent = 'Posting…';
  try {
    await Notices.create({ hostel_id: currentHostelId, title, body, category: document.getElementById('n-cat').value, priority: document.getElementById('n-pri').value, posted_by: currentUser.id });
    closeModal('m-notice');
    mToast('Notice posted', 'success');
    renderMNotices();
  } catch (e) { mToast(e.message, 'error'); btn.disabled=false; btn.textContent='Post Notice'; }
}

async function deleteNotice(id) {
  if (!confirm('Remove this notice?')) return;
  try { await Notices.remove(id); mToast('Notice removed', 'success'); renderMNotices(); }
  catch (e) { mToast(e.message, 'error'); }
}

// ── EXPENSES ──
async function renderMExpenses() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const items = await Expenses.list(currentHostelId);
    const total = items.reduce((s, e) => s + Number(e.amount), 0);
    tc.innerHTML = `
      <div class="tab-header"><h2>Expenses</h2><span style="color:var(--muted);font-size:.9rem">Total: Rs. ${_fmt(total)}</span><button class="mb mb-gold" onclick="openExpenseModal()">+ Add Expense</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Description</th><th></th></tr></thead>
          <tbody>${items.length === 0
            ? '<tr><td colspan="5" class="empty-td">No expenses recorded</td></tr>'
            : items.map(e => `<tr>
                <td>${_fdate(e.expense_date)}</td>
                <td><span class="badge">${e.category}</span></td>
                <td>Rs. ${_fmt(e.amount)}</td>
                <td>${e.description||'—'}</td>
                <td><button class="mb mb-sm mb-red" onclick="deleteExpense('${e.id}')">Delete</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div id="m-expense" class="modal-ov" style="display:none">
        <div class="modal">
          <div class="mhdr"><h3>Add Expense</h3><button class="mx" onclick="closeModal('m-expense')">✕</button></div>
          <div class="mbody">
            <div class="frow">
              <div class="fg"><label>Category *</label>
                <select id="ex-cat"><option value="maintenance">Maintenance</option><option value="utilities">Utilities</option><option value="salaries">Salaries</option><option value="groceries">Groceries</option><option value="furniture">Furniture</option><option value="equipment">Equipment</option><option value="supplies">Supplies</option><option value="cleaning">Cleaning</option><option value="marketing">Marketing</option><option value="miscellaneous">Miscellaneous</option><option value="other">Other</option></select>
              </div>
              <div class="fg"><label>Amount (Rs.) *</label><input id="ex-amount" type="number" placeholder="5000"></div>
            </div>
            <div class="frow">
              <div class="fg"><label>Date *</label><input id="ex-date" type="date" value="${_today()}"></div>
            </div>
            <div class="frow full">
              <div class="fg"><label>Description</label><textarea id="ex-desc" placeholder="What was this expense for?"></textarea></div>
            </div>
          </div>
          <div class="mfoot">
            <button class="bcancel" onclick="closeModal('m-expense')">Cancel</button>
            <button class="bsubmit" id="ex-save-btn" onclick="saveExpense()">Add Expense</button>
          </div>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function openExpenseModal() {
  ['ex-amount','ex-desc'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('ex-date').value = _today();
  openModal('m-expense');
}

async function saveExpense() {
  const amount = parseFloat(document.getElementById('ex-amount').value);
  if (!amount) { mToast('Amount is required', 'error'); return; }
  const btn = document.getElementById('ex-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    await Expenses.create({ hostel_id: currentHostelId, category: document.getElementById('ex-cat').value, amount, description: document.getElementById('ex-desc').value.trim()||null, expense_date: document.getElementById('ex-date').value, added_by: currentUser.id });
    closeModal('m-expense'); mToast('Expense added','success'); renderMExpenses();
  } catch (e) { mToast(e.message,'error'); btn.disabled=false; btn.textContent='Add Expense'; }
}

async function deleteExpense(id) {
  if (!confirm('Delete this expense?')) return;
  try { await Expenses.remove(id); mToast('Expense deleted','success'); renderMExpenses(); }
  catch (e) { mToast(e.message,'error'); }
}

// ── BILLS ──
async function renderMBills() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const bills = await Bills.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Utility Bills</h2><button class="mb mb-gold" onclick="openBillModal()">+ Add Bill</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Month</th><th>Type</th><th>Amount</th><th>Due</th><th>Status</th><th></th></tr></thead>
          <tbody>${bills.length === 0
            ? '<tr><td colspan="6" class="empty-td">No bills recorded</td></tr>'
            : bills.map(b => `<tr>
                <td>${_mlabel(b.month)}</td>
                <td><span class="badge">${b.type}</span></td>
                <td>Rs. ${_fmt(b.amount)}</td>
                <td>${b.due_date ? _fdate(b.due_date) : '—'}</td>
                <td><span class="badge badge-${b.status==='paid'?'green':b.status==='overdue'?'red':'orange'}">${b.status}</span></td>
                <td>${b.status !== 'paid' ? `<button class="mb mb-sm mb-green" onclick="markBillPaid('${b.id}')">Mark Paid</button>` : _fdate(b.paid_on)}
                <button class="mb mb-sm mb-red" onclick="deleteBill('${b.id}')">Del</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div id="m-bill" class="modal-ov" style="display:none">
        <div class="modal">
          <div class="mhdr"><h3>Add Utility Bill</h3><button class="mx" onclick="closeModal('m-bill')">✕</button></div>
          <div class="mbody">
            <div class="frow">
              <div class="fg"><label>Type *</label>
                <select id="bl-type"><option value="electricity">Electricity</option><option value="gas">Gas</option><option value="water">Water</option><option value="internet">Internet</option><option value="cable">Cable</option><option value="other">Other</option></select>
              </div>
              <div class="fg"><label>Month *</label><input id="bl-month" type="month" value="${_curMonth()}"></div>
            </div>
            <div class="frow">
              <div class="fg"><label>Amount (Rs.) *</label><input id="bl-amount" type="number" placeholder="3000"></div>
              <div class="fg"><label>Due Date</label><input id="bl-due" type="date"></div>
            </div>
            <div class="frow full"><div class="fg"><label>Notes</label><textarea id="bl-notes" placeholder="Optional notes"></textarea></div></div>
          </div>
          <div class="mfoot">
            <button class="bcancel" onclick="closeModal('m-bill')">Cancel</button>
            <button class="bsubmit" id="bl-save-btn" onclick="saveBill()">Add Bill</button>
          </div>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function openBillModal() {
  ['bl-amount','bl-notes','bl-due'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('bl-month').value = _curMonth();
  openModal('m-bill');
}

async function saveBill() {
  const amount = parseFloat(document.getElementById('bl-amount').value);
  if (!amount) { mToast('Amount is required','error'); return; }
  const btn = document.getElementById('bl-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    await Bills.create({ hostel_id: currentHostelId, type: document.getElementById('bl-type').value, month: document.getElementById('bl-month').value, amount, due_date: document.getElementById('bl-due').value||null, notes: document.getElementById('bl-notes').value.trim()||null, added_by: currentUser.id });
    closeModal('m-bill'); mToast('Bill added','success'); renderMBills();
  } catch (e) { mToast(e.message,'error'); btn.disabled=false; btn.textContent='Add Bill'; }
}

async function markBillPaid(id) {
  try { await Bills.markPaid(id); mToast('Bill marked paid','success'); renderMBills(); }
  catch (e) { mToast(e.message,'error'); }
}

async function deleteBill(id) {
  if (!confirm('Delete this bill?')) return;
  try { await Bills.remove(id); mToast('Bill deleted','success'); renderMBills(); }
  catch (e) { mToast(e.message,'error'); }
}

// ── STAFF ──
async function renderMStaff() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const staff = await Staff.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Staff</h2><button class="mb mb-gold" onclick="openStaffModal()">+ Add Staff</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Salary</th><th>Join Date</th><th>Status</th><th></th></tr></thead>
          <tbody>${staff.length === 0
            ? '<tr><td colspan="7" class="empty-td">No staff records</td></tr>'
            : staff.map(s => `<tr class="${s.status!=='active'?'row-inactive':''}">
                <td>${s.name}</td><td>${s.role}</td><td>${s.phone||'—'}</td>
                <td>${s.salary ? 'Rs. '+_fmt(s.salary) : '—'}</td>
                <td>${_fdate(s.join_date)}</td>
                <td><span class="badge badge-${s.status==='active'?'green':'muted'}">${s.status}</span></td>
                <td>${s.status==='active' ? `<button class="mb mb-sm mb-red" onclick="deactivateStaff('${s.id}','${s.name.replace(/'/g,"\\'")}')">Remove</button>` : ''}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div id="m-staff" class="modal-ov" style="display:none">
        <div class="modal">
          <div class="mhdr"><h3>Add Staff Member</h3><button class="mx" onclick="closeModal('m-staff')">✕</button></div>
          <div class="mbody">
            <div class="frow">
              <div class="fg"><label>Full Name *</label><input id="sf-name" placeholder="Ahmad Ali"></div>
              <div class="fg"><label>Role *</label>
                <select id="sf-role"><option value="receptionist">Receptionist</option><option value="guard">Guard</option><option value="cleaner">Cleaner</option><option value="cook">Cook</option><option value="helper">Helper</option><option value="maintenance">Maintenance</option><option value="accountant">Accountant</option><option value="other">Other</option></select>
              </div>
            </div>
            <div class="frow">
              <div class="fg"><label>Phone</label><input id="sf-phone" placeholder="+92 300..."></div>
              <div class="fg"><label>CNIC</label><input id="sf-cnic" placeholder="35202-XXXXXXX-X"></div>
            </div>
            <div class="frow">
              <div class="fg"><label>Monthly Salary (Rs.)</label><input id="sf-salary" type="number" placeholder="15000"></div>
              <div class="fg"><label>Join Date</label><input id="sf-join" type="date" value="${_today()}"></div>
            </div>
          </div>
          <div class="mfoot">
            <button class="bcancel" onclick="closeModal('m-staff')">Cancel</button>
            <button class="bsubmit" id="sf-save-btn" onclick="saveStaff()">Add Staff</button>
          </div>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function openStaffModal() {
  ['sf-name','sf-phone','sf-cnic','sf-salary'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('sf-join').value = _today();
  openModal('m-staff');
}

async function saveStaff() {
  const name = document.getElementById('sf-name').value.trim();
  if (!name) { mToast('Name is required','error'); return; }
  const btn = document.getElementById('sf-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    await Staff.create({ hostel_id: currentHostelId, name, role: document.getElementById('sf-role').value, phone: document.getElementById('sf-phone').value.trim()||null, cnic: document.getElementById('sf-cnic').value.trim()||null, salary: parseFloat(document.getElementById('sf-salary').value)||null, join_date: document.getElementById('sf-join').value||null });
    closeModal('m-staff'); mToast('Staff added','success'); renderMStaff();
  } catch (e) { mToast(e.message,'error'); btn.disabled=false; btn.textContent='Add Staff'; }
}

async function deactivateStaff(id, name) {
  if (!confirm('Remove '+name+' from active staff?')) return;
  try { await Staff.deactivate(id); mToast(name+' removed','success'); renderMStaff(); }
  catch (e) { mToast(e.message,'error'); }
}

// ── VISITORS ──
async function renderMVisitors() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const visitors = await Visitors.list(currentHostelId);
    tc.innerHTML = `
      <div class="tab-header"><h2>Visitor Log</h2><button class="mb mb-gold" onclick="openVisitorModal()">+ Log Visitor</button></div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Name</th><th>Phone</th><th>Visiting</th><th>Purpose</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>${visitors.length === 0
            ? '<tr><td colspan="7" class="empty-td">No visitor records</td></tr>'
            : visitors.map(v => `<tr>
                <td>${v.name}</td><td>${v.phone||'—'}</td>
                <td>${v.tenants?.name||'—'}</td>
                <td>${v.purpose||'—'}</td>
                <td>${_fdate(v.visit_date)}</td>
                <td><span class="badge badge-${v.status==='checked-out'?'muted':'green'}">${v.status}</span></td>
                <td>${v.status==='checked-in' ? `<button class="mb mb-sm" onclick="checkoutVisitor('${v.id}')">Check Out</button>` : _fdate(v.checked_out_at)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div id="m-visitor" class="modal-ov" style="display:none">
        <div class="modal">
          <div class="mhdr"><h3>Log Visitor</h3><button class="mx" onclick="closeModal('m-visitor')">✕</button></div>
          <div class="mbody">
            <div class="frow">
              <div class="fg"><label>Visitor Name *</label><input id="vt-name" placeholder="Visitor name"></div>
              <div class="fg"><label>Phone</label><input id="vt-phone" placeholder="+92 300..."></div>
            </div>
            <div class="frow">
              <div class="fg"><label>CNIC</label><input id="vt-cnic" placeholder="Optional"></div>
              <div class="fg"><label>Visiting Tenant</label><select id="vt-tenant"><option value="">Select tenant…</option></select></div>
            </div>
            <div class="frow">
              <div class="fg"><label>Visit Date *</label><input id="vt-date" type="date" value="${_today()}"></div>
              <div class="fg"><label>Purpose</label><input id="vt-purpose" placeholder="Personal visit, delivery…"></div>
            </div>
          </div>
          <div class="mfoot">
            <button class="bcancel" onclick="closeModal('m-visitor')">Cancel</button>
            <button class="bsubmit" id="vt-save-btn" onclick="saveVisitor()">Log Check-In</button>
          </div>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function openVisitorModal() {
  try {
    const tenants = await Tenants.list(currentHostelId, { status: 'active' });
    const sel = document.getElementById('vt-tenant');
    if (sel) sel.innerHTML = '<option value="">Select tenant…</option>' +
      tenants.map(t => `<option value="${t.id}">${t.tid} — ${t.name}</option>`).join('');
  } catch (_) {}
  ['vt-name','vt-phone','vt-cnic','vt-purpose'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('vt-date').value = _today();
  openModal('m-visitor');
}

async function saveVisitor() {
  const name = document.getElementById('vt-name').value.trim();
  if (!name) { mToast('Visitor name is required','error'); return; }
  const btn = document.getElementById('vt-save-btn');
  btn.disabled=true; btn.textContent='Saving…';
  try {
    await Visitors.create({ hostel_id: currentHostelId, name, phone: document.getElementById('vt-phone').value.trim()||null, cnic: document.getElementById('vt-cnic').value.trim()||null, tenant_id: document.getElementById('vt-tenant').value||null, visit_date: document.getElementById('vt-date').value, purpose: document.getElementById('vt-purpose').value.trim()||null, logged_by: currentUser.id });
    closeModal('m-visitor'); mToast('Visitor checked in','success'); renderMVisitors();
  } catch (e) { mToast(e.message,'error'); btn.disabled=false; btn.textContent='Log Check-In'; }
}

async function checkoutVisitor(id) {
  try { await Visitors.checkout(id); mToast('Visitor checked out','success'); renderMVisitors(); }
  catch (e) { mToast(e.message,'error'); }
}

// ── ATTENDANCE ──
async function renderMAttendance() {
  const tc = tabContent(); if (!tc) return;
  const date = _today();
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const [tenants, attRecords] = await Promise.all([
      Tenants.list(currentHostelId, { status: 'active' }),
      Attendance.listByDate(currentHostelId, date, 'tenant'),
    ]);
    const attMap = Object.fromEntries(attRecords.map(a => [a.person_id, a.status]));
    tc.innerHTML = `
      <div class="tab-header"><h2>Attendance</h2><div style="font-size:.85rem;color:var(--muted)">${_fdate(date)}</div></div>
      <div class="att-grid">
        ${tenants.map(t => {
          const s = attMap[t.id] || '';
          return `<div class="att-card att-${s||'none'}">
            <div class="att-name">${t.name}</div>
            <div class="att-tid">${t.tid} · Room ${t.rooms?.room_number||'—'}</div>
            <div class="att-btns">
              <button class="mb mb-sm mb-green ${s==='present'?'mb-active':''}" onclick="markAttendance('${t.id}','present','${date}',this)">Present</button>
              <button class="mb mb-sm mb-red ${s==='absent'?'mb-active':''}"   onclick="markAttendance('${t.id}','absent','${date}',this)">Absent</button>
              <button class="mb mb-sm ${s==='leave'?'mb-active':''}"           onclick="markAttendance('${t.id}','leave','${date}',this)">Leave</button>
            </div>
          </div>`;
        }).join('')}
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function markAttendance(personId, status, date, btn) {
  try {
    await Attendance.upsert({ hostel_id: currentHostelId, person_type: 'tenant', person_id: personId, date, status, recorded_by: currentUser.id });
    // Update UI without full re-render
    const card = btn.closest('.att-card');
    card.className = 'att-card att-' + status;
    card.querySelectorAll('.att-btns button').forEach(b => b.classList.remove('mb-active'));
    btn.classList.add('mb-active');
  } catch (e) { mToast(e.message,'error'); }
}

// ── SETTINGS ──
async function renderMSettings() {
  const tc = tabContent(); if (!tc) return;
  tc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const [hostel, settings] = await Promise.all([
      Hostels.getById(currentHostelId),
      Settings.get(currentHostelId).catch(() => ({})),
    ]);
    tc.innerHTML = `
      <div class="tab-header"><h2>Settings</h2></div>
      <div class="settings-sections">
        <div class="settings-section">
          <h3>Hostel Profile</h3>
          <div class="frow">
            <div class="fg"><label>Hostel Name</label><input id="hs-name" value="${hostel.name||''}"></div>
            <div class="fg"><label>Phone</label><input id="hs-phone" value="${hostel.phone||''}"></div>
          </div>
          <div class="frow">
            <div class="fg"><label>WhatsApp</label><input id="hs-wa" value="${hostel.whatsapp||''}"></div>
            <div class="fg"><label>Website URL</label><input id="hs-url" placeholder="https://..." value="${hostel.website_url||''}"></div>
          </div>
          <div class="frow full">
            <div class="fg"><label>Description</label><textarea id="hs-desc">${hostel.description||''}</textarea></div>
          </div>
          <button class="mb mb-gold" onclick="saveHostelProfile()">Save Profile</button>
        </div>
        <div class="settings-section">
          <h3>Portal Settings</h3>
          <div class="frow">
            <div class="fg"><label>Banner Text</label><input id="st-banner" value="${settings?.banner_text||''}" placeholder="Special announcement…"></div>
            <div class="fg"><label>Offer Tag</label><input id="st-offer" value="${settings?.offer_tag||''}" placeholder="First month 50% off"></div>
          </div>
          <div class="frow">
            <div class="fg"><label>Rent Due Day (of month)</label><input id="st-due" type="number" min="1" max="28" value="${settings?.rent_due_day||5}"></div>
            <div class="fg"><label>Late Fee (Rs.)</label><input id="st-fee" type="number" value="${settings?.late_fee||''}"></div>
          </div>
          <button class="mb mb-gold" onclick="savePortalSettings()">Save Settings</button>
        </div>
        <div class="settings-section">
          <h3>Data</h3>
          <button class="mb" onclick="exportData()">⬇ Export All Data (JSON)</button>
        </div>
      </div>`;
  } catch (e) { tc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function saveHostelProfile() {
  try {
    await Hostels.update(currentHostelId, { name: document.getElementById('hs-name').value.trim(), phone: document.getElementById('hs-phone').value.trim()||null, whatsapp: document.getElementById('hs-wa').value.trim()||null, website_url: document.getElementById('hs-url').value.trim()||null, description: document.getElementById('hs-desc').value.trim()||null });
    mToast('Profile saved','success');
  } catch (e) { mToast(e.message,'error'); }
}

async function savePortalSettings() {
  try {
    await Settings.save(currentHostelId, { banner_text: document.getElementById('st-banner').value.trim()||null, offer_tag: document.getElementById('st-offer').value.trim()||null, rent_due_day: parseInt(document.getElementById('st-due').value)||5, late_fee: parseFloat(document.getElementById('st-fee').value)||null });
    mToast('Settings saved','success');
  } catch (e) { mToast(e.message,'error'); }
}

async function exportData() {
  try {
    const [tenants, payments, maintenance, expenses, bills, staff, notices] = await Promise.all([
      Tenants.list(currentHostelId), Payments.listByMonth(currentHostelId, _curMonth()),
      Maintenance.list(currentHostelId), Expenses.list(currentHostelId),
      Bills.list(currentHostelId), Staff.list(currentHostelId), Notices.list(currentHostelId),
    ]);
    const data = { exported: new Date().toISOString(), hostel_id: currentHostelId, tenants, payments, maintenance, expenses, bills, staff, notices };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lbh-export-' + _today() + '.json';
    a.click();
  } catch (e) { mToast(e.message,'error'); }
}

// ─── ADMIN PORTAL ────────────────────────────────────────────
async function renderAdmin() {
  const mc = document.getElementById('p-main-content'); if (!mc) return;
  mc.innerHTML = '<div class="loading">Loading network overview…</div>';
  try {
    const hostels = await Hostels.listActive();
    mc.innerHTML = `
      <div class="admin-layout">
        <div class="tab-header"><h2>Network Overview</h2><span style="color:var(--muted);font-size:.85rem">${hostels.length} active hostels</span></div>
        <div class="admin-grid">
          ${hostels.map(h => `
            <div class="admin-hostel-card">
              <div class="ahc-name">${h.name}</div>
              <div class="ahc-area">📍 ${h.area}, ${h.city}</div>
              <div class="ahc-price">From Rs. ${_fmt(h.price_from||0)}/mo</div>
              <div class="ahc-tags">${(h.amenities||[]).slice(0,3).map(a=>`<span class="htag">${a}</span>`).join('')}</div>
              <button class="mb mb-sm mb-gold" onclick="adminManageHostel('${h.id}')">Manage →</button>
            </div>`).join('')}
        </div>
      </div>`;
  } catch (e) { mc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

function adminManageHostel(hostelId) {
  currentHostelId = hostelId;
  renderManager('dashboard');
}

// ─── FINANCE PORTAL ──────────────────────────────────────────
let finTab = 'overview';
async function renderFinance(tab) {
  finTab = tab || finTab;
  const mc = document.getElementById('p-main-content'); if (!mc) return;
  mc.innerHTML = `
    <div class="tab-header"><h2>Finance</h2></div>
    <div class="subtabs">
      <button class="stab ${finTab==='overview'?'active':''}"   onclick="renderFinance('overview')">Overview</button>
      <button class="stab ${finTab==='summary'?'active':''}"    onclick="renderFinance('summary')">Monthly Summary</button>
    </div>
    <div id="fin-content"><div class="loading">Loading…</div></div>`;
  if (finTab === 'overview')  renderFinOverview();
  if (finTab === 'summary')   renderFinSummary();
}

async function renderFinOverview() {
  const el = document.getElementById('fin-content'); if (!el) return;
  try {
    const pays = await Payments.listByMonth(currentHostelId, _curMonth());
    const tenants = await Tenants.list(currentHostelId, { status: 'active' });
    const total = pays.reduce((s,p) => s+Number(p.amount),0);
    const expected = tenants.reduce((s,t) => s+Number(t.rent),0);
    el.innerHTML = `
      <div class="stat-grid">
        ${statCard('Expected ('+_mlabel(_curMonth())+')', 'Rs. '+_fmt(expected), '📋', 'blue')}
        ${statCard('Collected', 'Rs. '+_fmt(total), '💰', 'gold')}
        ${statCard('Outstanding', 'Rs. '+_fmt(Math.max(0,expected-total)), '⚠', 'red')}
        ${statCard('Collection Rate', expected ? Math.round((total/expected)*100)+'%' : '—', '📊', total>=expected?'green':'orange')}
      </div>
      <h4 style="margin:1.5rem 0 .5rem">All Payments — ${_mlabel(_curMonth())}</h4>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Tenant</th><th>Amount</th><th>Type</th><th>Method</th><th>Date</th></tr></thead>
        <tbody>${pays.map(p=>`<tr>
          <td>${p.tenants?.name||p.tenant_id}</td>
          <td>Rs. ${_fmt(p.amount)}</td>
          <td><span class="badge badge-blue">${p.type}</span></td>
          <td>${p.method}</td><td>${_fdate(p.payment_date)}</td>
        </tr>`).join('')||'<tr><td colspan="5" class="empty-td">No payments this month</td></tr>'}
        </tbody>
      </table></div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

async function renderFinSummary() {
  const el = document.getElementById('fin-content'); if (!el) return;
  try {
    const summary = await Payments.summary(currentHostelId);
    el.innerHTML = summary.length === 0
      ? '<div class="widget-empty">No payment data yet</div>'
      : `<div class="table-wrap"><table class="data-table">
          <thead><tr><th>Month</th><th>Payments</th><th>Regular</th><th>Advance</th><th>Security</th><th>Total</th></tr></thead>
          <tbody>${summary.map(s=>`<tr>
            <td>${_mlabel(s.month)}</td>
            <td>${s.payment_count}</td>
            <td>Rs. ${_fmt(s.regular_total||0)}</td>
            <td>Rs. ${_fmt(s.advance_total||0)}</td>
            <td>Rs. ${_fmt(s.security_total||0)}</td>
            <td><strong>Rs. ${_fmt(s.total_collected||0)}</strong></td>
          </tr>`).join('')}</tbody>
        </table></div>`;
  } catch (e) { el.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

// ─── HOSTELITE PORTAL ─────────────────────────────────────────
async function renderHostelite() {
  const mc = document.getElementById('p-main-content'); if (!mc) return;
  mc.innerHTML = '<div class="loading">Loading your dashboard…</div>';
  try {
    const { data: tenantRows } = await _db.from('tenants').select('*,rooms(room_number,floor,type)').eq('profile_id', currentUser.id).limit(1);
    const tenant = tenantRows?.[0];
    if (!tenant) { mc.innerHTML = '<div class="widget-empty">Your tenant profile is not yet linked. Please contact your manager.</div>'; return; }
    const [pays, notices] = await Promise.all([
      Payments.listByTenant(tenant.id, 12),
      Notices.list(tenant.hostel_id),
    ]);
    const thisMonthPaid = pays.some(p => p.month === _curMonth() && p.type === 'regular');
    mc.innerHTML = `
      <div class="hostelite-layout">
        <h2>Welcome, ${tenant.name.split(' ')[0]} 👋</h2>
        <div class="stat-grid">
          ${statCard('Monthly Rent', 'Rs. '+_fmt(tenant.rent), '💰', 'blue')}
          ${statCard('This Month', thisMonthPaid ? 'Paid ✓' : 'Pending', '📅', thisMonthPaid ? 'green' : 'red')}
          ${statCard('Room', tenant.rooms?.room_number || '—', '🛏', 'muted')}
          ${statCard('Since', _fdate(tenant.move_in_date), '📆', 'muted')}
        </div>
        <div class="detail-grid" style="margin:1.5rem 0">
          ${mFld('Tenant ID', tenant.tid)} ${mFld('CNIC', tenant.cnic||'—')}
          ${mFld('Phone', tenant.phone)} ${mFld('Room Type', tenant.rooms?.type||'—')}
        </div>
        <h3>Recent Notices</h3>
        <div class="notices-list">
          ${notices.slice(0,3).map(n=>`<div class="notice-card ${n.priority==='urgent'?'notice-urgent':''}">
            <div class="nc-top"><span class="badge badge-${n.priority==='urgent'?'red':'muted'}">${n.priority}</span><span class="nc-date">${_fdate(n.created_at)}</span></div>
            <div class="nc-title">${n.title}</div><div class="nc-body">${n.body}</div>
          </div>`).join('') || '<div class="widget-empty">No notices</div>'}
        </div>
        <h3>Payment History</h3>
        <div class="table-wrap"><table class="data-table">
          <thead><tr><th>Month</th><th>Amount</th><th>Type</th><th>Date</th></tr></thead>
          <tbody>${pays.map(p=>`<tr><td>${_mlabel(p.month)}</td><td>Rs. ${_fmt(p.amount)}</td><td>${p.type}</td><td>${_fdate(p.payment_date)}</td></tr>`).join('')||'<tr><td colspan="4" class="empty-td">No payments recorded</td></tr>'}</tbody>
        </table></div>
      </div>`;
  } catch (e) { mc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}

// ─── STAFF PORTAL ─────────────────────────────────────────────
async function renderStaff() {
  const mc = document.getElementById('p-main-content'); if (!mc) return;
  mc.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const { data: staffRows } = await _db.from('staff').select('*').eq('profile_id', currentUser.id).limit(1);
    const s = staffRows?.[0];
    if (!s) { mc.innerHTML = '<div class="widget-empty">Staff profile not linked. Contact your manager.</div>'; return; }
    const todayAtt = await Attendance.listByDate(s.hostel_id, _today(), 'staff');
    const att = todayAtt.find(a => a.person_id === s.id);
    mc.innerHTML = `
      <div class="hostelite-layout">
        <h2>Staff Portal — ${s.name}</h2>
        <div class="stat-grid">
          ${statCard('Role', s.role, '👤', 'blue')}
          ${statCard('Salary', s.salary ? 'Rs. '+_fmt(s.salary) : '—', '💰', 'muted')}
          ${statCard('Joined', _fdate(s.join_date), '📅', 'muted')}
          ${statCard('Status', s.status, '✓', s.status==='active'?'green':'red')}
        </div>
        <div class="widget" style="margin-top:1.5rem">
          <div class="widget-title">Today's Attendance — ${_fdate(_today())}</div>
          ${att
            ? `<div>Clock In: <strong>${att.clock_in||'—'}</strong> &nbsp; Clock Out: <strong>${att.clock_out||'—'}</strong></div>`
            : '<div class="widget-empty">Not clocked in today</div>'}
        </div>
      </div>`;
  } catch (e) { mc.innerHTML = `<div class="error-state">${e.message}</div>`; }
}
