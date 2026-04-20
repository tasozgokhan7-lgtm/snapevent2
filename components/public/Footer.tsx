import Link from 'next/link'
import { Camera, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SnapEvent</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Etkinliklerinizin her anını QR kod ile kolayca paylaşın. Misafirleriniz anlarını yüklesin, hep birlikte hatıraları yaşayın.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="mailto:info@snapevent.com" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+905001234567" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#ozellikler" className="hover:text-white transition-colors">Özellikler</a></li>
              <li><a href="#nasil-calisir" className="hover:text-white transition-colors">Nasıl Çalışır?</a></li>
              <li><a href="#etkinlik-turleri" className="hover:text-white transition-colors">Etkinlik Türleri</a></li>
              <li><Link href="/musteri-girisi" className="hover:text-white transition-colors">Müşteri Girişi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm">
              <li>info@snapevent.com</li>
              <li>+90 500 123 45 67</li>
              <li><a href="#iletisim" className="hover:text-white transition-colors">Teklif Al</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 SnapEvent. Tüm hakları saklıdır.</p>
          <p>Etkinliklerinizi unutulmaz kılın ✨</p>
        </div>
      </div>
    </footer>
  )
}
