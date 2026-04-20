'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Camera, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function CustomerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { setError('E-posta ve şifre zorunludur.'); return }
    setLoading(true); setError('')
    const supabase = createClient()

    const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    if (authErr || !data.user) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
      return
    }

    // Admin hesabıyla müşteri girişi yapılamaz
    if (data.user.user_metadata?.role === 'admin') {
      await supabase.auth.signOut()
      setError('Admin hesabı ile müşteri girişi yapılamaz.')
      setLoading(false)
      return
    }

    // Müşteri kaydı kontrolü
    const { data: customer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single()

    setLoading(false)
    if (customer) {
      router.push('/musteri')
    } else {
      await supabase.auth.signOut()
      setError('Bu hesap için müşteri kaydı bulunamadı.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-900 to-rose-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center shadow-2xl mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">SnapEvent</h1>
          <p className="text-white/60 text-sm mt-1">Müşteri Girişi</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Hoş Geldiniz</h2>
          <p className="text-slate-500 text-sm mb-8">Etkinliklerinize erişmek için giriş yapın.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="E-posta Adresi"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Şifre</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Giriş Yap
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
