import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import GuestEntryPage from '@/components/guest/GuestEntryPage'

export default async function EventSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!event) notFound()

  return <GuestEntryPage event={event} />
}
