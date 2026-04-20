import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EventDetail from '@/components/admin/EventDetail'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: event }, { data: photos }, { count: guestCount }] = await Promise.all([
    supabase.from('events').select('*, customers(*)').eq('id', id).single(),
    supabase.from('photos').select('*').eq('event_id', id).eq('is_deleted', false).order('created_at', { ascending: false }),
    supabase.from('guests').select('*', { count: 'exact', head: true }).eq('event_id', id),
  ])

  if (!event) notFound()

  return (
    <div className="p-6 lg:p-8">
      <EventDetail event={event} initialPhotos={photos ?? []} guestCount={guestCount ?? 0} />
    </div>
  )
}
