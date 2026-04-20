import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/giris')

  // Sadece role='admin' olan kullanıcılar erişebilir
  if (user.user_metadata?.role !== 'admin') redirect('/admin/giris')

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0 pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  )
}
