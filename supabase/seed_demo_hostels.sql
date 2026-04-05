-- ============================================================
-- SEED — Demo Hostels (for network showcase / pitching)
-- Status: 'active' so they appear in the public directory
-- These are fictional but realistic Lahore hostels
-- ============================================================

INSERT INTO public.hostels (
  name, prefix, area, city, description, amenities,
  price_from, price_to, total_capacity, status, website_url, phone, whatsapp
) VALUES

('Al-Noor Boys Hostel', 'ANB', 'Johar Town', 'Lahore',
 'Spacious rooms with 24/7 security in the heart of Johar Town. Ideal for university students near UET and UMT.',
 ARRAY['WiFi','Meals Included','Laundry','Security','Generator Backup','Parking'],
 6000, 14000, 60, 'active', NULL, '+923001234567', '+923001234567'),

('Green Valley Hostel', 'GVH', 'Gulberg III', 'Lahore',
 'Premium hostel in Gulberg with modern facilities. Walking distance from M.M Alam Road.',
 ARRAY['WiFi','AC Rooms','Meals Included','Security','Hot Water','Study Room'],
 8000, 18000, 40, 'active', NULL, '+923011234567', '+923011234567'),

('Al-Madina Boys Hostel', 'AMB', 'Iqbal Town', 'Lahore',
 'Affordable and well-managed hostel in Iqbal Town. Popular among students and fresh graduates.',
 ARRAY['WiFi','Meals Included','Laundry','Security','Rooftop'],
 4500, 10000, 80, 'active', NULL, '+923021234567', '+923021234567'),

('Capital Boys Hostel', 'CBH', 'Garden Town', 'Lahore',
 'Centrally located hostel near Ferozepur Road. Easy access to public transport and markets.',
 ARRAY['WiFi','Meals Included','Security','Generator Backup'],
 5000, 12000, 45, 'active', NULL, '+923031234567', '+923031234567'),

('University Inn', 'UIN', 'Faisal Town', 'Lahore',
 'Student-focused hostel near UCP and GCU Lahore. Quiet environment with dedicated study halls.',
 ARRAY['WiFi','Study Hall','Meals Included','Security','Laundry','Hot Water'],
 5500, 13000, 55, 'active', NULL, '+923041234567', '+923041234567');


-- Verify
SELECT name, prefix, area, status, price_from, price_to FROM public.hostels ORDER BY created_at;
