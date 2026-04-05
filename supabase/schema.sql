-- ============================================================
-- HOSTEL MANAGEMENT SAAS - SUPABASE SQL SCHEMA
-- Version: 1.0  |  Platform: PostgreSQL 15 / Supabase
-- Run in: Supabase SQL Editor (as postgres / service_role)
-- ============================================================


-- ============================================================
-- SECTION 0: EXTENSIONS & HELPER FUNCTIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid());
END;
$$;

CREATE OR REPLACE FUNCTION public.get_my_hostel_id()
RETURNS UUID LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN (SELECT hostel_id FROM public.profiles WHERE id = auth.uid());
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at := NOW(); RETURN NEW; END;
$$;


-- ============================================================
-- SECTION 1: HOSTELS
-- ============================================================

CREATE TABLE public.hostels (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE,
  prefix           TEXT NOT NULL UNIQUE,        -- e.g. 'ARH' used in TID generation
  area             TEXT,
  city             TEXT NOT NULL DEFAULT 'Lahore',
  address          TEXT,
  phone            TEXT,
  whatsapp         TEXT,
  website_url      TEXT,
  email            TEXT,
  description      TEXT,
  amenities        TEXT[],
  room_types       TEXT[],
  price_from       NUMERIC(10,2),
  price_to         NUMERIC(10,2),
  total_capacity   INTEGER,
  rating           NUMERIC(3,2) CHECK (rating BETWEEN 0 AND 5),
  cover_image_url  TEXT,
  gallery_urls     TEXT[],
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('active','pending','inactive')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.hostel_set_slug()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REGEXP_REPLACE(
      REGEXP_REPLACE(NEW.name, '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )) || '-' || SUBSTRING(gen_random_uuid()::TEXT, 1, 6);
  END IF;
  NEW.prefix     := UPPER(NEW.prefix);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_hostel_slug
  BEFORE INSERT OR UPDATE ON public.hostels
  FOR EACH ROW EXECUTE FUNCTION public.hostel_set_slug();

CREATE TRIGGER trg_hostels_updated_at
  BEFORE UPDATE ON public.hostels
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hostels_public_read"    ON public.hostels FOR SELECT USING (status = 'active');
CREATE POLICY "hostels_admin_all"      ON public.hostels FOR ALL    USING (public.is_admin());
CREATE POLICY "hostels_manager_read"   ON public.hostels FOR SELECT USING (id = public.get_my_hostel_id());
CREATE POLICY "hostels_manager_update" ON public.hostels FOR UPDATE USING (id = public.get_my_hostel_id() AND public.get_my_role() = 'manager');
CREATE POLICY "hostels_finance_read"   ON public.hostels FOR SELECT USING (id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');


-- ============================================================
-- SECTION 2: PROFILES (extends auth.users)
-- ============================================================

CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hostel_id   UUID REFERENCES public.hostels(id) ON DELETE SET NULL,
  full_name   TEXT,
  role        TEXT NOT NULL DEFAULT 'manager'
                CHECK (role IN ('admin','manager','finance','hostelite','staff')),
  phone       TEXT,
  avatar_url  TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_hostel_id ON public.profiles(hostel_id);
CREATE INDEX idx_profiles_role      ON public.profiles(role);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile when a new Supabase auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'manager')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_self_read"    ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "profiles_self_update"  ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles_admin_all"    ON public.profiles FOR ALL    USING (public.is_admin());
CREATE POLICY "profiles_manager_read" ON public.profiles FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'manager');


-- ============================================================
-- SECTION 3: ROOMS
-- ============================================================

CREATE TABLE public.rooms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id    UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  room_number  TEXT NOT NULL,
  floor        INTEGER DEFAULT 1,
  type         TEXT NOT NULL DEFAULT 'sharing'
                 CHECK (type IN ('single','double','triple','sharing','suite')),
  capacity     INTEGER NOT NULL DEFAULT 4,
  price        NUMERIC(10,2) NOT NULL,
  features     TEXT[],
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (hostel_id, room_number)
);

CREATE INDEX idx_rooms_hostel_id ON public.rooms(hostel_id);

CREATE TRIGGER trg_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rooms_manager_all"   ON public.rooms FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "rooms_admin_all"     ON public.rooms FOR ALL    USING (public.is_admin());
CREATE POLICY "rooms_finance_read"  ON public.rooms FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');
CREATE POLICY "rooms_hostelite_read" ON public.rooms FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'hostelite');


