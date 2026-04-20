'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'Misafirler hesap açmak zorunda mı?',
    a: 'Hayır. Misafirler sadece QR kodu okutarak etkinlik sayfasına ulaşır, adını girer ve fotoğraf yükler. Herhangi bir kayıt veya giriş işlemi gerekmez.',
  },
  {
    q: 'Yüklenen fotoğraflar ne kadar süre saklanır?',
    a: 'Fotoğraflar etkinlik ayarlarınıza göre belirlenen süre boyunca saklanır. Kalıcı saklama seçeneği de mevcuttur.',
  },
  {
    q: 'QR kodu nasıl oluşturuyorum?',
    a: 'SnapEvent, etkinlik için benzersiz bir bağlantı oluşturur. Bu bağlantıyı istediğiniz ücretsiz QR kod oluşturucuya yapıştırarak QR kodunuzu kolayca elde edebilirsiniz.',
  },
  {
    q: 'Kaç kişi aynı anda fotoğraf yükleyebilir?',
    a: 'Altyapımız eş zamanlı yüzlerce yüklemeyi destekler. Büyük düğün ve kurumsal etkinliklerde dahi sorunsuz çalışır.',
  },
  {
    q: 'Yüklenen fotoğrafları denetleyebilir miyim?',
    a: 'Evet. Admin panelinden tüm yüklenen fotoğrafları görebilir, uygunsuz içerikleri silebilirsiniz.',
  },
  {
    q: 'Mobil cihazlarda çalışıyor mu?',
    a: 'Evet, SnapEvent mobil öncelikli tasarlanmıştır. iOS ve Android cihazlarda, tüm modern tarayıcılarda mükemmel çalışır.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-4">
            Sık Sorulan Sorular
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Aklınızdaki <span className="gradient-text">Sorular</span>
          </h2>
          <p className="text-slate-500">Her şey açık ve net. Başka sorunuz varsa bize ulaşın.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                <ChevronDown className={cn('w-5 h-5 text-slate-400 shrink-0 transition-transform', open === i && 'rotate-180')} />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
