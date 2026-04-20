import { createClient } from '@/lib/supabase/server'
import EventsList from '@/components/admin/EventsList'

export default async function EventsPage() {
  const supabase = await createClient()
  const [{ data: events }, { data: customers }] = await Promise.all([
    supabase.from('events').select('*, customers(full_name)').order('created_at', { ascending: false }),
    supabase.from('customers').select('id, full_name').order('full_name'),
  ])

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Etkinlikler</h1>
        <p className="text-slate-500 text-sm mt-1">{events?.length ?? 0} etkinlik kayıtlı</p>
      </div>
      <EventsList initialEvents={events ?? []} customers={customers ?? []} />
    </div>
  )
}
