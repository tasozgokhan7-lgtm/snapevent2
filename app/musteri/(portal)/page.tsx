import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'

export default async function CustomerDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/musteri-girisi')

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('email', user.email!)
    .single()

  if (!customer) redirect('/musteri-girisi')

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('customer_id', customer.id)
    .order('event_date', { ascending: false })

  // Photo counts per event
  const eventIds = events?.map(e => e.id) ?? []
  const { data: photoCounts } = eventIds.length > 0
    ? await supabase
        .from('photos')
        .select('event_id')
        .in('event_id', eventIds)
        .eq('is_deleted', false)
    : { data: [] }

  const countMap: Record<string, number> = {}
  photoCounts?.forEach(p => {
    countMap[p.event_id] = (countMap[p.event_id] || 0) + 1
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Etkinliklerim</h1>
        <p className="text-slate-500 text-sm mt-1">
          Hoş geldiniz, <span className="font-medium text-brand-600">{customer.full_name}</span>
        </p>
      </div>

      {!events || events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">Henüz etkinlik yok</h3>
          <p className="text-slate-400 text-sm">Etkinlikleriniz burada görünecek.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {events.map(ev => (
            <Link key={ev.id} href={`/musteri/etkinlikler/${ev.id}`} className="group block">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Top gradient band */}
                <div className="h-2 bg-gradient-to-r from-brand-500 to-rose-500" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-brand-600" />
                    </div>
                    <Badge variant={ev.is_active ? 'success' : 'default'}>
                      {ev.is_active ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{ev.name}</h3>
                  {ev.event_date && (
                    <p className="text-sm text-slate-500 mb-4">{formatDate(ev.event_date)}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <ImageIcon className="w-4 h-4 text-brand-400" />
                      <span className="font-medium text-slate-700">{countMap[ev.id] ?? 0}</span>
                      <span>fotoğraf</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-brand-600 font-medium group-hover:gap-2 transition-all">
                      Görüntüle <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
