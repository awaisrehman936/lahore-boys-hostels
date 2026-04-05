// ============================================================
// SUPABASE CLIENT — Auth + Database Layer
// LBH Platform v2.0
// ============================================================

const { createClient } = supabase;
const _db = createClient(LBH_CONFIG.supabaseUrl, LBH_CONFIG.supabaseKey);

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

const Auth = {

  async signIn(email, password) {
    const { data, error } = await _db.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await _db.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session } } = await _db.auth.getSession();
    return session;
  },

  async getUser() {
    const { data: { user } } = await _db.auth.getUser();
    return user;
  },

  // Fetch the full profile (role, hostel_id, name) for the logged-in user
  async getProfile() {
    const user = await Auth.getUser();
    if (!user) return null;
    const { data, error } = await _db
      .from('profiles')
      .select('*, hostels(id, name, slug, prefix, area, phone, whatsapp)')
      .eq('id', user.id)
      .single();
    if (error) throw error;
    return data;
  },

  // Listen to auth state changes (login / logout)
  onAuthChange(callback) {
    return _db.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  },

  // Request password reset email
  async resetPassword(email) {
    const { error } = await _db.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/portal-reset.html',
    });
    if (error) throw error;
  },
};


// ─────────────────────────────────────────────
// DATABASE — generic helpers
// ─────────────────────────────────────────────

// Unwrap Supabase response; throws on error
async function _query(promise) {
  const { data, error } = await promise;
  if (error) throw error;
  return data;
}

// ─────────────────────────────────────────────
// HOSTELS
// ─────────────────────────────────────────────

const Hostels = {

  // Public directory — all active hostels
  async listActive() {
    return _query(_db.from('hostels').select('*').eq('status', 'active').order('name'));
  },

  // Single hostel by slug (public)
  async getBySlug(slug) {
    return _query(_db.from('hostels').select('*').eq('slug', slug).single());
  },

  // Single hostel by id
  async getById(id) {
    return _query(_db.from('hostels').select('*').eq('id', id).single());
  },

  // Update hostel profile (manager/admin)
  async update(id, fields) {
    return _query(_db.from('hostels').update(fields).eq('id', id).select().single());
  },

  // Admin: create a new hostel
  async create(fields) {
    return _query(_db.from('hostels').insert(fields).select().single());
  },
};


// ─────────────────────────────────────────────
// ROOMS
// ─────────────────────────────────────────────

const Rooms = {

  async list(hostelId) {
    return _query(_db.from('rooms').select('*').eq('hostel_id', hostelId).order('floor').order('room_number'));
  },

  // With live occupancy counts from the view
  async listWithOccupancy(hostelId) {
    return _query(_db.from('v_room_occupancy').select('*').eq('hostel_id', hostelId).order('floor').order('room_number'));
  },

  async get(id) {
    return _query(_db.from('rooms').select('*').eq('id', id).single());
  },

  async create(fields) {
    return _query(_db.from('rooms').insert(fields).select().single());
  },

  async update(id, fields) {
    return _query(_db.from('rooms').update(fields).eq('id', id).select().single());
  },

  async remove(id) {
    return _query(_db.from('rooms').delete().eq('id', id));
  },
};


// ─────────────────────────────────────────────
// TENANTS
// ─────────────────────────────────────────────

const Tenants = {

  async list(hostelId, { status = 'all', search = '' } = {}) {
    let q = _db.from('tenants').select('*, rooms(room_number, floor, type)').eq('hostel_id', hostelId).order('name');
    if (status !== 'all') q = q.eq('status', status);
    if (search) q = q.or(`name.ilike.%${search}%,phone.ilike.%${search}%,tid.ilike.%${search}%`);
    return _query(q);
  },

  async get(id) {
    return _query(_db.from('tenants').select('*, rooms(room_number, floor, type)').eq('id', id).single());
  },

  async getByTid(tid) {
    return _query(_db.from('tenants').select('*, rooms(room_number, floor, type)').eq('tid', tid).single());
  },

  async create(fields) {
    return _query(_db.from('tenants').insert(fields).select().single());
  },

  async update(id, fields) {
    return _query(_db.from('tenants').update(fields).eq('id', id).select().single());
  },

  // Soft deactivate — sets status + move_out_date
  async deactivate(id, moveOutDate) {
    return _query(_db.from('tenants').update({
      status: 'inactive',
      move_out_date: moveOutDate || new Date().toISOString().slice(0, 10),
    }).eq('id', id).select().single());
  },
};


