import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Users, Plus } from 'lucide-react'
import CustomersList from '@/components/admin/CustomersList'

export default async function CustomersPage() {
  const supabase = await createClient()
  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Müşteriler</h1>
          <p className="text-slate-500 text-sm mt-1">{customers?.length ?? 0} müşteri kayıtlı</p>
        </div>
      </div>
      <CustomersList initialCustomers={customers ?? []} />
    </div>
  )
}
