import Link from 'next/link'
import { Camera } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center mb-6 shadow-2xl">
        <Camera className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-7xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-3">Sayfa Bulunamadı</h2>
      <p className="text-white/60 mb-8 max-w-sm">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link href="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-rose-500 text-white font-semibold hover:from-brand-600 hover:to-rose-600 transition-all shadow-lg">
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}
