'use client'
import { useState, useEffect } from 'react'
import { Camera, Calendar, ArrowRight, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import GuestGallery from './GuestGallery'

const storageKey = (slug: string) => `snapevent_guest_${slug}`

export default function GuestEntryPage({ event }: { event: any }) {
  const [guestName, setGuestName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [savedName, setSavedName] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [checkingStorage, setCheckingStorage] = useState(true)

  // On mount: check localStorage for a saved name for this event
  useEffect(() => {
    const stored = localStorage.getItem(storageKey(event.slug))
    if (stored) {
      setSavedName(stored)
    }
    setCheckingStorage(false)
  }, [event.slug])

  const enterWithName = (name: string) => {
    localStorage.setItem(storageKey(event.slug), name)
    setSubmitted(true)
  }

  const handleEnter = () => {
    if (!guestName.trim()) { setError('Lütfen adınızı giriniz.'); return }
    if (guestName.trim().length < 2) { setError('Adınız en az 2 karakter olmalıdır.'); return }
    setError('')
    enterWithName(guestName.trim())
  }

  const handleContinueWithSaved = () => {
    enterWithName(savedName!)
  }

  const handleChangeName = () => {
    setSavedName(null)
    localStorage.removeItem(storageKey(event.slug))
  }

  if (submitted) {
    const name = savedName && !guestName ? savedName : guestName.trim() || savedName!
    return <GuestGallery event={event} guestName={name} />
  }

  const isActive = event.is_active

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-900 to-rose-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-500/25 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-rose-400 flex items-center justify-center shadow-lg">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/80 font-medium text-sm">SnapEvent</span>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-500 via-rose-400 to-brand-500" />

          <div className="p-8">
            {!isActive ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Etkinlik Şu An Aktif Değil</h2>
                <p className="text-slate-500 text-sm">Bu etkinlik şu anda fotoğraf yüklemelerine kapalıdır.</p>
              </div>
            ) : checkingStorage ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : savedName ? (
              /* Returning guest — show saved name */
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Camera className="w-8 h-8 text-brand-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{event.name}</h1>
                  {event.event_date && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.event_date)}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-rose-50 rounded-2xl p-5 mb-6 border border-brand-100">
                  <p className="text-slate-500 text-xs text-center mb-2">Daha önce şu isimle girdiniz:</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {savedName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xl font-bold text-slate-900">{savedName}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={handleContinueWithSaved}>
                    Galeriye Gir
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <button
                    onClick={handleChangeName}
                    className="w-full text-sm text-slate-400 hover:text-slate-600 transition-colors py-2"
                  >
                    Farklı isimle gir
                  </button>
                </div>
              </>
            ) : (
              /* New guest — show name form */
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-rose-100 flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Camera className="w-8 h-8 text-brand-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{event.name}</h1>
                  {event.event_date && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.event_date)}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed">{event.description}</p>
                  )}
                </div>

                <div className="bg-gradient-to-br from-brand-50 to-rose-50 rounded-2xl p-4 mb-6 text-center border border-brand-100">
                  <p className="text-slate-700 text-sm font-medium">👋 Hoş Geldiniz!</p>
                  <p className="text-slate-500 text-xs mt-1">Adınızı girin ve etkinlik galerisine katılın.</p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Adınız"
                    placeholder="Adınızı giriniz..."
                    value={guestName}
                    onChange={e => { setGuestName(e.target.value); setError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleEnter()}
                    error={error}
                  />
                  <Button size="lg" className="w-full" onClick={handleEnter}>
                    Galeriye Gir
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">snapevent.com</p>
      </div>
    </div>
  )
}