-- ============================================================
-- SECTION 4: TENANTS (with auto TID generation)
-- ============================================================

CREATE TABLE public.tenants (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id         UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  tid               TEXT UNIQUE,
  name              TEXT NOT NULL,
  cnic              TEXT,
  phone             TEXT NOT NULL,
  father_name       TEXT,
  emergency_contact TEXT,
  occupation        TEXT,
  employer          TEXT,
  room_id           UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  occupancy_type    TEXT DEFAULT 'sharing'
                      CHECK (occupancy_type IN ('single','double','triple','sharing')),
  rent              NUMERIC(10,2) NOT NULL,
  deposit           NUMERIC(10,2) NOT NULL DEFAULT 0,
  move_in_date      DATE NOT NULL,
  move_out_date     DATE,
  status            TEXT NOT NULL DEFAULT 'active'
                      CHECK (status IN ('active','inactive','evicted')),
  profile_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tenants_hostel_id ON public.tenants(hostel_id);
CREATE INDEX idx_tenants_room_id   ON public.tenants(room_id);
CREATE INDEX idx_tenants_status    ON public.tenants(status);
CREATE INDEX idx_tenants_tid       ON public.tenants(tid);

CREATE TRIGGER trg_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.generate_tenant_tid()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_prefix TEXT;
  v_next   INTEGER;
BEGIN
  IF NEW.tid IS NOT NULL AND NEW.tid != '' THEN RETURN NEW; END IF;
  SELECT UPPER(prefix) INTO v_prefix FROM public.hostels WHERE id = NEW.hostel_id;
  IF v_prefix IS NULL THEN
    RAISE EXCEPTION 'Hostel prefix missing for hostel_id: %', NEW.hostel_id;
  END IF;
  PERFORM pg_advisory_xact_lock(hashtext(NEW.hostel_id::TEXT));
  SELECT COALESCE(MAX(CAST(REGEXP_REPLACE(tid, '^[A-Z]+-', '') AS INTEGER)), 0) + 1
  INTO v_next
  FROM public.tenants
  WHERE hostel_id = NEW.hostel_id
    AND tid IS NOT NULL
    AND tid ~ ('^' || v_prefix || '-[0-9]+$');
  NEW.tid := v_prefix || '-' || LPAD(v_next::TEXT, 3, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_tenant_generate_tid
  BEFORE INSERT ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.generate_tenant_tid();

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tenants_manager_all"    ON public.tenants FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "tenants_admin_all"      ON public.tenants FOR ALL    USING (public.is_admin());
CREATE POLICY "tenants_finance_read"   ON public.tenants FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');
CREATE POLICY "tenants_hostelite_self" ON public.tenants FOR SELECT USING (profile_id = auth.uid() AND public.get_my_role() = 'hostelite');


-- ============================================================
-- SECTION 5: PAYMENTS
-- ============================================================

CREATE TABLE public.payments (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id          UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  tenant_id          UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  month              TEXT NOT NULL CHECK (month ~ '^\d{4}-\d{2}$'),
  amount             NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  type               TEXT NOT NULL DEFAULT 'regular'
                       CHECK (type IN ('regular','advance','partial','security','overpayment','refund')),
  method             TEXT NOT NULL DEFAULT 'cash'
                       CHECK (method IN ('cash','bank','jazzcash','easypaisa','cheque','other')),
  payment_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  overpayment_reason TEXT,
  advance_months     INTEGER,
  notes              TEXT,
  recorded_by        UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_hostel_id    ON public.payments(hostel_id);
CREATE INDEX idx_payments_tenant_id    ON public.payments(tenant_id);
CREATE INDEX idx_payments_month        ON public.payments(month);
CREATE INDEX idx_payments_hostel_month ON public.payments(hostel_id, month);

CREATE TRIGGER trg_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments_manager_all"    ON public.payments FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "payments_admin_all"      ON public.payments FOR ALL    USING (public.is_admin());
CREATE POLICY "payments_finance_read"   ON public.payments FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');
CREATE POLICY "payments_hostelite_self" ON public.payments FOR SELECT USING (public.get_my_role() = 'hostelite' AND tenant_id IN (SELECT id FROM public.tenants WHERE profile_id = auth.uid()));


-- ============================================================
-- SECTION 6: MAINTENANCE
-- ============================================================

CREATE TABLE public.maintenance (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id        UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  category         TEXT NOT NULL DEFAULT 'general'
                     CHECK (category IN ('plumbing','electrical','furniture','cleanliness','internet','appliance','structural','general','other')),
  priority         TEXT NOT NULL DEFAULT 'medium'
                     CHECK (priority IN ('low','medium','high','critical')),
  room_id          UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  description      TEXT,
  status           TEXT NOT NULL DEFAULT 'open'
                     CHECK (status IN ('open','in-progress','resolved','cancelled')),
  reported_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to      TEXT,
  resolved_at      TIMESTAMPTZ,
  resolution_notes TEXT,
  cost             NUMERIC(10,2),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_maintenance_hostel_id ON public.maintenance(hostel_id);
CREATE INDEX idx_maintenance_status    ON public.maintenance(status);

CREATE TRIGGER trg_maintenance_updated_at
  BEFORE UPDATE ON public.maintenance
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.maintenance_set_resolved_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'resolved' AND OLD.status != 'resolved' THEN
    NEW.resolved_at := NOW();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_maintenance_resolved_at
  BEFORE UPDATE ON public.maintenance
  FOR EACH ROW EXECUTE FUNCTION public.maintenance_set_resolved_at();

ALTER TABLE public.maintenance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "maintenance_manager_all"      ON public.maintenance FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "maintenance_admin_all"        ON public.maintenance FOR ALL    USING (public.is_admin());
CREATE POLICY "maintenance_hostelite_read"   ON public.maintenance FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'hostelite');
CREATE POLICY "maintenance_hostelite_insert" ON public.maintenance FOR INSERT WITH CHECK (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'hostelite');


-- ============================================================
-- SECTION 7: NOTICES
-- ============================================================

CREATE TABLE public.notices (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id   UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  category    TEXT NOT NULL DEFAULT 'general'
                CHECK (category IN ('general','payment','maintenance','rules','event','emergency','other')),
  priority    TEXT NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('normal','urgent')),
  posted_by   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at  TIMESTAMPTZ,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notices_hostel_id ON public.notices(hostel_id);
CREATE INDEX idx_notices_created   ON public.notices(created_at DESC);

CREATE TRIGGER trg_notices_updated_at
  BEFORE UPDATE ON public.notices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notices_manager_all"  ON public.notices FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "notices_admin_all"    ON public.notices FOR ALL    USING (public.is_admin());
CREATE POLICY "notices_tenant_read"  ON public.notices FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('hostelite','finance') AND is_active = TRUE);


-- ============================================================
-- SECTION 8: EXPENSES
-- ============================================================

CREATE TABLE public.expenses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id    UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  category     TEXT NOT NULL DEFAULT 'general'
                 CHECK (category IN ('maintenance','utilities','salaries','groceries','furniture','equipment','supplies','cleaning','marketing','miscellaneous','other')),
  amount       NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  description  TEXT,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  receipt_url  TEXT,
  added_by     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_expenses_hostel_id   ON public.expenses(hostel_id);
CREATE INDEX idx_expenses_hostel_date ON public.expenses(hostel_id, expense_date);

CREATE TRIGGER trg_expenses_updated_at
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "expenses_manager_all"  ON public.expenses FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "expenses_admin_all"    ON public.expenses FOR ALL    USING (public.is_admin());
CREATE POLICY "expenses_finance_read" ON public.expenses FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');


-- ============================================================
-- SECTION 9: BILLS (Utility Bills)
-- ============================================================

CREATE TABLE public.bills (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id      UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  type           TEXT NOT NULL CHECK (type IN ('electricity','gas','water','internet','cable','other')),
  month          TEXT NOT NULL CHECK (month ~ '^\d{4}-\d{2}$'),
  amount         NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  due_date       DATE,
  status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','paid','overdue','disputed')),
  paid_on        DATE,
  bill_image_url TEXT,
  notes          TEXT,
  added_by       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bills_hostel_id    ON public.bills(hostel_id);
CREATE INDEX idx_bills_hostel_month ON public.bills(hostel_id, month);

CREATE TRIGGER trg_bills_updated_at
  BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bills_manager_all"  ON public.bills FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "bills_admin_all"    ON public.bills FOR ALL    USING (public.is_admin());
CREATE POLICY "bills_finance_read" ON public.bills FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');


-- ============================================================
-- SECTION 10: STAFF
-- ============================================================

CREATE TABLE public.staff (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id         UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  profile_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name              TEXT NOT NULL,
  role              TEXT NOT NULL DEFAULT 'helper'
                      CHECK (role IN ('manager','receptionist','guard','cleaner','cook','helper','maintenance','accountant','other')),
  phone             TEXT,
  cnic              TEXT,
  salary            NUMERIC(10,2),
  join_date         DATE,
  leave_date        DATE,
  status            TEXT NOT NULL DEFAULT 'active'
                      CHECK (status IN ('active','inactive','on_leave','terminated')),
  address           TEXT,
  emergency_contact TEXT,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_staff_hostel_id ON public.staff(hostel_id);

CREATE TRIGGER trg_staff_updated_at
  BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff_manager_all"  ON public.staff FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'manager');
CREATE POLICY "staff_admin_all"    ON public.staff FOR ALL    USING (public.is_admin());
CREATE POLICY "staff_finance_read" ON public.staff FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'finance');
CREATE POLICY "staff_self_read"    ON public.staff FOR SELECT USING (profile_id = auth.uid() AND public.get_my_role() = 'staff');


-- ============================================================
-- SECTION 11: VISITORS
-- ============================================================

CREATE TABLE public.visitors (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id      UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  cnic           TEXT,
  phone          TEXT,
  tenant_id      UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  visit_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  purpose        TEXT,
  status         TEXT NOT NULL DEFAULT 'checked-in'
                   CHECK (status IN ('checked-in','checked-out')),
  logged_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  checked_out_at TIMESTAMPTZ,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_visitors_hostel_id  ON public.visitors(hostel_id);
CREATE INDEX idx_visitors_visit_date ON public.visitors(visit_date);

CREATE OR REPLACE FUNCTION public.visitor_set_checkout()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.status = 'checked-out' AND OLD.status = 'checked-in' AND NEW.checked_out_at IS NULL THEN
    NEW.checked_out_at := NOW();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_visitor_checkout
  BEFORE UPDATE ON public.visitors
  FOR EACH ROW EXECUTE FUNCTION public.visitor_set_checkout();

ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "visitors_manager_all"    ON public.visitors FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "visitors_admin_all"      ON public.visitors FOR ALL    USING (public.is_admin());
CREATE POLICY "visitors_hostelite_self" ON public.visitors FOR SELECT USING (public.get_my_role() = 'hostelite' AND tenant_id IN (SELECT id FROM public.tenants WHERE profile_id = auth.uid()));


-- ============================================================
-- SECTION 12: ATTENDANCE
-- ============================================================

CREATE TABLE public.attendance (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id    UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  person_type  TEXT NOT NULL CHECK (person_type IN ('tenant','staff')),
  person_id    UUID NOT NULL,
  date         DATE NOT NULL DEFAULT CURRENT_DATE,
  status       TEXT CHECK (status IN ('present','absent','leave','half-day')),
  clock_in     TIME,
  clock_out    TIME,
  overtime_hrs NUMERIC(4,2),
  notes        TEXT,
  recorded_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (hostel_id, person_type, person_id, date)
);

CREATE INDEX idx_attendance_hostel_id   ON public.attendance(hostel_id);
CREATE INDEX idx_attendance_hostel_date ON public.attendance(hostel_id, date);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "attendance_manager_all"    ON public.attendance FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "attendance_admin_all"      ON public.attendance FOR ALL    USING (public.is_admin());
CREATE POLICY "attendance_hostelite_self" ON public.attendance FOR SELECT USING (public.get_my_role() = 'hostelite' AND person_type = 'tenant' AND person_id IN (SELECT id FROM public.tenants WHERE profile_id = auth.uid()));


-- ============================================================
-- SECTION 13: ACTIVITY LOG
-- ============================================================

CREATE TABLE public.activity_log (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id    UUID REFERENCES public.hostels(id) ON DELETE CASCADE,
  action       TEXT NOT NULL,
  entity_type  TEXT,
  entity_id    UUID,
  old_data     JSONB,
  new_data     JSONB,
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_hostel_id ON public.activity_log(hostel_id);
CREATE INDEX idx_activity_created   ON public.activity_log(created_at DESC);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activity_manager_read" ON public.activity_log FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'manager');
CREATE POLICY "activity_admin_all"    ON public.activity_log FOR ALL    USING (public.is_admin());

CREATE OR REPLACE FUNCTION public.log_activity(
  p_hostel_id UUID, p_action TEXT, p_entity_type TEXT, p_entity_id UUID,
  p_old_data JSONB DEFAULT NULL, p_new_data JSONB DEFAULT NULL
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.activity_log (hostel_id, action, entity_type, entity_id, old_data, new_data, performed_by)
  VALUES (p_hostel_id, p_action, p_entity_type, p_entity_id, p_old_data, p_new_data, auth.uid());
END;
$$;

-- Activity triggers for key tables
CREATE OR REPLACE FUNCTION public.trg_log_generic()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_hostel_id UUID;
BEGIN
  v_hostel_id := CASE WHEN TG_OP = 'DELETE' THEN OLD.hostel_id ELSE NEW.hostel_id END;
  PERFORM public.log_activity(
    v_hostel_id, TG_OP, TG_TABLE_NAME,
    CASE WHEN TG_OP = 'DELETE' THEN OLD.id ELSE NEW.id END,
    CASE WHEN TG_OP IN ('UPDATE','DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT','UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_activity_tenants     AFTER INSERT OR UPDATE OR DELETE ON public.tenants     FOR EACH ROW EXECUTE FUNCTION public.trg_log_generic();
CREATE TRIGGER trg_activity_payments    AFTER INSERT OR UPDATE OR DELETE ON public.payments    FOR EACH ROW EXECUTE FUNCTION public.trg_log_generic();
CREATE TRIGGER trg_activity_maintenance AFTER INSERT OR UPDATE OR DELETE ON public.maintenance FOR EACH ROW EXECUTE FUNCTION public.trg_log_generic();


-- ============================================================
-- SECTION 14: HOSTEL SETTINGS
-- ============================================================

CREATE TABLE public.hostel_settings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id       UUID NOT NULL UNIQUE REFERENCES public.hostels(id) ON DELETE CASCADE,
  banner_text     TEXT,
  wa_override     TEXT,
  offer_tag       TEXT,
  rent_due_day    INTEGER DEFAULT 5 CHECK (rent_due_day BETWEEN 1 AND 28),
  late_fee        NUMERIC(10,2),
  currency_symbol TEXT NOT NULL DEFAULT 'Rs.',
  timezone        TEXT NOT NULL DEFAULT 'Asia/Karachi',
  auto_remind     BOOLEAN NOT NULL DEFAULT FALSE,
  custom_fields   JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_hostel_settings_updated_at
  BEFORE UPDATE ON public.hostel_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.create_hostel_settings()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.hostel_settings (hostel_id) VALUES (NEW.id) ON CONFLICT (hostel_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_hostel_create_settings
  AFTER INSERT ON public.hostels
  FOR EACH ROW EXECUTE FUNCTION public.create_hostel_settings();

ALTER TABLE public.hostel_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_manager_all" ON public.hostel_settings FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() = 'manager');
CREATE POLICY "settings_admin_all"   ON public.hostel_settings FOR ALL    USING (public.is_admin());
CREATE POLICY "settings_read"        ON public.hostel_settings FOR SELECT USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('finance','staff','hostelite'));


-- ============================================================
-- SECTION 15: APPLICATIONS (Public Lead Capture)
-- ============================================================

CREATE TABLE public.applications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hostel_id     UUID NOT NULL REFERENCES public.hostels(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  email         TEXT,
  cnic          TEXT,
  room_type     TEXT CHECK (room_type IN ('single','double','triple','sharing','any')),
  move_in_date  DATE,
  message       TEXT,
  source        TEXT DEFAULT 'website'
                  CHECK (source IN ('website','whatsapp','referral','walk-in','other')),
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','contacted','accepted','rejected','waitlisted')),
  handled_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_applications_hostel_id ON public.applications(hostel_id);
CREATE INDEX idx_applications_status    ON public.applications(status);

CREATE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "applications_public_insert" ON public.applications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "applications_manager_all"   ON public.applications FOR ALL    USING (hostel_id = public.get_my_hostel_id() AND public.get_my_role() IN ('manager','staff'));
CREATE POLICY "applications_admin_all"     ON public.applications FOR ALL    USING (public.is_admin());


-- ============================================================
-- SECTION 16: USEFUL VIEWS
-- ============================================================

CREATE OR REPLACE VIEW public.v_active_tenants WITH (security_invoker = TRUE) AS
  SELECT t.id, t.hostel_id, t.tid, t.name, t.phone, t.cnic,
         t.room_id, r.room_number, r.floor, r.type AS room_type,
         t.rent, t.deposit, t.move_in_date, t.occupancy_type, t.status, t.notes
  FROM public.tenants t
  LEFT JOIN public.rooms r ON r.id = t.room_id
  WHERE t.status = 'active';

CREATE OR REPLACE VIEW public.v_room_occupancy WITH (security_invoker = TRUE) AS
  SELECT r.id AS room_id, r.hostel_id, r.room_number, r.floor, r.type,
         r.capacity,
         COUNT(t.id) FILTER (WHERE t.status = 'active') AS occupied_beds,
         r.capacity - COUNT(t.id) FILTER (WHERE t.status = 'active') AS available_beds,
         r.price
  FROM public.rooms r
  LEFT JOIN public.tenants t ON t.room_id = r.id
  GROUP BY r.id;

CREATE OR REPLACE VIEW public.v_payment_summary WITH (security_invoker = TRUE) AS
  SELECT p.hostel_id, p.month,
         COUNT(*)                                                         AS payment_count,
         SUM(p.amount)                                                    AS total_collected,
         SUM(CASE WHEN p.type = 'regular'     THEN p.amount ELSE 0 END)  AS regular_total,
         SUM(CASE WHEN p.type = 'advance'     THEN p.amount ELSE 0 END)  AS advance_total,
         SUM(CASE WHEN p.type = 'security'    THEN p.amount ELSE 0 END)  AS security_total,
         SUM(CASE WHEN p.type = 'overpayment' THEN p.amount ELSE 0 END)  AS overpayment_total
  FROM public.payments p
  GROUP BY p.hostel_id, p.month;


-- ============================================================
-- SECTION 17: GRANTS
-- ============================================================

GRANT SELECT ON public.hostels      TO anon;
GRANT SELECT ON public.rooms        TO anon;
GRANT INSERT ON public.applications TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES   IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT                  ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE                        ON ALL FUNCTIONS IN SCHEMA public TO authenticated;


-- ============================================================
-- DONE. Run SECTION 18 manually after first login:
-- UPDATE public.profiles SET role = 'admin', hostel_id = NULL
-- WHERE id = '<YOUR-SUPABASE-USER-UUID>';
-- ============================================================