// ─────────────────────────────────────────────
// PAYMENTS
// ─────────────────────────────────────────────

const Payments = {

  // All payments for a hostel in a given month (YYYY-MM)
  async listByMonth(hostelId, month) {
    return _query(
      _db.from('payments')
        .select('*, tenants(tid, name, rent, room_id, rooms(room_number))')
        .eq('hostel_id', hostelId)
        .eq('month', month)
        .order('payment_date', { ascending: false })
    );
  },

  // All payments for a single tenant
  async listByTenant(tenantId, limit = 24) {
    return _query(
      _db.from('payments')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('month', { ascending: false })
        .limit(limit)
    );
  },

  // Running balance for a tenant (all time)
  async getBalance(tenantId) {
    const rows = await _query(
      _db.from('payments').select('month, amount, type').eq('tenant_id', tenantId).order('month')
    );
    const tenant = await Tenants.get(tenantId);
    let balance = 0;
    rows.forEach(p => {
      if (['regular', 'partial', 'advance', 'overpayment'].includes(p.type)) {
        balance += Number(p.amount);
      } else if (p.type === 'refund') {
        balance -= Number(p.amount);
      }
    });
    // balance vs expected (months since move-in × rent)
    const moveIn = new Date(tenant.move_in_date);
    const now    = new Date();
    const months = (now.getFullYear() - moveIn.getFullYear()) * 12 + (now.getMonth() - moveIn.getMonth()) + 1;
    const expected = months * Number(tenant.rent);
    return { paid: balance, expected, diff: balance - expected };
  },

  // Monthly summary for the finance view
  async summary(hostelId) {
    return _query(
      _db.from('v_payment_summary').select('*').eq('hostel_id', hostelId).order('month', { ascending: false })
    );
  },

  async create(fields) {
    return _query(_db.from('payments').insert(fields).select().single());
  },

  async remove(id) {
    return _query(_db.from('payments').delete().eq('id', id));
  },
};


// ─────────────────────────────────────────────
// MAINTENANCE
// ─────────────────────────────────────────────

const Maintenance = {

  async list(hostelId, { status = 'all' } = {}) {
    let q = _db.from('maintenance').select('*, rooms(room_number)').eq('hostel_id', hostelId).order('created_at', { ascending: false });
    if (status !== 'all') q = q.eq('status', status);
    return _query(q);
  },

  async create(fields) {
    return _query(_db.from('maintenance').insert(fields).select().single());
  },

  async update(id, fields) {
    return _query(_db.from('maintenance').update(fields).eq('id', id).select().single());
  },

  async resolve(id, notes = '') {
    return _query(_db.from('maintenance').update({ status: 'resolved', resolution_notes: notes }).eq('id', id).select().single());
  },
};


// ─────────────────────────────────────────────
// NOTICES
// ─────────────────────────────────────────────

const Notices = {

  async list(hostelId) {
    return _query(
      _db.from('notices').select('*').eq('hostel_id', hostelId).eq('is_active', true).order('created_at', { ascending: false })
    );
  },

  async create(fields) {
    return _query(_db.from('notices').insert(fields).select().single());
  },

  async remove(id) {
    return _query(_db.from('notices').update({ is_active: false }).eq('id', id));
  },
};


// ─────────────────────────────────────────────
// EXPENSES
// ─────────────────────────────────────────────

const Expenses = {

  async list(hostelId, { month = null } = {}) {
    let q = _db.from('expenses').select('*').eq('hostel_id', hostelId).order('expense_date', { ascending: false });
    if (month) {
      // Filter by YYYY-MM prefix
      q = q.gte('expense_date', month + '-01').lt('expense_date', _nextMonth(month) + '-01');
    }
    return _query(q);
  },

  async create(fields) {
    return _query(_db.from('expenses').insert(fields).select().single());
  },

  async remove(id) {
    return _query(_db.from('expenses').delete().eq('id', id));
  },
};


// ─────────────────────────────────────────────
// BILLS
// ─────────────────────────────────────────────

const Bills = {

  async list(hostelId) {
    return _query(
      _db.from('bills').select('*').eq('hostel_id', hostelId).order('month', { ascending: false })
    );
  },

  async create(fields) {
    return _query(_db.from('bills').insert(fields).select().single());
  },

  async markPaid(id) {
    return _query(_db.from('bills').update({ status: 'paid', paid_on: _today() }).eq('id', id).select().single());
  },

  async remove(id) {
    return _query(_db.from('bills').delete().eq('id', id));
  },
};


