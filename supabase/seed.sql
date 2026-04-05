-- ============================================================
-- SEED — Abdul Rehman Boys Hostel + Platform Admin
-- Run in: Supabase SQL Editor
-- ============================================================

-- Step 1: Insert Abdul Rehman Boys Hostel + link to admin profile in one go
WITH new_hostel AS (
  INSERT INTO public.hostels (
    name, prefix, slug, area, city, address,
    phone, whatsapp, email,
    description,
    amenities,
    price_from, price_to,
    total_capacity,
    status
  ) VALUES (
    'Abdul Rehman Boys Hostel',
    'ARH',
    'abdul-rehman-boys-hostel',
    'Nasir Colony',
    'Lahore',
    'Nasir Colony, Lahore, Pakistan',
    '+923081112269',
    '+923081112269',
    'awaisrehman936@gmail.com',
    'A well-managed boys hostel in Nasir Colony, Lahore. Clean, affordable accommodation for students and working professionals with all essential amenities.',
    ARRAY['WiFi','Meals Included','Laundry','Security Guard','Hot Water','Generator Backup','Study Area'],
    5000,
    15000,
    50,
    'active'
  )
  RETURNING id
),

-- Step 2: Update the admin profile with the new hostel_id
updated_profile AS (
  UPDATE public.profiles
  SET
    role       = 'admin',
    full_name  = 'Muhammad Awais Rehman',
    hostel_id  = (SELECT id FROM new_hostel),
    phone      = '+923081112269',
    is_active  = TRUE
  WHERE id = '8911fbb7-4390-4998-8e02-fba4dc0da4a8'
  RETURNING hostel_id
)

-- Step 3: Insert default rooms for ARH hostel
INSERT INTO public.rooms (hostel_id, room_number, floor, type, capacity, price, features)
SELECT
  hp.hostel_id,
  r.room_number,
  r.floor,
  r.type,
  r.capacity,
  r.price,
  r.features
FROM updated_profile hp
CROSS JOIN (VALUES
  ('101', 1, 'sharing', 4, 5000,  ARRAY['Fan','Window','Shared Bath']),
  ('102', 1, 'sharing', 4, 5000,  ARRAY['Fan','Window','Shared Bath']),
  ('103', 1, 'sharing', 3, 6000,  ARRAY['Fan','Window','Shared Bath']),
  ('104', 1, 'double',  2, 8000,  ARRAY['Fan','Attached Bath','Window']),
  ('201', 2, 'sharing', 4, 5500,  ARRAY['Fan','Window','Shared Bath']),
  ('202', 2, 'sharing', 4, 5500,  ARRAY['Fan','Window','Shared Bath']),
  ('203', 2, 'sharing', 3, 6500,  ARRAY['Fan','Window','Shared Bath']),
  ('204', 2, 'double',  2, 9000,  ARRAY['AC','Attached Bath','Window']),
  ('301', 3, 'sharing', 4, 6000,  ARRAY['AC','Window','Shared Bath']),
  ('302', 3, 'sharing', 4, 6000,  ARRAY['AC','Window','Shared Bath']),
  ('303', 3, 'double',  2, 10000, ARRAY['AC','Attached Bath','Window']),
  ('304', 3, 'single',  1, 12000, ARRAY['AC','Attached Bath','Desk','Wardrobe'])
) AS r(room_number, floor, type, capacity, price, features);


-- ============================================================
-- Verify everything was created correctly
-- ============================================================
SELECT
  h.id        AS hostel_id,
  h.name      AS hostel_name,
  h.prefix    AS tid_prefix,
  h.status,
  p.id        AS profile_id,
  p.full_name,
  p.role,
  p.hostel_id AS profile_hostel_id,
  (SELECT COUNT(*) FROM public.rooms r WHERE r.hostel_id = h.id) AS room_count
FROM public.hostels h
JOIN public.profiles p ON p.hostel_id = h.id
WHERE h.prefix = 'ARH';
