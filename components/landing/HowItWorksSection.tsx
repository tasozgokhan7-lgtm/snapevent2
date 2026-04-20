import { ClipboardList, QrCode, Camera, Images } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Etkinlik Oluşturun',
    desc: 'Admin panelinden yeni bir etkinlik oluşturun. Sistem otomatik olarak benzersiz bir bağlantı oluşturur.',
    color: 'from-brand-500 to-brand-600',
  },
  {
    step: '02',
    icon: QrCode,
    title: 'QR Kodu Hazırlayın',
    desc: 'Oluşturulan bağlantıyı alın ve istediğiniz araçla QR koda dönüştürün. Etkinlik mekanına asın.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    step: '03',
    icon: Camera,
    title: 'Misafirler Yüklesin',
    desc: 'Misafirleriniz QR kodu okutarak sayfaya ulaşır, adını girer ve anında fotoğraf yükler.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    step: '04',
    icon: Images,
    title: 'Galeri Oluşsun',
    desc: 'Tüm fotoğraflar anlık olarak ortak galeride görünür. Etkinlik bittikten sonra da erişilebilir.',
    color: 'from-emerald-500 to-emerald-600',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="nasil-calisir" className="py-24 bg-gradient-to-br from-slate-50 to-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-4">
            Nasıl Çalışır?
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            4 Adımda <span className="gradient-text">Mükemmel Galeri</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Kurulum dakikalar içinde tamamlanır. Misafirleriniz teknik bilgi gerektirmeden anında fotoğraf paylaşabilir.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-200 via-rose-200 to-emerald-200 mx-32" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, icon: Icon, title, desc, color }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center group">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10 relative`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-rose-500 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Hemen Başlayın, İlk Etkinliğinizi Oluşturun
          </h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Kurulum gerektirmez, teknik bilgiye ihtiyaç yoktur. Dakikalar içinde hazır.
          </p>
          <a href="#iletisim" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-600 font-semibold hover:bg-brand-50 transition-colors shadow-lg">
            Teklif Al
          </a>
        </div>
      </div>
    </section>
  )
}
