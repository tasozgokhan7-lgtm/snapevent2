'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatDateTime } from '@/lib/utils'
import { ArrowLeft, Copy, ExternalLink, ToggleLeft, ToggleRight, Trash2, CheckCircle, Users, Image as ImageIcon, Calendar, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default function EventDetail({ event: initialEvent, initialPhotos, guestCount }: { event: any; initialPhotos: any[]; guestCount: number }) {
  const [event, setEvent] = useState(initialEvent)
  const [photos, setPhotos] = useState(initialPhotos)
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  const guestUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://anıtopla.com'}/e/${event.slug}`

  const copyUrl = () => {
    navigator.clipboard.writeText(guestUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleActive = async () => {
    const { error } = await supabase.from('events').update({ is_active: !event.is_active }).eq('id', event.id)
    if (!error) setEvent((prev: any) => ({ ...prev, is_active: !prev.is_active }))
  }

  const deletePhoto = async (photoId: string, storagePath: string) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return
    await supabase.storage.from('event-photos').remove([storagePath])
    await supabase.from('photos').update({ is_deleted: true }).eq('id', photoId)
    setPhotos(prev => prev.filter(p => p.id !== photoId))
  }

  return (
    <div>
      {/* Back */}
      <Link href="/admin/etkinlikler" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Etkinliklere Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
            <Badge variant={event.is_active ? 'success' : 'default'}>{event.is_active ? 'Aktif' : 'Pasif'}</Badge>
          </div>
          <p className="text-slate-500 text-sm">Oluşturulma: {formatDateTime(event.created_at)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={toggleActive}>
            {event.is_active ? <><ToggleRight className="w-4 h-4" /> Pasife Al</> : <><ToggleLeft className="w-4 h-4" /> Aktif Et</>}
          </Button>
          <Link href={`/e/${event.slug}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4" /> Misafir Sayfası
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Info card */}
        <div className="lg:col-span-2 space-y-4">
          {/* Guest URL */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-brand-500" /> Misafir Bağlantısı (QR için)
            </h3>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <code className="flex-1 text-sm text-brand-700 font-mono break-all">{guestUrl}</code>
              <button onClick={copyUrl} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-medium hover:bg-brand-700 transition-colors">
                {copied ? <><CheckCircle className="w-3.5 h-3.5" /> Kopyalandı!</> : <><Copy className="w-3.5 h-3.5" /> Kopyala</>}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Bu bağlantıyı QR kod oluşturucuya yapıştırın ve etkinlik mekanına asın.</p>
          </Card>

          {/* Details */}
          <Card>
            <h3 className="font-semibold text-slate-900 mb-4">Etkinlik Bilgileri</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-400 text-xs mb-1">Müşteri</div>
                <div className="text-slate-800 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-400" /> {event.customers?.full_name}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Etkinlik Tarihi</div>
                <div className="text-slate-800 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-400" /> {event.event_date ? formatDate(event.event_date) : '—'}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Aktiflik Başlangıcı</div>
                <div className="text-slate-700">{event.active_from ? formatDateTime(event.active_from) : '—'}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Aktiflik Bitişi</div>
                <div className="text-slate-700">{event.active_until ? formatDateTime(event.active_until) : '—'}</div>
              </div>
              {event.description && (
                <div className="col-span-2">
                  <div className="text-slate-400 text-xs mb-1">Açıklama</div>
                  <div className="text-slate-700">{event.description}</div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Stat cards */}
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-brand-50 to-rose-50 border-brand-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center shadow-lg">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{photos.length}</div>
                <div className="text-sm text-slate-500">Fotoğraf</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{guestCount}</div>
                <div className="text-sm text-slate-500">Katılımcı</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Photos */}
      <Card padding="none">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Yüklenen Fotoğraflar ({photos.length})</h3>
        </div>
        {photos.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-400 text-sm">Henüz fotoğraf yüklenmemiş</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-6">
            {photos.map((photo: any) => {
              const url = `${SUPABASE_URL}/storage/v1/object/public/event-photos/${photo.storage_path}`
              return (
                <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <img src={url} alt={photo.uploader_name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <div className="text-white text-xs font-medium truncate">{photo.uploader_name}</div>
                    <div className="text-white/70 text-xs">{formatDate(photo.created_at)}</div>
                  </div>
                  <button
                    onClick={() => deletePhoto(photo.id, photo.storage_path)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-rose-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}
