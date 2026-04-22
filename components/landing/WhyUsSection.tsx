import { CheckCircle } from 'lucide-react'

const reasons = [
  'Hesap açma zorunluluğu yok — misafirler anında katılır',
  'Yüklenen fotoğraflar kalıcı olarak saklanır',
  'Tüm cihazlarla uyumlu, mobil öncelikli tasarım',
  'Admin panelinden tam kontrol imkânı',
  'Türkçe arayüz, Türk kullanıcıya özel deneyim',
  'Anında paylaşım — yüklenen fotoğraf hemen görünür',
  'Güvenli altyapı ve veri gizliliği',
  'Etkinlik bazlı özelleştirilebilir erişim ayarları',
]

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
              Neden Hatıra Topla?
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Etkinliklerinizde{' '}
              <span className="gradient-text">Fark Yaratan</span>{' '}
              Platform
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Diğer platformlardan farklı olarak Hatıra Topla; sadelik, hız ve kullanıcı deneyimini ön plana koyar. Misafirleriniz saniyeler içinde fotoğraf paylaşmaya başlar.
            </p>
            <a href="#iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-rose-500 text-white font-semibold hover:from-brand-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Ücretsiz Demo Talep Et
            </a>
          </div>

          {/* Right - checklist */}
          <div className="grid grid-cols-1 gap-4">
            {reasons.map((r) => (
              <div key={r} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-white/85 text-sm">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
