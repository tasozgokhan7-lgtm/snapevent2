'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Customer } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Plus, Edit2, Trash2, User, Search, KeyRound } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Modal from '@/components/ui/Modal'

interface Props { initialCustomers: Customer[] }

const emptyForm = { full_name: '', email: '', phone: '', notes: '', password: '' }

export default function CustomersList({ initialCustomers }: Props) {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const filtered = customers.filter(c =>
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  const openAdd = () => { setForm(emptyForm); setEditing(null); setError(''); setModal('add') }
  const openEdit = (c: Customer) => {
    setForm({ full_name: c.full_name, email: c.email ?? '', phone: c.phone ?? '', notes: c.notes ?? '', password: '' })
    setEditing(c); setError(''); setModal('edit')
  }

  const handleSave = async () => {
    if (!form.full_name.trim()) { setError('Ad Soyad zorunludur.'); return }
    setLoading(true); setError('')

    if (modal === 'add') {
      if (!form.email.trim()) { setError('E-posta zorunludur.'); setLoading(false); return }
      if (!form.password || form.password.length < 6) { setError('Şifre en az 6 karakter olmalıdır.'); setLoading(false); return }

      // 1. Create Supabase Auth user via admin API (service role) - fallback: create customer record only
      // For client-side, we use signUp with auto-confirm
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name, role: 'customer' } }
      })

      if (authErr && !authErr.message.includes('already registered')) {
        setError(`Hesap oluşturma hatası: ${authErr.message}`)
        setLoading(false); return
      }

      // 2. Insert customer record
      const { data, error: err } = await supabase.from('customers').insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone || null,
        notes: form.notes || null,
      }).select().single()

      if (err) { setError('Kayıt sırasında hata oluştu.') }
      else { setCustomers(prev => [data, ...prev]); setModal(null) }

    } else if (modal === 'edit' && editing) {
      const { error: err } = await supabase.from('customers').update({
        full_name: form.full_name,
        email: form.email || null,
        phone: form.phone || null,
        notes: form.notes || null,
      }).eq('id', editing.id)

      if (err) { setError('Güncelleme sırasında hata oluştu.') }
      else { setCustomers(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c)); setModal(null) }
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) return
    const { error: err } = await supabase.from('customers').delete().eq('id', id)
    if (!err) setCustomers(prev => prev.filter(c => c.id !== id))
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Müşteri ara..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none" />
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" /> Müşteri Ekle
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-700 mb-1">{search ? 'Sonuç bulunamadı' : 'Henüz müşteri yok'}</h3>
          <p className="text-slate-400 text-sm">{search ? 'Arama kriterlerinizi değiştirin.' : 'İlk müşterinizi ekleyin.'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Ad Soyad</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">İletişim</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Kayıt Tarihi</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center text-brand-600 font-bold text-sm shrink-0">
                          {c.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{c.full_name}</div>
                          {c.notes && <div className="text-xs text-slate-400 truncate max-w-48">{c.notes}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">{c.email || '—'}</div>
                      <div className="text-xs text-slate-400">{c.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{formatDate(c.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-brand-50 text-slate-400 hover:text-brand-600 transition-colors" title="Düzenle">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors" title="Sil">
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

      {/* Modal */}
      <Modal open={modal !== null} onClose={() => setModal(null)} title={modal === 'add' ? 'Yeni Müşteri Ekle' : 'Müşteriyi Düzenle'} size="md">
        <div className="space-y-4">
          <Input label="Ad Soyad *" placeholder="Tam adı giriniz" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
          <Input label="E-posta *" type="email" placeholder="ornek@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <Input label="Telefon" placeholder="0500 000 00 00" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

          {modal === 'add' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-brand-500" />
                Müşteri Giriş Şifresi *
              </label>
              <input
                type="password"
                placeholder="En az 6 karakter"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none"
              />
              <p className="text-xs text-slate-400">Müşteri bu şifre ile /musteri-girisi üzerinden giriş yapacak.</p>
            </div>
          )}

          <Textarea label="Not" placeholder="Ek notlar..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} />

          {error && <p className="text-sm text-rose-500 bg-rose-50 border border-rose-100 rounded-xl p-3">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModal(null)} className="flex-1">İptal</Button>
            <Button onClick={handleSave} loading={loading} className="flex-1">
              {modal === 'add' ? 'Müşteriyi Oluştur' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
