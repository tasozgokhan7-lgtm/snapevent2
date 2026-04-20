import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import CustomerEventGallery from '@/components/customer/CustomerEventGallery'

export default async function CustomerEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/musteri-girisi')

  const { data: customer } = await supabase
    .from('customers')
    .select('id')
    .eq('email', user.email!)
    .single()

  if (!customer) redirect('/musteri-girisi')

  // Verify event belongs to this customer
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .eq('customer_id', customer.id)
    .single()

  if (!event) notFound()

  const { data: photos } = await supabase
    .from('photos')
    .select('*')
    .eq('event_id', id)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <CustomerEventGallery event={event} photos={photos ?? []} />
    </div>
  )
}
