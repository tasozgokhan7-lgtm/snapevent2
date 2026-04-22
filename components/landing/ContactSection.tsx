'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email_or_phone: '', event_type: '', event_date: '', note: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email_or_phone) { setError('Ad ve iletişim bilgisi zorunludur.'); return }
    setLoading(true); setError('')
    const supabase = createClient()
    const { error: err } = await supabase.from('contact_requests').insert({
      name: form.name,
      email_or_phone: form.email_or_phone,
      event_type: form.event_type || null,
      event_date: form.event_date || null,
      note: form.note || null,
    })
    setLoading(false)
    if (err) { setError('Bir hata oluştu. Lütfen tekrar deneyin.') }
    else { setSuccess(true) }
  }

  return (
    <section id="iletisim" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-6">
              İletişim
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Etkinliğiniz İçin <span className="gradient-text">Teklif Alın</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Düğününüz, nişanınız veya özel etkinliğiniz için AnıTopla&apos;i kullanmak ister misiniz? Formu doldurun, size en kısa sürede dönelim.
            </p>

            <div className="space-y-4">
              {[
                { emoji: '✅', title: 'Hızlı Kurulum', desc: '15 dakikada etkinliğiniz hazır' },
                { emoji: '📱', title: 'Mobil Uyumlu', desc: 'Her cihazdan sorunsuz erişim' },
                { emoji: '🔒', title: 'Güvenli', desc: 'Fotoğraflarınız güvende' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">{title}</div>
                    <div className="text-slate-500 text-xs">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
            {success ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Mesajınız Alındı!</h3>
                <p className="text-slate-500">En kısa sürede size dönüş yapacağız.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input label="Ad Soyad *" placeholder="Adınız Soyadınız" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input label="E-posta veya Telefon *" placeholder="ornek@email.com veya 0500 000 00 00" value={form.email_or_phone} onChange={e => setForm({ ...form, email_or_phone: e.target.value })} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Etkinlik Türü</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                    value={form.event_type}
                    onChange={e => setForm({ ...form, event_type: e.target.value })}
                  >
                    <option value="">Seçiniz...</option>
                    <option>Düğün</option>
                    <option>Nişan</option>
                    <option>Doğum Günü</option>
                    <option>Mezuniyet</option>
                    <option>Kurumsal Etkinlik</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <Input label="Etkinlik Tarihi" type="date" value={form.event_date} onChange={e => setForm({ ...form, event_date: e.target.value })} />
                <Textarea label="Not" placeholder="Etkinliğiniz hakkında kısa bilgi verebilirsiniz..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={3} />
                {error && <p className="text-sm text-rose-500">{error}</p>}
                <Button type="submit" size="lg" loading={loading} className="w-full">
                  Teklif Talep Et
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
