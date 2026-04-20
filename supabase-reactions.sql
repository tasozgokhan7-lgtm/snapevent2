-- ============================================================
-- SnapEvent — Photo Reactions Tablosu
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

CREATE TABLE IF NOT EXISTS public.photo_reactions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id      uuid NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
  guest_token   text NOT NULL,
  reaction_type text NOT NULL CHECK (reaction_type IN ('heart', 'laugh')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(photo_id, guest_token)  -- her kullanıcı bir fotoya sadece 1 reaksiyon
);

CREATE INDEX IF NOT EXISTS idx_photo_reactions_photo_id ON public.photo_reactions(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_reactions_guest_token ON public.photo_reactions(guest_token);

-- RLS
ALTER TABLE public.photo_reactions ENABLE ROW LEVEL SECURITY;

-- Herkes reaksiyonları okuyabilir
CREATE POLICY "public_reactions_read" ON public.photo_reactions
  FOR SELECT TO anon USING (true);

-- Herkes reaksiyon ekleyebilir (unique constraint tekrarı engeller)
CREATE POLICY "public_reactions_insert" ON public.photo_reactions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Kullanıcı kendi reaksiyonunu silebilir (token eşleşmesiyle)
CREATE POLICY "public_reactions_delete" ON public.photo_reactions
  FOR DELETE TO anon
  USING (true);

-- Admin tam erişim
CREATE POLICY "admin_reactions_all" ON public.photo_reactions
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.photo_reactions;
