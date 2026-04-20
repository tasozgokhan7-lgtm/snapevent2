'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Camera, Upload, Image as ImageIcon, X, CheckCircle, Loader2 } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

// Unique anonymous token per browser, stored in localStorage
function getGuestToken(): string {
  let token = localStorage.getItem('snapevent_token')
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem('snapevent_token', token)
  }
  return token
}

interface Photo {
  id: string
  uploader_name: string
  storage_path: string
  created_at: string
}

interface ReactionCount {
  hearts: number
  laughs: number
  userReaction: 'heart' | 'laugh' | null
}

function photoUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/event-photos/${path}`
}

export default function GuestGallery({ event, guestName }: { event: any; guestName: string }) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [lightbox, setLightbox] = useState<Photo | null>(null)
  const [reactions, setReactions] = useState<Record<string, ReactionCount>>({})
  const [reactionLoading, setReactionLoading] = useState<string | null>(null)
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

  const fetchReactions = useCallback(async (photoIds?: string[]) => {
    const ids = photoIds ?? photos.map(p => p.id)
    if (ids.length === 0) return
    const token = getGuestToken()
    const { data } = await supabase
      .from('photo_reactions')
      .select('photo_id, reaction_type, guest_token')
      .in('photo_id', ids)

    if (!data) return
    const map: Record<string, ReactionCount> = {}
    ids.forEach(id => { map[id] = { hearts: 0, laughs: 0, userReaction: null } })
    data.forEach(r => {
      if (!map[r.photo_id]) map[r.photo_id] = { hearts: 0, laughs: 0, userReaction: null }
      if (r.reaction_type === 'heart') map[r.photo_id].hearts++
      if (r.reaction_type === 'laugh') map[r.photo_id].laughs++
      if (r.guest_token === token) map[r.photo_id].userReaction = r.reaction_type as 'heart' | 'laugh'
    })
    setReactions(prev => ({ ...prev, ...map }))
  }, [photos, supabase])

  useEffect(() => { fetchPhotos() }, [fetchPhotos])

  useEffect(() => {
    if (photos.length > 0) fetchReactions(photos.map(p => p.id))
  }, [photos.length]) // eslint-disable-line

  // Realtime: new photos
  useEffect(() => {
    const channel = supabase
      .channel(`photos:${event.id}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'photos',
        filter: `event_id=eq.${event.id}`,
      }, payload => {
        const newPhoto = payload.new as any
        if (!newPhoto.is_deleted) {
          setPhotos(prev => prev.some(p => p.id === newPhoto.id) ? prev : [newPhoto, ...prev])
          fetchReactions([newPhoto.id])
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [event.id, supabase, fetchReactions])

  // Realtime: reactions
  useEffect(() => {
    const channel = supabase
      .channel(`reactions:${event.id}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'photo_reactions',
      }, () => {
        if (photos.length > 0) fetchReactions(photos.map(p => p.id))
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [event.id, photos, supabase, fetchReactions])

  const handleReaction = async (photoId: string, type: 'heart' | 'laugh') => {
    const token = getGuestToken()
    const current = reactions[photoId] ?? { hearts: 0, laughs: 0, userReaction: null }
    setReactionLoading(photoId)

    if (current.userReaction === type) {
      // Toggle off: remove reaction
      const optimistic: ReactionCount = {
        ...current,
        hearts: type === 'heart' ? Math.max(0, current.hearts - 1) : current.hearts,
        laughs: type === 'laugh' ? Math.max(0, current.laughs - 1) : current.laughs,
        userReaction: null,
      }
      setReactions(prev => ({ ...prev, [photoId]: optimistic }))
      await supabase.from('photo_reactions')
        .delete()
        .eq('photo_id', photoId)
        .eq('guest_token', token)
    } else {
      // Switch or new reaction
      const optimistic: ReactionCount = {
        hearts: type === 'heart'
          ? current.hearts + 1
          : current.userReaction === 'heart' ? Math.max(0, current.hearts - 1) : current.hearts,
        laughs: type === 'laugh'
          ? current.laughs + 1
          : current.userReaction === 'laugh' ? Math.max(0, current.laughs - 1) : current.laughs,
        userReaction: type,
      }
      setReactions(prev => ({ ...prev, [photoId]: optimistic }))

      // Upsert: delete old then insert new
      await supabase.from('photo_reactions')
        .delete()
        .eq('photo_id', photoId)
        .eq('guest_token', token)
      await supabase.from('photo_reactions')
        .insert({ photo_id: photoId, guest_token: token, reaction_type: type })
    }
    setReactionLoading(null)
  }

  // --- Upload logic ---
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
      setUploading(false); setUploadProgress(0); return
    }
    setUploadProgress(70)
    const { data: guestData } = await supabase
      .from('guests')
      .insert({ event_id: event.id, display_name: guestName })
      .select('id').single()
    setUploadProgress(85)
    const { data: photoData, error: dbErr } = await supabase
      .from('photos')
      .insert({ event_id: event.id, guest_id: guestData?.id ?? null, uploader_name: guestName, storage_path: storagePath })
      .select().single()
    if (dbErr) {
      await supabase.storage.from('event-photos').remove([storagePath])
      setUploadError('Fotoğraf kaydedilemedi. Tekrar deneyin.')
      setUploading(false); setUploadProgress(0); return
    }
    setUploadProgress(100)
    setPhotos(prev => prev.some(p => p.id === photoData.id) ? prev : [photoData, ...prev])
    setReactions(prev => ({ ...prev, [photoData.id]: { hearts: 0, laughs: 0, userReaction: null } }))
    setUploading(false); setUploadSuccess(true)
    setTimeout(() => { setUploadSuccess(false); setUploadProgress(0) }, 3000)
  }

  // --- Compute featured + sorted photos ---
  const sortedPhotos = [...photos].sort((a, b) => {
    const ra = reactions[a.id] ?? { hearts: 0, laughs: 0, userReaction: null }
    const rb = reactions[b.id] ?? { hearts: 0, laughs: 0, userReaction: null }
    const totalA = ra.hearts + ra.laughs
    const totalB = rb.hearts + rb.laughs
    return totalB - totalA || new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const mostRomantic = photos.length > 0
    ? photos.reduce((best, p) => (reactions[p.id]?.hearts ?? 0) > (reactions[best.id]?.hearts ?? 0) ? p : best, photos[0])
    : null
  const mostFunny = photos.length > 0
    ? photos.reduce((best, p) => (reactions[p.id]?.laughs ?? 0) > (reactions[best.id]?.laughs ?? 0) ? p : best, photos[0])
    : null

  const showFeatured = mostRomantic && mostFunny &&
    (reactions[mostRomantic.id]?.hearts ?? 0) > 0 &&
    (reactions[mostFunny.id]?.laughs ?? 0) > 0

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
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
        {uploading && (
          <div className="h-1 bg-slate-100">
            <div className="h-full bg-gradient-to-r from-brand-500 to-rose-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Feedback */}
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

        {/* Upload CTA desktop */}
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
            {Array(6).fill(0).map((_, i) => <div key={i} className="aspect-square rounded-2xl shimmer" />)}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white border border-slate-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ImageIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">Galeri Henüz Boş</h3>
            <p className="text-slate-400 text-sm mb-6">İlk fotoğrafı yükleyen siz olun!</p>
            <button onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Camera className="w-5 h-5" /> İlk Fotoğrafı Yükle
            </button>
          </div>
        ) : (
          <>
            {/* Featured section */}
            {showFeatured && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">Gecenin Öne Çıkanları</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FeaturedCard
                    photo={mostRomantic!}
                    label="En Romantik Görsel"
                    emoji="❤️"
                    count={reactions[mostRomantic!.id]?.hearts ?? 0}
                    gradient="from-rose-500 to-pink-500"
                    onReact={() => handleReaction(mostRomantic!.id, 'heart')}
                    userReaction={reactions[mostRomantic!.id]?.userReaction ?? null}
                    onClick={() => setLightbox(mostRomantic!)}
                  />
                  <FeaturedCard
                    photo={mostFunny!}
                    label="En Komik Görsel"
                    emoji="😂"
                    count={reactions[mostFunny!.id]?.laughs ?? 0}
                    gradient="from-amber-500 to-orange-500"
                    onReact={() => handleReaction(mostFunny!.id, 'laugh')}
                    userReaction={reactions[mostFunny!.id]?.userReaction ?? null}
                    onClick={() => setLightbox(mostFunny!)}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm text-slate-500 font-medium">{photos.length} fotoğraf</p>
              <span className="text-slate-300">·</span>
              <p className="text-xs text-slate-400">Beğenilere göre sıralı</p>
            </div>

            <div className="columns-2 sm:columns-3 gap-3 space-y-3">
              {sortedPhotos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  reaction={reactions[photo.id] ?? { hearts: 0, laughs: 0, userReaction: null }}
                  onReact={handleReaction}
                  reactionLoading={reactionLoading === photo.id}
                  onClick={() => setLightbox(photo)}
                />
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
            <img src={photoUrl(lightbox.storage_path)} alt="" className="w-full rounded-2xl max-h-[70vh] object-contain" />
            <div className="flex items-center justify-between mt-4 px-2">
              <div>
                <p className="text-white font-medium text-sm">{lightbox.uploader_name}</p>
                <p className="text-white/50 text-xs">{formatDateTime(lightbox.created_at)}</p>
              </div>
              <div className="flex items-center gap-3">
                <ReactionButton
                  emoji="❤️"
                  count={reactions[lightbox.id]?.hearts ?? 0}
                  active={reactions[lightbox.id]?.userReaction === 'heart'}
                  onClick={() => handleReaction(lightbox.id, 'heart')}
                  loading={reactionLoading === lightbox.id}
                  size="lg"
                />
                <ReactionButton
                  emoji="😂"
                  count={reactions[lightbox.id]?.laughs ?? 0}
                  active={reactions[lightbox.id]?.userReaction === 'laugh'}
                  onClick={() => handleReaction(lightbox.id, 'laugh')}
                  loading={reactionLoading === lightbox.id}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Sub-components ─── */

function PhotoCard({ photo, reaction, onReact, reactionLoading, onClick }: {
  photo: Photo
  reaction: ReactionCount
  onReact: (id: string, type: 'heart' | 'laugh') => void
  reactionLoading: boolean
  onClick: () => void
}) {
  return (
    <div className="break-inside-avoid rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all border border-slate-100 group">
      <div className="relative overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={photoUrl(photo.storage_path)}
          alt={`${photo.uploader_name} tarafından`}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="px-3 pt-2 pb-3">
        <p className="text-xs font-semibold text-slate-700 truncate mb-2">{photo.uploader_name}</p>
        <div className="flex items-center gap-2">
          <ReactionButton
            emoji="❤️"
            count={reaction.hearts}
            active={reaction.userReaction === 'heart'}
            onClick={() => onReact(photo.id, 'heart')}
            loading={reactionLoading}
          />
          <ReactionButton
            emoji="😂"
            count={reaction.laughs}
            active={reaction.userReaction === 'laugh'}
            onClick={() => onReact(photo.id, 'laugh')}
            loading={reactionLoading}
          />
        </div>
      </div>
    </div>
  )
}

function ReactionButton({ emoji, count, active, onClick, loading, size = 'sm' }: {
  emoji: string; count: number; active: boolean
  onClick: () => void; loading: boolean; size?: 'sm' | 'lg'
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all
        ${active
          ? 'bg-brand-100 text-brand-700 scale-105'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
        ${size === 'lg' ? 'px-4 py-2 text-sm' : ''}
        disabled:opacity-70`}
    >
      <span className={size === 'lg' ? 'text-lg' : 'text-sm'}>{emoji}</span>
      <span>{count}</span>
    </button>
  )
}

function FeaturedCard({ photo, label, emoji, count, gradient, onReact, userReaction, onClick }: {
  photo: Photo; label: string; emoji: string; count: number
  gradient: string; onReact: () => void; userReaction: 'heart' | 'laugh' | null
  onClick: () => void
}) {
  const type = emoji === '❤️' ? 'heart' : 'laugh'
  const isActive = userReaction === type
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg bg-white group">
      <div className="relative cursor-pointer" onClick={onClick}>
        <img
          src={photoUrl(photo.storage_path)}
          alt=""
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-bold shadow-lg`}>
          <span>{emoji}</span> {label}
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-700 truncate max-w-[60%]">{photo.uploader_name}</p>
        <button
          onClick={onReact}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold transition-all
            ${isActive
              ? 'bg-brand-100 text-brand-700 scale-105'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          <span>{emoji}</span> {count}
        </button>
      </div>
    </div>
  )
}
