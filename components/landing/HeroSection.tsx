'use client'
import Link from 'next/link'
import { Camera, ArrowRight, Star, Users, Image as ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Türkiye&apos;nin Özel Etkinlik Fotoğraf Platformu
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Etkinliğinizin{' '}
              <span className="relative">
                <span className="gradient-text">Her Anını</span>
              </span>
              {' '}Paylaşın
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Misafirleriniz QR kodu okutarak anında fotoğraf yüklesin. Tüm anlar ortak galeride toplandı — hiçbir an kaybolmasın.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-10">
              {[
                { icon: Camera, label: 'Fotoğraf Yüklendi', value: '50K+' },
                { icon: Users, label: 'Mutlu Misafir', value: '10K+' },
                { icon: ImageIcon, label: 'Başarılı Etkinlik', value: '500+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-300" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{value}</div>
                    <div className="text-white/50 text-xs">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#iletisim">
                <Button size="xl" className="w-full sm:w-auto">
                  Hemen Başlayın
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#nasil-calisir">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Nasıl Çalışır?
                </Button>
              </a>
            </div>
          </div>

          {/* Right - Mockup cards */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Main card */}
              <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-rose-400 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ayşe & Mehmet Düğünü</div>
                    <div className="text-white/60 text-xs">15 Haziran 2026</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'bg-gradient-to-br from-rose-400 to-pink-500',
                    'bg-gradient-to-br from-brand-400 to-purple-500',
                    'bg-gradient-to-br from-amber-400 to-orange-500',
                    'bg-gradient-to-br from-emerald-400 to-teal-500',
                    'bg-gradient-to-br from-blue-400 to-indigo-500',
                    'bg-gradient-to-br from-rose-300 to-brand-400',
                  ].map((bg, i) => (
                    <div key={i} className={`aspect-square rounded-xl ${bg} opacity-80`} />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-white/70 text-xs">42 fotoğraf yüklendi</div>
                  <div className="flex -space-x-2">
                    {['A','M','Z','K'].map((l,i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-400 to-rose-400 border-2 border-white/20 flex items-center justify-center text-white text-[10px] font-bold">
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating upload card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 w-52">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-slate-800 text-xs font-semibold">Fotoğraf Yüklendi!</div>
                    <div className="text-slate-500 text-xs">Zeynep tarafından</div>
                  </div>
                </div>
              </div>

              {/* Floating QR card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-700 mb-2">QR Kodunu Tara</div>
                <div className="grid grid-cols-5 gap-0.5">
                  {[1,0,1,1,0, 0,1,0,1,1, 1,1,0,0,1, 0,1,1,0,1, 1,0,0,1,1].map((filled, i) => (
                    <div key={i} className={`w-4 h-4 rounded-sm ${filled ? 'bg-slate-900' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
