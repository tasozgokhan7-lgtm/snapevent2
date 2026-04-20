import { createClient } from '@/lib/supabase/server'
import AdminPhotosManager from '@/components/admin/AdminPhotosManager'

export default async function AdminPhotosPage() {
  const supabase = await createClient()
  const { data: photos } = await supabase
    .from('photos')
    .select('*, events(name, slug)')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Fotoğraflar</h1>
        <p className="text-slate-500 text-sm mt-1">{photos?.length ?? 0} fotoğraf yüklendi</p>
      </div>
      <AdminPhotosManager initialPhotos={photos ?? []} />
    </div>
  )
}