// ─────────────────────────────────────────────
// STAFF
// ─────────────────────────────────────────────

const Staff = {

  async list(hostelId) {
    return _query(
      _db.from('staff').select('*').eq('hostel_id', hostelId).order('name')
    );
  },

  async create(fields) {
    return _query(_db.from('staff').insert(fields).select().single());
  },

  async update(id, fields) {
    return _query(_db.from('staff').update(fields).eq('id', id).select().single());
  },

  async deactivate(id) {
    return _query(_db.from('staff').update({ status: 'inactive', leave_date: _today() }).eq('id', id));
  },
};


// ─────────────────────────────────────────────
// VISITORS
// ─────────────────────────────────────────────

const Visitors = {

  async list(hostelId, limit = 50) {
    return _query(
      _db.from('visitors').select('*, tenants(tid, name)').eq('hostel_id', hostelId).order('created_at', { ascending: false }).limit(limit)
    );
  },

  async create(fields) {
    return _query(_db.from('visitors').insert(fields).select().single());
  },

  async checkout(id) {
    return _query(_db.from('visitors').update({ status: 'checked-out' }).eq('id', id).select().single());
  },
};


// ─────────────────────────────────────────────
// ATTENDANCE
// ─────────────────────────────────────────────

const Attendance = {

  async listByDate(hostelId, date, personType = 'tenant') {
    return _query(
      _db.from('attendance').select('*').eq('hostel_id', hostelId).eq('date', date).eq('person_type', personType)
    );
  },

  async upsert(record) {
    return _query(
      _db.from('attendance').upsert(record, { onConflict: 'hostel_id,person_type,person_id,date' }).select().single()
    );
  },

  async clockIn(hostelId, staffId) {
    return Attendance.upsert({ hostel_id: hostelId, person_type: 'staff', person_id: staffId, date: _today(), clock_in: _timeNow() });
  },

  async clockOut(hostelId, staffId) {
    return _query(
      _db.from('attendance').update({ clock_out: _timeNow() })
        .eq('hostel_id', hostelId).eq('person_id', staffId).eq('date', _today()).select().single()
    );
  },
};


// ─────────────────────────────────────────────
// ACTIVITY LOG
// ─────────────────────────────────────────────

const ActivityLog = {

  async list(hostelId, limit = 30) {
    return _query(
      _db.from('activity_log')
        .select('*, profiles(full_name, role)')
        .eq('hostel_id', hostelId)
        .order('created_at', { ascending: false })
        .limit(limit)
    );
  },
};


// ─────────────────────────────────────────────
// APPLICATIONS (public lead capture)
// ─────────────────────────────────────────────

const Applications = {

  async submit(fields) {
    return _query(_db.from('applications').insert(fields).select().single());
  },

  async list(hostelId) {
    return _query(
      _db.from('applications').select('*').eq('hostel_id', hostelId).order('created_at', { ascending: false })
    );
  },

  async updateStatus(id, status, notes = '') {
    return _query(_db.from('applications').update({ status, notes }).eq('id', id).select().single());
  },
};


// ─────────────────────────────────────────────
// HOSTEL SETTINGS
// ─────────────────────────────────────────────

const Settings = {

  async get(hostelId) {
    return _query(_db.from('hostel_settings').select('*').eq('hostel_id', hostelId).single());
  },

  async save(hostelId, fields) {
    return _query(
      _db.from('hostel_settings').upsert({ hostel_id: hostelId, ...fields }, { onConflict: 'hostel_id' }).select().single()
    );
  },
};


// ─────────────────────────────────────────────
// UTILITY HELPERS (shared across all modules)
// ─────────────────────────────────────────────

function _today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function _curMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

function _timeNow() {
  return new Date().toTimeString().slice(0, 5); // HH:MM
}

function _nextMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m, 1); // m is already 1-based, Date uses 0-based so this = next month
  return d.toISOString().slice(0, 7);
}

function _fmt(n) {
  return new Intl.NumberFormat('en-PK').format(n);
}

function _fdate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' });
}

function _mlabel(ym) {
  if (!ym) return '—';
  const [y, m] = ym.split('-');
  return new Date(y, m - 1, 1).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
}

function _dbId() {
  return crypto.randomUUID();
}

// Months since a given date (inclusive of current month)
function _monthsSince(dateStr) {
  const start = new Date(dateStr);
  const now   = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
}
