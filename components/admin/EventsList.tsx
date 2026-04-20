'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Event, Customer } from '@/lib/types'
import { formatDate, generateSlug } from '@/lib/utils'
import { Plus, Search, Eye, ToggleLeft, ToggleRight, Trash2, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'

const emptyForm = {
  customer_id: '', name: '', description: '',
  event_date: '', active_from: '', active_until: '', storage_expires_at: '',
}

export default function EventsList({ initialEvents, customers }: { initialEvents: any[]; customers: { id: string; full_name: string }[] }) {
  const [events, setEvents] = useState(initialEvents)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.customers?.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = async () => {
    if (!form.customer_id || !form.name.trim()) { setError('Müşteri ve etkinlik adı zorunludur.'); return }
    setLoading(true); setError('')
    const baseSlug = generateSlug(form.name)
    let slug = baseSlug
    let suffix = 1
    while (events.some(e => e.slug === slug)) { slug = `${baseSlug}-${suffix++}` }

    const { data, error: err } = await supabase.from('events').insert({
      customer_id: form.customer_id,
      name: form.name,
      slug,
      description: form.description || null,
      event_date: form.event_date || null,
      active_from: form.active_from || null,
      active_until: form.active_until || null,
      storage_expires_at: form.storage_expires_at || null,
      is_active: true,
    }).select('*, customers(full_name)').single()

    if (err) { setError('Etkinlik oluşturulurken hata oluştu.') }
    else { setEvents(prev => [data, ...prev]); setShowAdd(false); setForm(emptyForm) }
    setLoading(false)
  }

  const toggleActive = async (ev: any) => {
    const { error: err } = await supabase.from('events').update({ is_active: !ev.is_active }).eq('id', ev.id)
    if (!err) setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, is_active: !e.is_active } : e))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return
    const { error: err } = await supabase.from('events').delete().eq('id', id)
    if (!err) setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Etkinlik ara..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none" />
        </div>
        <Button onClick={() => { setForm(emptyForm); setError(''); setShowAdd(true) }}>
          <Plus className="w-4 h-4" /> Etkinlik Oluştur
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">{search ? 'Sonuç bulunamadı' : 'Henüz etkinlik yok'}</h3>
          <p className="text-slate-400 text-sm">İlk etkinliği oluşturmak için butona tıklayın.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Etkinlik</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Müşteri</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tarih</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Durum</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(ev => (
                  <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 text-sm">{ev.name}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">/e/{ev.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{ev.customers?.full_name || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{ev.event_date ? formatDate(ev.event_date) : '—'}</td>
                    <td className="px-6 py-4">
                      <Badge variant={ev.is_active ? 'success' : 'default'}>{ev.is_active ? 'Aktif' : 'Pasif'}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/etkinlikler/${ev.id}`} className="p-2 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button onClick={() => toggleActive(ev)} className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors">
                          {ev.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleDelete(ev.id)} className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Yeni Etkinlik Oluştur" size="lg">
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Müşteri *</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none"
              value={form.customer_id}
              onChange={e => setForm({ ...form, customer_id: e.target.value })}
            >
              <option value="">Müşteri seçiniz...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
            </select>
          </div>
          <Input label="Etkinlik Adı *" placeholder="örn. Ayşe & Mehmet Düğünü" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Textarea label="Açıklama" placeholder="Etkinlik hakkında kısa açıklama..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Etkinlik Tarihi" type="date" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} />
            <Input label="Aktiflik Başlangıcı" type="datetime-local" value={form.active_from} onChange={e => setForm({ ...form, active_from: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Aktiflik Bitişi" type="datetime-local" value={form.active_until} onChange={e => setForm({ ...form, active_until: e.target.value })} />
            <Input label="Depolama Sona Erme" type="datetime-local" value={form.storage_expires_at} onChange={e => setForm({ ...form, storage_expires_at: e.target.value })} />
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)} className="flex-1">İptal</Button>
            <Button onClick={handleCreate} loading={loading} className="flex-1">Etkinlik Oluştur</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
