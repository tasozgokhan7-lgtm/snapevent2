'use client'
import { useState } from 'react'
import Link from 'next/link'
import JSZip from 'jszip'
import { formatDate, formatDateTime } from '@/lib/utils'
import {
  ArrowLeft, Download, Image as ImageIcon, X,
  ChevronLeft, ChevronRight, Calendar, Users,
  DownloadCloud, Loader2, ZoomIn
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function photoUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/event-photos/${path}`
}

export default function CustomerEventGallery({ event, photos }: { event: any; photos: any[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [bulkDownloading, setBulkDownloading] = useState(false)
  const [bulkProgress, setBulkProgress] = useState(0)

  const activeLightboxPhoto = lightbox !== null ? photos[lightbox] : null

  const prevPhoto = () => setLightbox(i => (i !== null && i > 0 ? i - 1 : photos.length - 1))
  const nextPhoto = () => setLightbox(i => (i !== null && i < photos.length - 1 ? i + 1 : 0))

  // Single photo download
  const downloadSingle = async (photo: any) => {
    setDownloading(photo.id)
    try {
      const response = await fetch(photoUrl(photo.storage_path))
      const blob = await response.blob()
      const ext = photo.storage_path.split('.').pop() || 'jpg'
      const filename = `${photo.uploader_name.replace(/\s+/g, '_')}_${Date.now()}.${ext}`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download error:', err)
    }
    setDownloading(null)
  }

  // Bulk download as ZIP
  const downloadAll = async () => {
    if (photos.length === 0) return
    setBulkDownloading(true)
    setBulkProgress(0)
    const zip = new JSZip()
    const folder = zip.folder(event.name.replace(/[^a-zA-Z0-9_\-\s]/g, '') || 'AnıTopla')!

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i]
      try {
        const response = await fetch(photoUrl(photo.storage_path))
        const blob = await response.blob()
        const ext = photo.storage_path.split('.').pop() || 'jpg'
        const filename = `${String(i + 1).padStart(3, '0')}_${photo.uploader_name.replace(/\s+/g, '_')}.${ext}`
        folder.file(filename, blob)
      } catch (err) {
        console.error(`Failed to fetch photo ${i}:`, err)
      }
      setBulkProgress(Math.round(((i + 1) / photos.length) * 90))
    }

    setBulkProgress(95)
    const content = await zip.generateAsync({ type: 'blob' })
    setBulkProgress(100)
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.name.replace(/\s+/g, '_')}_Fotograflar.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setBulkDownloading(false)
    setBulkProgress(0)
  }

  return (
    <div>
      {/* Back */}
      <Link href="/musteri" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Etkinliklere Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
            <Badge variant={event.is_active ? 'success' : 'default'}>
              {event.is_active ? 'Aktif' : 'Pasif'}
            </Badge>
          </div>
          {event.event_date && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar className="w-4 h-4" /> {formatDate(event.event_date)}
            </div>
          )}
        </div>

        {photos.length > 0 && (
          <Button
            onClick={downloadAll}
            disabled={bulkDownloading}
            size="lg"
            className="shrink-0"
          >
            {bulkDownloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {bulkProgress}% İndiriliyor...
              </>
            ) : (
              <>
                <DownloadCloud className="w-5 h-5" />
                Tümünü İndir ({photos.length})
              </>
            )}
          </Button>
        )}
      </div>

      {/* Bulk progress bar */}
      {bulkDownloading && (
        <div className="mb-6 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-700">ZIP dosyası hazırlanıyor...</p>
            <span className="text-sm font-bold text-brand-600">{bulkProgress}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${bulkProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {photos.length} fotoğraf ZIP dosyasına ekleniyor. Lütfen bekleyin...
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center shadow-lg">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{photos.length}</div>
            <div className="text-sm text-slate-500">Toplam Fotoğraf</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {new Set(photos.map(p => p.uploader_name)).size}
            </div>
            <div className="text-sm text-slate-500">Katılımcı</div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {photos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">Henüz fotoğraf yok</h3>
          <p className="text-slate-400 text-sm">Misafirler fotoğraf yüklediğinde burada görünecek.</p>
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="break-inside-avoid group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="relative overflow-hidden cursor-pointer" onClick={() => setLightbox(idx)}>
                <img
                  src={photoUrl(photo.storage_path)}
                  alt={`${photo.uploader_name} tarafından`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <div>
                    <p className="text-white text-xs font-semibold">{photo.uploader_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                      onClick={e => { e.stopPropagation(); setLightbox(idx) }}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                      onClick={e => { e.stopPropagation(); downloadSingle(photo) }}
                      disabled={downloading === photo.id}
                    >
                      {downloading === photo.id
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Download className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{photo.uploader_name}</p>
                  <p className="text-xs text-slate-400">{formatDateTime(photo.created_at)}</p>
                </div>
                <button
                  onClick={() => downloadSingle(photo)}
                  disabled={downloading === photo.id}
                  className="shrink-0 w-8 h-8 rounded-lg bg-brand-50 hover:bg-brand-100 flex items-center justify-center text-brand-600 transition-colors disabled:opacity-50"
                  title="İndir"
                >
                  {downloading === photo.id
                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    : <Download className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && activeLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
            {lightbox + 1} / {photos.length}
          </div>

          {/* Download button in lightbox */}
          <button
            onClick={() => downloadSingle(activeLightboxPhoto)}
            disabled={downloading === activeLightboxPhoto.id}
            className="absolute top-4 right-20 w-11 h-11 rounded-full bg-brand-600/80 hover:bg-brand-600 text-white flex items-center justify-center transition-colors z-10"
            title="Bu fotoğrafı indir"
          >
            {downloading === activeLightboxPhoto.id
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Download className="w-4 h-4" />}
          </button>

          {/* Prev */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full px-16">
            <img
              src={photoUrl(activeLightboxPhoto.storage_path)}
              alt={activeLightboxPhoto.uploader_name}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{activeLightboxPhoto.uploader_name}</p>
              <p className="text-white/50 text-sm">{formatDateTime(activeLightboxPhoto.created_at)}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}
