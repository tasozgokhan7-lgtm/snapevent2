import { Mail, UserCheck, QrCode, Images } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: Mail,
    title: 'Bize Yazın',
    desc: 'info@hatiratopla.com adresine etkinliğinizin adını, tarihini ve türünü belirten kısa bir e-posta gönderin.',
    color: 'from-brand-500 to-brand-600',
    detail: 'info@hatiratopla.com',
  },
  {
    step: '02',
    icon: UserCheck,
    title: 'Giriş Bilgilerinizi Alın',
    desc: 'Size özel hazırlanmış kullanıcı adı ve şifrenizi e-posta ile iletiyoruz. Sisteme giriş yaparak etkinliğinizi görüntüleyebilirsiniz.',
    color: 'from-rose-500 to-rose-600',
    detail: 'Aynı gün teslimat',
  },
  {
    step: '03',
    icon: QrCode,
    title: 'QR Tasarımınızı Alın',
    desc: 'Etkinliğinize özel hazırlanmış, baskıya hazır QR kod tasarımlarını size gönderiyoruz. Dilek kartı, masa süsü, afiş — her formatta.',
    color: 'from-amber-500 to-amber-600',
    detail: 'Baskıya hazır dosyalar',
  },
  {
    step: '04',
    icon: Images,
    title: 'Galeri Kendiliğinden Oluşur',
    desc: 'Misafirleriniz QR kodu okutarak adlarını girer ve anında fotoğraf yükler. Tüm anlar ortak galeride toplanır.',
    color: 'from-emerald-500 to-emerald-600',
    detail: 'Gerçek zamanlı galeri',
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
            Siz sadece bir e-posta atın — gerisini biz halledelim. Misafirleriniz hiçbir teknik bilgiye ihtiyaç duymadan anında fotoğraf paylaşır.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-200 via-rose-200 to-emerald-200 mx-32" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, icon: Icon, title, desc, color, detail }, i) => (
              <div key={step} className="relative flex flex-col items-center text-center group">
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10 relative`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                {/* Detail chip */}
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-rose-500 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Etkinliğiniz için hemen yazın
              </h3>
              <p className="text-white/80 max-w-lg">
                Aynı gün kurulum, baskıya hazır QR tasarımları ve sınırsız misafir desteğiyle etkinliğiniz hazır.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:info@hatiratopla.com?subject=Etkinlik%20Talebi"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-600 font-semibold hover:bg-brand-50 transition-colors shadow-lg whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                E-posta Gönder
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors whitespace-nowrap"
              >
                Formu Doldur
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
