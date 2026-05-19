-- ============================================================
-- Müşterilerin kendi etkinliklerine ait fotoğrafları silebilmesi
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

-- 1. photos tablosunda DELETE politikası:
--    Giriş yapmış kullanıcı, kendi events tablosundaki bir etkinliğin fotoğrafını silebilir.
CREATE POLICY "customers can delete own event photos"
  ON public.photos
  FOR DELETE
  TO authenticated
  USING (
    event_id IN (
      SELECT e.id
      FROM public.events e
      JOIN public.customers c ON c.id = e.customer_id
      WHERE c.email = auth.jwt() ->> 'email'
    )
  );

-- 2. Storage bucket'ta DELETE politikası:
--    Aynı koşul — kendi etkinliğinin storage dosyasını silebilir.
CREATE POLICY "customers can delete own event photo files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'event-photos'
    AND (storage.foldername(name))[1] IN (
      SELECT e.slug
      FROM public.events e
      JOIN public.customers c ON c.id = e.customer_id
      WHERE c.email = auth.jwt() ->> 'email'
    )
  );
