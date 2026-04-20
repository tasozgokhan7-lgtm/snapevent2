import { createClient } from '@/lib/supabase/server'
import { formatDateTime } from '@/lib/utils'
import { Mail } from 'lucide-react'

export default async function TaleplerPage() {
  const supabase = await createClient()
  const { data: requests } = await supabase
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Teklif Talepleri</h1>
        <p className="text-slate-500 text-sm mt-1">{requests?.length ?? 0} talep alındı</p>
      </div>

      {!requests || requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700">Henüz talep yok</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {requests.map(req => (
            <div key={req.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center text-brand-600 font-bold">
                  {req.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-slate-400">{formatDateTime(req.created_at)}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{req.name}</h3>
              <p className="text-sm text-brand-600 mb-3">{req.email_or_phone}</p>
              <div className="space-y-1.5 text-sm">
                {req.event_type && <div className="flex gap-2"><span className="text-slate-400">Tür:</span><span className="text-slate-700">{req.event_type}</span></div>}
                {req.event_date && <div className="flex gap-2"><span className="text-slate-400">Tarih:</span><span className="text-slate-700">{req.event_date}</span></div>}
                {req.note && <div className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-600 text-xs leading-relaxed">{req.note}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
