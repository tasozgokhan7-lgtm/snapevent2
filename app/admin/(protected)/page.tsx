import { createClient } from '@/lib/supabase/server'
import { Users, Calendar, Image as ImageIcon, Activity } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: customerCount },
    { count: eventCount },
    { count: activeEventCount },
    { count: photoCount },
    { data: recentEvents },
    { data: recentPhotos },
  ] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('photos').select('*', { count: 'exact', head: true }).eq('is_deleted', false),
    supabase.from('events').select('*, customers(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('photos').select('*').eq('is_deleted', false).order('created_at', { ascending: false }).limit(6),
  ])

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Hatıra Topla platformuna genel bakış</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Toplam Müşteri" value={customerCount ?? 0} icon={Users} color="brand" />
        <StatCard title="Toplam Etkinlik" value={eventCount ?? 0} icon={Calendar} color="rose" />
        <StatCard title="Aktif Etkinlik" value={activeEventCount ?? 0} icon={Activity} color="emerald" />
        <StatCard title="Yüklenen Fotoğraf" value={photoCount ?? 0} icon={ImageIcon} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Son Etkinlikler</h2>
            <Link href="/admin/etkinlikler" className="text-sm text-brand-600 hover:text-brand-700 font-medium">Tümünü Gör</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentEvents && recentEvents.length > 0 ? recentEvents.map((ev: any) => (
              <Link key={ev.id} href={`/admin/etkinlikler/${ev.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-sm font-medium text-slate-800">{ev.name}</div>
                  <div className="text-xs text-slate-400">{ev.customers?.full_name} • {ev.event_date ? formatDate(ev.event_date) : '—'}</div>
                </div>
                <Badge variant={ev.is_active ? 'success' : 'default'}>{ev.is_active ? 'Aktif' : 'Pasif'}</Badge>
              </Link>
            )) : (
              <div className="px-6 py-8 text-center text-slate-400 text-sm">Henüz etkinlik yok</div>
            )}
          </div>
        </div>

        {/* Recent Photos */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Son Yüklenen Fotoğraflar</h2>
            <Link href="/admin/fotograflar" className="text-sm text-brand-600 hover:text-brand-700 font-medium">Tümünü Gör</Link>
          </div>
          {recentPhotos && recentPhotos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 p-4">
              {recentPhotos.map((photo: any) => {
                const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
                const url = `${supabaseUrl}/storage/v1/object/public/event-photos/${photo.storage_path}`
                return (
                  <div key={photo.id} className="aspect-square rounded-xl overflow-hidden bg-slate-100 relative group">
                    <img src={url} alt={photo.uploader_name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-white text-xs font-medium truncate">{photo.uploader_name}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">Henüz fotoğraf yok</div>
          )}
        </div>
      </div>
    </div>
  )
}
