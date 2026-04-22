import { QrCode, Upload, ImageIcon, Shield, Zap, Heart } from 'lucide-react'

const features = [
  {
    icon: QrCode,
    title: 'QR Kod ile Anında Erişim',
    desc: 'Misafirleriniz hesap açmadan, sadece QR kodu okutarak etkinlik galerisine ulaşır.',
    color: 'from-brand-500 to-brand-600',
    bg: 'bg-brand-50',
  },
  {
    icon: Upload,
    title: 'Kolay Fotoğraf Yükleme',
    desc: 'Telefon galerisi, kamera veya dosya seçici ile kolayca fotoğraf yükleyin.',
    color: 'from-rose-500 to-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: ImageIcon,
    title: 'Anlık Ortak Galeri',
    desc: 'Yüklenen fotoğraflar tüm misafirlerin galerisinde anında görünür.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Güvenli Depolama',
    desc: 'Tüm fotoğraflar güvenli Supabase altyapısında saklanır, kaybolmaz.',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Zap,
    title: 'Hızlı & Güvenilir',
    desc: 'Yüksek performanslı altyapı sayesinde yüzlerce eş zamanlı yükleme desteklenir.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Heart,
    title: 'Duygusal Deneyim',
    desc: 'Etkinliğinizin her anı özel tasarlanmış, sıcak bir arayüzde hayat bulur.',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
  },
]

export default function FeaturesSection() {
  return (
    <section id="ozellikler" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-medium mb-4">
            Özellikler
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Etkinliğinizi <span className="gradient-text">Olağanüstü</span> Kılan Özellikler
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Hatıra Topla ile etkinliğinizdeki her kişi fotoğraf paylaşabilir, ortak galeri oluşur ve hiçbir an kaybolmaz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="group p-8 rounded-2xl border border-slate-100 hover:border-brand-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
