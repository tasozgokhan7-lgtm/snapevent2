'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDateTime } from '@/lib/utils'
import { Trash2, Search, Image as ImageIcon } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export default function AdminPhotosManager({ initialPhotos }: { initialPhotos: any[] }) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  const filtered = photos.filter(p =>
    p.uploader_name.toLowerCase().includes(search.toLowerCase()) ||
    p.events?.name?.toLowerCase().includes(search.toLowerCase())
  )

  const deletePhoto = async (photo: any) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return
    await supabase.storage.from('event-photos').remove([photo.storage_path])
    await supabase.from('photos').update({ is_deleted: true }).eq('id', photo.id)
    setPhotos(prev => prev.filter(p => p.id !== photo.id))
  }

  return (
    <>
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Fotoğraf ara..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700">Henüz fotoğraf yok</h3>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(photo => {
            const url = `${SUPABASE_URL}/storage/v1/object/public/event-photos/${photo.storage_path}`
            return (
              <div key={photo.id} className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-square overflow-hidden bg-slate-100">
                  <img src={url} alt={photo.uploader_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold text-slate-700 truncate">{photo.uploader_name}</div>
                  <div className="text-xs text-slate-400 truncate">{photo.events?.name}</div>
                  <div className="text-xs text-slate-300">{formatDateTime(photo.created_at)}</div>
                </div>
                <button
                  onClick={() => deletePhoto(photo)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-rose-600 shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
