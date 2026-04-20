'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Camera, Upload, Image as ImageIcon, X, CheckCircle, Loader2 } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

interface Photo {
  id: string
  uploader_name: string
  storage_path: string
  created_at: string
}

export default function GuestGallery({ event, guestName }: { event: any; guestName: string }) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const fetchPhotos = useCallback(async () => {
    const { data } = await supabase
      .from('photos')
      .select('id, uploader_name, storage_path, created_at')
      .eq('event_id', event.id)
      .eq('is_deleted', false)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    if (data) setPhotos(data)
    setLoading(false)
  }, [event.id, supabase])

  useEffect(() => { fetchPhotos() }, [fetchPhotos])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`photos:${event.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'photos',
        filter: `event_id=eq.${event.id}`,
      }, payload => {
        const newPhoto = payload.new as Photo
        if (!(newPhoto as any).is_deleted) {
          setPhotos(prev => {
            if (prev.some(p => p.id === newPhoto.id)) return prev
            return [newPhoto, ...prev]
          })
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [event.id, supabase])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setUploadError('Lütfen geçerli bir resim dosyası seçin.'); return }
    if (file.size > 20 * 1024 * 1024) { setUploadError('Dosya boyutu 20MB\'dan büyük olamaz.'); return }
    await uploadFile(file)
    if (fileRef.current) fileRef.current.value = ''
  }

  const uploadFile = async (file: File) => {
    setUploading(true); setUploadError(''); setUploadSuccess(false); setUploadProgress(10)

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const storagePath = `events/${event.id}/${filename}`

    setUploadProgress(30)

    const { error: storageErr } = await supabase.storage
      .from('event-photos')
      .upload(storagePath, file, { cacheControl: '3600', upsert: false })

    if (storageErr) {
      setUploadError('Yükleme sırasında hata oluştu. Tekrar deneyin.')
      setUploading(false); setUploadProgress(0)
      return
    }

    setUploadProgress(70)

    // Insert guest record (upsert by name for same session)
    const { data: guestData } = await supabase
      .from('guests')
      .insert({ event_id: event.id, display_name: guestName })
      .select('id')
      .single()

    setUploadProgress(85)

    const { data: photoData, error: dbErr } = await supabase
      .from('photos')
      .insert({
        event_id: event.id,
        guest_id: guestData?.id ?? null,
        uploader_name: guestName,
        storage_path: storagePath,
      })
      .select()
      .single()

    if (dbErr) {
      // Rollback storage
      await supabase.storage.from('event-photos').remove([storagePath])
      setUploadError('Fotoğraf kaydedilemedi. Tekrar deneyin.')
      setUploading(false); setUploadProgress(0)
      return
    }

    setUploadProgress(100)
    // Optimistically add to gallery
    setPhotos(prev => {
      if (prev.some(p => p.id === photoData.id)) return prev
      return [photoData, ...prev]
    })
    setUploading(false)
    setUploadSuccess(true)
    setTimeout(() => { setUploadSuccess(false); setUploadProgress(0) }, 3000)
  }

  const photoUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/event-photos/${path}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50/20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-tight">{event.name}</div>
              <div className="text-xs text-slate-500">Merhaba, <span className="text-brand-600 font-medium">{guestName}</span></div>
            </div>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-rose-500 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="h-1 bg-slate-100">
            <div className="h-full bg-gradient-to-r from-brand-500 to-rose-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Upload feedback */}
        {uploadSuccess && (
          <div className="mb-4 flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Fotoğrafınız başarıyla yüklendi!</span>
          </div>
        )}
        {uploadError && (
          <div className="mb-4 flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
            <span className="text-sm">{uploadError}</span>
            <button onClick={() => setUploadError('')} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Upload CTA (desktop) */}
        <div
          className="hidden sm:flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-brand-200 bg-white/60 mb-6 cursor-pointer hover:border-brand-400 hover:bg-brand-50/50 transition-all group"
          onClick={() => fileRef.current?.click()}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7 text-brand-600" />
          </div>
          <p className="font-semibold text-slate-700">Fotoğraf Yüklemek İçin Tıklayın</p>
          <p className="text-slate-400 text-sm mt-1">JPG, PNG, HEIC — Max 20MB</p>
        </div>

        {/* Gallery */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl shimmer" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ImageIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Galeri Henüz Boş</h3>
            <p className="text-slate-400 text-sm mb-6">İlk fotoğrafı yükleyen siz olun!</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Camera className="w-5 h-5" /> İlk Fotoğrafı Yükle
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500 font-medium">{photos.length} fotoğraf</p>
            </div>
            <div className="columns-2 sm:columns-3 gap-3 space-y-3">
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className="break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-slate-100"
                  onClick={() => setLightbox(photo)}
                >
                  <img
                    src={photoUrl(photo.storage_path)}
                    alt={`${photo.uploader_name} tarafından`}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="px-3 py-2.5">
                    <div className="text-xs font-semibold text-slate-700 truncate">{photo.uploader_name}</div>
                    <div className="text-xs text-slate-400">{formatDateTime(photo.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={photoUrl(lightbox.storage_path)} alt="" className="w-full rounded-2xl max-h-[75vh] object-contain" />
            <div className="text-center mt-3">
              <p className="text-white font-medium text-sm">{lightbox.uploader_name}</p>
              <p className="text-white/50 text-xs">{formatDateTime(lightbox.created_at)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
