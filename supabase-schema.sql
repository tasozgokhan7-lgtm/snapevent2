-- ============================================================
-- SnapEvent — Supabase Database Schema
-- Supabase SQL Editor'a yapıştırın ve çalıştırın
-- ============================================================

-- ============================================================
-- 1. TABLOLAR
-- ============================================================

-- Müşteriler
CREATE TABLE IF NOT EXISTS public.customers (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     text NOT NULL,
  email         text,
  phone         text,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Etkinlikler
CREATE TABLE IF NOT EXISTS public.events (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id         uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  name                text NOT NULL,
  slug                text NOT NULL UNIQUE,
  description         text,
  event_date          date,
  active_from         timestamptz,
  active_until        timestamptz,
  storage_expires_at  timestamptz,
  is_active           boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now(),
  created_by          uuid REFERENCES auth.users(id)
);

-- Misafirler (etkinlik katılımcıları)
CREATE TABLE IF NOT EXISTS public.guests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  display_name  text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Fotoğraflar
CREATE TABLE IF NOT EXISTS public.photos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  guest_id      uuid REFERENCES public.guests(id) ON DELETE SET NULL,
  uploader_name text NOT NULL,
  storage_path  text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  is_deleted    boolean NOT NULL DEFAULT false,
  is_approved   boolean NOT NULL DEFAULT true
);

-- İletişim / Teklif Talepleri
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  email_or_phone  text NOT NULL,
  event_type      text,
  event_date      date,
  note            text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. INDEX'LER
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_customer_id ON public.events(customer_id);
CREATE INDEX IF NOT EXISTS idx_events_is_active ON public.events(is_active);
CREATE INDEX IF NOT EXISTS idx_photos_event_id ON public.photos(event_id);
CREATE INDEX IF NOT EXISTS idx_photos_is_deleted ON public.photos(is_deleted);
CREATE INDEX IF NOT EXISTS idx_guests_event_id ON public.guests(event_id);

-- ============================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.customers       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. POLİTİKALAR
-- ============================================================

-- ---- CUSTOMERS ----
-- Sadece giriş yapmış kullanıcı (admin) yönetebilir
CREATE POLICY "admin_customers_all" ON public.customers
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ---- EVENTS ----
-- Admin tam erişim
CREATE POLICY "admin_events_all" ON public.events
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Misafirler: aktif etkinliği slug ile okuyabilir
CREATE POLICY "public_events_read_active" ON public.events
  FOR SELECT TO anon
  USING (is_active = true);

-- ---- GUESTS ----
-- Admin tam erişim
CREATE POLICY "admin_guests_all" ON public.guests
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Misafirler: aktif etkinliklere kayıt olabilir
CREATE POLICY "public_guests_insert" ON public.guests
  FOR INSERT TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE id = event_id AND is_active = true
    )
  );

-- ---- PHOTOS ----
-- Admin tam erişim
CREATE POLICY "admin_photos_all" ON public.photos
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Misafirler: aktif etkinlik fotoğraflarını görebilir
CREATE POLICY "public_photos_read" ON public.photos
  FOR SELECT TO anon
  USING (
    is_deleted = false
    AND is_approved = true
    AND EXISTS (
      SELECT 1 FROM public.events
      WHERE id = event_id AND is_active = true
    )
  );

-- Misafirler: aktif etkinliklere fotoğraf yükleyebilir
CREATE POLICY "public_photos_insert" ON public.photos
  FOR INSERT TO anon
  WITH CHECK (
    is_deleted = false
    AND is_approved = true
    AND EXISTS (
      SELECT 1 FROM public.events
      WHERE id = event_id AND is_active = true
    )
  );

-- ---- CONTACT REQUESTS ----
-- Admin tam erişim
CREATE POLICY "admin_contact_requests_all" ON public.contact_requests
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Herkes teklif talebi oluşturabilir
CREATE POLICY "public_contact_requests_insert" ON public.contact_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- ============================================================
-- 5. REALTIME (fotoğraflar için)
-- ============================================================
-- Supabase dashboard'unda Table Editor > photos > Realtime'ı aktif edin
-- Ya da aşağıdaki komutu çalıştırın:
ALTER PUBLICATION supabase_realtime ADD TABLE public.photos;

-- ============================================================
-- 6. STORAGE BUCKET
-- ============================================================
-- Supabase Dashboard > Storage > New Bucket:
--   Name: event-photos
--   Public: true (misafirlerin fotoğrafları görebilmesi için)
--   File size limit: 20MB
--   Allowed mime types: image/*

-- Storage Policy (anon yükleyebilsin):
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-photos',
  'event-photos',
  true,
  20971520,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Misafirlerin yükleme yapabilmesi için storage policy
CREATE POLICY "public_storage_upload" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'event-photos');

CREATE POLICY "public_storage_read" ON storage.objects
  FOR SELECT TO anon
  USING (bucket_id = 'event-photos');

CREATE POLICY "auth_storage_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'event-photos');

CREATE POLICY "auth_storage_all" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'event-photos')
  WITH CHECK (bucket_id = 'event-photos');
