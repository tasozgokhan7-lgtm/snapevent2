import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CustomerSidebar from '@/components/customer/CustomerSidebar'

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/musteri-girisi')

  // Admin hesabı müşteri paneline giremez
  if (user.user_metadata?.role === 'admin') redirect('/admin')

  // Müşteri kaydı kontrolü
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('email', user.email!)
    .single()

  if (!customer) redirect('/musteri-girisi')

  return (
    <div className="flex min-h-screen bg-slate-50">
      <CustomerSidebar customer={customer} />
      <div className="flex-1 flex flex-col min-w-0 pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  )
}
